import logo from '../../../public/images/main-logo.png';
import Image from 'next/image';
import Link from 'next/link';

import { calendarIconMenu, newQueryIconMenu, settingsIconMenu } from '@/icons';

export function NavigationMenu(){
  return(
    <div className='max-w-44 min-h-screen h-full flex flex-col p-4 bg-primaryColor' >
      <Image
        src={ logo }
        alt='Logo DentalSupport'
      />

      <nav className='mt-14' >
        <ul className='text-white font-medium flex flex-col gap-7' >
          <li>
            <Link 
              href='/dashboarduser' 
              className='flex items-center gap-2'
            >
              { calendarIconMenu }
              Consultas
            </Link>
          </li>
          <li>
            <Link 
              href='/newquery' 
              className='flex items-center gap-2'
            >
              { newQueryIconMenu }
              Nova Consulta
            </Link>
          </li>
          <li>
            <Link
              href='/settings'
              className='flex items-center gap-2'
            >
              { settingsIconMenu }
              Perfil
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};