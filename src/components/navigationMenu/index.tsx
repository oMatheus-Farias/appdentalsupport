import logo from '../../../public/images/main-logo.png';
import Image from 'next/image';
import Link from 'next/link';

import { calendarIconMenu, newQueryIconMenu, settingsIconMenu } from '@/icons';

interface NavigationMenuProps{
  linkNameOne: string,
  linkNameTwo: string,
  linkNameTre: string,
};

export function NavigationMenu({ linkNameOne, linkNameTwo, linkNameTre }: NavigationMenuProps){
  return(
    <div className='max-w-44 w-full min-h-screen h-full flex flex-col p-4 bg-primaryColor' >
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
              { linkNameOne }
            </Link>
          </li>
          <li>
            <Link 
              href='/newquery' 
              className='flex items-center gap-2'
            >
              { newQueryIconMenu }
              { linkNameTwo }
            </Link>
          </li>
          <li>
            <Link
              href='/settings'
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