import { Request, Response } from 'express';
import { z } from 'zod';

class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.string().trim().email({ message: ' E-mail inválido' }),
      password: z.string(), //deixando o propio banco de dados validar
    });

    const { email, password } = bodySchema.parse(request.body); // recuperando senha e email e verificando se é igual o que chega no body

    //validando dados com zod
    response.json({ email, password });
  }
}

export { SessionsController };
