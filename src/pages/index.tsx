import { useState, useEffect, useContext } from 'react';
import { ScreenSizeContext } from '@/context/screenSizeContext';

import Head from 'next/head';
import Link from 'next/link';

import { InstructionMessageContent } from '@/components/instructionMessageContent';
import { Input } from '@/components/input';

import { FaTooth } from 'react-icons/fa';
import { emailIcon, passwordIcon } from '@/icons';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; 

const schema = z.object({
  email: z.string().email('Digite um email válido'),
  password: z.string().min(6, 'A senha deve ter no minímo 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

export default function Home(){
  const { dasktopSizeScreen } = useContext(ScreenSizeContext);

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
    alert('Formulário enviado!!');
  };

  return (
    <>
      <Head>
        <title>DentalSupport - Faça login</title>
      </Head>
      <div className='bg-bgImage bg-cover bg-center w-full min-h-screen flex items-center justify-center' >
        <section className='w-[90%] max-w-[56.2em] flex flex-col items-center lg:flex-row lg:items-start lg:bg-primaryColor lg:rounded' >
          {dasktopSizeScreen && (
            <InstructionMessageContent/>
          )}
          <div className='bg-primaryColor w-full rounded px-4 py-10 max-w-[26.8em] lg:min-h-[40.62em] lg:min-w-[28.12em] lg:rounded-r' >
            <div className='flex justify-between items-center' >
              <Link 
                href='/' 
                className='text-sm font-bold text-white px-3 py-2 min-w-[9em] text-center' 
                style={{ backgroundColor: selectedPage ? '#00466D' : '#828282' }}
                >
                Pessoa Física
              </Link>
              <FaTooth size={20} color='#FFF' />
              <Link 
                href='/loginclinic' 
                className='text-sm font-bold text-white px-3 py-2 max-w-[9em]' 
                style={{ backgroundColor: selectedPage ? '#828282' : '#00466D' }}
                >
                Pessoa Jurídica
              </Link>
            </div>

            <div className='w-full mt-6 flex flex-col items-center' >
              <h1 className='text-center text-white font-bold text-2xl lg:mt-20' >Faça login</h1>

              <form 
                className='w-full mt-7 flex flex-col gap-4'
                onSubmit={handleSubmit(onSubmit)}
              >
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
                  className='h-10 bg-darkPrimaryColor text-lg text-white font-semibold mt-4' 
                  type='submit'
                >
                  Entrar
                </button>
              </form>

              <Link 
                href='/register' 
                className='text-sm mt-5 underline'  
              >
                Não possui uma conta? Cadastre-se
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};