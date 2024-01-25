import logo from '../../../public/images/main-logo.png';
import Image from 'next/image';
import Link from 'next/link';

import { calendarIconMenu, newQueryIconMenu, settingsIconMenu } from '@/icons';

import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';

interface NavigationMenuProps{
  linkNameOne: string,
  linkNameTwo: string,
  linkNameTre: string,
};

export function NavigationMenu({ linkNameOne, linkNameTwo, linkNameTre }: NavigationMenuProps){
  const { legalPersonUser } = useContext(AuthContext);

  return(
    <div className='max-w-44 w-full min-h-screen flex flex-col p-4 bg-primaryColor dark:bg-darkPrimaryColor' >
      <Image
        src={ logo }
        alt='Logo DentalSupport'
      />

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
    </div>
  );
};