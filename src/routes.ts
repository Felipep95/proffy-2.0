import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import AuthController from './controllers/AuthController';

const routes = express.Router();
const classesControllers = new ClassesController
const connectionsControllers = new ConnectionsController
const authControllers = new AuthController

routes.post('/classes', classesControllers.create)
routes.get('/classes', classesControllers.index)
routes.post('/connections', connectionsControllers.create)
routes.get('/connections', connectionsControllers.index)


routes.post('/auth', authControllers.create)
routes.post('/login', authControllers.loginAuth)

export default routes;