import { config } from "../config/config";

export class KYCService {
    public async documentVerification(): Promise<string | null> {
        try {
            const accessToken: string | null = await this.diditAuthentication();

            if (accessToken === null) {
                console.error('Access Token is null');
                return null;
            }
            const body = {
                "callback": "https://verify.didit.me/api/session/callback",
                "features": "OCR",  
                "vendor_data": "your-vendor-data"
            };

            const response = await fetch('https://verification.didit.me/v1/session/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })

            const data = await response.json();

            if (!response.ok) {
                console.error('Error while creating a session: ', data.message);
                return null;
            }

            console.log(data);
            return data.url;
        } catch (error: any) {
            throw new Error(error.status || 500, error.message);
        }
    }

    private async diditAuthentication(): Promise<string | null>{
        try {
            const params = new URLSearchParams();
            const encodedCredentials = Buffer.from(
                `${config.DIDIT_CLIENT_ID}:${config.DIDIT_SECRET_KEY}`,
            ).toString('base64');

            params.append('grant_type', 'client_credentials');

            const response = await fetch('https://apx.didit.me/auth/v2/token/', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${encodedCredentials}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params,
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Error fetching client token:', response);
                return null;
            }

            console.log(data);
            return data.access_token;
        } catch (error: any) {
            throw new Error(error.status || 500, error.message);
        }
    }
}
