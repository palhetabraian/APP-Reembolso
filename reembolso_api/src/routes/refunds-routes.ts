import { Router } from 'express';
import { RefundsController } from '@/controllers/refunds-controller';

const refundsRoutes = Router(); // inicia a rota de refunds
const refundsController = new RefundsController(); // instancia a classe para criar as rotas

refundsRoutes.post('/', refundsController.create);//cria a rota post

export { refundsRoutes }; // exporta a rota
