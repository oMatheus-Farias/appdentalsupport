import { closeIcon } from '@/icons';
import { ListDetailServiceItem } from '@/pages/dashboarduser';

interface ModalServiceUserProps{
  closeModal: () => void;
  detail: ListDetailServiceItem | undefined,
};

export function ModalServiceUser({ closeModal, detail }: ModalServiceUserProps){
  return(
    <div className="absolute top-0 left-0 w-full min-h-screen flex justify-center items-center bg-transparentBlackColor z-10" >
      <section className="w-[90%] max-w-[40em] bg-white p-4 rounded" >
        <div className='w-full flex justify-between' >
          <h2 className='text-xl font-bold text-darkPrimaryColor' >{ detail?.nameClinic }</h2>
          <button
            onClick={ closeModal }
          >
            {closeIcon}
          </button>
        </div>

        <div className='w-full flex flex-col gap-3 mt-5' >
          <div>
            <h3 className='font-medium text-darkPrimaryColor' >Endereço</h3>
            <p className='font-medium text-sm text-gray-700' >{ detail?.address }</p>
          </div>

          <div>
            <h3 className='font-medium text-darkPrimaryColor' >Contato</h3>
            <p className='font-medium text-sm text-gray-700' >{ detail?.contactClinic }</p>
          </div>

          <div>
            <h3 className='font-medium text-darkPrimaryColor' >Data</h3>
            <p className='font-medium text-sm text-gray-700' >{ detail?.dateTime }</p>
          </div>

          <div>
            <h3 className='font-medium text-darkPrimaryColor' >Serviço</h3>
            <p className='font-medium text-sm text-gray-700' >{ detail?.nameProduct }</p>
          </div>

          <button 
            className='w-full max-w-[14.3em] rounded bg-gray-700 h-9 text-white font-semibold mt-5' 
          >
            Cancelar Consulta
          </button>
        </div>
      </section>
    </div>
  );
};