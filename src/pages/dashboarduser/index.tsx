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
import { Footer } from '@/components/footer';
import { ModalServiceUser } from '@/components/modalServiceUser';

import { canSSRAuthPhysicalPerson } from '@/utils/canSSRAuthPhysicalPerson';
import { api } from '@/services/apiClient';
import axios from 'axios';
import { parseCookies } from 'nookies';

export interface ListDetailServiceItem{
  id: string,
  nameClinic: string,
  address: string,
  contactClinic: string,
  dateTime: string,
  customer: string,
  contactCustomer: string,
  nameProduct: string,
  clinic_id: string,
};

export default function DashboardUser(){
  const { dasktopSizeScreen, isChecked } = useContext(ScreenSizeContext);
  const { physicalPersonUser, logOutPhysicalPerson } = useContext(AuthContext);

  const [openNav, setOpenNav] = useState(false);
  const [listDetailServices, setListDetailServices] = useState<ListDetailServiceItem[]>([]);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [serviceSelected, setServiceSelected] = useState<ListDetailServiceItem>();
  const { '@dentalsupport.token': token } = parseCookies();

  useEffect(() => {
    async function getServicesUser(){
      try{
        const response = await api.get('/services');
  
        setListDetailServices(response.data);

        const responseData = await api.get('/me');
        const { avatar } = responseData.data;

        if(avatar !== ''){
          const responseImg = await axios.get(`http://localhost:3333/files/${avatar}`, {
            responseType: 'arraybuffer',
          });

          const imageBase64 = Buffer.from(responseImg.data, 'binary').toString('base64');
          const url = `data:${responseImg.headers['content-type']};base64,${imageBase64}`;

          setAvatarUrl(url);
        }else{
          setAvatarUrl('');
        };

      }catch(err){
        console.log(err);
      };
    };

    if(token){
      getServicesUser();
    };
  }, []);

  async function logout(){
    await logOutPhysicalPerson();
  };

  function handleModal(item: ListDetailServiceItem){
    setOpenModal(true);
    setServiceSelected(item);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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
              src={ avatarUrl ? avatarUrl : avatarDefault }
              alt='Imagem avatar'
              priority
              width={60}
              height={60}
              className='w-12 h-12 object-cover rounded-full'
            />

            <div className={ `text-xs ${isChecked ? 'text-black' : 'text-white'}` } >
              <p>{ physicalPersonUser?.name }</p>
              <button 
                onClick={ logout }
                className='font-bold underline text-red-400 hover:text-red-600 transition-all' 
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
                  <div 
                    key={item?.id} 
                    className='cursor-pointer w-fit'
                    onClick={ () => handleModal(item) }
                  >
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

      {openModal && (
        <ModalServiceUser
          closeModal={ () => setOpenModal(false) }
          detail={ serviceSelected }
          listServices={ listDetailServices }
          setListServices={ setListDetailServices }
        />
      )}

      <Footer/>
    </div>
  );
};

export const getServerSideProps = canSSRAuthPhysicalPerson(async (ctx) => {
  return{
    props:{},
  };
});