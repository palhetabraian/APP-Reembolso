//responsaveis por rotas privadas, somente usuario autenticados podem ter acesso a rota
//controller responsavel pro criar um rembolso

import { Request, Response } from 'express';
import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import { z } from 'zod';

//variavel responsavel por guardar os valores da enum(os reembolsos que vao ser permitidos)
const CategoriesEnum = z.enum([
  'food',
  'others',
  'services',
  'transport',
  'accommodation',
]);

// class responsavel pelas rotas de solicitacao
class RefundsController {
  //cria solicitacao de rembolso no banco
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

    //antes de cadastrar verifica se o usuario existe
    if (!request.user?.id) {
      throw new AppError('Não autorizado', 401);
    }

    //insere na tabela o registo
    const refund = await prisma.refunds.create({
      data: {
        name,
        category,
        amount,
        filename,
        userId: request.user.id, // passando o id q é obrigatorio
      },
    });

    response.status(201).json({ refund });
  }

  //criando metodo para listar(GET)
  async index(request: Request, response: Response) {
    response.json({ message: 'ok' });
  }
}

export { RefundsController };
