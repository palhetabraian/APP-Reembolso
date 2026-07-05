import 'express-async-errors';
import express from 'express';
import cors from 'cors';

import { routes } from './routes';
import { errorHandling } from './middlewares/error-handling';

const app = express();
app.use(cors()); // habilitando o cors
app.use(express.json()); //recuperar os dados com req e res

app.use(routes);
app.use(errorHandling); //utilizando o middleware de validacao

export { app };
