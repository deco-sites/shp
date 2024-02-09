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
      <footer className='bg-base-100 px-[10%] re1:px-[5%] re4:px-[10%] overflow-x-hidden'>
        <div className='hidden re1:flex divider w-screen h-0 before:bg-primary after:bg-primary -ml-[12.5%] re1:-ml-[5.5%] re4:-ml-[12.5%]'/>
        <div className='flex flex-col re1:flex-row re1:gap-4 re1:pt-4'>
          <div className='text-secondary re1:text-sm my-5 re1:my-0'>
            <h4 className='text-xl font-bold'>Atendimento</h4>
            <p>Segunda a sexta das 9h às 17h30</p>
            <p>Sábado das 8h às 13h</p>
          </div>
          {/* section infos */}
          <div className='flex flex-col gap-3 re1:flex-row re1:gap-8 re5:gap-10 re1:justify-between re1:w-auto re1:items-center re1:mx-auto'>
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
        <div className='hidden re1:flex divider w-screen -ml-[12.5%] re1:-ml-[5.5%] re4:-ml-[12.5%] before:bg-neutral after:bg-neutral'/>
        <div className='flex flex-col mt-5 re1:flex-row py-3 re1:py-0'>
          <div className='flex flex-col gap-4 re1:gap-1 re1:flex-row re1:w-1/2 re1:pr-7 re1:justify-between'>
            <ListSomething title='Institucional' list={Institucional}/>
            <ListSomething title='Ajuda e Suporte' list={AjudaESuporte}/>
            <ListSomething title='Página do Cliente' list={PaginaDoCliente}/>
          </div>
          <div className='flex flex-col re1:flex-row mt-5 re1:mt-0 items-center gap-5 re1:w-1/2 re1:border-l-2 re1:border-l-neutral re1:items-center re1:justify-center'>
            <div>
              <Image className='mx-auto' src='https://shopinfo.vteximg.com.br/arquivos/logoshopinfo-branco-188px.png' 
                width={150} height={44} fetchPriority='low' decoding='sync' loading='lazy'
              />
              <Image className='mx-auto' src='https://shopinfo.vteximg.com.br/arquivos/icon-footer-selo1999.png' 
                width={114} height={113} fetchPriority='low' decoding='sync' loading='lazy'
              />
            </div>
            <div>
              <p className='hidden re1:block text-center text-lg text-secondary font-bold'>Compre com segurança</p>
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
        <div className='hidden re1:flex divider w-screen -ml-[12.5%] re1:-ml-[5.5%] re4:-ml-[12.5%] before:bg-neutral after:bg-neutral'/>
        <div className='flex flex-col re1:flex-row-reverse mt-10 items-center justify-center gap-5 re1:justify-between re4:px-16'>
          <a href='https://www.google.com/maps/place/Shopinfo/@-22.9015759,-47.0589666,15z/data=!4m6!3m5!1s0x94c8c8b2da3b18f5:0x9619346fc41db902!8m2!3d-22.9015759!4d-47.0589666!16s%2Fg%2F1ptxvm9d0?entry=ttu' 
            className='bg-primary rounded-lg px-5 py-2 flex flex-col re1:flex-row gap-2 items-center justify-center'>
            <div className='flex gap-2 items-center'>
              <div className='bg-secondary h-12 w-12 rounded-full'>
                <Image className='mx-auto mt-2' src='https://shopinfo.vteximg.com.br/arquivos/icone-home-lojafisica.png'  
                  width={30} height={35} fetchPriority='low' decoding='sync' loading='lazy'
                />
              </div>
              <p className='font-bold text-secondary text-xl'>LOJA FÍSICA</p>
            </div>
            <div className='text-xs re1:text-sm text-secondary'>
              <p>Rua Luzitana, 1407 - Centro - Campinas/SP</p>
              <p>Seg a Sex das 9h às 17h30 - Sáb das 8h às 13h</p>
            </div>
          </a>
          <div className='flex flex-col re1:flex-row items-center justify-center py-3 re1:py-0 gap-3 re1:gap-5 bg-black w-screen re1:w-auto re1:bg-transparent'>
            <h4 className='font-bold text-3xl text-secondary'>Siga a <span className='text-primary'>Shopinfo</span></h4>
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
            <h4 className='text-secondary text-2xl re1:text-lg re4:text-2xl font-bold'>Formas de pagamento</h4>
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
            <a href="https://deco.cx/" target="_blank" aria-label="Powered by deco.cx" style="display:flex;">
              <svg width="90" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 20" fill="currentColor">
                <path d="M84.5057 13.1474C85.709 15.6332 87.0576 17.8871 88.3836 19.7802L88.3548 19.8939C86.7652 20.0364 85.2028 20.0364 83.6132 19.8939C82.9373 18.845 82.2054 17.3566 81.6492 15.9303L78.5866 19.8939C77.1106 20.0364 75.2649 20.0364 73.901 19.8939L79.7292 12.8791C78.726 11.1179 77.7774 9.14136 77.1091 6.51764C78.5002 6.37516 79.9202 6.37516 81.3113 6.51764C81.6704 7.86057 82.1114 9.18228 82.5812 10.501L85.6544 6.51764C87.1031 6.34788 88.6079 6.34788 89.9414 6.51764L84.5012 13.1474H84.5057ZM19.5501 4.72757C19.9759 4.87004 20.2032 4.61389 20.0047 4.21677L18.0741 0.269816C17.9316 -0.0136243 17.6195 -0.0424231 17.421 0.0424576L12.6232 1.85981C12.2262 2.00229 12.2535 2.37061 12.652 2.48429L14.0719 2.93901C12.9081 5.5794 11.4594 9.55667 10.2956 12.0546C8.98932 14.8375 8.33619 16.7973 6.12221 16.7973C3.90822 16.7973 3.53847 15.0648 4.47498 12.5942C5.55393 9.72643 7.37089 8.87459 9.44394 9.47027C10.0122 8.67452 10.438 7.48164 10.6078 6.40244C10.0122 6.23268 9.30149 6.17508 8.70595 6.17508C5.35542 6.17508 2.03368 7.90756 0.67135 11.5423C-1.06074 16.2289 0.557696 19.8924 5.69638 19.8924C9.47273 19.8924 11.6019 18.1599 14.1007 12.8488C15.4631 9.92347 16.6284 7.05572 17.9619 4.21525L19.5516 4.72605L19.5501 4.72757ZM29.5441 11.1739C28.6076 13.6158 25.7389 14.6101 20.2305 14.4676C20.2017 16.1152 21.3094 16.7685 23.3249 16.7685C24.6872 16.7685 26.192 16.4563 27.271 15.9167C27.5832 16.8822 27.6119 17.8189 27.3271 18.7571C25.6238 19.609 23.5795 19.8924 22.1308 19.8924C16.395 19.8924 15.657 15.6044 16.8209 12.2531C17.9286 9.10043 20.9382 6.17508 25.0267 6.17508C28.8591 6.17508 30.4775 8.70331 29.541 11.1739H29.5441ZM24.4327 9.04435C22.8703 9.04435 21.6792 10.0387 20.9124 11.7423C24.319 11.7423 25.4843 11.2315 25.8238 10.407C26.0511 9.81131 25.8238 9.04435 24.4327 9.04435ZM40.0487 9.35659C40.7307 9.35659 41.4111 9.47027 41.8369 9.72643C42.5749 8.73211 43.0007 7.7378 43.0856 6.7162C42.4612 6.43276 41.4111 6.1766 40.076 6.1766C35.6465 6.1766 32.1551 8.76091 30.9049 12.3395C29.7123 15.7196 30.6215 19.8939 36.1572 19.8939C37.6332 19.8939 39.138 19.5817 40.1897 19.127C40.5306 18.1038 40.5594 17.111 40.2745 16.1167C39.5653 16.4002 38.5425 16.6851 37.4923 16.6851C34.6524 16.6851 34.3979 14.5843 34.9934 12.7943C35.6465 10.892 37.3498 9.35811 40.0472 9.35811L40.0487 9.35659ZM59.4973 15.2922C57.8227 15.2922 56.8574 16.3426 56.5165 17.3657C56.1195 18.6146 56.6301 19.9212 58.532 19.9212C60.1504 19.9212 61.1445 18.9269 61.4854 17.8765C61.8552 16.6836 61.4567 15.2922 59.4973 15.2922ZM56.5726 14.0705C55.2375 17.8189 51.887 19.8924 48.1394 19.8924C43.0007 19.8924 41.552 15.9167 42.8871 12.1107C44.0797 8.7306 47.2029 6.17508 51.2914 6.17508C56.4028 6.17508 57.9637 10.122 56.5726 14.0705ZM50.6671 9.27171C48.7653 9.27171 47.4878 11.0042 46.9483 12.6518C46.2664 14.7253 46.6361 16.8549 48.7941 16.8549C50.6398 16.8549 51.9173 15.2361 52.4855 13.5324C53.1387 11.5438 52.9114 9.27323 50.6686 9.27323L50.6671 9.27171ZM70.0125 16.6836C67.1727 16.6836 66.9181 14.5828 67.5137 12.7927C68.1668 10.8905 69.8701 9.35659 72.5675 9.35659C73.2494 9.35659 73.9298 9.47027 74.3557 9.72643C75.0936 8.73211 75.5195 7.7378 75.6043 6.7162C74.98 6.43276 73.9298 6.1766 72.5948 6.1766C68.1653 6.1766 64.6738 8.76091 63.4236 12.3395C62.231 15.7196 63.1403 19.8939 68.676 19.8939C70.152 19.8939 71.6567 19.5817 72.7084 19.127C73.0494 18.1038 73.0782 17.111 72.7933 16.1167C72.0841 16.4002 71.0612 16.6851 70.011 16.6851L70.0125 16.6836Z"></path>
              </svg>
            </a>
            <a href='https://vtex.com/'>
              <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-vtex.png' className='my-auto'
                width={108} height={40} loading='lazy' decoding='sync' fetchPriority='low'
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
