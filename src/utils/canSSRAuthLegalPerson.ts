import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { AuthTokenError } from '@/services/errors/AuthTokenError';

export function canSSRAuthLegalPerson<P extends { [key: string]: any }>(fn: GetServerSideProps<P>){
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    const token = cookies['@dentalsupportclinic.token'];

    if(!token){
      return{
        redirect:{
          destination: '/loginclinic',
          permanent: false,
        },
      };
    };

    try{
      return await fn(ctx);
    }catch(err){
      if(err instanceof AuthTokenError){
        destroyCookie(ctx, '@dentalsupportclinic.token', { path: '/' });
      };

      return{
        redirect:{
          destination: '/loginclinic',
          permanent: false,
        },
      };
    };
  };
};