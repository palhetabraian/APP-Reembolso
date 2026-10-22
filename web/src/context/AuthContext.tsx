import { useState } from 'react';
import { createContext, type ReactNode } from 'react';

type AuthContext = {
  session: null | UserAPIResponse;
  save: (data: UserAPIResponse) => void;
};

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<null | UserAPIResponse>(null);

  function save(data: UserAPIResponse) {
    setSession(data);
  }

  return (
    <AuthContext.Provider value={{ session, save }}>
      {children}
    </AuthContext.Provider>
  );
}
