interface  ClinicServiceDetailProps{
  customer: string,
  nameProduct: string,
  dateTime: string,
};

export function ClinicServiceDetail({ customer, nameProduct, dateTime }: ClinicServiceDetailProps){
  return(
    <section 
      className='max-w-[37.5em] p-2 rounded flex justify-between bg-boxColor text-xs text-darkPrimaryColor font-medium sm:text-base lg:p-4' 
    >
      <p>{ customer }</p>
      <p>{ nameProduct }</p>
      <p>{ dateTime }</p>
    </section>
  );
};