import { useState, useEffect } from 'preact/hooks'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'
import Form from './FormularioRd.tsx'
import ProdSlider from './ProdSlider.tsx'
import type { Product } from 'apps/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'

interface Slider{
  title:string
  products:LoaderReturnType<Product[] | null>
  /** @description formato AAAA-MM-DD*/
  finalDaOferta: string
  interval: number
}

export interface Props{
  slider1:Slider
  slider2:Slider
}

const LpB2B=({slider1, slider2}:Props)=>{
  return (
    <>
      <section className='flex justify-end items-center h-max re1:h-[90vh] bg-right re1:bg-center bg-cover bg-[url(https://shopinfo.vteximg.com.br/arquivos/LP-mobile-B2B-bg-1.jpg)] re1:bg-[url(https://shopinfo.vteximg.com.br/arquivos/LP-desktop-B2B-bg-1.jpg)]'>
        <div className='flex flex-col re1:hidden absolute left-[20px] mb-[22rem] text-white items-center'>
          <p className='text-xl font-bold'>CONHEÇA A LINHA<br/>CORPORATIVA DE</p>
          <span>COMPUTADORES</span>
          <Image width={170} height={30} src="https://shopinfo.vteximg.com.br/arquivos/curvas-logo-neologic-gamer-registrado-fundo-transparente-black.png"/>
        </div>
        <div className='px-[10%] re1:px-0 flex flex-col gap-6 items-center re1:mr-10 mt-[42rem] re1:mt-0 mb-4 re1:mb-0'>
          <p className='ml-[20%] re1:ml-0 text-white text-xl text-center font-bold'>Sua empresa equipada<br/>com os melhores produtos<br/>de informática do mercado!</p>
          <Form />
        </div>
      </section>

      <section className='flex justify-end items-center h-max re1:h-[90vh] bg-top re1:bg-center bg-cover bg-[url(https://shopinfo.vteximg.com.br/arquivos/LP-mobile-B2B-bg-2.jpg)] re1:bg-[url(https://shopinfo.vteximg.com.br/arquivos/LP-desktop-B2B-bg-2.jpg)]'>
        <div className='flex flex-col gap-10 items-center justify-around my-4'>
          <ProdSlider title={slider1.title} products={slider1.products} finalDaOferta={slider1.finalDaOferta} interval={slider1.interval}/>
          <ProdSlider title={slider2.title} products={slider2.products} finalDaOferta={slider2.finalDaOferta} interval={slider2.interval}/>
        </div>
      </section>
      

      <section className='text-white text-lg flex flex-col justify-end re1:py-32 items-center h-max bg-center bg-cover bg-[url(https://shopinfo.vteximg.com.br/arquivos/LP-mobile-B2B-bg-3.jpg)] re1:bg-[url(https://shopinfo.vteximg.com.br/arquivos/LP-desktop-B2B-bg-3.jpg)]'>
        <div className='flex flex-col  re1:mt-0 gap-8 re1:gap-20 w-[90%] re1:px-0 re1:w-[35%]'>
          <div className='flex flex-col gap-2 w-full items-center'>
            <h1 className='text-xl re1:text-3xl text-center mb-4'>Quem é<br/><b className='font-bold'>Shopinfo?</b></h1>
            <p className='text-sm re1:text-base'>A Shopinfo nasceu de um desejo imenso de entregar produtos e serviços de qualidade a um preço justo com um ótimo atendimento e é isso o que temos feito desde 1999!</p>
            <p className='text-sm re1:text-base'>Nossa Missão é buscar a excelência na experiência de compra e para isso temos uma equipe de Atendimento ao Cliente e Suporte Técnico sempre pronta para auxiliar da melhor forma, via telefone, whatsapp, e-mail e redes sociais.</p>
            <p className='text-sm re1:text-base'>Nossos Valores são a Ética, Comprometimento e Transparência e para isso, buscamos a construção de parcerias duradouras com nossos clientes, oferecendo soluções completas com produtos de alta qualidade e desempenho, facilidade de compra, entregas rápidas e atendimento de qualidade.</p>
          </div>

          <div className='flex flex-col gap-4 w-full items-center'>
            <h1 className='text-xl re1:text-3xl text-center mb-4'>Refêrencia no<br/><b className='font-bold'>Mercado</b></h1>
            <p className='text-sm re1:text-base flex items-center justify-between gap-2'>
              <span className='w-[70%]'>
                Referência no Mercado Vendendo informatica desde 1999, a SHOPINFO encontra-se no mercado atendendo empresas de pequeno, médio e grande porte das mais variadas áreas de atuação, levando a sério seu compromisso com a qualidade e profissionalismo.
              </span>
              <Icon id='ChevronRight' size={20} strokeWidth={4} className='text-primary'/>
              <Image className='w-[70px] h-[70px] re1:w-[130px] re1:h-[130px]' src='https://shopinfo.vteximg.com.br/arquivos/lp-icone-b2b-1999.png' width={130} height={130}/>
            </p>
            <p className='text-sm re1:text-base flex items-center justify-between gap-2'>
              <Image className='w-[70px] h-[70px] re1:w-[130px] re1:h-[130px]' src='https://shopinfo.vteximg.com.br/arquivos/lp-icone-b2b-iso.png' width={130} height={130}/>
              <Icon id='ChevronLeft' size={20} strokeWidth={4} className='text-primary'/>
              <span className='w-[70%]'>Possuímos selo de qualidade ISO 9001 e seguimos rigorosamente o sistema de Gestão implantado.</span>
            </p>
          </div>
        </div>
        
        <div className='flex w-[80%] items-center justify-around my-8 re1:mt-32 re1:mb-0'>
          <Image className='w-[50px] h-[50px] re1:w-[150px] re1:h-[143px]' src='https://shopinfo.vteximg.com.br/arquivos/lp-icone-b2b-Garantia.png' width={150} height={153}/>
          <Image className='w-[50px] h-[50px] re1:w-[140px] re1:h-[153px]' src='https://shopinfo.vteximg.com.br/arquivos/lp-icone-b2b-Frete-Gr%C3%A1tis.png' width={140} height={153}/>
          <Image className='w-[69px] h-[53px] re1:w-[196px] re1:h-[153px]' src='https://shopinfo.vteximg.com.br/arquivos/lp-icone-b2b--suporte.png' width={196} height={153}/>
          <Image className='w-[61px] h-[54px] re1:w-[175px] re1:h-[153px]' src='https://shopinfo.vteximg.com.br/arquivos/lp-icone-b2b-Pedido-Personalizado.png' width={175} height={153}/>
        </div>
      </section>

      <section className='h-max re1:h-screen bg-cover re1:bg-center re1:bg-[url(https://shopinfo.vteximg.com.br/arquivos/LP-desktop-B2B-bg-4.jpg) bg-[url(https://shopinfo.vteximg.com.br/arquivos/LP-mobile-B2B-bg4.jpg)]'>
        <div className='flex flex-col justify-center gap-4 re1:gap-8 h-[70%] text-neutral'>
          <h1 className='mx-auto text-lg re1:text-2xl text-center'>Compre e<br/><b className='font-bold text-3xl re1:text-4xl'>Confie</b></h1>
          <div className='flex flex-col re1:gap-2 re1:flex-row w-full px-[10px] re1:pr-0 re1:pl-12 re1:w-[70%]'>
            <div className='flex flex-col items-start justify-center w-full re1:w-[50%]'>
              <label className='flex gap-2 justify-center items-center h-fit re1:h-[100px] my-4'>
                <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-b2b-facilidadenacompra.png' className='w-[60px] h-[60px]' width={70} height={70}/>
                <div>
                  <h1 className='text-base re1:text-xl font-bold'>FACILIDADE NA COMPRA</h1>
                  <span className='text-sm re1:text-base'>Basta navegar entre as diversas páginas de produtos (categorias, novidades, ofertas, destaques) e clicar sobre o icone Comprar.</span>
                </div>
              </label>
              <label className='flex gap-2 justify-center items-center h-fit re1:h-[100px] my-4'>
                <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-b2b-autenticidade.png' className='w-[60px] h-[60px]' width={70} height={70}/>
                <div>
                  <h1 className='text-base re1:text-xl font-bold'>AUTENTICIDADE</h1>
                  <span className='text-sm re1:text-base'>Trabalhamos somente com produtos Originais e entregamos todos os nossos produtos com Nota Fiscal.</span>
                </div>
              </label>
              <label className='flex gap-2 justify-center items-center h-fit re1:h-[100px] my-4'>
                <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-b2b-embalagem.png' className='w-[60px] h-[60px]' width={70} height={70}/>
                <div>
                  <h1 className='text-base re1:text-xl font-bold'>EMBALAGEM SEGURA</h1>
                  <span className='text-sm re1:text-base'>Os produtos são muito bem embalados em caixas resistentes. Realizamos entrega em todo o território nacional.</span>
                </div>
              </label>
            </div>
            <div className='flex flex-col items-start justify-center w-full re1:w-[50%]'>
              <label className='flex gap-2 justify-center items-center h-fit re1:h-[100px] my-4'>
                <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-b2b-melhordetudo.png' className='w-[60px] h-[60px]' width={70} height={70}/>
                <div>
                  <h1 className='text-base re1:text-xl font-bold'>O MELHOR DE TUDO</h1>
                  <span className='text-sm re1:text-base'>Os PCs Neologic são cuidadosamente selecionados com os melhores componentes do mercado e oferecemos, inúmeras opções de configuração desde o Básico até o Premium.</span>
                </div>
              </label>
              <label className='flex gap-2 justify-center items-center h-fit re1:h-[100px] my-4'>
                <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-b2b-trabalho.png' className='w-[60px] h-[60px]' width={70} height={70}/>
                <div>
                  <h1 className='text-base re1:text-xl font-bold'>DESIGN INDUSTRIAL E ALTA PERFORMANCE</h1>
                  <span className='text-sm re1:text-base'>Design discreto, desempenho máximo. Nossas workstations já vem montados #WorkReady.</span>
                </div>
              </label>
              <label className='flex gap-2 justify-center items-center h-fit re1:h-[100px] my-4'>
                <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-b2b-seguran%C3%A7a.png' className='w-[60px] h-[60px]' width={70} height={70}/>
                <div>
                  <h1 className='text-base re1:text-xl font-bold'>SEGURANÇA E CONFIABILIDADE</h1>
                  <span className='text-sm re1:text-base'>Temos o compromisso com a Privacidade e a segurança dos, clientes, por isso o nosso site conta com Certificado de Navegação Segura.</span>
                </div>
              </label>
            </div>
          </div>
          <Image className='absolute right-0 mt-8 hidden re1:block' src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-b2b-gabinetepc.png' width={424} height={544}/>
        </div>

        <div className='hidden re1:flex flex-row gap-12 justify-center items-center h-[20%]'>
          <Image src='https://shopinfo.vteximg.com.br/arquivos/lp-icone-b2b-nota-relclame-aqui-8,0.png' width={86} height={100} />
          <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-reclame-aqui.png' width={650} height={254} />
          <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-notagoogle.png' width={91} height={100} />
        </div>

        <div className='flex re1:hidden flex-col w-full'>
          <Image className='absolute left-[-55px] mt-4' src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-b2b-gabinetepc.png' width={204} height={261}/>
          <Image className='relative z-[1] mx-auto' src='https://shopinfo.vteximg.com.br/arquivos/lp-icone-b2b-nota-relclame-aqui-8,0.png' width={86} height={100} />
          <Image className='relative z-[1] ml-auto mr-4' src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-notagoogle.png' width={91} height={100} />
          <Image className='relative z-[1] mx-auto' src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-reclame-aqui.png' width={243} height={100} />
        </div>
      </section>
    </>
  )
}

export default LpB2B