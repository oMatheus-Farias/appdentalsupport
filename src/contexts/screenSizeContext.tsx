import { createContext, ReactNode, useState, useEffect } from 'react';

interface ScreenSizeContextData{
  dasktopSizeScreen: boolean | null;
};

type ScrennSizeChildren = {
  children: ReactNode;
};

export const ScreenSizeContext = createContext({} as ScreenSizeContextData);

export default function ScreenSizeProvider({ children }: ScrennSizeChildren){
  const [dasktopSizeScreen, setDasktopSizeScreen] = useState<boolean | null>(null);

  useEffect(() => {
    window.addEventListener('resize', checkScreenSize);

    function checkScreenSize(){
      window.innerWidth >= 1024 ? setDasktopSizeScreen(true) : setDasktopSizeScreen(false);
    };

    checkScreenSize();
  }, []);

  return(
    <ScreenSizeContext.Provider value={{ dasktopSizeScreen }} >
      { children }
    </ScreenSizeContext.Provider>
  );
};