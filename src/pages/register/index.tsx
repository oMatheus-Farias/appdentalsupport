import Head from 'next/head';
import Link from 'next/link';

import { FaTooth, FaUser, FaPhoneAlt } from 'react-icons/fa';
import { MdEmail, MdLockPerson } from 'react-icons/md';

export default function Register(){
  return(
    <>
      <Head>
        <title>DentalSupport - Cadastre-se</title>
      </Head>
      <div className='bg-bgImage bg-cover bg-center w-full min-h-screen flex items-center justify-center' >
        <section className='w-[90%] max-w-[960px] flex flex-col items-center' >
          <div className='bg-primaryColor w-full rounded px-4 py-10 max-w-[430px]' >
            <div className='flex justify-between items-center' >
              <Link href='/register' className='text-sm font-bold text-white px-3 py-2 min-w-[124px] bg-darkPrimaryColor text-center' >
                Pessoa Física
              </Link>
              <FaTooth size={20} color='#FFF' />
              <Link href='/registerclinic' className='text-sm font-bold text-white px-3 py-2 max-w-[124px] bg-gray-500' >
                Pessoa Jurídica
              </Link>
            </div>

            <div className='w-full mt-6 flex flex-col items-center' >
              <h1 className='text-center text-white font-bold text-2xl' >Faça o cadastro</h1>

              <form className='w-full mt-7 flex flex-col gap-4'>
                <div className='bg-white rounded p-2 flex items-center gap-2' >
                  <FaUser size={18} color='#00466D' />
                  <input
                    className='w-full bg-transparent outline-none'
                    type='text'
                    name='name'
                    placeholder='Nome'
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