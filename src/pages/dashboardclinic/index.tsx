import { useContext, useState, useEffect } from 'react';
import { ScreenSizeContext } from '@/contexts/screenSizeContext';
import { AuthContext } from '@/contexts/authContext';

import Head from 'next/head';
import { calendarIcon } from '@/icons';

import { HeaderMobile } from '@/components/headerMobile';
import { NavigationMenu } from '@/components/navigationMenu';
import { NavigationMobile } from '@/components/navigationMobile';
import { PageTitle } from '@/components/pageTitle';
import { ClinicServiceDetail } from '@/components/clinicServiceDetail';

import { canSSRAuthLegalPerson } from '@/utils/canSSRAuthLegalPerson';
import { apiClinic } from '@/services/apiClientClinic';

interface ListDetailService{
  id: string,
  customer: string,
  nameProduct: string,
  dateTime: string,
  contactCustomer: string,
};

export default function DashboardClinic(){
  const { dasktopSizeScreen, isChecked } = useContext(ScreenSizeContext);
  const { legalPersonUser } = useContext(AuthContext);

  const [openNav, setOpenNav] = useState(false);
  const [listService, setListService] = useState<ListDetailService[]>([]);

  useEffect(() => {
    async function getListService(){
      try{
        const response = await apiClinic.get('/clinic/services');

        setListService(response.data);
  
      }catch(err){
        console.log(err);
      };
    };

   if(legalPersonUser){
    getListService();
   };
  }, []);

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

        <div className='p-5 w-full' >
          <PageTitle icon={ calendarIcon } title='Agenda' />

          <main className='mt-10 flex flex-col gap-4' >
            {listService && listService.map(item => {
              return(
                <button
                  key={ item?.id }
                >
                  <ClinicServiceDetail
                    customer={ item?.customer }
                    nameProduct={ item?.nameProduct }
                    dateTime={ item?.dateTime }
                  />
                </button>
              )
            })}
          </main>
        </div>
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