import { useContext, useState, useEffect } from 'react';
import { ScreenSizeContext } from '@/contexts/screenSizeContext';

import Head from 'next/head';
import { calendarIcon } from '@/icons';

import { HeaderMobile } from '@/components/headerMobile';
import { NavigationMenu } from '@/components/navigationMenu';
import { NavigationMobile } from '@/components/navigationMobile';
import { PageTitle } from '@/components/pageTitle';
import { ClinicServiceDetail } from '@/components/clinicServiceDetail';
import { ModalServiceClinic } from '@/components/modalServiceClinic';
import { Footer } from '@/components/footer';

import { canSSRAuthLegalPerson } from '@/utils/canSSRAuthLegalPerson';
import { apiClinic } from '@/services/apiClientClinic';
import { parseCookies } from 'nookies';

export interface ListDetailServiceClinic{
  id: string,
  customer: string,
  nameProduct: string,
  dateTime: string,
  contactCustomer: string,
};

export default function DashboardClinic(){
  const { dasktopSizeScreen, isChecked } = useContext(ScreenSizeContext);

  const [openModal, setOpenModal] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [listService, setListService] = useState<ListDetailServiceClinic[]>([]);
  const { '@dentalsupportclinic.token': token } = parseCookies();

  const [serviceSelected, setServiceSelect] = useState<ListDetailServiceClinic>();

  useEffect(() => {
    async function getListService(){
      try{
        const response = await apiClinic.get('/clinic/services');

        setListService(response.data);
  
      }catch(err){
        console.log(err);
      };
    };

   if(token){
    getListService();
   };
  }, []);

  function handleModal(item: ListDetailServiceClinic){
    setOpenModal(true);
    setServiceSelect(item);
  };

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
            {listService.length === 0 && (
              <div>
                <p className='dark:text-white' >Nenhuma serviço marcado.</p>
              </div>
            )}
            {listService && listService.map(item => {
              return(
                <button
                  key={ item?.id }
                  onClick={ () => handleModal(item) }
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

      {openModal && (
        <ModalServiceClinic
          closeModal={ () => setOpenModal(false) }
          detail={ serviceSelected }
          listServices={ listService }
          setListServices={ setListService }
        />
      )}

      <Footer/>
    </div>
  );
};

export const getServerSideProps = canSSRAuthLegalPerson(async (ctx) => {
  return{
    props:{},
  };
});