//responsavel pelas rotas de reembolsos

import { Router } from 'express';

import { RefundsController } from '@/controllers/refunds-controller';
import { verifyUserAuthorization } from '@/middlewares/verify-user-authorizations';

const refundsRoutes = Router(); // inicia a rota de refunds
const refundsController = new RefundsController(); // instancia a classe para criar as rotas e passando

refundsRoutes.post(
  '/',
  verifyUserAuthorization(['employee']), //somente usuarios que tem a role employ vai ter acesso a essa rota
  refundsController.create
); //cria a rota post

export { refundsRoutes }; // exporta a rota
