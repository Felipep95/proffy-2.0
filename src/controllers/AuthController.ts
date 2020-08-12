import { Request, Response } from 'express'
import db from '../database/connections';
import bcrypt from 'bcrypt';

export default class AuthController {

    async create(request: Request, response: Response) {
        var {
            name,
            last_name,
            email,
            password,
        } = request.body;

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

            return response.status(201).send({ id: authUser[0]})
        } catch (err) {

            return response.status(400).json({
                error: 'Unexpected error while creating new user'
            })
        }
    }

    async loginAuth(request: Request, response: Response) {
        const {
            email,
            password,
        } = request.body;

        const user = await db('usersAuth').select()
        .from('usersAuth')
        .where('email', '=', email)
        .first();

        if (!user) {
            return response.status(400).json({ error: "User not found" });
        }

        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
            return response.status(200).json({ msg: "Entrou!!!"});
            }
            return response.status(400).json({ error: "Invalid password" });
        });


    }
}
