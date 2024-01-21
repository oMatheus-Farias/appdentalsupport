import { useContext, useEffect, useState } from 'react';
import { ScreenSizeContext } from '@/contexts/screenSizeContext';
import { AuthContext } from '@/contexts/authContext';

import avatarDefault from '../../../public/images/avatar-default-small.png';

import Head from 'next/head';
import Image from 'next/image';

import { HeaderMobile } from '@/components/headerMobile';
import { NavigationMenu } from '@/components/navigationMenu';
import { NavigationMobile } from '@/components/navigationMobile';

import { api } from '@/services/apiClient';
import { canSSRAuthPhysicalPerson } from '@/utils/canSSRAuthPhysicalPerson';

export default function DashboardUser(){
  const { dasktopSizeScreen } = useContext(ScreenSizeContext);
  const { physicalPersonUser, logOutPhysicalPerson } = useContext(AuthContext);

  const [openNav, setOpenNav] = useState(false);

  async function logout(){
    await logOutPhysicalPerson();
  };

  return(
    <>
      <Head>
        <title>DentalSupport - Minhas Consultas</title>
      </Head>
      <div className='lg:flex' >
        {dasktopSizeScreen ? 
          <NavigationMenu linkNameOne='Consultas' linkNameTwo='Nova Consulta' linkNameTre='Perfil' /> 
          : 
          <HeaderMobile handleOpenNav={ () => setOpenNav(true) } />
        }

        <main className='p-5 w-full' >
          <section className='flex items-center gap-2 justify-end' >
            <Image
              src={ avatarDefault }
              alt='Imagem avatar'
            />

            <div className='text-xs' >
              <p>{ physicalPersonUser?.name }</p>
              <button 
                onClick={ logout }
                className='font-bold underline text-red-400' 
              >
                Sair
              </button>
            </div>
          </section>
        </main>
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
    </>
  );
};

export const getServerSideProps = canSSRAuthPhysicalPerson(async (ctx) => {
  return{
    props:{},
  };
});