import { Request, Response, } from 'express'
import db from '../database/connections';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import env from './config/env';
const authConfig = require ('../config/auth');

function generateToken(params = {}) {
    return jwt.sign( params, authConfig.secret, {
         expiresIn: 86400
    });
 }

export default class AuthController {

    async create(request: Request, response: Response) {

        var { name, last_name, email, password, } = request.body;
       
        const verifyUserEmail = await db('usersAuth').select()
        .from('usersAuth')
        .where('email', '=',  email)
        .first();

        if ( verifyUserEmail ) {
            return response.status(400).json('Error: user already registered');
        } 
        else {
            
            try {
                const insertedUsersIds = await db('users').insert({
                    name,
                    last_name,
                })
    
                const user_id = insertedUsersIds[0]
    
                password = await bcrypt.hash(password, 10);
    
                const authUser = await db('usersAuth').insert({
                    email,
                    password,
                    user_id
                })
                
                return response.status(201).json('User successfully registered')
                
            } catch (err) {
    
                return response.status(400).json({
                    error: 'Unexpected error while creating new user'
                })
            }
        }
    }
      
    async loginAuth(request: Request, response: Response) {
        
        const { email, password, } = request.body;
            
        const user = await db('usersAuth').select()
        .from('usersAuth')
        .where('email', '=', email)
        .first();

        const user_id = user[0];
 
        if (!user) {
            return response.status(400).json({ error: "User not found" });
        }

        bcrypt.compare(password, user.password, function(err, result) {
            
            if(result){
            return response.status(200).json({ msg: "Successfully logged in"});
            }
            return response.status(400).json({ error: "Invalid password" });
        });

        user.password = undefined;

        // const useData = {
        //     user_id,
        //     name: user[0].name,
        //     last_name: user[0].last_name,
        //     avatar: user[0].avatar,
        //     whatsapp: user[0].whatsapp,
        //     bio: user[0].bio,
        //     email: user[0].email,
        // }

        // const token = generateToken({ id: user_id});
        
        return response.send({
            // useData, 
            token: generateToken({  id: user_id }),
        })
        
        
    //    const Token = jwt.sign({ id: user_id }, authConfig.secret, {
    //     expiresIn: 86400
    //   });
        
    //   response.send( {user, Token} );
    // authConfig.secret
    }

    async logout (request: Request, response: Response) {
        response.json({ authUser: false, Token: null});
    };
}

