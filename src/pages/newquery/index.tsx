import { useContext, useState, FormEvent, useEffect } from 'react';
import { ScreenSizeContext } from '@/contexts/screenSizeContext';

import Head from 'next/head';
import { NavigationMenu } from '@/components/navigationMenu';
import { HeaderMobile } from '@/components/headerMobile';
import { PageTitle } from '@/components/pageTitle';
import { NavigationMobile } from '@/components/navigationMobile';

import { newQueryIcon } from '@/icons';

import { api } from '@/services/apiClient';

interface ListClinicsItem{
  id: string,
  name: string,
  address: string,
  contact: string,
  operation: string,
  banner: string,
};

export default function NewQuery(){
  const { isChecked, dasktopSizeScreen } = useContext(ScreenSizeContext);

  useEffect(() => {
    async function getListAvailableClinics(){
      try{
        const response = await api.get('/clinics');

        setListClinics(response.data);

      }catch(err){
        console.log(err);
      };
    };

    getListAvailableClinics();
  }, []);

  const [openNav, setOpenNav] = useState(false);

  const [listClinics, setListClinics] = useState<ListClinicsItem[] | []>([]);
  const [clinicSelected, setClinicSelected] = useState<ListClinicsItem | undefined>(listClinics[0]);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  function handleChangeSelect(id: string){
    const clinicItem = listClinics.find(item => item?.id === id);

    setClinicSelected(clinicItem);
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
  };

  return(
    <div className={ `${isChecked ? '' : 'dark'}` } >
      <Head>
        <title>DentalSupport - Minhas Consultas</title>
      </Head>
      <div className='lg:flex bg-secondaryColor dark:bg-darkSecondaryColor min-h-screen' >
        {dasktopSizeScreen ? 
          <NavigationMenu linkNameOne='Consultas' linkNameTwo='Nova Consulta' linkNameTre='Perfil' /> 
          : 
          <HeaderMobile handleOpenNav={ () => setOpenNav(true) } />
        }

        <div className='p-5 w-full' >
          <PageTitle icon={ newQueryIcon } title='Nova Consulta' />

          <main className='mt-10 flex flex-col gap-4' >
            <div className='max-w-[37.5em] p-2 rounded bg-boxColor lg:p-4' >
              <form 
                onSubmit={ handleSubmit }
                className='max-w-[25em] w-full flex flex-col gap-4' 
              >
                <label className='flex flex-col' >
                  <span className='text-lg text-darkPrimaryColor font-bold' >Clínica</span>
                  <select 
                    onChange={ (event) => handleChangeSelect(event.target.value) }
                    className='px-2 rounded h-9' >
                    {listClinics.map(item => {
                      return(
                        <option
                          key={ item?.id }
                          value={ item?.id }
                        >
                          { item?.name }
                        </option>
                      )
                    })}
                  </select>
                </label>

                <label className='flex flex-col' >
                  <span className='text-lg text-darkPrimaryColor font-bold' >Endereço</span>
                  <input
                    type='text'
                    name='addressClinic'
                    value='Rua São Gonçalo, 200'
                    onChange={ () => {} }
                    disabled
                    className='px-3 rounded bg-white cursor-not-allowed text-gray-500 h-9'
                  />
                </label>

                <label className='flex flex-col' >
                  <span className='text-lg text-darkPrimaryColor font-bold' >Funcionamento</span>
                  <input
                    type='text'
                    name='operation'
                    value='Seg - Sex dàs 09:00 às 18:00'
                    onChange={ () => {} }
                    disabled
                    className='px-3 rounded bg-white cursor-not-allowed text-gray-500 h-9'
                  />
                </label>

                <label className='flex flex-col' >
                  <span className='text-lg text-darkPrimaryColor font-bold' >Contato da Clínica</span>
                  <input
                    type='text'
                    name='contactClinic'
                    value='11 961372180'
                    onChange={ () => {} }
                    disabled
                    className='px-3 rounded bg-white cursor-not-allowed text-gray-500 h-9'
                  />
                </label>

                <label className='flex flex-col' >
                  <span 
                    className='text-lg text-darkPrimaryColor font-bold' >
                    Data e Horário<span className='text-red-500' >*</span>
                  </span>
                  <input
                    type='text'
                    name='date'
                    placeholder='Ex: 01/01/2024 - 10:00'
                    value={ date }
                    onChange={ (event) => setDate(event.target.value) }
                    className='px-3 rounded bg-white h-9'
                  />
                </label>

                <label className='flex flex-col' >
                  <span 
                    className='text-lg text-darkPrimaryColor font-bold' >
                    Seu Nome<span className='text-red-500' >*</span>
                  </span>
                  <input
                    type='text'
                    name='name'
                    placeholder='Como deseja ser chamado'
                    value={ name }
                    onChange={ (event) => setName(event.target.value) }
                    className='px-3 rounded bg-white h-9'
                  />
                </label>

                <label className='flex flex-col' >
                  <span 
                    className='text-lg text-darkPrimaryColor font-bold' >
                    Seu Contato<span className='text-red-500' >*</span>
                  </span>
                  <input
                    type='text'
                    name='contact'
                    placeholder='Ex: 11 912345678'
                    value={ contact }
                    onChange={ (event) => setContact(event.target.value) }
                    className='px-3 rounded bg-white h-9'
                  />
                </label>

                <label className='flex flex-col' >
                  <span className='text-lg text-darkPrimaryColor font-bold' >Serviços disponíveis</span>
                  <select className='px-2 rounded h-9' >
                    <option>Limpeza</option>
                  </select>
                </label>

                <button 
                  type='submit'
                  className='w-full rounded bg-darkPrimaryColor h-9 text-white font-semibold text-lg mt-5' 
                >
                  Marcar Consulta
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>

      {!dasktopSizeScreen && (
        <NavigationMobile 
          handleCloseNav={ () => setOpenNav(false) } 
          openNav={ openNav } 
          linkNameOne='Consultas'
          linkNameTwo='Nova Consulta'
          linkNameTre='Perfil'
        />
      )}
    </div>
  );
};