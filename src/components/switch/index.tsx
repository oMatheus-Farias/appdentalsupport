import { useState, useEffect, ChangeEvent } from 'react';
import { apiClinic } from '@/services/apiClientClinic';
import { parseCookies } from 'nookies';

type SwitchProps = {
  setStatus: (status: boolean) => void;
};

export function Switch({ setStatus }: SwitchProps){
  const { '@dentalsupportclinic.token': token } = parseCookies();
  const [isChecked, setIsChecked] = useState<boolean>();

  useEffect(() => {
    async function getDetailClinic(){
      try{
        const response = await apiClinic.get('/me/clinic');

        const { status } = response.data;

        setIsChecked(status);

      }catch(err){
        console.log(err);
      };
    };

    if(token){
      getDetailClinic();
    };
  }, []);

  function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>){
    const state = event.target.checked;
    state === true ? setIsChecked(true) : setIsChecked(false);
    state === true ? setStatus(true) : setStatus(false);
  };

  return(
    <label>
      <div>
        <input
          type="checkbox"
          className="hidden"
          checked={ isChecked }
          onChange={ handleCheckboxChange }
        />

        <div className={ `w-10 h-5 rounded-3xl flex items-center relative cursor-pointer bg-darkSecondaryColor` } >
          <button 
            className='w-5 h-5 bg-gray-500 rounded-full transition-all absolute' 
            style={{ transform: isChecked ? 'translateX(20px)' : 'translateX(-1px)' }}
          >
          </button>
        </div>
      </div>
    </label>
  );
};