import { createContext, ReactNode } from 'react';
import { destroyCookie } from 'nookies';
import Router from 'next/router';

interface AuthContextData {
  sigInPhysicalPerson: (credencials: sigInPhysicalPersonProps) => Promise<void>,
};

interface AuthContextProps{
  children: ReactNode,
};

interface sigInPhysicalPersonProps{
  email: string,
  password: string,
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut(){
  console.log('Error logOut');

  try{
    destroyCookie(null, '@dentalsupport.token', { path: '/' });
    Router.push('/');

  }catch(err){
    console.log('Erro ao sair.', err);
  };
};

export default function AuthContextProvider({ children }: AuthContextProps){
  async function sigInPhysicalPerson({ email, password }: sigInPhysicalPersonProps){
    console.log(email);
    console.log(password);
  };

  return(
    <AuthContext.Provider value={{ sigInPhysicalPerson }} >
      { children }
    </AuthContext.Provider>
  );
};