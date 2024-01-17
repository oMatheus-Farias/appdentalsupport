import { ReactNode } from 'react';
import { UseFormRegister, RegisterOptions } from 'react-hook-form';

interface InputProps{
  type: string,
  name: string,
  placeholder: string,
  register: UseFormRegister<any>,
  error?: string,
  rules?: RegisterOptions,
  icon: ReactNode,
};

export function Input({ type, name, placeholder, register, error, rules, icon }: InputProps){
  return(
    <>
      <div className='bg-white rounded p-2 flex items-center gap-2' >
        { icon }
        <input
          className='w-full bg-transparent outline-none'
          type={ type }
          placeholder={ placeholder }
          { ...register(name, rules) }
          id={ name }
        />
      </div>
      {error && <p className="p-0 text-red-500 mr-auto mt-[-1em] text-sm" >{ error }</p>}
    </>
  );
};