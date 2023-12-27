import { useState, useEffect } from 'preact/hooks'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'

const LpB2B=()=>{
  return (
    <>
      <section className='flex justify-end items-center h-[90vh] bg-center bg-cover bg-[url(https://shopinfo.vteximg.com.br/arquivos/LP-mobile-B2B-bg-1.jpg)] re1:bg-[url(https://shopinfo.vteximg.com.br/arquivos/LP-desktop-B2B-bg-1.jpg)]'>
        <div className='flex flex-col gap-2 items-center'>
          <p className='text-white text-xl text-center font-bold'>Sua empresa equipada<br/>com os melhores produtos<br/>de informática do mercado!</p>
        </div>
      </section>

      <section className='text-white text-lg flex flex-col justify-end py-32 items-center h-max bg-center bg-cover bg-[url(https://shopinfo.vteximg.com.br/arquivos/LP-mobile-B2B-bg-3.jpg)] re1:bg-[url(https://shopinfo.vteximg.com.br/arquivos/LP-desktop-B2B-bg-3.jpg)]'>
        <div className='flex flex-col gap-20 w-[35%]'>
          <div className='flex flex-col gap-2 w-full items-center'>
            <h1 className='text-3xl text-center mb-4'>Quem é<br/><b className='font-bold'>Shopinfo?</b></h1>
            <p>A Shopinfo nasceu de um desejo imenso de entregar produtos e serviços de qualidade a um preço justo com um ótimo atendimento e é isso o que temos feito desde 1999!</p>
            <p>Nossa Missão é buscar a excelência na experiência de compra e para isso temos uma equipe de Atendimento ao Cliente e Suporte Técnico sempre pronta para auxiliar da melhor forma, via telefone, whatsapp, e-mail e redes sociais.</p>
            <p>Nossos Valores são a Ética, Comprometimento e Transparência e para isso, buscamos a construção de parcerias duradouras com nossos clientes, oferecendo soluções completas com produtos de alta qualidade e desempenho, facilidade de compra, entregas rápidas e atendimento de qualidade.</p>
          </div>

          <div className='flex flex-col gap-4 w-full items-center'>
            <h1 className='text-3xl text-center mb-4'>Refêrencia no<br/><b className='font-bold'>Mercado</b></h1>
            <p className='flex items-center justify-between gap-2'>
              <span className='w-[70%]'>
                Referência no Mercado Vendendo informatica desde 1999, a SHOPINFO encontra-se no mercado atendendo empresas de pequeno, médio e grande porte das mais variadas áreas de atuação, levando a sério seu compromisso com a qualidade e profissionalismo.
              </span>
              <Icon id='ChevronRight' size={20} strokeWidth={4} className='text-primary'/>
              <Image src='https://shopinfo.vteximg.com.br/arquivos/lp-icone-b2b-1999.png' width={130} height={130}/>
            </p>
            <p className='flex items-center justify-between gap-2'>
              <Image src='https://shopinfo.vteximg.com.br/arquivos/lp-icone-b2b-iso.png' width={130} height={130}/>
              <Icon id='ChevronLeft' size={20} strokeWidth={4} className='text-primary'/>
              <span className='w-[70%]'>
                Possuímos selo de qualidade ISO 9001 e seguimos rigorosamente o sistema de Gestão implantado.
              </span>
            </p>
          </div>
        </div>
        
        <div className='flex w-[80%] items-center justify-around mt-32'>
          <Image src='https://shopinfo.vteximg.com.br/arquivos/lp-icone-b2b-Garantia.png' width={150} height={153}/>
          <Image src='https://shopinfo.vteximg.com.br/arquivos/lp-icone-b2b-Frete-Gr%C3%A1tis.png' width={140} height={153}/>
          <Image src='https://shopinfo.vteximg.com.br/arquivos/lp-icone-b2b--suporte.png' width={196} height={153}/>
          <Image src='https://shopinfo.vteximg.com.br/arquivos/lp-icone-b2b-Pedido-Personalizado.png' width={175} height={153}/>
        </div>
      </section>
      <section className='h-[90vh] bg-center bg-cover bg-[url(https://shopinfo.vteximg.com.br/arquivos/icone-lp-b2b-gabinetepc.png)]'>
        <div className='flex flex-col'>
          <h1>Compre e<br/><b className='font-bold text-3xl'>Confie</b></h1>
        </div>
      </section>
    </>
  )
}

export default LpB2B