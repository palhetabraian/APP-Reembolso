//centralizando todas as rotas em unico arquivo

import { Router } from 'express';

import { usersRoutes } from './users-routes';
import { refundsRoutes } from './refunds-routes';
import { sessionsRoutes } from './sessions-router';
import { uploadsRoutes } from './uploads-routes';

import { ensureAuthenticated } from '@/middlewares/ensure-authenticated';

const routes = Router();

//Rotas publicas
routes.use('/users', usersRoutes); // rota de usuario disponivel
routes.use('/sessions', sessionsRoutes); // rota de sessao disponivel

//rotas privadas. somente autenticados podem acessar
routes.use(ensureAuthenticated); //responsavel por todas as rotas abaixo utilizar o middleware de autenticacao
routes.use('/refunds', refundsRoutes); // deixa a rota de reembolsos disponivel
routes.use('/uploads', uploadsRoutes); // rota de upload disponivel

export { routes };
