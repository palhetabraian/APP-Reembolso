import { Request, Response } from 'express';
import { UserRole } from '@prisma/client';
import { z } from 'zod';

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

    res.json({ name, email, password, role });
  }
}

export { UsersController };
