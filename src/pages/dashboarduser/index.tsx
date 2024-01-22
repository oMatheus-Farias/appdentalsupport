import { useContext, useState, useEffect } from 'react';
import { ScreenSizeContext } from '@/contexts/screenSizeContext';
import { AuthContext } from '@/contexts/authContext';

import avatarDefault from '../../../public/images/avatar-default-small.png';
import { calendarIcon } from '@/icons';

import Head from 'next/head';
import Image from 'next/image';

import { HeaderMobile } from '@/components/headerMobile';
import { NavigationMenu } from '@/components/navigationMenu';
import { NavigationMobile } from '@/components/navigationMobile';
import { PageTitle } from '@/components/pageTitle';
import { UserServiceDetailsContainer } from '@/components/userServiceDetailsContainer';

import { canSSRAuthPhysicalPerson } from '@/utils/canSSRAuthPhysicalPerson';
import { api } from '@/services/apiClient';

interface ListDetailServiceItem{
  id: string,
  nameClinic: string,
  address: string,
  contactClinic: string,
  dateTime: string,
  customer: string,
  contactCustomer: string,
  nameProduct: string,
  product_id: string,
  clinic_id: string,
};

export default function DashboardUser(){
  const { dasktopSizeScreen, isChecked } = useContext(ScreenSizeContext);
  const { physicalPersonUser, logOutPhysicalPerson } = useContext(AuthContext);

  const [openNav, setOpenNav] = useState(false);
  const [listDetailServices, setListDetailServices] = useState<ListDetailServiceItem[]>([]);

  useEffect(() => {
    async function getServicesUser(){
      const response = await api.get('/services');
  
      setListDetailServices(response.data);
    };

    getServicesUser();

  }, [listDetailServices]);

  async function logout(){
    await logOutPhysicalPerson();
  };

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
          <section className='flex items-center gap-2 mb-6 justify-end' >
            <Image
              src={ avatarDefault }
              alt='Imagem avatar'
            />

            <div className={ `text-xs ${isChecked ? 'text-black' : 'text-white'}` } >
              <p>{ physicalPersonUser?.name }</p>
              <button 
                onClick={ logout }
                className='font-bold underline text-red-400' 
              >
                Sair
              </button>
            </div>
          </section>

          <PageTitle icon={ calendarIcon } title='Minhas consultas' />

          <main className='mt-10 flex flex-col gap-4' >
            { listDetailServices.length === 0 ? (
              <div>
                <p className='dark:text-white' >Nenhuma consulta marcada.</p>
              </div>
            ) : (
              listDetailServices.map(item => {
                return(
                  <div key={item?.id} >
                    <UserServiceDetailsContainer
                      nameClinic={ item?.nameClinic }
                      address={ item?.address }
                      contactClinic={ item?.contactClinic }
                      dateTime={ item?.dateTime }
                      nameProduct={ item?.nameProduct }
                    />
                  </div>
                )
              })
            )}
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

export const getServerSideProps = canSSRAuthPhysicalPerson(async (ctx) => {
  return{
    props:{},
  };
});