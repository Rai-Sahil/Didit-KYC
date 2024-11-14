import { Request, Response, Application } from 'express';
import { KYCController } from '../controller/KycController';

export class KYCRoutes {
    private kycController: KYCController;

    constructor() {
        this.kycController = new KYCController();
    }

    /**
     * @param {Application} app
    */
    public routes(app: Application): void {
        // /TODO: Create a route which will be used to send documents to Didit API.
    }
}
