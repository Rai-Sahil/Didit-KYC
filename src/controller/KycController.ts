import { Request, Response } from 'express';

export class KYCController {
    private kycService: KYCService;

    constructor() {
        this.kycService = new KYCService();
    }
}
