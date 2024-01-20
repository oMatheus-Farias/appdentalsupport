import { createContext, ReactNode, useState } from 'react';
import { destroyCookie, setCookie } from 'nookies';
import Router from 'next/router';

import { api } from '@/services/apiClient';

interface AuthContextData {
  sigInPhysicalPerson: (credencials: SigInPhysicalPersonProps) => Promise<void>,
  signedPhysicalPersonUser: boolean,
};

interface AuthContextProps{
  children: ReactNode,
};

interface SigInPhysicalPersonProps{
  email: string,
  password: string,
};

interface PhysicalPersonProps{
  id: string,
  name: string,
  email: string,
  contact: string,
  avatar: string,
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
  const [physicalPersonUser, setPhysicalPersonUser] = useState<PhysicalPersonProps>();
  const signedPhysicalPersonUser = !!physicalPersonUser;

  async function sigInPhysicalPerson({ email, password }: SigInPhysicalPersonProps){
    try{
      const response = await api.post('/session', {
        email,
        password,
      });

      const { id, name, contact, avatar, token } = response.data;

      setCookie(undefined, '@dentalsupport.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      setPhysicalPersonUser({
        id,
        name,
        email,
        contact,
        avatar,
      });

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      Router.push('/dashboarduser');

    }catch(err){
      console.log('Erro ao tentar fazer login');
    };
  };

  return(
    <AuthContext.Provider value={{ sigInPhysicalPerson, signedPhysicalPersonUser }} >
      { children }
    </AuthContext.Provider>
  );
};