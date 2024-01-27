import Image from 'next/image';
import { arrImages } from '../../../public/images/arrImages';

interface UserServiceDetailsContainerProps{
  nameClinic: string,
  address: string,
  contactClinic: string,
  dateTime: string,
  nameProduct: string,
};

function randomNumber(){
  const random = Math.floor(Math.random() * 5);

  return random;
};

export function UserServiceDetailsContainer({ nameClinic, address, contactClinic, dateTime, nameProduct }: UserServiceDetailsContainerProps){
  

  return(
    <section className='max-w-[37.5em] p-2 rounded bg-boxColor lg:p-4 hover:bg-gray-300 transition-all' >
      <Image
        src={ arrImages[randomNumber()] }
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