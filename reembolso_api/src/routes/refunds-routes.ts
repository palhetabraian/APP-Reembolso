//responsavel pelas rotas de reembolsos

import { Router } from 'express';

import { RefundsController } from '@/controllers/refunds-controller';
import { verifyUserAuthorization } from '@/middlewares/verify-user-authorizations';

const refundsRoutes = Router(); // inicia a rota de refunds
const refundsController = new RefundsController(); // instancia a classe para criar as rotas e passando

//cria a rota post
refundsRoutes.post(
  '/',
  verifyUserAuthorization(['employee']), //somente usuarios que tem a role employ vai ter acesso a essa rota
  refundsController.create
);
refundsRoutes.get(
  '/',
  verifyUserAuthorization(['manager']), // somente usuario autorizado pode listar os pedidos(gerente)
  refundsController.index
);

//rotas para exibir solicitacao especifica
refundsRoutes.get(
  '/:id',
  verifyUserAuthorization(['employee', 'manager']),
  refundsController.show // para fazer uma query por id
);

export { refundsRoutes }; // exporta a rota
