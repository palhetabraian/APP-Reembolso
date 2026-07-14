// arquivo responsavel pela autenticação
// chave e expiracao do token jwt
export const authConfig = {
  jwt: {
    secret: 'braian',
    expiresIn: '1d',
  },
};
