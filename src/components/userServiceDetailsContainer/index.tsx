import Image from 'next/image';
import bannerDefault from '../../../public/images/banner-default.png';

export function UserServiceDetailsContainer(){
  return(
    <section className='max-w-[37.5em] p-2 rounded bg-boxColor lg:p-4' >
      <Image
        src={ bannerDefault }
        alt='Banner DentalSupport'
        className='object-cover'
      />

      <section className='w-full mt-4 flex flex-col gap-3' >
        <div>
          <h2 className='text-darkPrimaryColor font-bold' >Clínica</h2>
          <p className='text-gray-500 font-medium' >
            Odonto Mais
          </p>
        </div>
        <div>
          <h2 className='text-darkPrimaryColor font-bold' >Endereço</h2>
          <p className='text-gray-600 font-medium' >
            Rua São Gonçalo, 200 - SP
          </p>
        </div>
        <div>
          <h2 className='text-darkPrimaryColor font-bold' >Contato</h2>
          <p className='text-gray-600 font-medium' >
            11 96754-2333
          </p>
        </div>
        <div>
          <h2 className='text-darkPrimaryColor font-bold' >Data</h2>
          <p className='text-gray-600 font-medium' >
            29/02/2024 às 13:00
          </p>
        </div>
        <div>
          <h2 className='text-darkPrimaryColor font-bold' >Serviço</h2>
          <p className='text-gray-600 font-medium' >
            Limpeza
          </p>
        </div>
      </section>
    </section>
  );
};