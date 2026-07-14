//apenas usuarios que tem o token pode acessar a rota
import { Request, Response, NextFunction } from 'express';
import { authConfig } from '@/configs/auth';
import { verify } from 'jsonwebtoken';
import { AppError } from '@/utils/AppError';

interface TokenPayload {
  role: string;
  sub: string;
}

//funcao responsavel por garantir o token do usuario
// utilizando o next para prosseguri caso o usuario tenha se conectado
function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //responsavel por tratar o erro
  try {
    //pegando o authHeader
    const authHeader = request.headers.authorization;

    //verificando se existe de fato o headers para autenticacao
    if (!authHeader) {
      throw new AppError('JWT token não encontrado', 401);
    }

    //dividindo o token
    //vira um array basicamente assim: [Bearer, 26835876153217653127865321]
    const [, token] = authHeader.split(' ');

    const { role, sub: user_id } = verify(
      token,
      authConfig.jwt.secret
    ) as TokenPayload; //as basicamente diz que o retorno do verify é uma role e um sub

    request.user = {
      id: user_id,
      role,
    };

    return next(); //depois dele fazer a validacao do token ele segue a vida com next
  } catch (error) {
    throw new AppError('Token JWT inválido', 401);
  }
}

export { ensureAuthenticated };
