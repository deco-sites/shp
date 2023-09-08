import Image from 'deco-sites/std/components/Image.tsx'
import Atendimento from 'deco-sites/shp/components/footer/Atendimento.tsx'
import ListSomething from 'deco-sites/shp/components/footer/ListSomething.tsx'
import SignNewsletter from 'deco-sites/shp/sections/Footer/SignNewsletter.tsx';

export interface AtendimentoProps {
  /**@description check caso queira que o texto do componente seja um link */
  Anchor: boolean
  /**@description link do texto caso tenha checkado Anchor */
  link?: string
  iconUrl: string
  text: string
  title: string
}

export interface Props {
  atendimento: AtendimentoProps[]

  Institucional: Array<{
    link: string
    text: string
  }>

  AjudaESuporte: Array<{
    link: string
    text: string
  }>

  PaginaDoCliente: Array<{
    link: string
    text: string
  }>

  FormasPagamento:Array<{
    imgUrl:string,
    width:number,
    height:number
  }>
}

const Footer = ({ atendimento = [], Institucional=[], AjudaESuporte=[], PaginaDoCliente=[], FormasPagamento=[] }: Props) => {
  return (
    <>
      <SignNewsletter />
      <footer className='bg-[#111] px-[10%] overflow-x-hidden'>
        <div className='hidden re1:flex divider w-screen h-0 before:bg-[#dd1f26] after:bg-[#dd1f26] -ml-[12.5%]'/>
        <div className='flex flex-col re1:flex-row re1:gap-4 re1:pt-4'>
          <div className='text-white re1:text-sm my-5 re1:my-0'>
            <h1 className='text-xl font-bold'>Atendimento</h1>
            <p>Segunda a sexta das 9h às 17h30</p>
            <p>Sábado das 8h às 13h</p>
          </div>
          {/* section infos */}
          <div className='flex flex-col gap-3 re1:flex-row re1:gap-10 re1:justify-between re1:w-auto re1:items-center re1:mx-auto'>
            {atendimento.map((element: AtendimentoProps) => (
              <Atendimento
                link={element.link}
                iconUrl={element.iconUrl}
                text={element.text}
                title={element.title}
                Anchor={element.Anchor}
              />
            ))}
          </div>
        </div>
        <div className='hidden re1:flex divider w-screen -ml-[12.5%] before:bg-[#3d3d3d] after:bg-[#3d3d3d]'/>
        <div className='flex flex-col mt-5 re1:flex-row py-3 re1:py-0'>
          <div className='flex flex-col gap-4 re1:gap-1 re1:flex-row re1:w-1/2 re1:pr-7 re1:justify-between'>
            <ListSomething title='Institucional' list={Institucional}/>
            <ListSomething title='Ajuda e Suporte' list={AjudaESuporte}/>
            <ListSomething title='Página do Cliente' list={PaginaDoCliente}/>
          </div>
          <div className='flex flex-col re1:flex-row mt-5 re1:mt-0 items-center gap-5 re1:w-1/2 re1:border-l-2 re1:border-l-[#3d3d3d] re1:items-center re1:justify-center'>
            <div>
              <Image className='mx-auto' src='https://shopinfo.vteximg.com.br/arquivos/logoshopinfo-branco-188px.png' 
                width={150} height={44} fetchPriority='low' decoding='sync' loading='lazy'
              />
              <Image className='mx-auto' src='https://shopinfo.vteximg.com.br/arquivos/icon-footer-selo1999.png' 
                width={114} height={113} fetchPriority='low' decoding='sync' loading='lazy'
              />
            </div>
            <div>
              <p className='hidden re1:block text-center text-lg text-white font-bold'>Compre com segurança</p>
              <div className='flex flex-col items-center gap-5'>
                <div className='flex gap-8 items-center'>
                  <a href='https://certificados.trustvox.com.br/shopinfo'>
                    <Image src='https://shopinfo.vteximg.com.br/arquivos/selo-trustvox.png'
                      width={55} height={54} fetchPriority='low' decoding='sync' loading='lazy'
                      />
                  </a>
                  <a href='https://letsencrypt.org/'>
                    <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-let-s-encrypt.png'
                      width={87} height={67} fetchPriority='low' decoding='sync' loading='lazy'
                      />
                  </a>
                  <a href='https://transparencyreport.google.com/safe-browsing/search?url=shopinfo.com.br&hl=pt-PT'>
                    <Image src='https://shopinfo.vteximg.com.br/arquivos/site-seguro-google-2.png'
                      width={95} height={25} fetchPriority='low' decoding='sync' loading='lazy'
                      />
                  </a>
                </div>
                <div className='flex gap-8 items-center'>
                  <a href='https://www.shopinfo.com.br/hotsite/bsi'>
                    <Image src='https://shopinfo.vteximg.com.br/arquivos/icon-iso.png' 
                      width={46} height={46} fetchPriority='low' decoding='sync' loading='lazy'
                      />
                  </a>
                  <a href='https://www.reclameaqui.com.br/empresa/shopinfo/'>
                    <Image src='https://shopinfo.vteximg.com.br/arquivos/selo-ra-1000.png' 
                      width={136} height={48} fetchPriority='low' decoding='sync' loading='lazy'
                      />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden re1:flex divider w-screen -ml-[12.5%] before:bg-[#3d3d3d] after:bg-[#3d3d3d]'/>
        <div className='flex flex-col re1:flex-row-reverse mt-10 items-center justify-center gap-5 re1:justify-between re1:px-16'>
          <a href='https://www.google.com/maps/place/Shopinfo/@-22.9015759,-47.0589666,15z/data=!4m6!3m5!1s0x94c8c8b2da3b18f5:0x9619346fc41db902!8m2!3d-22.9015759!4d-47.0589666!16s%2Fg%2F1ptxvm9d0?entry=ttu' 
            className='bg-[#dd1f26] rounded-lg px-5 py-2 flex flex-col re1:flex-row gap-2 items-center justify-center'>
            <div className='flex gap-2 items-center'>
              <div className='bg-white h-12 w-12 rounded-full'>
                <Image className='mx-auto mt-2' src='https://shopinfo.vteximg.com.br/arquivos/icone-home-lojafisica.png'  
                  width={30} height={35} fetchPriority='low' decoding='sync' loading='lazy'
                />
              </div>
              <p className='font-bold text-white text-xl'>LOJA FÍSICA</p>
            </div>
            <div className='text-xs re1:text-sm text-white'>
              <p>Rua Luzitana, 1407 - Centro - Campinas/SP</p>
              <p>Seg a Sex das 9h às 17h30 - Sáb das 8h às 13h</p>
            </div>
          </a>
          <div className='flex flex-col re1:flex-row items-center justify-center py-3 re1:py-0 gap-3 re1:gap-5 bg-black w-screen re1:w-auto re1:bg-transparent'>
            <h1 className='font-bold text-3xl text-white'>Siga a <span className='text-[#dd1f26]'>Shopinfo</span></h1>
            <div className='flex gap-5 re1:gap-10'>
              <a href='https://www.youtube.com/shopinfooficial'>
                  <Image
                    src='https://shopinfo.vteximg.com.br/arquivos/icone-footer-youtube.png'
                    width={30} height={26} loading='lazy' decoding='sync' fetchPriority='low'
                  />
                </a>
                <a href='https://twitter.com/Shopinfo'>
                  <Image
                    src='https://shopinfo.vteximg.com.br/arquivos/icone-footer-Twitter.png' 
                    width={30} height={26} loading='lazy' decoding='sync' fetchPriority='low'
                  />
                </a>
                <a href='https://www.instagram.com/shopinfooficial'>
                  <Image
                    src='https://shopinfo.vteximg.com.br/arquivos/icone-footer-Instagram.png' 
                    width={30} height={30} loading='lazy' decoding='sync' fetchPriority='low'
                  />
                </a>
                <a href='https://www.facebook.com/Shopinfo'>
                  <Image
                    src='https://shopinfo.vteximg.com.br/arquivos/icone-footer-Facebook.png' 
                    width={30} height={30} loading='lazy' decoding='sync' fetchPriority='low'
                  />
                </a>
                <a href='https://www.gamerinfo.com.br/'>
                  <Image
                    src='https://shopinfo.vteximg.com.br/arquivos/icone-footer-Blogger.png' 
                    width={30} height={30} loading='lazy' decoding='sync' fetchPriority='low'
                />
                </a>
                <a href='https://www.tiktok.com/@shopinfo'>
                  <Image
                    src='https://shopinfo.vteximg.com.br/arquivos/icone-footer-tiktok.png' 
                    width={30} height={30} loading='lazy' decoding='sync' fetchPriority='low'
                  />
                </a>
              </div>
            </div>
          </div>
          <div className='flex flex-col re1:flex-row items-center gap-5 justify-center re1:bg-[#1e1e1e] my-5 re1:w-screen re1:-ml-[12.5%]'>
            <h1 className='text-white text-2xl font-bold'>Formas de pagamento</h1>
            <ul className='grid grid-cols-3 re1:flex re1:justify-evenly re1:items-center gap-10 re1:gap-5 re1:py-5'>
              {FormasPagamento.map(element=>(
                <li>
                  <Image
                    src={element.imgUrl} width={element.width} height={element.height} loading='lazy' decoding='sync' fetchPriority='low'
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className='flex flex-col re1:flex-row-reverse gap-3 py-5 re1:justify-between re1:px-6'>
            <a href='https://vtex.com/'>
              <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-vtex.png' className='my-auto'
                width={84} height={30} loading='lazy' decoding='sync' fetchPriority='low'
              />
            </a>
            <p className='text-xs re1:max-w-[1000px]'>
              © Shopinfo - Tecnologia em Informática. Todos os direitos reservados. SHP BRASIL - EIRELI | CNPJ: 03.482.370/0001-09 Rua Luzitana, 1407, Centro - Campinas/SP - CEP: 13015-122 | Proibida reprodução total ou parcial. A Shopinfo não é responsável por erros descritivos. As fotos contidas nesta página são meramente ilustrativas do produto e podem variar de acordo com o fornecedor/lote do fabricante. Preços e Estoque sujeitos a alteração sem aviso prévio.
            </p>
          </div>
      </footer>
    </>
  )
}

export default Footer
