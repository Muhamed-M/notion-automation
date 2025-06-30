export interface Member {
  name: string;
  email: string;
  role: string;
}

export interface MemberExtractionResult {
  members: Member[];
  totalCount: number;
  timestamp: string;
}
