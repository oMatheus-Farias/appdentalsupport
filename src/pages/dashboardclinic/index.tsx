import Head from 'next/head';

import { canSSRAuthLegalPerson } from '@/utils/canSSRAuthLegalPerson';

export default function DashboardClinic(){
  return(
    <>
      <Head>
        <title>DentalSupport - Minha Agenda</title>
      </Head>
      <div>
        <h1>Página Dashboard Clinic</h1>
      </div>
    </>
  );
};

export const getServerSideProps = canSSRAuthLegalPerson(async (ctx) => {
  return{
    props:{},
  };
});