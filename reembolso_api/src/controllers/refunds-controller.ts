//responsaveis por rotas privadas, somente usuario autenticados podem ter acesso a rota

import { Request, Response } from 'express';

class RefundsController {
  async create(request: Request, response: Response) {
    response.json({ message: 'ok' });
  }
}

export { RefundsController };
