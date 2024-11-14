import { Request, Response, NextFunction } from 'express';

export const Logger = (req: Request, _: Response, next: NextFunction) {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString}`);
    next();
}
