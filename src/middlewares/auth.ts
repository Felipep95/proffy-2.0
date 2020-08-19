import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

import AuthController from '../controllers/AuthController';

const authConfig = require ('../config/auth.json');

const { promisify } = require("util");


 const Auth = async (request: Request, response: Response, next: NextFunction ) => {
    
    const authHeader = request.headers.authorization;

    if (!authHeader) 
        return response.status(401).send({ error: 'No token provided'});
        
    const [, token] = authHeader.split(' ');

    try {
        const secret:string = process.env.SECRET || '';
        // const secret = process.env.SECRET as string;
        // await promisify(jwt.verify)( token, authConfig.secret ); 
        await promisify(jwt.verify)( token, secret );
        return next();
        //  request.id = decoded.id;
    } catch (error) {
        return response.status(401).send({ error: "Token invalid"});
    }
    
}; 

export default Auth;
 




