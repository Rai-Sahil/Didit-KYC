import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 3001,
    DIDIT_CLIENT_ID: process.env.DIDIT_CLIENT_ID || '',
    DIDIT_SECRET_KEY: process.env.DIDIT_SECRET_KEY || '',
    DIDIT_AUTH_URL: process.env.DIDIT_AUTH_URL || 'https://apx.didit.me/auth/v2/token/',
    DIDIT_KYC_SESSION_URL: process.env.DIDIT_KYC_SESSION_URL || 'https://verification.didit.me/v1/session/',
}
