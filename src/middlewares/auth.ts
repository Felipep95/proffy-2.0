import AuthController from '../controllers/AuthController';

const { Response, Request, Next} = require ("express");

const jwt = require("jsonwebtoken");
const { promisify } = require("util");






// module.exports = async (request: Request, response: Response, next: Next ) => {
    
    // const authHeader = request.headers.authorization;

    // if (!authHeader) {
    //     return response.status(401).send({ error: 'No token provided'});
    //     }
    // }

     
    // try {
    //     const decoded = await promisify(jwt.verify)( generatedToken, 'secret')
        
    // } catch (err) {
    //     return response.status(401).send({ error: "Token invalid"});
    // }


    
   
 