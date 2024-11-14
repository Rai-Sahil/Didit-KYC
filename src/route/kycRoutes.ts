import { Application } from 'express';
import { KYCController } from '../controller/KycController';
import { KYCService } from '../service/kycService';
import { ValidateKYC } from '../middleware/validation';

export class KYCRoutes {
    private kycController: KYCController;
    private kycService: KYCService;

    constructor() {
        this.kycService = new KYCService();
        this.kycController = new KYCController(this.kycService);
    }

    /**
     * @param {Application} app
    */
    public routes(app: Application): void {
        // POST - request to verify user documents
        app.post(
            '/kyc/verify-document',
            ValidateKYC,
            this.kycController.verifyDocument.bind(this.kycController)
        );
    }
}
