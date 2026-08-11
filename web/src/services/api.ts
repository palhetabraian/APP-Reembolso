//centraliza a configuracao da api de consumo

import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333',
});
