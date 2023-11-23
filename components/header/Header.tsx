import { useEffect, useRef, useState, useCallback } from 'preact/hooks'
import { useCart } from "apps/vtex/hooks/useCart.ts"
import MenuItem from './MenuItem.tsx'
import MenuItemDesk from './MenuItemDesktop.tsx'
import Image from 'deco-sites/std/components/Image.tsx'
import SearchMenuBar from 'deco-sites/shp/components/ComponentsSHP/searchSHP/SearchMenuBar.tsx'
import Cart from 'deco-sites/shp/components/minicart/Cart.tsx'

const HeaderSHP = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768)
  }, [])

  const closeClickHandler = useCallback(() => {
    setMenuMobileClass('hidden')
  }, [])

  useEffect(() => {

    handleResize()
    
    if(typeof window !=='undefined'){
      // deno-lint-ignore no-window-prefix
      window.addEventListener('resize', handleResize)
      
      return () => {
        // deno-lint-ignore no-window-prefix
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  const close = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {
    if (close.current) {
      close.current.addEventListener('touchend', closeClickHandler);
    }
    
    return () => {
      if (close.current) {
        close.current.removeEventListener('touchend', closeClickHandler);
      }
    }
  }, [closeClickHandler])

  const [menuMobileClass, setMenuMobileClass] = useState('hidden')

  const handleClick = useCallback(() => {
    setMenuMobileClass('flex flex-col w-[80%] h-screen absolute top-0 bg-[#1e1e1e]')
  }, [])

  const hideAll = () => {
    setOpenGamer('hidden')
    setBorderGamer('')
    setOpenOffice('hidden')
    setBorderOffice('')
    setOpenWork('hidden')
    setBorderWork('')
    setOpenPeri('hidden')
    setBorderPeri('')
    setOpenHard('hidden')
    setBorderHard('')
  }

  const [openGamer, setOpenGamer] = useState('hidden')
  const [borderGamer, setBorderGamer] = useState('')

  const gamerHover = () => {
    openGamer === 'hidden' && hideAll()
    setOpenGamer('flex'), setBorderGamer('border-b-2 border-primary')
  }

  const [openOffice, setOpenOffice] = useState('hidden')
  const [borderOffice, setBorderOffice] = useState('')

  const officeHover = () => {
    openOffice === 'hidden' && hideAll()
    setOpenOffice('flex'), setBorderOffice('border-b-2 border-primary')
  }

  const [openWork, setOpenWork] = useState('hidden')
  const [borderWork, setBorderWork] = useState('')

  const workHover = () => {
    openWork === 'hidden' && hideAll()
    setOpenWork('flex'), setBorderWork('border-b-2 border-primary')
  }

  const [openPeri, setOpenPeri] = useState('hidden')
  const [borderPeri, setBorderPeri] = useState('')

  const periHover = () => {
    openPeri === 'hidden' && hideAll()
    setOpenPeri('flex'), setBorderPeri('border-b-2 border-primary')
  }

  const [openHard, setOpenHard] = useState('hidden')
  const [borderHard, setBorderHard] = useState('')

  const hardHover = () => {
    openHard === 'hidden' && hideAll()
    setOpenHard('flex'), setBorderHard('border-b-2 border-primary')
  }

  const [openMinicart, setOpenMinicart]=useState(false)

  const {cart}=useCart()
  const {items}=cart.value ?? { items: [] }
  const totalItems=items.length

  return (
    <>
      <div id='minicartWrapper' className={`${openMinicart ? 'flex' : 'hidden'} flex-col z-30 fixed w-full items-end bg-[#000]/80`}
        onClick={(event:MouseEvent)=>{
          if(window.innerWidth>768){
            (!document.querySelector('#minicartContent')?.contains(event.target as Node) && event.target===document.querySelector('#minicartWrapper')) && setOpenMinicart(false)
          }
        }}
      >
        <div id='minicartContent' className='bg-base-100 w-screen re1:w-[400px] h-screen'>
          <div className='flex justify-between h-[10vh] items-center px-4 text-xl font-bold text-secondary'>
            <label className='flex gap-2'>
              <Image src='https://shopinfo.vteximg.com.br/arquivos/vector-cart-buy-button.png' width={22} height={20} decoding='sync' loading='lazy' class='max-h-[22px] m-auto'/>
              <p>Carrinho</p>
            </label>
            <p id='close-minicart' className='font-bold cursor-pointer' onClick={()=>{setOpenMinicart(false)}}>✕</p>
          </div>
          <Cart platform="vtex"/>
        </div>
      </div>
      
      <div className='z-10 fixed top-0 w-full'>
        <div className='h-16 flex p-4 re2:text-sm re3:text-base bg-[#000] items-center justify-center re1:py-4 re2:px-2 re3:px-4 re4:px-32 re5:px-52 re1:h-24 re1:justify-around'>
          {isMobile && (
            <button /* menuBar */
              className='w-fit h-fit mr-auto re1:hidden'
              onClick={handleClick}
            >
              <Image
                src='https://shopinfo.vteximg.com.br/arquivos/icone-menu-mobile.png'
                alt='menu bar' width={24} height={18} preload fetchPriority='high' loading='eager' decoding='sync'
              />
            </button>
          )}

          <a href='/' className='w-[160px] h-auto mx-auto re1:mx-0'>
            <Image
              src='https://shopinfo.vteximg.com.br/arquivos/logoshopinfo-branco-188px.png'
              alt='logo' width={160} height={47} preload fetchPriority='high' loading='eager' decoding='sync'
            />
          </a>

          {!isMobile && (
            <div className='hidden re1:flex gap-4'>
              <div onMouseOver={gamerHover} className={borderGamer}>
                <a href='/computadores-gamer/' className='font-bold text-secondary text-sm cursor-pointer'>
                  PC Gamer
                </a>
              </div>

              <div onMouseOver={officeHover} className={borderOffice}>
                <a href='/solucoes' className='font-bold text-secondary text-sm cursor-pointer'>
                  Home Office
                </a>
              </div>

              <div onMouseOver={workHover} className={borderWork}>
                <a href='/workstation' className='font-bold text-secondary text-sm cursor-pointer'>
                  Workstation
                </a>
              </div>

              <div onMouseOver={periHover} className={borderPeri}>
                <a href='/acessorios-gamer' className='font-bold text-secondary text-sm cursor-pointer'>
                  Periféricos
                </a>
              </div>

              <div onMouseOver={hardHover} className={borderHard}>
                <a href='/hardware' className='font-bold text-secondary text-sm cursor-pointer'>
                  Hardware
                </a>
              </div>
            </div>
          )
          }

          <SearchMenuBar />

          <div className='hidden re1:block w-[2px] h-2/4 bg-neutral'></div>

          <div className='hidden re1:flex gap-2 items-center'>
            <a href='/teste' className='flex items-center gap-1'>
              <Image
                src='https://shopinfo.vteximg.com.br/arquivos/frete-icon.png'
                alt='caminhão' width={26} height={18} preload fetchPriority='high' loading='eager' decoding='sync'
              />
              <div className='hover:text-secondary text-neutral-content font-bold text-sm'>
                Rastreio
              </div>
            </a>

            <a href='/teste' className='flex items-center gap-1'>
              <Image
                src='https://shopinfo.vteximg.com.br/arquivos/icon-user.png'
                alt='conta' width={21} height={25} preload fetchPriority='high' loading='eager' decoding='sync'
              />
              <div className='hover:text-secondary text-neutral-content font-bold text-sm'>
                Minha Conta
              </div>
            </a>

            <a className='flex items-center gap-1 cursor-pointer' onClick={()=>{setOpenMinicart(true)}}>
              <div className='hidden w-fit h-fit border-primary border-2 p-2 rounded-lg ml-0 re1:block indicator'>
                <span
                  class={`indicator-item badge badge-primary badge-sm font-bold ${totalItems === 0 ? "hidden" : ""}`}
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
                <Image
                  src='https://shopinfo.vteximg.com.br/arquivos/header__cart.png'
                  alt='carrinho' width={24} height={20} preload fetchPriority='high' loading='eager' decoding='sync'
                />
              </div>
              <div className='hover:text-secondary text-neutral-content font-bold text-sm'>
                Carrinho
              </div>
            </a>

            <Image
              src='https://shopinfo.vteximg.com.br/arquivos/heartRed.png'
              alt='favorito' height={24} width={24} preload fetchPriority='high' loading='eager' decoding='sync'
            />
          </div>

          <div className='w-fit h-fit border-primary border-2 p-2 rounded-lg ml-auto re1:hidden indicator'>
            <span
              class={`indicator-item badge badge-primary badge-sm font-bold ${totalItems === 0 ? "hidden" : ""}`}
            >
              {totalItems > 9 ? "9+" : totalItems}
            </span>
            <Image
              src='https://shopinfo.vteximg.com.br/arquivos/header__cart.png'
              alt='carrinho' width={24} height={20} preload fetchPriority='high' loading='eager' decoding='sync'
              onClick={()=>{setOpenMinicart(true)}}
            />
          </div>
        </div>

        {!isMobile ? (
          <>
            <div
              onMouseOut={() => {
                setOpenGamer('hidden'), setBorderGamer('')
              }}
            >
              <MenuItemDesk
                open={openGamer}
                subCategs={[
                  {
                    imgUrl:
                      'http://www.shopinfo.vteximg.com.br/arquivos/banner-menu-start.png',
                    linkTo: '/computadores-gamer/start',
                  },
                  {
                    imgUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/banner-menu-moba.png',
                    linkTo: '/computadores-gamer/moba-box',
                  },
                  {
                    imgUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/banner-menu-pc-stream.png',
                    linkTo: '/computadores-gamer/streamer',
                  },
                  {
                    imgUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/banner-menu-setup-gamer.png',
                    linkTo: '/computadores-gamer/setup-gamer',
                  },
                  {
                    imgUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/banner-menu-vai-jogar-o-que.png',
                    linkTo: '/teste',
                  },
                ]}
              />
            </div>

            <div
              onMouseOut={() => {
                setOpenOffice('hidden'), setBorderOffice('')
              }}
            >
              <MenuItemDesk
                open={openOffice}
                subCategs={[
                  {
                    imgUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/banner-menu-escritorio-webcam.png',
                    linkTo: '/solucoes/acessorios',
                  },
                  {
                    imgUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/banner-menu-escritorio-pchome.png',
                    linkTo: '/solucoes/home',
                  },
                ]}
              />
            </div>

            <div
              onMouseOut={() => {
                setOpenWork('hidden'), setBorderWork('')
              }}
            >
              <MenuItemDesk
                open={openWork}
                subCategs={[
                  {
                    imgUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/banner-menu-edicao.png',
                    linkTo: '/workstation/pc-para-edicao',
                  },
                  {
                    imgUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/banner-menu-arquitetura.png',
                    linkTo: '/workstation/pc-para-arquitetura',
                  },
                  {
                    imgUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/banner-menu-engenheiro.png',
                    linkTo: '/workstation/pc-para-engenharia',
                  },
                  {
                    imgUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/banner-menu-modelagem3d.png',
                    linkTo: '/workstation/pc-para-modelagem-3d-e-2d',
                  },
                ]}
              />
            </div>

            <div
              onMouseOut={() => {
                setOpenPeri('hidden'), setBorderPeri('')
              }}
            >
              <MenuItemDesk
                open={openPeri}
                subCategs={[
                  {
                    imgUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/banner-menu-acessorios-headset.png',
                    linkTo: '/acessorios-gamer/headeset-gamer',
                  },
                  {
                    imgUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/banner-menu-acessorios-mouse.png',
                    linkTo: '/acessorios-gamer/mouse-gamer',
                  },
                  {
                    imgUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/banner-menu-acessorios-teclado.png',
                    linkTo: '/acessorios-gamer/teclado-gamer',
                  },
                  {
                    imgUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/banner-menu-acessorios-cadeira.png?v=637465887851700000',
                    linkTo: '/acessorios-gamer/cadeiras',
                  },
                ]}
                subCategsNoImg={[
                  {
                    name: 'Mousepad Gamer',
                    iconUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/menu-icons.png',
                    linkTo: '/acessorios-gamer/mousepad-gamer',
                  },
                  {
                    name: 'Kit Gamer',
                    iconUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/menu-icons.png',
                    linkTo: '/acessorios-gamer/kit-gamer',
                  },
                  {
                    name: 'Monitor Gamer',
                    iconUrl: 'https://shopinfo.vteximg.com.br/arquivos/menu-icons.png',
                    linkTo: '/acessorios-gamer/monitor',
                  },
                  {
                    name: 'Adaptadores',
                    iconUrl: 'https://shopinfo.vteximg.com.br/arquivos/menu-icons.png',
                    linkTo: '/acessorios-gamer/adaptadores',
                  },
                ]}
              />
            </div>

            <div
              onMouseOut={() => {
                setOpenHard('hidden'), setBorderHard('')
              }}
            >
              <MenuItemDesk
                open={openHard}
                subCategs={[
                  {
                    imgUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/banner-menu-hardware-processador.png',
                    linkTo: '/hardware/processador',
                  },
                  {
                    imgUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/banner-menu-hardware--placadevideo.png',
                    linkTo: '/hardware/placa-de-video',
                  },
                  {
                    imgUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/banner-menu-hardware-memora.png',
                    linkTo: '/hardware/memoria',
                  },
                  {
                    imgUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/banner-menu-hardware-gabinete.png',
                    linkTo: '/hardware/gabinete',
                  },
                ]}
                subCategsNoImg={[
                  {
                    name: 'Cooler',
                    iconUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/menu-icons.png',
                    linkTo: '/workstation/cooler',
                  },
                  {
                    name: 'Fonte',
                    iconUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/menu-icons.png',
                    linkTo: '/workstation/fonte',
                  },
                  {
                    name: 'HD',
                    iconUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/menu-icons.png',
                    linkTo: '/workstation/hd',
                  },
                  {
                    name: 'SSD',
                    iconUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/menu-icons.png',
                    linkTo: '/workstation/ssd',
                  },
                  {
                    name: 'Placa de rede',
                    iconUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/menu-icons.png',
                    linkTo: '/workstation/placa-de-rede',
                  },
                  {
                    name: 'Placa mãe',
                    iconUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/menu-icons.png',
                    linkTo: '/workstation/placa-mae',
                  },
                  {
                    name: 'Kit Upgrade',
                    iconUrl:
                      'https://shopinfo.vteximg.com.br/arquivos/menu-icons.png',
                    linkTo: '/workstation/kit-upgrade',
                  },
                ]}
              />
            </div>
          </>
        ) : (
          <>
            <div className={menuMobileClass}>
              <div className='bg-primary flex flex-col h-32 justify-between'>
                <div className='w-full justify-between flex p-2'>
                  <p className='font-bold text-xl text-secondary'>
                    Entre ou Cadastre-se
                  </p>
                  <span
                    ref={close}
                    className='text-secondary font-extrabold cursor-pointer'
                  >
                    X
                  </span>
                </div>

                <div className='w-full justify-between flex p-2'>
                  <div className='flex gap-2'>
                    <img
                      className='h-5'
                      src='https://shopinfo.vteximg.com.br/arquivos/icone-mobile-rastreio2.png'
                      alt='carrinho'
                    />
                    <p className='text-secondary'>Rastreio</p>
                  </div>

                  <div className='flex gap-2'>
                    <a href='https://api.whatsapp.com/send?phone=5519982013576'>
                      <img
                        src='https://shopinfo.vteximg.com.br/arquivos/icone-mobile-whatsappp.png'
                        alt='carrinho'
                      />
                    </a>

                    <p className='text-secondary'>Atendimento</p>
                  </div>
                </div>
              </div>

              <div className='flex flex-col w-full h-screen overflow-y-auto scrollbar scrollbar-thin'>
                <a
                  className='flex w-[95%] bg-[#333] rounded-lg border-2 border-transparent h-12 text-secondary font-bold justify-between p-5 my-[2px] mx-auto items-center'
                  href='/teste'
                >
                  <div className='flex gap-2'>
                    <img
                      className='h-auto my-auto invert'
                      src='https://shopinfo.vteximg.com.br/arquivos/icone-mobile-wishlist.png'
                      alt='iconLink'
                    />
                    <span>Favoritos</span>
                  </div>
                </a>

                <MenuItem
                  rounded='rounded-t-lg'
                  iconLink='https://shopinfo.vteximg.com.br/arquivos/icone-mobile-pcgamer.png'
                  itemName='Pc Gamer'
                  links={[
                    {
                      name: 'Ver Tudo',
                      link: '/computadores-gamer',
                    },
                    {
                      name: 'Start',
                      link: '/computadores-gamer/start',
                    },
                    {
                      name: 'Moba Box',
                      link: '/computadores-gamer/moba-box',
                    },
                    {
                      name: 'PC para streamer',
                      link: '/computadores-gamer/streamer',
                    },
                    {
                      name: 'Setup Gamer',
                      link: '/computadores-gamer/setup-gamer',
                    },
                  ]}
                />

                <MenuItem
                  iconLink='https://shopinfo.vteximg.com.br/arquivos/icone-mobile-pchome.png'
                  itemName='Home Office'
                  links={[
                    {
                      name: 'Ver tudo',
                      link: '/solucoes',
                    },
                    {
                      name: 'Acessórios',
                      link: '/solucoes/acessorios',
                    },
                    {
                      name: 'PC Home',
                      link: '/solucoes/home',
                    },
                  ]}
                />

                <MenuItem
                  iconLink='https://shopinfo.vteximg.com.br/arquivos/icone-mobile-pchome.png'
                  itemName='Workstation'
                  links={[
                    {
                      name: 'Ver tudo',
                      link: '/workstation',
                    },
                    {
                      name: 'PC para Edição',
                      link: '/worsktation/pc-para-edicao',
                    },
                    {
                      name: 'PC para Arquitetura',
                      link: '/workstation/pc-para-arquitetura',
                    },
                    {
                      name: 'PC para Engenharia',
                      link: '/workstation/pc-para-engenharia',
                    },
                    {
                      name: 'PC para Modelagem 3D e 2D',
                      link: '/workstation/pc-para-modelagem-3d-e-2d',
                    },
                  ]}
                />

                <MenuItem
                  iconLink='https://shopinfo.vteximg.com.br/arquivos/icone-mobile-perifericos.png'
                  itemName='Periféricos'
                  links={[
                    {
                      name: 'Ver tudo',
                      link: '/acessorios-gamer',
                    },
                    {
                      name: 'Headset Gamer',
                      link: '/acessorios-gamer/headset-gamer',
                    },
                    {
                      name: 'Mouse Gamer',
                      link: '/acessorios-gamer/mouse-gamer',
                    },
                    {
                      name: 'Cadeira Gamer',
                      link: '/acessorios-gamer/cadeiras',
                    },
                    {
                      name: 'Mousepad Gamer',
                      link: '/acessorios-gamer/mousepad-gamer',
                    },
                    {
                      name: 'Teclado Gamer',
                      link: '/acessorios-gamer/teclado-gamer',
                    },
                    {
                      name: 'Kit Gamer',
                      link: '/acessorios-gamer/kit-gamer',
                    },
                    {
                      name: 'Monitor Gamer',
                      link: '/acessorios-gamer/monitor',
                    },
                    {
                      name: 'Adaptadores',
                      link: '/acessorios-gamer/adaptadores',
                    },
                  ]}
                />
                <MenuItem
                  rounded='rounded-b-lg'
                  iconLink='https://shopinfo.vteximg.com.br/arquivos/icone-mobile-hardware.png'
                  itemName='Hardware'
                  links={[
                    {
                      name: 'Ver tudo',
                      link: '/hardware',
                    },
                    {
                      name: 'Cooler',
                      link: '/hardware/cooler',
                    },
                    {
                      name: 'Fonte',
                      link: '/hardware/fonte',
                    },
                    {
                      name: 'Gabinete',
                      link: '/hardware/gabinete',
                    },
                    {
                      name: 'HD',
                      link: '/hardware/hd',
                    },
                    {
                      name: 'SSD',
                      link: '/hardware/ssd',
                    },
                    {
                      name: 'Memória',
                      link: '/hardware/memoria',
                    },
                    {
                      name: 'Placa de rede',
                      link: '/hardware/placa-de-rede',
                    },
                    {
                      name: 'Placa mãe',
                      link: '/hardware/placa-mae',
                    },
                    {
                      name: 'Kit Upgrade',
                      link: '/hardware/kit-upgrade',
                    },
                    {
                      name: 'Placa de vídeo',
                      link: '/hardware/placa-de-video',
                    },
                    {
                      name: 'Processador',
                      link: '/hardware/processador',
                    },
                  ]}
                />

                <a
                  className='flex w-[95%] bg-[#333] rounded-lg border-2 border-transparent h-12 text-[#53a752] font-bold justify-between p-5 my-[2px] mx-auto items-center'
                  href='/teste'
                >
                  <div className='flex gap-2'>
                    <img
                      className='h-auto my-auto'
                      src='https://shopinfo.vteximg.com.br/arquivos/icone-mobile-ofertas.png'
                      alt='iconLink'
                      width={18}
                      height={18}
                    />
                    <span>Ofertas de Saldão Gamer</span>
                  </div>
                </a>

                <a
                  className='flex w-[95%] bg-[#333] rounded-lg border-2 border-transparent h-12 text-[#53a752] font-bold justify-between p-5 my-[2px] mx-auto items-center'
                  href='/teste'
                >
                  <div className='flex gap-2'>
                    <img
                      className='h-auto my-auto'
                      src='https://shopinfo.vteximg.com.br/arquivos/icone-mobile-maisvendidos.png'
                      alt='iconLink'
                      width={16}
                      height={23}
                    />
                    <span>Mais Vendidos</span>
                  </div>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
      <div className='h-16 re1:h-24'/>
    </>
  )
}

export default HeaderSHP
