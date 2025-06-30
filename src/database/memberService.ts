import { db } from './client';
import { Member } from '../types/Member';

export class MemberService {
  // Save members to database (upsert to handle duplicates)
  static async saveMembers(members: Member[]): Promise<void> {
    const promises = members.map((member) =>
      db.member.upsert({
        where: { email: member.email },
        update: {
          name: member.name,
          role: member.role,
        },
        create: {
          name: member.name,
          email: member.email,
          role: member.role,
        },
      })
    );

    await Promise.all(promises);
  }

  // Get all members
  static async getAllMembers(): Promise<Member[]> {
    const dbMembers = await db.member.findMany({
      orderBy: { updatedAt: 'desc' },
    });

    return dbMembers.map((member) => ({
      name: member.name,
      email: member.email,
      role: member.role,
    }));
  }
}
