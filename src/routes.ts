import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import AuthController from './controllers/AuthController';

import Auth from './middlewares/auth';

// const Auth = require ('./middlewares/auth');

const routes = express.Router();
const classesControllers = new ClassesController
const connectionsControllers = new ConnectionsController
const authControllers = new AuthController
 

routes.post('/auth', authControllers.create)
routes.post('/login', authControllers.loginAuth)

// routes.use(Auth);

routes.post('/classes',Auth, classesControllers.create)
routes.get('/classes',Auth, classesControllers.index)

routes.post('/connections',Auth, connectionsControllers.create)
routes.get('/connections',Auth, connectionsControllers.index)


export default routes;