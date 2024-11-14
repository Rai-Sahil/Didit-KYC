import { Request, Response, NextFunction } from 'express';
import { KYCService } from '../service/kycService';
import { validationResult } from 'express-validator';
import { errorHandler } from '../middleware/error';

export class KYCController {
    private kycService: KYCService;

    constructor(kycService: KYCService) {
        this.kycService = kycService;
    }
    
    /**
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
    */
    public async verifyDocument(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return errorHandler(errors, req, res, next);
            }
            
            const result = await this.kycService.documentVerification();
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            next(error);
        }
    }
}
