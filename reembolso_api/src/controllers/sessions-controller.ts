import { Request, Response } from 'express';
import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import { compare } from 'bcrypt'; // importa para comparar a senha com o banco de dados que ta criptografado
import { z } from 'zod';

class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.string().trim().email({ message: ' E-mail inválido' }),
      password: z.string(), //deixando o propio banco de dados validar
    });

    const { email, password } = bodySchema.parse(request.body); // recuperando senha e email e verificando se é igual o que chega no body

    const user = await prisma.user.findFirst({ where: { email } }); // procurando no banco de dados o primeiro

    //verificando se o usuario nao existe
    if (!user) {
      throw new AppError('E-mail ou senha inválido ', 401);
    }

    const passwordMatched = await compare(password, user.password); //recuperando a senha

    //verificando se ela existe
    if (!passwordMatched) {
      throw new AppError('E-mail ou senha inválido ', 401);
    }

    response.json({ email, password });
  }
}

export { SessionsController };
