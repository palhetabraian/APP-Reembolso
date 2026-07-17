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
    // recuperando query parametro opcional
    const querySchema = z.object({
      name: z.string().optional().default(''),
      page: z.coerce.number().optional().default(1), // define quantas paginas vao vir do banco de dados
      perPage: z.coerce.number().optional().default(10), // define quantas paginas vao ser exibidas do banco de dados
    });

    //recuperando da queryparams
    const { name, page, perPage } = querySchema.parse(request.query);

    //calcula os valores de skip - proximas paginas
    const skip = (page - 1) * perPage; // multiplicando as paginas

    //pesquisa pelo nome
    const refunds = await prisma.refunds.findMany({
      skip,
      take: perPage, // pegando os numeros maximos retornados
      where: {
        user: {
          name: {
            contains: name.trim(), // buscando no banco por nome e removendo o espaço
          },
        },
      },
      orderBy: { createdAt: 'desc' }, // mostrando em ordem de data
      include: {
        user: true, // deixando o usuario exposto para aparecer com dados
      },
    }); // para listar dados da tabela

    //obter o total de registro para calcular o numero de paginas
    const totalRecords = await prisma.refunds.count({
      // conta quantos registro na tabela de refunds
      where: {
        user: {
          name: {
            contains: name.trim(), //
          },
        },
      },
    });

    const totalPages = Math.ceil(totalRecords / perPage); //

    response.json({
      refunds, // retorna registro
      pagination: {
        page, // retorna a pagina
        perPage, //retorna as paginas
        totalRecords, // retorna o total de records
        totalPages: totalPages > 0 ? totalPages : 1, // total de paginas
      },
    }); // retorna os rembolsos
  }

  //funcao para mostrar uma especifica
  //buscando pelo id
  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params); // recuperando o id pelo parametro

    const refund = await prisma.refunds.findMany({
      // pegando o primeiro reembolso baseado no id
      where: { id },
      include: { user: true },
    });

    response.json(refund); // mostrando a solicitacao de reembolso pelo queryparams
  }
}

export { RefundsController };
