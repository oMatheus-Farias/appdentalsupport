import { useContext, useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { ScreenSizeContext } from '@/contexts/screenSizeContext';
import { AuthContext } from '@/contexts/authContext';
import avatarDefault from '../../../public/images/avatar-default.png';

import Head from 'next/head';
import Image from 'next/image';
import { NavigationMenu } from '@/components/navigationMenu';
import { HeaderMobile } from '@/components/headerMobile';
import { PageTitle } from '@/components/pageTitle';
import { NavigationMobile } from '@/components/navigationMobile';
import { Footer } from '@/components/footer';

import { settingsIcon, uploadIcon } from '@/icons';

import { canSSRAuthPhysicalPerson } from '@/utils/canSSRAuthPhysicalPerson';
import { api } from '@/services/apiClient';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Profile(){
  const { isChecked, dasktopSizeScreen } = useContext(ScreenSizeContext);
  const { logOutPhysicalPerson } = useContext(AuthContext);

  const [openNav, setOpenNav] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvatar] = useState<File | null>(null);

  useEffect(() => {
    async function getDetailUser(){
      try{
        const response = await api.get('/me');
        const { name, email, contact, avatar } = response.data;

        setName(name);
        setEmail(email);
        setContact(contact);

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

  function handleFile(event: ChangeEvent<HTMLInputElement>){
    const file = event.target.files;

    if(!file){
      return;
    };

    const image = file[0];

    if(!image){
      return;
    };

    if(image.type === 'image/png' || image.type === 'image/jpeg'){
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(image));
    };
  };

  async function handleUpdateAvatar(){
    try{
      const data = new FormData();

      if(imageAvatar === null){
        toast.error('Insira uma imagem válida!');
        return;
      };

      data.append('file', imageAvatar);

      await api.put('/avatar', data);

      toast.success('Atualizada com sucesso!');

    }catch(err){
      console.log(err);
      toast.error('Erro ao tentar atualizar foto de perfil.');
    };
  };

  return(
    <div className={ `${isChecked ? '' : 'dark'}` } >
      <Head>
        <title>DentalSupport - Perfil</title>
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
                <label className='min-w-[11.2em] min-h-[11.2em] rounded-full flex items-center justify-center cursor-pointer bg-slate-500' >
                  <span className='z-10 absolute' >{ uploadIcon }</span>

                  <input
                    type='file'
                    onChange={ handleFile }
                    className='hidden'
                  />

                  <Image
                    src={ avatarUrl ? avatarUrl : avatarDefault }
                    alt='Avatar'
                    priority
                    width={180}
                    height={180}
                    className='w-[11.2em] h-[11.2em] rounded-full object-cover'
                  />
                </label>

                <button 
                  onClick={ handleUpdateAvatar }
                  className='bg-gray-700 rounded h-9 px-7 font-semibold text-white hover:bg-black transition-all' 
                >
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
                    className='w-full rounded bg-darkPrimaryColor h-9 text-white font-semibold text-lg mt-5 hover:bg-green-500 transition-all' 
                  >
                    Salvar
                  </button>
              </form>
              
              <div className='max-w-[25em] w-full' >
                <button 
                  onClick={ logOut }
                  className='w-full rounded bg-gray-700 h-9 text-white font-semibold text-lg mt-5 hover:bg-red-500 transition-all' 
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

export const getServerSideProps = canSSRAuthPhysicalPerson(async (ctx) => {
  return{
    props:{},
  };
});