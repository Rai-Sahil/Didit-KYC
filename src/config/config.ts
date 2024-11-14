import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 3001,
    DIDIT_CLIENT_ID: process.env.DIDIT_CLIENT_ID || '',
    DIDIT_SECRET_KEY: process.env.DIDIT_SECRET_KEY || '',
    DIDIT_BASE_URL: process.env.DIDIT_BASE_URL || '',
}
