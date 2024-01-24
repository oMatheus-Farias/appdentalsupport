import Image from 'next/image';
import bannerDefault from '../../../public/images/banner-default.png';

interface UserServiceDetailsContainerProps{
  nameClinic: string,
  address: string,
  contactClinic: string,
  dateTime: string,
  nameProduct: string,
};

export function UserServiceDetailsContainer({ nameClinic, address, contactClinic, dateTime, nameProduct }: UserServiceDetailsContainerProps){
  
  return(
    <section className='max-w-[37.5em] p-2 rounded bg-boxColor lg:p-4' >
      <Image
        src={ bannerDefault }
        alt='Banner DentalSupport'
        priority
        className='object-cover'
      />

      <section className='w-full mt-4 flex flex-col gap-3' >
        <div>
          <h2 className='text-darkPrimaryColor font-bold' >Clínica</h2>
          <p className='text-gray-500 font-medium' >
            { nameClinic }
          </p>
        </div>
        <div>
          <h2 className='text-darkPrimaryColor font-bold' >Endereço</h2>
          <p className='text-gray-600 font-medium' >
            { address }
          </p>
        </div>
        <div>
          <h2 className='text-darkPrimaryColor font-bold' >Contato</h2>
          <p className='text-gray-600 font-medium' >
            { contactClinic }
          </p>
        </div>
        <div>
          <h2 className='text-darkPrimaryColor font-bold' >Data</h2>
          <p className='text-gray-600 font-medium' >
            { dateTime }
          </p>
        </div>
        <div>
          <h2 className='text-darkPrimaryColor font-bold' >Serviço</h2>
          <p className='text-gray-600 font-medium' >
            { nameProduct }
          </p>
        </div>
      </section>
    </section>
  );
};