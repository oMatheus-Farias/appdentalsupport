import { useState, useEffect, useContext } from 'react';
import { ScreenSizeContext } from '@/context/screenSizeContext';
import Head from 'next/head';
import Link from 'next/link';

import { FaTooth, FaBuilding, FaPhoneAlt, FaCalendarAlt } from 'react-icons/fa';
import { MdEmail, MdLockPerson, MdLocationOn } from 'react-icons/md';

import { InstructionMessageContent } from '@/components/instructionMessageContent';

export default function RegisterClinic(){
  const { dasktopSizeScreen } = useContext(ScreenSizeContext);

  const [selectedPage, setSelectedPage] = useState<boolean | null>(null);

  useEffect(() => {
    setSelectedPage(true);

    return () => {
      setSelectedPage(false);
    };
  }, []);

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
          <div className='bg-primaryColor w-full rounded px-4 py-10 max-w-[26.8em] lg:min-h-[40.62em] lg:min-w-[28.12em] lg:rounded-r' >
            <div className='flex justify-between items-center' >
              <Link 
                href='/register' 
                className='text-sm font-bold text-white px-3 py-2 min-w-[9em] text-center' 
                style={{ backgroundColor: selectedPage ? '#828282' : '#00466D' }}
                >
                Pessoa Física
              </Link>
              <FaTooth size={20} color='#FFF' />
              <Link 
                href='/registerclinic' 
                className='text-sm font-bold text-white px-3 py-2 max-w-[9em]' 
                style={{ backgroundColor: selectedPage ? '#00466D' : '#828282' }}
                >
                Pessoa Jurídica
              </Link>
            </div>

            <div className='w-full mt-6 flex flex-col items-center' >
              <h1 className='text-center text-white font-bold text-2xl' >Faça o cadastro</h1>

              <form className='w-full mt-7 flex flex-col gap-4'>
                <div className='bg-white rounded p-2 flex items-center gap-2' >
                  <FaBuilding size={18} color='#00466D' />
                  <input
                    className='w-full bg-transparent outline-none'
                    type='text'
                    name='name'
                    placeholder='Nome da clínica'
                  />
                </div>
                <div className='bg-white rounded p-2 flex items-center gap-2' >
                  <MdLocationOn size={22} color='#00466D' />
                  <input
                    className='w-full bg-transparent outline-none'
                    type='text'
                    name='address'
                    placeholder='Endereço da clínica'
                  />
                </div>
                <div className='bg-white rounded p-2 flex items-center gap-2' >
                  <FaPhoneAlt size={18} color='#00466D' />
                  <input
                    className='w-full bg-transparent outline-none'
                    type='text'
                    name='contact'
                    placeholder='Contato'
                  />
                </div>
                <div className='bg-white rounded p-2 flex items-center gap-2' >
                  <FaCalendarAlt size={18} color='#00466D' />
                  <input
                    className='w-full bg-transparent outline-none'
                    type='text'
                    name='operation'
                    placeholder='Funcionamento'
                  />
                </div>
                <div className='bg-white rounded p-2 flex items-center gap-2' >
                  <MdEmail size={22} color='#00466D' />
                  <input
                    className='w-full bg-transparent outline-none'
                    type='email'
                    name='email'
                    placeholder='Email'
                  />
                </div>
                <div className='bg-white rounded p-2 flex items-center gap-2' >
                  <MdLockPerson size={22} color='#00466D' />
                  <input
                    className='w-full bg-transparent outline-none'
                    type='password'
                    name='password'
                    placeholder='******'
                  />
                </div>

                <button className='h-10 bg-darkPrimaryColor text-lg text-white font-semibold mt-4' >
                  Cadastrar
                </button>
              </form>

              <Link 
                href='/loginclinic' 
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