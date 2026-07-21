// arquivo responsavel pela autenticação
// chave e expiracao do token jwt
import type { SignOptions } from 'jsonwebtoken';
export const authConfig = {
  jwt: {
    secret: 'braian',
    expiresIn: '1d' as SignOptions['expiresIn'],
  },
};
