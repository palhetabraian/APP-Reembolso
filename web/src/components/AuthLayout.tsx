import { Outlet } from 'react-router';

import LogoSvg from '../assets/logo.svg';

//component de AuthLayout
export function AuthLayout() {
  return (
    <div className="w-screen h-screen bg-gray-400 flex flex-col justify-center items-center text-gray-100">
      <main className="bg-gray-500 p-8 rounded-md flex items-center flex-col md:min-w-[462px]">
        <img src={LogoSvg} alt="Logo" className="my-8" />
        <Outlet />
      </main>
    </div>
  );
}
