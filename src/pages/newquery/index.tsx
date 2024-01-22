import { useContext, useState } from 'react';
import { ScreenSizeContext } from '@/contexts/screenSizeContext';

import Head from 'next/head';
import { NavigationMenu } from '@/components/navigationMenu';
import { HeaderMobile } from '@/components/headerMobile';
import { PageTitle } from '@/components/pageTitle';
import { NavigationMobile } from '@/components/navigationMobile';

import { newQueryIcon } from '@/icons';

export default function NewQuery(){
  const { isChecked, dasktopSizeScreen } = useContext(ScreenSizeContext);

  const [openNav, setOpenNav] = useState(false);

  return(
    <div className={ `${isChecked ? '' : 'dark'}` } >
      <Head>
        <title>DentalSupport - Minhas Consultas</title>
      </Head>
      <div className='lg:flex bg-secondaryColor dark:bg-darkSecondaryColor min-h-screen' >
        {dasktopSizeScreen ? 
          <NavigationMenu linkNameOne='Consultas' linkNameTwo='Nova Consulta' linkNameTre='Perfil' /> 
          : 
          <HeaderMobile handleOpenNav={ () => setOpenNav(true) } />
        }

        <div className='p-5 w-full' >
          <PageTitle icon={ newQueryIcon } title='Nova Consulta' />

          <main className='mt-10 flex flex-col gap-4' >
            <p>Page New Query</p>
          </main>
        </div>
      </div>

      {!dasktopSizeScreen && (
        <NavigationMobile 
          handleCloseNav={ () => setOpenNav(false) } 
          openNav={ openNav } 
          linkNameOne='Consultas'
          linkNameTwo='Nova Consulta'
          linkNameTre='Perfil'
        />
      )}
    </div>
  );
};