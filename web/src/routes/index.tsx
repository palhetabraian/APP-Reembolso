//centralizando todas as rotas
import { BrowserRouter } from 'react-router';

import { AuthRoutes } from './AuthRoutes';
import { ManagerRoutes } from './ManagerRoutes';
import { EmployeeRoutes } from './EmployeeRoutes';

import { Loading } from '../components/Loading';

const isLoading = false;

const session = {
  user: {
    role: 'employee',
  },
};

export function Routes() {
  //retorna a rota baseado na role do usuario
  function Route() {
    switch (session.user.role) {
      case 'employee':
        return <EmployeeRoutes />;
      case 'manager':
        return <ManagerRoutes />;

      default:
        return <AuthRoutes />;
    }
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
