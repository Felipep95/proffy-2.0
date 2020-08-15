import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

import AuthController from '../controllers/AuthController';

const authConfig = require ('../config/auth.json');

const { promisify } = require("util");


module.exports = async (request: Request, response: Response, next: NextFunction ) => {
    
    const authHeader = request.headers.authorization;

    if (!authHeader) 
        return response.status(401).send({ error: 'No token provided'});
        
    const parts = authHeader.split(' ');

    

        const [, token] = authHeader.split(' ');

    try {
        
         await promisify(jwt.verify)( token, authConfig.secret ); 
        
        // request.useId = decoded.id;
        // request.id = decoded.id;
        // request.id = decoded.id;

        return next();
    
    } catch (error) {
        
        return response.status(401).send({ error: "Token invalid"});
    }
    
}

// export default auth;
