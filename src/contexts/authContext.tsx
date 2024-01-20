import { createContext, ReactNode, useState } from 'react';

import { destroyCookie, setCookie } from 'nookies';
import Router from 'next/router';

import { api } from '@/services/apiClient';

import toast from 'react-hot-toast';

interface AuthContextData {
  sigInPhysicalPerson: (credencials: SigInPhysicalPersonProps) => Promise<void>,
  sigUpPhysicalPerson: (credencials: SigUpPhysicalPersonProps) => Promise<void>,
  logOutPhysicalPerson: () => Promise<void>,
  sigInLegalPerson: (credencials: SigInLegalPersonProps) => Promise<void>,
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

interface SigUpPhysicalPersonProps{
  name: string,
  contact: string,
  email: string,
  password: string,
};

interface SigInLegalPersonProps{
  email: string,
  password: string,
};

interface LegalPersonProps{
  id: string,
  name: string,
  address: string,
  contact: string,
  operation: string,
  email: string,
  status: string,
  banner: string,
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
  const [physicalPersonUser, setPhysicalPersonUser] = useState<PhysicalPersonProps | null>(null);
  const signedPhysicalPersonUser = !!physicalPersonUser;
  const [legalPersonUser, setLegalPersonUser] = useState<LegalPersonProps | null>(null);

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
      toast.success('Bem-vindo(a)');

    }catch(err){
      console.log('Erro ao tentar fazer login.');
      toast.error('Algo deu errado!');
    };
  };

  async function sigUpPhysicalPerson({ name, contact, email, password }: SigUpPhysicalPersonProps){
    try{
      await api.post('/user', {
        name,
        contact,
        email,
        password,
      });

      Router.push('/');
      toast.success('Cadastrado com sucesso, faça o login!');

    }catch(err){
      console.log('Erro ao tentar cadastrar.');
      toast.error('Algo deu errado!');
    };
  };

  async function logOutPhysicalPerson(){
    try{
      destroyCookie(null, '@dentalsupport.token', { path: '/' });
      Router.push('/');
      setPhysicalPersonUser(null);
      toast.success('LogOut realizado com sucesso!');

    }catch(err){
      console.log('Erro tentar fazer logOut', err);
      toast.error('Algo deu errado!');
    };
  };

  async function sigInLegalPerson({ email, password }: SigInLegalPersonProps){
    try{
      const response = await api.post('/session/clinic', {
        email,
        password,
      });

      const { id, name, address, contact, operation, status, banner, token } = response.data;

      setCookie(undefined, '@dentalsupportclinic.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      setLegalPersonUser({
        id,
        name,
        address,
        contact,
        operation,
        email,
        status,
        banner,
      });

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      Router.push('/dashboardclinic');
      toast.success('Bem-vindo(a)');

    }catch(err){
      console.log('Erro ao tentar fazer login.');
      toast.error('Algo deu errado!');
    };
  };

  return(
    <AuthContext.Provider 
      value={{ 
        sigInPhysicalPerson, 
        sigUpPhysicalPerson, 
        logOutPhysicalPerson, 
        sigInLegalPerson, 
        signedPhysicalPersonUser 
      }} >
      { children }
    </AuthContext.Provider>
  );
};