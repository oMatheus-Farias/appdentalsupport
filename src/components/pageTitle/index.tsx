import { ReactNode, ChangeEvent, useContext } from 'react';
import { ScreenSizeContext } from '@/contexts/screenSizeContext';

import { sunIcon, moonIcon } from '@/icons';

interface PageTitleProps{
  icon: (color: string) => ReactNode,
  title: string,
};

export function PageTitle({ icon, title }: PageTitleProps){
  const { isChecked, setIsChecked } = useContext(ScreenSizeContext);

  function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>){
    const state = event.target.checked;

    state === true ? setIsChecked(true) : setIsChecked(false);
  };

  return(
    <section className='flex items-center justify-between' >
      <div className='flex items-center gap-3' >
        { icon(isChecked ? '#001B2A' : '#FFF') }

        <h1 className='font-bold text-darkSecondaryColor sm:text-2xl dark:text-white' >
          { title }
        </h1>
      </div>

      <label className='cursor-pointer' >
        <div>
          <input
            type='checkbox'
            onChange={ handleCheckboxChange }
            checked={ isChecked }
            className='hidden'
          />
          <div className={ `w-24 h-8 rounded-3xl flex items-center relative ${isChecked ? 'bg-primaryColor' : 'bg-darkPrimaryColor'}` } >
            <button 
              className='w-8 h-8 bg-white rounded-full pointer-events-none transition-all z-10 flex justify-center items-center' 
              style={{ transform: isChecked ? 'translateX(64px)' : 'translateX(-1px)' }}
            >
              { isChecked ? sunIcon : moonIcon }
            </button>
            <p 
              className={ `text-sm font-bold absolute ${isChecked ? 'left-3 text-darkSecondaryColor' : 'right-3 text-white'}` } 
            >
              { isChecked ? 'Claro' : 'Escuro' }
            </p>
          </div>
        </div>
      </label>
    </section>
  );
};