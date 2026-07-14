//responsaveis por rotas privadas, somente usuario autenticados podem ter acesso a rota
//controller responsavel pro criar um rembolso

import { Request, Response } from 'express';
import { z } from 'zod';

//variavel responsavel por guardar os valores da enum(os reembolsos que vao ser permitidos)
const CategoriesEnum = z.enum([
  'food',
  'others',
  'services',
  'transport',
  'accommodation',
]);

class RefundsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z
        .string()
        .trim()
        .min(1, { message: 'Informe o nome da solicitação' }),
      category: CategoriesEnum, // esperando esses dados da reposta e usando a variavel Categories como parametro,
      amount: z.number().positive({ message: 'O valor precisa ser positivo' }), // passando o valor,
      filename: z.string().min(20), // campo que vai ficar o arquivo do filename
    });

    const { name, category, amount, filename } = bodySchema.parse(request.body); //validando se os dados que ta vindo do request.body bate com o bodySchema

    response.json({ message: 'ok' });
  }
}

export { RefundsController };
