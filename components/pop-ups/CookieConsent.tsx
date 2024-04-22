import { forwardRef } from 'preact/compat'

const CookieConsent=forwardRef<HTMLButtonElement>((__, ref)=>{
  return(
    <div className='bg-white text-[#111] flex flex-col re1:flex-row gap-4 items-center justify-center w-screen text-xs p-3'>
      <p className='text-center'>
        <b className='font-bold'>Cookies:</b> Nós utilizamos cookies para personalizar anúncios e melhoras a sua experiência na Shopinfo. Ao continuar, você concorda com a nossa <b className='font-bold underline'>política de privacidade.</b>
      </p>
      <button ref={ref} className='bg-success text-white uppercase font-bold rounded-md p-1 cursor-pointer'>Concordar e Fechar</button>
    </div>
  )
})

export default CookieConsent