# Notion Member Automation

Automate extraction of Notion workspace members and save them to a local SQLite database using Playwright and Prisma.

## 🚀 Quick Setup

### Prerequisites

- Node.js 18+
- Google account with access to the target Notion workspace

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="file:./dev.db"

# Google Account Credentials
GOOGLE_EMAIL=your-email@gmail.com
GOOGLE_PASSWORD=your-app-password
```

> **Security Note**: Use an app-specific password for Google, not your main account password.

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Apply database schema
npx prisma migrate dev --name init

# (Optional) View database in browser
npx prisma studio
```

### 4. Run the Automation

```bash
npm run start
# or
node src/index.js
```

## 📊 Retrieving Data

### Console Commands

Available commands (scripts are already configured):

```bash
# Run the automation
npm run start

# Database management
npm run db:studio     # Open database browser
npm run db:status     # Show database overview
npm run db:reset      # Reset database
npm run db:generate   # Regenerate Prisma client
```

### Database Queries

You can query the database directly using the MemberService:

```typescript
// Get all members
const members = await MemberService.getAllMembers();
```

## 🗂️ Project Structure

```
src/
├── automation/          # Main automation logic
│   └── getMembers.ts   # Member extraction
├── flows/              # Authentication flows
│   └── loginWithGoogle.ts
├── database/           # Database layer
│   ├── client.ts       # Prisma client
│   └── memberService.ts # Member operations
├── config/             # Configuration
│   ├── credentials.ts  # Environment validation
│   └── settings.ts     # App settings
├── types/              # TypeScript interfaces
│   └── Member.ts       # Member types
└── utils/              # Utilities
    ├── browser.ts      # Playwright setup
    └── retry.ts        # Retry logic

prisma/
├── schema.prisma       # Database schema
└── migrations/         # Database migrations
```

## 📝 Features

- ✅ Google OAuth automation
- ✅ Member data extraction
- ✅ SQLite database storage
- ✅ Duplicate handling (upsert)
- ✅ Error screenshots
- ✅ Retry logic
- ✅ TypeScript support
