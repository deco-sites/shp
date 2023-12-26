import { useState, useEffect } from 'preact/hooks'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'

const LpB2B=()=>{
  return (
    <>
      <section className='flex justify-end items-center h-[90vh] bg-center bg-cover bg-[url(https://shopinfo.vteximg.com.br/arquivos/LP-mobile-B2B-bg-1.jpg)] re1:bg-[url(https://shopinfo.vteximg.com.br/arquivos/LP-desktop-B2B-bg-1.jpg)]'>
        <div className='flex flex-col gap-2 items-center'>
          <p className='text-white text-xl text-center font-bold'>Sua empresa equipada<br/>com os melhores produtos<br/>de informática do mercado!</p>
        </div>
      </section>
      <section className='flex flex-col justify-end items-center h-[90vh] bg-[url(https://shopinfo.vteximg.com.br/arquivos/LP-mobile-B2B-bg-3.jpg)] re1:bg-[url(https://shopinfo.vteximg.com.br/arquivos/LP-desktop-B2B-bg-3.jpg)]'>
        <div className='flex flex-col gap-2'>
          
        </div>
        <div className='flex justify-between items-center'>
          <Image src='https://shopinfo.vteximg.com.br/arquivos/lp-icone-b2b-Garantia.png' width={145} height={153}/>
          <Image src='https://shopinfo.vteximg.com.br/arquivos/lp-icone-b2b-Garantia.png' width={145} height={153}/>
          <Image src='https://shopinfo.vteximg.com.br/arquivos/lp-icone-b2b-Garantia.png' width={145} height={153}/>
          <Image src='https://shopinfo.vteximg.com.br/arquivos/lp-icone-b2b-Garantia.png' width={145} height={153}/>
        </div>
      </section>
      {/* <section className='h-[90vh] bg-center bg-[url(https://shopinfo.vteximg.com.br/arquivos/LP-mobile-B2B-bg-1.jpg)] re1:bg-[url(https://shopinfo.vteximg.com.br/arquivos/LP-desktop-B2B-bg-1.jpg)]'>
        <div className='flex flex-col gap-2'>
          <p>Sua empresa equipada<br/>com os melhores produtos<br/>de informática do mercado!</p>
        </div>
      </section> */}
    </>
  )
}

export default LpB2B