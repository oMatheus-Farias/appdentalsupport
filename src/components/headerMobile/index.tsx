import { menuIcon } from '@/icons';
import logo from '../../../public/images/main-logo.png';

import Image from 'next/image';

export function HeaderMobile(){
  return(
    <header className='h-16 px-4 py-5 flex items-center gap-7 bg-primaryColor' >
      <button>
        { menuIcon }
      </button>

      <Image
        src={ logo }
        alt='Logo DentalSupport'
      />
    </header>
  );
};