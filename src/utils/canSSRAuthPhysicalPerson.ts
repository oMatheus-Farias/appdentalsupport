import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { AuthTokenError } from '@/services/errors/AuthTokenError';

export function canSSRAuthPhysicalPerson<P extends { [key: string]: any }>(fn: GetServerSideProps<P>){
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    const token = cookies['@dentalsupport.token'];

    if(!token){
      return{
        redirect:{
          destination: '/',
          permanent: false,
        },
      };
    };

    try{
      return await fn(ctx);
    }catch(err){
      if(err instanceof AuthTokenError){
        destroyCookie(ctx, '@dentalsupport.token', { path: '/' });
      };

      return{
        redirect:{
          destination: '/',
          permanent: false,
        },
      };
    };
  };
};