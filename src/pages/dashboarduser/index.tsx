import { useContext } from 'react';
import { ScreenSizeContext } from '@/contexts/screenSizeContext';

import Head from 'next/head';
import { HeaderMobile } from '@/components/headerMobile';

import { canSSRAuthPhysicalPerson } from '@/utils/canSSRAuthPhysicalPerson';

export default function DashboardUser(){
  const { dasktopSizeScreen } = useContext(ScreenSizeContext);

  return(
    <>
      <Head>
        <title>DentalSupport - Minhas Consultas</title>
      </Head>
      <div>
        <HeaderMobile/>

        <h1>Página DashboardUser</h1>
      </div>
    </>
  );
};

export const getServerSideProps = canSSRAuthPhysicalPerson(async (ctx) => {
  return{
    props:{},
  };
});