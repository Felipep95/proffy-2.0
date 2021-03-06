import { Request, Response, } from 'express'

import db from '../database/connections';

import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

const authConfig = require ('../config/auth');

// import './config/env';

// function generateToken(params = {}) {
//     return jwt.sign( params, authConfig.secret, {
//          expiresIn: 86400
//     });
//  }

const secret:string = process.env.SECRET || '';

function generateToken(params = {}) {
    return jwt.sign( params, secret, {
         expiresIn: 86400
    });
 }

//  function gntToken(params = {}) {
//     return jwt.sign( params, secret, {
//          expiresIn: 86400
//     });
//  }

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

                password = await bcrypt.hash(password, 10);
    
                const insertedAuthid = await db('usersAuth').insert({
                    email,
                    password,
                })

                const auth_id = insertedAuthid[0]
                
                const users = await db('users').insert({
                    name,
                    last_name,
                    auth_id,
                })
                
                return response.status(201).json('User successfully registered')
                
            } catch (err) {
                console.log(err);
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
                return response.send({
                    user,
                    token: generateToken({  id: user_id }),
                })
               // return status(200).json({ msg: "Successfully logged in"});
            }
            return response.status(400).json({ error: "Invalid password" });
        });

        user.password = undefined;
        
        // const token = generateToken({ id: user_id});
        
    //   console.log(process.env.secret);
        
        
    //    const Token = jwt.sign({ id: user_id }, authConfig.secret, {
    //     expiresIn: 86400
    //   });

    //   const tk = jwt.sign({ id: user_id }, process.env.APP_SECRET, {
    //     expiresIn: 86400
    //   });
        
    //  response.send( {user, Token} );
    // authConfig.secret
    }

    async logout (request: Request, response: Response) {
        response.json({ authUser: false, token: null});
    };
}

