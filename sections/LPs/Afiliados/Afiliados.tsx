import IframeForm from './IframeForm.tsx'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import Slider from 'deco-sites/fashion/components/ui/Slider.tsx'
import SliderJS from 'deco-sites/fashion/components/ui/SliderJS.tsx'
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'

const Afiliados=()=>{
  return(
    <>
      <section className='relative flex flex-col items-center'>
        <Image width={1920} height={652} src='https://shopinfo.vteximg.com.br/arquivos/banner-topo-afiliados-fundo.jpg' className='h-[652px]'/>
        <div className='flex flex-col re1:flex-row justify-center items-center absolute top-0 w-full max-w-[1232px] text-secondary'>
          <div className='flex flex-col items-center px-4 re1:px-0'>
            <Image className='re1:hidden mr-auto' width={188} height={55} src='https://shopinfo.vteximg.com.br/arquivos/logoshopinfo-branco-188px.png'/>
            <div className='flex flex-col gap-2'>
              <h1 className='text-2xl re1:text-4xl'>Como <b className='font-bold'>Ganhar Dinheiro</b> com a Shopinfo?</h1>
              <h2 className='text-lg re1:text-2xl'>Conheça nosso programa de afiliados, recomende nossos produtos e seja comissionado por todas as vendas que realizar!</h2>
            </div>
          </div>
          <Image width={744} height={545} src='https://shopinfo.vteximg.com.br/arquivos/banner-topo-lp-afiliados-2pessoas.png' />
        </div>
        <div className='bg-secondary py-[25px] flex flex-col re1:flex-row w-full items-center re1:justify-center re1:gap-3'>
          <span className='text-[#fe4600] font-bold text-xl re1:text-3xl'>Comece por aqui</span>
          <button className='p-[15px] bg-[#871a05] border-[2px] border-[#bf5641] w-[300px] rounded-xl text-secondary text-xl'>
            Quero Ganhar dinheiro
          </button>
        </div>
      </section>
      <section className='bg-[#fe4600] re1:bg-[url(https://shopinfo.vteximg.com.br/arquivos/banner-lp-afiliados-como-funciona.jpg?v=2)] re1:bg-cover re1:h-[552px] flex items-center justify-center'>
        <div className='text-white text-center mb-4 re1:mb-0'>
          <p className='text-2xl re1:text-5xl font-bold mx-auto w-fit my-4 re1:mb-12'>Como Funciona?</p>
          <div className='flex re1:flex-row flex-col justify-around items-center mx-auto w-[80%] gap-4 re1:gap-0'>
            <div className='w-[80%] re1:w-[20%] text-center'>
              <Image className='mx-auto' src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-afiliado.png' height={100} width={100}/>
              <span className='text-xl re1:text-3xl font-bold my-4'>Afiliado</span>
              <p className='text-lg re1:text-2xl'>Divulga os produtos do site em suas redes sociais ou sites</p>
            </div>
            <div className='w-[80%] re1:w-[20%] text-center'>
              <Image className='mx-auto' src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-afiliados-compradores.png' height={100} width={100}/>
              <span className='text-xl re1:text-3xl font-bold my-4'>Compradores</span>
              <p className='text-lg re1:text-2xl'>Compram no site Shopinfo com o <b className='font-bold'>link do afiliado</b></p>
            </div>
            <div className='w-[80%] re1:w-[20%] text-center'>
              <Image className='mx-auto' src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-afiliados-ganhos.png' height={100} width={100}/>
              <span className='text-xl re1:text-3xl font-bold my-4'>Ganhos</span>
              <p className='text-lg re1:text-2xl'>Ganhos podem ultrapassar <b className='font-bold'>R$ 4.000</b> por mês em comissões</p>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-secondary py-4'>
        <div
          id='sliderIFrames'
          className='flex flex-col w-full max-w-[700px] mb-[25px] mx-auto items-center'
        >
          <div className='flex re1:grid re1:grid-cols-[20px_1fr_20px] w-[90%] re1:w-[700px]'>
            <div className='hidden re1:flex justify-center items-center prev'>
              <Slider.PrevButton class='relative right-[20px] btn min-w-[20px] min-h-[20px] rounded-full disabled:grayscale bg-[#fe4600] hover:bg-[#fe4600] border-none hover:border-none'>
                <Icon
                  class='text-secondary'
                  size={15}
                  id='ChevronLeft'
                  strokeWidth={5}
                />
              </Slider.PrevButton>
            </div>

            <Slider className='slick-comentários carousel carousel-center gap-6 scrollbar-none'>
              <Slider.Item index={0} className='carousel-item'>
                <div className='flex flex-col items-center gap-4'>
                  <span className='text-[#fe4600] font-bold text-xl re1:text-3xl'>Como Funciona?</span>
                  <iframe className='w-[330px] re1:w-[600px]' width="600" height="336" src="https://www.youtube.com/embed/II4wRQoT2m0" title="Divulgação programa de Afiliados Shopinfo (Italo)" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                </div>
              </Slider.Item>

              <Slider.Item index={1} className='carousel-item'>
                <div className='flex flex-col items-center gap-4'>
                  <span className='text-[#fe4600] font-bold text-xl re1:text-3xl'>O que estão achando?</span>
                  <iframe className='w-[330px] re1:w-[600px]' width="600" height="336" src="https://www.youtube.com/embed/hLMVlSw_QIA" title="Vídeo Institucional - Afiliados [Shopinfo]" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                </div>
              </Slider.Item>
            </Slider>

            <div class='hidden re1:flex items-center justify-center next'>
              <Slider.NextButton class='relative left-[20px] btn min-w-[20px] min-h-[20px] rounded-full disabled:grayscale bg-[#fe4600] hover:bg-[#fe4600] border-none hover:border-none'>
                <Icon
                  class='text-secondary'
                  size={15}
                  id='ChevronRight'
                  strokeWidth={5}
                />
              </Slider.NextButton>
            </div>
          </div>

          <ul className='carousel justify-center gap-4 z-[5] mt-6'>
            <Slider.Dot index={0}>
              <div className='bg-[#2d2d2d] group-disabled:bg-[#fe4600] rounded-full h-[12px] w-[12px]' />
            </Slider.Dot>
            
            <Slider.Dot index={1}>
              <div className='bg-[#2d2d2d] group-disabled:bg-[#fe4600] rounded-full h-[12px] w-[12px]' />
            </Slider.Dot>
          </ul>

          <SliderJS rootId='sliderIFrames' scroll='smooth' />
        </div>
      </section>
      <section className='py-8 flex flex-col re1:flex-row items-center justify-center gap-4 bg-gradient-to-r from-[#ffa200] to-[#fe0000] w-full text-white'>
        <span className='text-2xl re1:text-4xl font-bold'>Eu quero me cadastrar</span>
        <a href='#FORM' className='px-4 py-2 h-10 rounded-lg bg-success'>Comece aqui</a>
      </section>
      <section className='py-8 text-white bg-gradient-to-b from-[rgb(255,159,0)] to-[rgb(255,68,0)]'>
        <div className='flex flex-col mx-auto re1:mt-0 gap-8 re1:gap-20 w-[90%] re1:px-0 re1:w-[35%]'>
          <div className='flex flex-col gap-2 w-full items-center'>
            <h3 className='text-xl re1:text-3xl text-center mb-4'>Quem é<br/><b className='font-bold'>Shopinfo?</b></h3>
            <p className='text-sm re1:text-base'>A Shopinfo nasceu de um desejo imenso de entregar produtos e serviços de qualidade a um preço justo com um ótimo atendimento e é isso o que temos feito desde 1999!</p>
            <p className='text-sm re1:text-base'>Nossa Missão é buscar a excelência na experiência de compra e para isso temos uma equipe de Atendimento ao Cliente e Suporte Técnico sempre pronta para auxiliar da melhor forma, via telefone, whatsapp, e-mail e redes sociais.</p>
            <p className='text-sm re1:text-base'>Nossos Valores são a Ética, Comprometimento e Transparência e para isso, buscamos a construção de parcerias duradouras com nossos clientes, oferecendo soluções completas com produtos de alta qualidade e desempenho, facilidade de compra, entregas rápidas e atendimento de qualidade.</p>
          </div>

          <div className='flex flex-col gap-4 w-full items-center'>
            <h3 className='text-xl re1:text-3xl text-center mb-4'>Refêrencia no<br/><b className='font-bold'>Mercado</b></h3>
            <p className='text-sm re1:text-base flex items-center justify-between gap-2'>
              <span className='w-[70%]'>
                Referência no Mercado Vendendo informatica desde 1999, a SHOPINFO encontra-se no mercado atendendo empresas de pequeno, médio e grande porte das mais variadas áreas de atuação, levando a sério seu compromisso com a qualidade e profissionalismo.
              </span>
              <Icon id='ChevronRight' size={20} strokeWidth={4} className='text-primary'/>
              <Image className='w-[70px] h-[70px] re1:w-[130px] re1:h-[130px]' src='https://shopinfo.vteximg.com.br/arquivos/landing-page-confiabilidade-1999.png' width={130} height={130}/>
            </p>
            <p className='text-sm re1:text-base flex items-center justify-between gap-2'>
              <Image className='w-[70px] h-[70px] re1:w-[130px] re1:h-[130px]' src='https://shopinfo.vteximg.com.br/arquivos/icon-iso.png' width={130} height={130}/>
              <Icon id='ChevronLeft' size={20} strokeWidth={4} className='text-primary'/>
              <span className='w-[70%]'>Possuímos selo de qualidade ISO 9001 e seguimos rigorosamente o sistema de Gestão implantado.</span>
            </p>
          </div>
        </div>
      </section>
      <section className='bg-white flex flex-col items-center justify-around text-black'>
        <p className='text-lg re1:text-2xl text-center'>Compre e <br/><b className='ont-bold text-3xl re1:text-4xl'>Confie</b></p>
        <div className='flex flex-col re1:justify-between re1:flex-row px-[10px] re1:px-0 w-full re1:w-[70%]'>
            <div className='flex flex-col items-start justify-center w-full re1:w-[30%]'>
              <label className='flex gap-2 justify-center items-center h-fit re1:h-[33%] my-4'>
                <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-b2b-facilidadenacompra.png' className='w-[60px] h-[60px]' width={70} height={70}/>
                <div>
                  <h3 className='text-base re1:text-xl font-bold'>FACILIDADE NA COMPRA</h3>
                  <span className='text-sm re1:text-base'>Basta navegar entre as diversas páginas de produtos (categorias, novidades, ofertas, destaques) e clicar sobre o icone Comprar.</span>
                </div>
              </label>
              <label className='flex gap-2 justify-center items-center h-fit re1:h-[33%] my-4'>
                <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-b2b-autenticidade.png' className='w-[60px] h-[60px]' width={70} height={70}/>
                <div>
                  <h3 className='text-base re1:text-xl font-bold'>AUTENTICIDADE</h3>
                  <span className='text-sm re1:text-base'>Trabalhamos somente com produtos Originais e entregamos todos os nossos produtos com Nota Fiscal.</span>
                </div>
              </label>
              <label className='flex gap-2 justify-center items-center h-fit re1:h-[33%] my-4'>
                <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-b2b-embalagem.png' className='w-[60px] h-[60px]' width={70} height={70}/>
                <div>
                  <h3 className='text-base re1:text-xl font-bold'>EMBALAGEM SEGURA</h3>
                  <span className='text-sm re1:text-base'>Os produtos são muito bem embalados em caixas resistentes. Realizamos entrega em todo o território nacional.</span>
                </div>
              </label>
            </div>
            <div className='flex flex-col items-start justify-center w-full re1:w-[30%]'>
              <label className='flex gap-2 justify-center items-center h-fit re1:h-[33%] my-4'>
                <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-b2b-melhordetudo.png' className='w-[60px] h-[60px]' width={70} height={70}/>
                <div>
                  <h3 className='text-base re1:text-xl font-bold'>O MELHOR DE TUDO</h3>
                  <span className='text-sm re1:text-base'>Os PCs Neologic são cuidadosamente selecionados com os melhores componentes do mercado e oferecemos, inúmeras opções de configuração desde o Básico até o Premium.</span>
                </div>
              </label>
              <label className='flex gap-2 justify-center items-center h-fit re1:h-[33%] my-4'>
                <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-b2b-trabalho.png' className='w-[60px] h-[60px]' width={70} height={70}/>
                <div>
                  <h3 className='text-base re1:text-xl font-bold'>DESIGN INDUSTRIAL E ALTA PERFORMANCE</h3>
                  <span className='text-sm re1:text-base'>Design discreto, desempenho máximo. Nossas workstations já vem montados #WorkReady.</span>
                </div>
              </label>
              <label className='flex gap-2 justify-center items-center h-fit re1:h-[33%] my-4'>
                <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-b2b-seguran%C3%A7a.png' className='w-[60px] h-[60px]' width={70} height={70}/>
                <div>
                  <h3 className='text-base re1:text-xl font-bold'>SEGURANÇA E CONFIABILIDADE</h3>
                  <span className='text-sm re1:text-base'>Temos o compromisso com a Privacidade e a segurança dos, clientes, por isso o nosso site conta com Certificado de Navegação Segura.</span>
                </div>
              </label>
            </div>
          </div>
          <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-afiliados-gabinetepc.png' width={400} height={400} className='re1:absolute mr-10 re1:mr-[20px] re1:mb-32'/>
          <div className='w-[300px] mt-8'>
            <div className='flex justify-between items-center'>
              <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-afiliados-notara.png' width={119} height={130} />
              <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-afiliados-notagoogle.png' width={123} height={130} />
            </div>
            <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-lp-reclame-aqui.png' width={300} height={100} />
          </div>
      </section>
      <section id='FORM'>
        <IframeForm />
      </section>
    </>
  )
}

export default Afiliados