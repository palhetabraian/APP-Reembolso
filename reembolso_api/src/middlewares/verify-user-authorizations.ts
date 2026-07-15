// middleware utilizado para apenas usuarios autenticados podem acessar certas rotas

import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/AppError';

//funcao responsavel por ver se o usuario tem o token de verificacao

function verifyUserAuthorization(role: string[]) {
  // passando uma string de array pq alguns perfis podem ter diversas permissoes

  return (request: Request, response: Response, next: NextFunction) => {
    //verificando se o usuario esta logado
    if (
      !request.user ||
      !role.includes(request.user.role)
    ) //barrando se a pessoa tem usuario ou nao tem a role pra acessar a rota
    {
      throw new AppError('Nao autorizado', 401); //caso nao esteja logado ou nao tenha o role(perfil) para acessar
    }

    return next(); // caso esteja tudo certo continue para acessar a rota
  };
}

export { verifyUserAuthorization };
