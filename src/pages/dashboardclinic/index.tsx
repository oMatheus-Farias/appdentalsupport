import { useContext, useState } from 'react';
import { ScreenSizeContext } from '@/contexts/screenSizeContext';

import Head from 'next/head';
import { calendarIcon } from '@/icons';

import { HeaderMobile } from '@/components/headerMobile';
import { NavigationMenu } from '@/components/navigationMenu';
import { NavigationMobile } from '@/components/navigationMobile';
import { PageTitle } from '@/components/pageTitle';

import { canSSRAuthLegalPerson } from '@/utils/canSSRAuthLegalPerson';

export default function DashboardClinic(){
  const { dasktopSizeScreen, isChecked } = useContext(ScreenSizeContext);

  const [openNav, setOpenNav] = useState(false);

  return(
    <div className={ `${isChecked ? '' : 'dark'}` } >
      <Head>
        <title>DentalSupport - Minha Agenda</title>
      </Head>
      <div className='lg:flex bg-secondaryColor dark:bg-darkSecondaryColor min-h-screen' >
        {dasktopSizeScreen ? 
          <NavigationMenu linkNameOne='Agenda' linkNameTwo='Serviços' linkNameTre='Perfil' />  
          : 
          <HeaderMobile handleOpenNav={ () => setOpenNav(true) } />
        }

        <main className='p-5 w-full' >
          <PageTitle icon={ calendarIcon } title='Agenda' />
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
    </div>
  );
};

export const getServerSideProps = canSSRAuthLegalPerson(async (ctx) => {
  return{
    props:{},
  };
});