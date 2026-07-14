import { Request, Response } from 'express';
import { UserRole } from '@prisma/client';
import { prisma } from '@/database/prisma';
import { z } from 'zod';
import { hash } from 'bcrypt';
import { AppError } from '@/utils/AppError';

class UsersController {
  async create(req: Request, res: Response) {
    //validando os dados do usuario
    const bodySchema = z.object({
      name: z.string().trim().min(2, { message: 'Nome é obrigatorio' }),
      email: z
        .string()
        .trim()
        .email({ message: 'E-mail inválido' })
        .toLowerCase(),
      password: z
        .string()
        .min(6, { message: 'A senha deve ter pelo menos 6 dígitos' }),
      role: z
        .enum([UserRole.employee, UserRole.manager])
        .default(UserRole.employee), // passando por padrao que o usuario vai ser um funcionario
    });

    //pegando os dados validados
    const { name, email, password, role } = bodySchema.parse(req.body);

    //verifica se o email ta cadastrado
    const userWithSameEmail = await prisma.user.findFirst({ where: { email } }); // buscando o primeiro da lista que o email for igual
    // caso exista o mesmo usuario retornar error
    if (userWithSameEmail) {
      throw new AppError('Já existe um usuário cadastrado com esse e-mail');
    }

    //criptografando a senha antes de gravar no banco com bcrypt
    const hashedPassword = await hash(password, 8); // criptografando com 8

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    res.status(201).json();
  }
}

export { UsersController };
