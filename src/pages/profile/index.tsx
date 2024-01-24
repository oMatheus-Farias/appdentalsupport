import { useContext, useState, useEffect, FormEvent } from 'react';
import { ScreenSizeContext } from '@/contexts/screenSizeContext';
import { AuthContext } from '@/contexts/authContext';
import avatarDefault from '../../../public/images/avatar-default.png';

import Head from 'next/head';
import Image from 'next/image';
import { NavigationMenu } from '@/components/navigationMenu';
import { HeaderMobile } from '@/components/headerMobile';
import { PageTitle } from '@/components/pageTitle';
import { NavigationMobile } from '@/components/navigationMobile';

import { settingsIcon } from '@/icons';
import { api } from '@/services/apiClient';
import toast from 'react-hot-toast';

interface PhysicalPersonProps{
  id: string,
  name: string,
  email: string,
  contact: string,
  avatar: string,
};

export default function Profile(){
  const { isChecked, dasktopSizeScreen } = useContext(ScreenSizeContext);
  const { logOutPhysicalPerson } = useContext(AuthContext);

  const [openNav, setOpenNav] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');

  useEffect(() => {
    async function getDetailUser(){
      try{
        const response = await api.get('/me');
        const { name, email, contact } = response.data;

        setName(name);
        setEmail(email);
        setContact(contact);
      }catch(err){
        console.log(err);
      };
    };

    getDetailUser();
  }, []);

  async function handleUpdate(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    if(!name || !contact){
      toast.error('Dados inválidos!');
      return;
    };

    try{
      const response = await api.put('/user', {
        name,
        contact,
      });

      const { name: newName, contact: newContact } = response.data;

      setName(newName);
      setContact(newContact);
      toast.success('Alterado com sucesso!');

    }catch(err){
      console.log(err);
      toast.error('Erro ao tentar alterar.');
    };
  };

  async function logOut(){
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
          <PageTitle icon={ settingsIcon } title='Perfil' />

          <main className='mt-10 flex flex-col gap-4' >
            <div className='max-w-[37.5em] p-2 rounded bg-boxColor lg:p-4' >
              <div className='max-w-[25em] w-full flex flex-col gap-4 items-center' >
                <Image
                  src={ avatarDefault }
                  alt='Avatar'
                  priority
                />

                <button className='bg-gray-700 rounded h-9 px-7 font-semibold text-white' >
                  Alterar Foto
                </button>
              </div>

              <form 
                onSubmit={ handleUpdate }
                className='max-w-[25em] w-full flex flex-col gap-4 mt-7' 
              >
                <label className='flex flex-col' >
                    <span 
                      className='text-lg text-darkPrimaryColor font-semibold' >
                      Nome
                    </span>
                    <input
                      type='text'
                      name='name'
                      value={ name }
                      onChange={ (event) => setName(event.target.value) }
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
                      name='email'
                      value={ email }
                      onChange={ (event) => setEmail(event.target.value) }
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
                      value={ contact }
                      onChange={ (event) => setContact(event.target.value) }
                      className='px-3 rounded bg-white h-9'
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
    </div>
  );
};