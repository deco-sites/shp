import IframeForm from './IframeForm.tsx'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'

const Afiliados=()=>{
  return(
    <>
      <section className='relative'>
        <Image width={1920} height={652} src='https://shopinfo.vteximg.com.br/arquivos/banner-topo-afiliados-fundo.jpg' />
        <div className='absolute top-0 w-full max-w-[1232px] text-secondary'>
          <div className='flex flex-col items-center'>
            <Image width={188} height={55} src='https://shopinfo.vteximg.com.br/arquivos/logoshopinfo-branco-188px.png' />
            <div className='flex flex-col gap-2'>
              <span className='text-2xl'>Como <b className='font-bold'>Ganhar Dinheiro</b> com a Shopinfo?</span>
              <span className='text-lg'>Conheça nosso programa de afiliados, recomende nossos produtos e seja comissionado por todas as vendas que realizar!</span>
            </div>
          </div>
          <Image width={744} height={545} src='https://shopinfo.vteximg.com.br/arquivos/banner-topo-lp-afiliados-2pessoas.png' />
        </div>
        <div className='bg-secondary py-[25px] flex flex-col mx-auto items-center'>
          <span className='text-[#fe4600] font-bold text-xl re1:text-2xl'>Comece por aqui</span>
          <button className='p-[15px] bg-[#871a05] border-[2px] border-[#bf5641] w-[300px] rounded-xl text-secondary '>
            Quero Ganhar dinheiro
          </button>
        </div>
      </section>
      <section id='FORM'>
        <IframeForm />
      </section>
    </>
  )
}

export default Afiliados