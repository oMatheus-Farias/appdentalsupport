import { useState, useEffect, useContext } from 'react';
import { ScreenSizeContext } from '@/contexts/screenSizeContext';
import { AuthContext } from '@/contexts/authContext';

import Head from 'next/head';
import Link from 'next/link';

import { FaTooth } from 'react-icons/fa';
import { nameIcon, contactIcon, emailIcon, passwordIcon } from '@/icons';

import { InstructionMessageContent } from '@/components/instructionMessageContent';
import { Input } from '@/components/input';

import { canSSRGuest } from '@/utils/canSSRGuest';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(4, 'O nome deve ter no minímo 4 caracteres'),
  contact: z.string().min(11, 'O contato deve ter 11 caracteres').max(11, 'O contato deve ter 11 caracteres'),
  email: z.string().email('Digite um email válido'),
  password: z.string().min(6, 'A senha eve ter no minímo 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

export default function Register(){
  const { dasktopSizeScreen } = useContext(ScreenSizeContext);
  const { sigUpPhysicalPerson } = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    setSelectedPage(true);
    
    return () => {
      setSelectedPage(false);
    };
  }, []);
  
  const [selectedPage, setSelectedPage] = useState<boolean>(false);

  async function onSubmit(data: FormData){
    await sigUpPhysicalPerson({
      name: data.name,
      contact: data.contact,
      email: data.email,
      password: data.password,
    });
  };

  return(
    <>
      <Head>
        <title>DentalSupport - Cadastre-se</title>
      </Head>
      <div className='bg-bgImage bg-cover bg-center w-full min-h-screen flex items-center justify-center' >
        <section className='w-[90%] max-w-[56.2em] flex flex-col items-center lg:flex-row lg:items-start lg:bg-primaryColor lg:rounded' >
          {dasktopSizeScreen && (
            <InstructionMessageContent/>
          )}
          <div className='bg-primaryColor w-full rounded px-4 py-10 max-w-[26.8em] lg:min-h-[40.62em] lg:min-w-[28.12em] lg:rounded-r lg:max-h-[40.5em]' >
            <div className='flex justify-between items-center' >
              <Link 
                href='/register' 
                className='text-sm font-bold text-white px-3 py-2 min-w-[9em] text-center' 
                style={{ backgroundColor: selectedPage ? '#00466D' : '#828282' }}
                >
                Pessoa Física
              </Link>
              <FaTooth size={20} color='#FFF' />
              <Link 
                href='/registerclinic' 
                className='text-sm font-bold text-white px-3 py-2 max-w-[9em]' 
                style={{ backgroundColor: selectedPage ? '#828282' : '#00466D' }}
                >
                Pessoa Jurídica
              </Link>
            </div>

            <div className='w-full mt-6 flex flex-col items-center' >
              <h1 className='text-center text-white font-bold text-2xl lg:mt-12' >Faça o cadastro</h1>

              <form 
                className='w-full mt-7 flex flex-col gap-4'
                onSubmit={ handleSubmit(onSubmit) }
              >
                <Input
                  type='text'
                  name='name'
                  placeholder='Nome'
                  register={ register }
                  error={ errors.name?.message }
                  icon={ nameIcon }
                />
                <Input
                  type='text'
                  name='contact'
                  placeholder='Contato 119xxxxxxxx'
                  register={ register }
                  error={ errors.contact?.message }
                  icon={ contactIcon }
                />
                <Input
                  type='email'
                  name='email'
                  placeholder='Email'
                  register={ register }
                  error={ errors.email?.message }
                  icon={ emailIcon }
                />
                <Input
                  type='password'
                  name='password'
                  placeholder='******'
                  register={ register }
                  error={ errors.password?.message }
                  icon={ passwordIcon }
                />

                <button 
                  className='h-10 bg-darkPrimaryColor text-lg text-white font-semibold mt-4 hover:bg-darkSecondaryColor transition-all' 
                  type='submit'
                >
                  Cadastrar
                </button>
              </form>

              <Link 
                href='/' 
                className='text-sm mt-5 underline'  
              >
                Já possui uma conta? Faça Login
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return{
    props:{},
  };
});