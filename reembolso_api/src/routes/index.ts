//centralizando todas as rotas em unico arquivo

import { Router } from 'express';

import { usersRoutes } from './users-routes';
import { refundsRoutes } from './refunds-routes';
import { sessionsRoutes } from './sessions-router';

const routes = Router();

//Rotas publicas
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

//rotas privadas. somente autenticados podem acessar
routes.use('/refunds', refundsRoutes);

export { routes };
