import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

class App {
    public app: express.Application;
    // /TODO: Add routes to handle doc verification

    constructor() {
        this.app = express();
        this.config();
    }
    
    private config(): void {
        this.app.use((_, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            next();
        })

        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
    }
}

export default new App().app;
