import Image from 'next/image';
import logoBackground from '../../../public/images/logo-background.png';

export function InstructionMessageContent(){
  return(
    <div className='bg-white min-h-[40.62em] max-w-[28.12] rounded' >
      <Image
        className='mt-7'
        src={ logoBackground }
        alt='Logo Dental Support'
      />

      <div className='mt-24 w-full px-4' >
        <h2 className='text-2xl font-bold text-primaryColor' >Bem vindo!</h2>

        <div className='text-sm text-gray-500 flex flex-col gap-4' >
          <p className='mt-4 font-bold' >
            Para começar, escolha a opção que melhor se adequa a você:
          </p>
          <p>
            Se você é um profissional de saúde bucal, proprietário de um consultório ou clínica, clique em <b>"Acesso como Pessoa Jurídica"</b> para gerenciar as informações do seu estabelecimento e oferecer serviços excepcionais aos seus pacientes.
          </p>
          <p>
            Se está em busca de cuidados odontológicos de qualidade, clique em <b>"Acesso como Pessoa Física"</b> para encontrar os melhores profissionais e agendar suas consultas de forma rápida e prática.
          </p>
        </div>
      </div>
    </div>
  );
};