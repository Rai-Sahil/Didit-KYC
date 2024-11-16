import { config } from "../config/config";

export class KYCService {
    /**
     * Calls user OCR verification API to recieve session url where user can be redirected. 
     * @returns {Promise<string | null>} _ returns session url where user can be redirected for OCR verification.
     */
    public async documentVerification(): Promise<string | null> {
        try {
            // Authenticate the platform and get the access token.
            const accessToken: string | null = await this.diditAuthentication();
            if (accessToken === null) {
                console.error('Access Token is null');
                return null;
            }

            // Request body: enabling only OCR verification and sending our platform callback URL after KYC.
            const body = {
                "callback": "https://verify.didit.me/api/session/callback",
                "features": "OCR",  
                "vendor_data": "your-vendor-data"
            };
            
            // Fetching KYC session url from DIDIT API to redirct user for OCR.
            const response = await fetch('https://verification.didit.me/v1/session/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Error while creating a session: ', data.message);
                return null;
            }

            console.log(data);
            return data.url;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    
    /**
     * Performs Didit API authentication using client id and secret key, to obtain acces_token.
     * @returns {Promise<string | null>} _ Either returns access token, if success or null
    */ 
    private async diditAuthentication(): Promise<string | null>{
        try {
            // Empty POST request body in x-www-form-credentials content-type.
            const params = new URLSearchParams();

            // Encode client ID and secret key into a Base64-encoded string for authentication
            const encodedCredentials = Buffer.from(
                `${config.DIDIT_CLIENT_ID}:${config.DIDIT_SECRET_KEY}`,
            ).toString('base64');

            // Application should be authenticated only using client_credentials, as we are using basic cred auth.
            params.append('grant_type', 'client_credentials');
            
            // POST request to Didit API to obtain an access token, using Basic Auth with encoded credentials
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
            throw new Error(error.message);
        }
    }
}
