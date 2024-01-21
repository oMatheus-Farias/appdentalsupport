import logo from '../../../public/images/main-logo.png';
import Image from 'next/image';
import Link from 'next/link';

import { closeMenuIcon, calendarIconMenu, newQueryIconMenu, settingsIconMenu } from '@/icons';

interface NavigationMobileProps{
  handleCloseNav: () => void,
  openNav: boolean
};

export function NavigationMobile({ handleCloseNav, openNav }: NavigationMobileProps){
  return(
    <div 
      className="w-full h-screen absolute top-0 left-0 transition-all bg-transparentBlackColor" 
      style={{ transform: openNav ? 'translateX(0)' : 'translateX(-100%)' }}
    >
      <section className="w-[80%] h-full p-4 bg-primaryColor" >
        <div className='flex items-center justify-between w-full' >
          <Image
            src={ logo }
            alt='Logo DentalSupport'
          />

          <button
            onClick={ handleCloseNav }
          >
            {closeMenuIcon}
          </button>
        </div>

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
      </section>
    </div>
  );
};