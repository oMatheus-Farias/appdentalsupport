import { createContext, ReactNode } from 'react';

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