import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies } from 'nookies';

export function canSSRGuest<P extends { [key: string]: any } >(fn: GetServerSideProps<P>){
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    if(cookies['@dentalsupport.token']){
      return{
        redirect:{
          destination: '/dashboarduser',
          permanent: false,
        },
      };
    };

    if(cookies['@dentalsupportclinic.token']){
      return{
        redirect:{
          destination: '/dashboardclinic',
          permanent: false,
        },
      };
    };

    return await fn(ctx);
  }; 
};