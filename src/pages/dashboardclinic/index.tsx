import { useContext, useState } from 'react';
import { ScreenSizeContext } from '@/contexts/screenSizeContext';

import Head from 'next/head';
import { HeaderMobile } from '@/components/headerMobile';
import { NavigationMenu } from '@/components/navigationMenu';
import { NavigationMobile } from '@/components/navigationMobile';

import { canSSRAuthLegalPerson } from '@/utils/canSSRAuthLegalPerson';

export default function DashboardClinic(){
  const { dasktopSizeScreen } = useContext(ScreenSizeContext);

  const [openNav, setOpenNav] = useState(false);

  return(
    <>
      <Head>
        <title>DentalSupport - Minha Agenda</title>
      </Head>
      <div className='lg:flex' >
        {dasktopSizeScreen ? 
          <NavigationMenu linkNameOne='Agenda' linkNameTwo='Serviços' linkNameTre='Perfil' />  
          : 
          <HeaderMobile handleOpenNav={ () => setOpenNav(true) } />
        }

        <main className='p-5' >
          <h1>Página DashboardClinic</h1>
        </main>
      </div>

      {!dasktopSizeScreen && (
        <NavigationMobile 
          handleCloseNav={ () => setOpenNav(false) } 
          openNav={ openNav } 
          linkNameOne='Agenda'
          linkNameTwo='Serviços'
          linkNameTre='Perfil'
        />
      )}
    </>
  );
};

export const getServerSideProps = canSSRAuthLegalPerson(async (ctx) => {
  return{
    props:{},
  };
});