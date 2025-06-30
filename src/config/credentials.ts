import * as dotenv from 'dotenv';
dotenv.config();

// Validate required environment variables
const validateCredentials = () => {
  const email = process.env.GOOGLE_EMAIL;
  const password = process.env.GOOGLE_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'Missing required environment variables. Please set GOOGLE_EMAIL and GOOGLE_PASSWORD in your .env file.'
    );
  }

  if (!email.includes('@')) {
    throw new Error('GOOGLE_EMAIL must be a valid email address.');
  }

  return { email, password };
};

const { email, password } = validateCredentials();

export const GOOGLE_EMAIL = email;
export const GOOGLE_PASSWORD = password;
