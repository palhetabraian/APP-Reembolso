// responsavel pelas rotas de sessao

import { Router } from 'express';

import { SessionsController } from '@/controllers/sessions-controller';

const sessionsRoutes = Router(); // cria o router
const sessionsController = new SessionsController(); // instancia o controller

sessionsRoutes.post('/', sessionsController.create); // cria a rota

export { sessionsRoutes }; //exporta a rota
