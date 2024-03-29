import logo from '../../../public/images/main-logo.png';
import Image from 'next/image';
import Link from 'next/link';

import { closeMenuIcon, calendarIconMenu, newQueryIconMenu, settingsIconMenu } from '@/icons';

import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';

interface NavigationMobileProps{
  handleCloseNav: () => void,
  openNav: boolean,
  linkNameOne: string,
  linkNameTwo: string,
  linkNameTre: string,
};

export function NavigationMobile({ handleCloseNav, openNav, linkNameOne, linkNameTwo, linkNameTre }: NavigationMobileProps){
  const { legalPersonUser } = useContext(AuthContext);

  return(
    <div 
      className="w-full h-screen absolute top-0 left-0 transition-all z-10 bg-transparentBlackColor" 
      style={{ transform: openNav ? 'translateX(0)' : 'translateX(-100%)' }}
    >
      <section className="w-[80%] h-full p-4 bg-primaryColor dark:bg-darkSecondaryColor" >
        <div className='flex items-center justify-between w-full' >
          <Image
            src={ logo }
            alt='Logo DentalSupport'
            priority
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
              href={legalPersonUser ? '/dashboardclinic' : '/dashboarduser' }
              className='flex items-center gap-2'
            >
              { calendarIconMenu }
              { linkNameOne }
            </Link>
          </li>
          {!legalPersonUser && (
            <li>
            <Link 
              href='/newquery' 
              className='flex items-center gap-2'
            >
              { newQueryIconMenu }
              { linkNameTwo }
            </Link>
          </li>
          )}
          <li>
            <Link
              href={legalPersonUser ? '/profileclinic' : '/profile'}
              className='flex items-center gap-2'
            >
              { settingsIconMenu }
              { linkNameTre }
            </Link>
          </li>
        </ul>
      </nav>
      </section>
    </div>
  );
};