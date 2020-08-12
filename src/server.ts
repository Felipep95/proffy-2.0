import express from 'express';
import routes from './routes';
import cors from 'cors';
import bodyParser from 'body-parser';
import Knex from 'knex';


const app = express();

app.use(cors())
app.use(express.json())
app.use(routes)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


app.listen(3333)

