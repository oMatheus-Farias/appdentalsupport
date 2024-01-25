import { useContext, useState } from 'react';
import { ScreenSizeContext } from '@/contexts/screenSizeContext';
import { AuthContext } from '@/contexts/authContext';
import { canSSRAuthLegalPerson } from '@/utils/canSSRAuthLegalPerson';

import Head from 'next/head';
import { NavigationMenu } from '@/components/navigationMenu';
import { NavigationMobile } from '@/components/navigationMobile';
import { HeaderMobile } from '@/components/headerMobile';
import { PageTitle } from '@/components/pageTitle';
import { Footer } from '@/components/footer';

import { settingsIcon } from '@/icons';

export default function ProfileClinic(){
  const { isChecked, dasktopSizeScreen } = useContext(ScreenSizeContext);
  const { logOutLegalPerson } = useContext(AuthContext);

  const [openNav, setOpenNav] = useState(false);

  async function logOut(){
    await logOutLegalPerson();
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
          <PageTitle icon={ settingsIcon } title='Perfil' />

          <main className='mt-10 flex flex-col gap-4' >
            <div className='max-w-[37.5em] p-2 rounded bg-boxColor lg:p-4' >

              <form 
                // onSubmit={ handleUpdate }
                className='max-w-[25em] w-full flex flex-col gap-4 mt-7' 
              >
                <label className='flex flex-col' >
                    <span 
                      className='text-lg text-darkPrimaryColor font-semibold' >
                      Nome da Clínica
                    </span>
                    <input
                      type='text'
                      name='nameClinic'
                      // value={ name }
                      // onChange={ (event) => setName(event.target.value) }
                      className='px-3 rounded bg-white h-9'
                    />
                  </label>
                  <label className='flex flex-col' >
                    <span 
                      className='text-lg text-darkPrimaryColor font-semibold' >
                      Endereço
                    </span>
                    <input
                      type='text'
                      name='address'
                      // value={ email }
                      // onChange={ (event) => setEmail(event.target.value) }
                      disabled
                      className='px-3 rounded bg-white h-9 cursor-not-allowed'
                    />
                  </label>
                  <label className='flex flex-col' >
                    <span 
                      className='text-lg text-darkPrimaryColor font-semibold' >
                      Contato
                    </span>
                    <input
                      type='text'
                      name='contact'
                      // value={ contact }
                      // onChange={ (event) => setContact(event.target.value) }
                      className='px-3 rounded bg-white h-9'
                    />
                  </label>
                  <label className='flex flex-col' >
                    <span 
                      className='text-lg text-darkPrimaryColor font-semibold' >
                      Funcionamento
                    </span>
                    <input
                      type='text'
                      name='operation'
                      // value={ contact }
                      // onChange={ (event) => setContact(event.target.value) }
                      className='px-3 rounded bg-white h-9'
                    />
                  </label>
                  <label className='flex flex-col' >
                    <span 
                      className='text-lg text-darkPrimaryColor font-semibold' >
                      Email
                    </span>
                    <input
                      type='text'
                      name='operation'
                      disabled
                      // value={ contact }
                      // onChange={ (event) => setContact(event.target.value) }
                      className='px-3 rounded bg-white h-9 cursor-not-allowed'
                    />
                  </label>

                  <button 
                    type='submit'
                    className='w-full rounded bg-darkPrimaryColor h-9 text-white font-semibold text-lg mt-5' 
                  >
                    Salvar
                  </button>
              </form>
              
              <div className='max-w-[25em] w-full' >
                <button 
                  type='submit'
                  onClick={ logOut }
                  className='w-full rounded bg-gray-700 h-9 text-white font-semibold text-lg mt-5' 
                >
                  Sair da conta
                </button>
              </div>
            </div>
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

      <Footer/>
    </div>
  );
};

export const getServerSideProps = canSSRAuthLegalPerson(async (ctx) => {
  return{
    props:{},
  };
});