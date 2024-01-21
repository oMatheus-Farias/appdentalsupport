import { useContext, useState } from 'react';
import { ScreenSizeContext } from '@/contexts/screenSizeContext';

import Head from 'next/head';
import { HeaderMobile } from '@/components/headerMobile';
import { NavigationMenu } from '@/components/navigationMenu';
import { NavigationMobile } from '@/components/navigationMobile';

import { canSSRAuthPhysicalPerson } from '@/utils/canSSRAuthPhysicalPerson';

export default function DashboardUser(){
  const { dasktopSizeScreen } = useContext(ScreenSizeContext);

  const [openNav, setOpenNav] = useState(false);

  return(
    <>
      <Head>
        <title>DentalSupport - Minhas Consultas</title>
      </Head>
      <div className='lg:flex' >
        {dasktopSizeScreen ? <NavigationMenu /> : <HeaderMobile handleOpenNav={ () => setOpenNav(true) } />}

        <main className='p-5' >
          <h1>Página DashboardUser</h1>
        </main>
      </div>

      {!dasktopSizeScreen && <NavigationMobile handleCloseNav={ () => setOpenNav(false) } openNav={ openNav } />}
    </>
  );
};

export const getServerSideProps = canSSRAuthPhysicalPerson(async (ctx) => {
  return{
    props:{},
  };
});