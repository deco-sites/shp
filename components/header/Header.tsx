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
      
      <div className='z-10 absolute re1:fixed top-0 w-full'>
        <div className='h-16 flex p-4 re2:text-sm re3:text-base bg-[#000] items-center justify-center re1:pt-4 re1:pb-10 re2:px-2 re3:px-4 re4:px-32 re5:px-52 re1:h-28'>
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
              alt='logo' width={188} height={55} preload fetchPriority='high' loading='eager' decoding='sync'
            />
          </a>

          {!isMobile && (
            <div className='hidden re1:flex gap-6 absolute top-[70%] re5:left-[30%]'>
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

              <div className='hover:border-b-2 hover:border-primary' onMouseEnter={()=>{hideAll()}}>
                <a href='/para-sua-empresa' className='font-bold text-secondary text-sm cursor-pointer'>
                  Para sua Empresa
                </a>
              </div>
            </div>
          )}

          <SearchMenuBar />

          <div className='hidden re1:block w-[2px] h-2/4 bg-neutral mx-4'></div>

          <div className='hidden re1:flex gap-2 items-center'>
            <a href='https://api.shopinfo.com.br/rastreio/' className='flex items-center gap-1'>
              <Image
                src='https://shopinfo.vteximg.com.br/arquivos/frete-icon.png'
                alt='caminhão' width={26} height={18} preload fetchPriority='high' loading='eager' decoding='sync'
              />
              <div className='hover:text-secondary text-neutral-content font-bold text-sm'>
                Rastreio
              </div>
            </a>

            <a href='/account' className='flex items-center gap-1'>
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
                    linkTo: '/vai-jogar-o-que',
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
                    linkTo: '/acessorios-gamer/headset-gamer',
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
                      'https://shopinfo.vteximg.com.br/arquivos/banner-menu-acessorios-cadeira.png',
                    linkTo: '/acessorios-gamer/cadeiras',
                  },
                ]}
                subCategsNoImg={[
                  {
                    name: 'Mousepad Gamer',
                    iconSvg:
                      `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="13" viewBox="0 0 17 13" fill="none">
                        <g clip-path="url(#clip0_537_99)">
                          <mask id="mask0_537_99" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="13">
                            <path d="M0 1.77273C0 0.79368 0.815484 0 1.82143 0H15.1786C16.1845 0 17 0.79368 17 1.77273V11.2273C17 12.2063 16.1845 13 15.1786 13H1.82143C0.815484 13 0 12.2063 0 11.2273V1.77273Z" fill="white"/>
                          </mask>
                          <g mask="url(#mask0_537_99)">
                            <path d="M1.82136 1.18181H15.1785V-1.18182H1.82136V1.18181ZM15.7856 1.77272V11.2273H18.2142V1.77272H15.7856ZM15.1785 11.8182H1.82136V14.1818H15.1785V11.8182ZM1.21422 11.2273V1.77272H-1.21436V11.2273H1.21422ZM1.82136 11.8182C1.48605 11.8182 1.21422 11.5536 1.21422 11.2273H-1.21436C-1.21436 12.859 0.144781 14.1818 1.82136 14.1818V11.8182ZM15.7856 11.2273C15.7856 11.5536 15.5138 11.8182 15.1785 11.8182V14.1818C16.8551 14.1818 18.2142 12.859 18.2142 11.2273H15.7856ZM15.1785 1.18181C15.5138 1.18181 15.7856 1.44637 15.7856 1.77272H18.2142C18.2142 0.140971 16.8551 -1.18182 15.1785 -1.18182V1.18181ZM1.82136 -1.18182C0.144781 -1.18182 -1.21436 0.140971 -1.21436 1.77272H1.21422C1.21422 1.44637 1.48605 1.18181 1.82136 1.18181V-1.18182Z" fill="#828282"/>
                          </g>
                          <mask id="mask1_537_99" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="7" y="3" width="8" height="8">
                            <path d="M7.7212 6.59272C7.53482 6.18341 7.6179 5.70934 7.92181 5.37326L9.0367 4.14032C9.21234 3.94609 9.44861 3.81332 9.70926 3.7624L11.3638 3.43916C11.8148 3.35104 12.2782 3.51805 12.5492 3.8798C13.0461 4.5431 13.832 5.64629 14.2538 6.52009C14.7747 7.59951 14.5259 9.09649 13.4647 9.69276L12.4359 10.2708C11.3748 10.8671 9.9183 10.3284 9.2183 9.34958C8.65164 8.55721 8.06295 7.34323 7.7212 6.59272Z" fill="white"/>
                          </mask>
                          <g mask="url(#mask1_537_99)">
                            <path d="M9.03661 4.1403L8.12507 3.35952L9.03661 4.1403ZM7.92171 5.37323L7.01017 4.59245L7.92171 5.37323ZM12.8575 8.66926L11.8287 9.24734L13.043 11.2943L14.0718 10.7162L12.8575 8.66926ZM8.83326 6.15401L9.94815 4.92109L8.12507 3.35952L7.01017 4.59245L8.83326 6.15401ZM9.94815 4.92109L11.6027 4.59784L11.1247 2.28043L9.47018 2.60368L9.94815 4.92109ZM11.5679 4.57607C12.0657 5.24043 12.7876 6.26219 13.1546 7.02254L15.3527 6.01762C14.8762 5.03036 14.0264 3.84574 13.5303 3.18349L11.5679 4.57607ZM10.2148 8.67442C9.72176 7.98493 9.17354 6.86556 8.83125 6.11385L6.61096 7.07154C6.95216 7.82085 7.58134 9.12945 8.22157 10.0247L10.2148 8.67442ZM9.94815 4.92109L9.47018 2.60368C8.94889 2.70552 8.47634 2.97105 8.12507 3.35952L9.94815 4.92109ZM11.8287 9.24734C11.6591 9.34266 11.3987 9.38053 11.0627 9.27556C10.7225 9.16931 10.4071 8.94322 10.2148 8.67442L8.22157 10.0247C8.72933 10.7347 9.49215 11.2674 10.3205 11.5261C11.153 11.7862 12.1514 11.7953 13.043 11.2943L11.8287 9.24734ZM14.0718 10.7162C14.9633 10.2153 15.4544 9.36914 15.6393 8.53743C15.8232 7.70986 15.7306 6.80059 15.3527 6.01762L13.1546 7.02254C13.2977 7.31896 13.3411 7.69785 13.2656 8.0377C13.191 8.37345 13.0271 8.57394 12.8575 8.66926L14.0718 10.7162ZM11.6027 4.59784C11.6039 4.59761 11.6006 4.59848 11.5939 4.59599C11.5904 4.59472 11.5859 4.59251 11.581 4.58887C11.5758 4.58509 11.5713 4.58057 11.5679 4.57607L13.5303 3.18349C12.9696 2.43506 12.0225 2.10503 11.1247 2.28043L11.6027 4.59784ZM7.01017 4.59245C6.40518 5.2615 6.22535 6.22473 6.61096 7.07154L8.83125 6.11385C8.83357 6.11895 8.83533 6.12502 8.83613 6.13124C8.83689 6.13723 8.8366 6.14213 8.83601 6.14568C8.83485 6.15261 8.83246 6.1549 8.83326 6.15401L7.01017 4.59245Z" fill="#828282"/>
                          </g>
                          <path d="M9.38878 5.16225C9.22112 4.87963 9.32061 4.51823 9.61101 4.35506C9.9014 4.19188 10.2727 4.28872 10.4404 4.57135L11.6547 6.61831C11.8223 6.90094 11.7228 7.26234 11.4324 7.42551C11.142 7.58869 10.7707 7.49185 10.6031 7.20922L9.38878 5.16225Z" fill="#828282"/>
                          <path d="M9.85515 8.30827C9.56475 8.47145 9.19343 8.37461 9.02577 8.09199C8.85812 7.80936 8.95761 7.44797 9.248 7.28479L12.4028 5.51206C12.6932 5.34889 13.0645 5.44573 13.2322 5.72835C13.3998 6.01098 13.3003 6.37237 13.01 6.53555L9.85515 8.30827Z" fill="#828282"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_537_99">
                            <rect width="17" height="13" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>`,
                    linkTo: '/acessorios-gamer/mousepad-gamer',
                  },
                  {
                    name: 'Kit Gamer',
                    iconSvg:
                      `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="17" viewBox="0 0 21 17" fill="none">
                        <g clip-path="url(#clip0_543_699)">
                          <path d="M20.8191 10.6739C20.7938 10.4412 20.6367 10.2456 20.4151 10.1638L18.4532 9.4361C18.309 9.38304 18.1503 9.38304 18.0062 9.4361L16.0443 10.1638C15.8227 10.2456 15.6655 10.4419 15.6402 10.6739C15.5574 11.4349 15.3941 13.1866 15.4869 14.3872C15.5858 15.6659 16.6262 16.9045 17.9226 16.9045H18.5367C19.834 16.9045 20.8743 15.6659 20.9725 14.3872C21.0652 13.1866 20.9012 11.4349 20.8191 10.6739ZM20.3384 14.3395C20.2579 15.3878 19.4108 16.2754 18.5375 16.2754H17.9234C17.0502 16.2754 16.203 15.3885 16.1217 14.3395C16.0412 13.295 16.167 11.7767 16.2521 10.9437C16.2643 10.8255 16.3433 10.7247 16.456 10.683L17.9119 10.1433V11.2408C17.7363 11.2408 17.5937 11.3818 17.5937 11.5554V12.8137C17.5937 12.9872 17.7363 13.1282 17.9119 13.1282V13.7573C17.9119 13.9309 18.0545 14.0719 18.2301 14.0719C18.4056 14.0719 18.5482 13.9309 18.5482 13.7573V13.1282C18.7238 13.1282 18.8664 12.9872 18.8664 12.8137V11.5554C18.8664 11.3818 18.7238 11.2408 18.5482 11.2408V10.1433L20.0042 10.683C20.1169 10.7247 20.1958 10.8255 20.2081 10.9437C20.2932 11.7775 20.4189 13.2957 20.3384 14.3395Z" fill="#666666"/>
                          <path d="M3.90308 14.5987C3.90308 14.3334 4.12005 14.1189 4.38838 14.1189H10.2128C10.4811 14.1189 10.6981 14.3334 10.6981 14.5987C10.6981 14.864 10.4811 15.0785 10.2128 15.0785H4.38838C4.12005 15.0785 3.90308 14.864 3.90308 14.5987Z" fill="#666666"/>
                          <path d="M1.96118 11.7191C1.96118 11.4538 2.17815 11.2393 2.44649 11.2393C2.71482 11.2393 2.93179 11.4538 2.93179 11.7191C2.93179 11.9844 2.71482 12.1989 2.44649 12.1989C2.17815 12.1989 1.96118 11.9844 1.96118 11.7191Z" fill="#666666"/>
                          <path d="M3.90308 11.7191C3.90308 11.4538 4.12005 11.2393 4.38838 11.2393C4.65672 11.2393 4.87369 11.4538 4.87369 11.7191C4.87369 11.9844 4.65672 12.1989 4.38838 12.1989C4.12005 12.1989 3.90308 11.9844 3.90308 11.7191Z" fill="#666666"/>
                          <path d="M5.84448 11.7191C5.84448 11.4538 6.06145 11.2393 6.32979 11.2393C6.59812 11.2393 6.81509 11.4538 6.81509 11.7191C6.81509 11.9844 6.59812 12.1989 6.32979 12.1989C6.06145 12.1989 5.84448 11.9844 5.84448 11.7191Z" fill="#666666"/>
                          <path d="M7.78564 11.7191C7.78564 11.4538 8.00261 11.2393 8.27095 11.2393C8.53929 11.2393 8.75625 11.4538 8.75625 11.7191C8.75625 11.9844 8.53929 12.1989 8.27095 12.1989C8.00261 12.1989 7.78564 11.9844 7.78564 11.7191Z" fill="#666666"/>
                          <path d="M9.72754 11.7191C9.72754 11.4538 9.94451 11.2393 10.2128 11.2393C10.4812 11.2393 10.6981 11.4538 10.6981 11.7191C10.6981 11.9844 10.4812 12.1989 10.2128 12.1989C9.94451 12.1989 9.72754 11.9844 9.72754 11.7191Z" fill="#666666"/>
                          <path d="M11.6687 11.7191C11.6687 11.4538 11.8857 11.2393 12.154 11.2393C12.4223 11.2393 12.6393 11.4538 12.6393 11.7191C12.6393 11.9844 12.4223 12.1989 12.154 12.1989C11.8857 12.1989 11.6687 11.9844 11.6687 11.7191Z" fill="#666666"/>
                          <path d="M1.96118 13.1585C1.96118 12.8933 2.17815 12.6787 2.44649 12.6787C2.71482 12.6787 2.93179 12.8933 2.93179 13.1585C2.93179 13.4238 2.71482 13.6383 2.44649 13.6383C2.17815 13.6383 1.96118 13.4238 1.96118 13.1585Z" fill="#666666"/>
                          <path d="M3.90308 13.1585C3.90308 12.8933 4.12005 12.6787 4.38838 12.6787C4.65672 12.6787 4.87369 12.8933 4.87369 13.1585C4.87369 13.4238 4.65672 13.6383 4.38838 13.6383C4.12005 13.6383 3.90308 13.4238 3.90308 13.1585Z" fill="#666666"/>
                          <path d="M5.84448 13.1585C5.84448 12.8933 6.06145 12.6787 6.32979 12.6787C6.59812 12.6787 6.81509 12.8933 6.81509 13.1585C6.81509 13.4238 6.59812 13.6383 6.32979 13.6383C6.06145 13.6383 5.84448 13.4238 5.84448 13.1585Z" fill="#666666"/>
                          <path d="M7.78564 13.1585C7.78564 12.8933 8.00261 12.6787 8.27095 12.6787C8.53929 12.6787 8.75625 12.8933 8.75625 13.1585C8.75625 13.4238 8.53929 13.6383 8.27095 13.6383C8.00261 13.6383 7.78564 13.4238 7.78564 13.1585Z" fill="#666666"/>
                          <path d="M9.72754 14.5987C9.72754 14.3334 9.94451 14.1189 10.2128 14.1189C10.4812 14.1189 10.6981 14.3334 10.6981 14.5987C10.6981 14.864 10.4812 15.0785 10.2128 15.0785C9.94451 15.0785 9.72754 14.864 9.72754 14.5987Z" fill="#666666"/>
                          <path d="M9.72754 13.1585C9.72754 12.8933 9.94451 12.6787 10.2128 12.6787C10.4812 12.6787 10.6981 12.8933 10.6981 13.1585C10.6981 13.4238 10.4812 13.6383 10.2128 13.6383C9.94451 13.6383 9.72754 13.4238 9.72754 13.1585Z" fill="#666666"/>
                          <path d="M11.6687 13.1585C11.6687 12.8933 11.8857 12.6787 12.154 12.6787C12.4223 12.6787 12.6393 12.8933 12.6393 13.1585C12.6393 13.4238 12.4223 13.6383 12.154 13.6383C11.8857 13.6383 11.6687 13.4238 11.6687 13.1585Z" fill="#666666"/>
                          <path d="M1.96118 14.5987C1.96118 14.3334 2.17815 14.1189 2.44649 14.1189C2.71482 14.1189 2.93179 14.3334 2.93179 14.5987C2.93179 14.864 2.71482 15.0785 2.44649 15.0785C2.17815 15.0785 1.96118 14.864 1.96118 14.5987Z" fill="#666666"/>
                          <path d="M11.6687 14.5987C11.6687 14.3334 11.8857 14.1189 12.154 14.1189C12.4223 14.1189 12.6393 14.3334 12.6393 14.5987C12.6393 14.864 12.4223 15.0785 12.154 15.0785C11.8857 15.0785 11.6687 14.864 11.6687 14.5987Z" fill="#666666"/>
                          <path d="M7.52113 1.90556C6.83802 2.33609 6.17638 1.30751 6.85872 0.876976C8.70334 -0.286525 10.6407 -0.29941 12.4838 0.876976C13.1669 1.31054 12.4992 2.33836 11.8168 1.90556C10.387 0.992947 8.95481 1.00204 7.52113 1.90556ZM5.01257 4.99736C4.33406 5.48778 4.4621 6.28593 5.26021 6.54668C5.72098 7.14851 6.24308 7.24478 6.85182 7.18414C7.06649 7.3797 7.51116 7.23947 7.4552 6.86957L6.93232 3.51475C6.85566 3.02282 6.91546 2.59835 7.07569 2.24362C6.82269 2.20875 6.59269 2.04654 6.46082 1.83279C6.21395 2.32169 6.11351 2.91898 6.22315 3.62314L6.27682 3.96575C5.68494 4.08172 5.26481 4.27425 5.0118 4.99812L5.01257 4.99736ZM12.2484 2.24741C12.4156 2.6029 12.4861 3.02737 12.421 3.52157L11.9303 7.23189L10.0903 7.65333C9.63102 7.75717 9.79049 8.44769 10.2497 8.34309L12.5751 7.81099L12.6571 7.19475C13.1953 7.22128 13.6653 7.09091 14.0831 6.5444C14.882 6.28517 15.0092 5.48626 14.3307 4.99509C14.0785 4.27955 13.6653 4.08324 13.0834 3.96802L13.1301 3.61329C13.2221 2.91746 13.1117 2.32775 12.8626 1.84264C12.7246 2.05488 12.5038 2.21481 12.2484 2.24665V2.24741Z" fill="#666666"/>
                          <path d="M13.0442 9.29208H1.54945C0.693841 9.29208 0 9.97806 0 10.824V15.4681C0 16.314 0.693841 17 1.54945 17H13.0442C13.8998 17 14.5929 16.314 14.5929 15.4681V10.824C14.5929 9.97806 13.8998 9.29208 13.0442 9.29208ZM13.5962 15.4681C13.5962 15.7698 13.3486 16.0146 13.0442 16.0146H1.54945C1.24431 16.0146 0.996678 15.7698 0.996678 15.4681V10.824C0.996678 10.523 1.24431 10.2782 1.54945 10.2782H13.0442C13.3486 10.2782 13.5962 10.523 13.5962 10.824V15.4681Z" fill="#666666"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_543_699">
                            <rect width="21" height="17" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>`,
                    linkTo: '/acessorios-gamer/kit-gamer',
                  },
                  // {
                  //   name: 'Monitor Gamer',
                  //   iconSvg: ``,
                  //   linkTo: '/acessorios-gamer/monitor',
                  // },
                  {
                    name: 'Adaptadores',
                    iconSvg: 
                    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <g clip-path="url(#clip0_545_722)">
                        <mask id="mask0_545_722" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                          <path d="M16 0H0V16H16V0Z" fill="white"/>
                        </mask>
                        <g mask="url(#mask0_545_722)">
                          <path d="M4.25065 12.25C3.47507 12.25 2.84424 11.6192 2.84424 10.8436V9.74597C2.84424 9.48664 3.05411 9.27676 3.31344 9.27676C3.57277 9.27676 3.78265 9.48664 3.78265 9.74597V10.8436C3.78265 11.1017 3.99252 11.3128 4.25185 11.3128C4.51118 11.3128 4.72106 11.1029 4.72106 10.8436V9.74597C4.72106 9.48664 4.93093 9.27676 5.19026 9.27676C5.44959 9.27676 5.65947 9.48664 5.65947 9.74597V10.8436C5.65947 11.6192 5.02863 12.25 4.25306 12.25H4.25065Z" fill="#828282"/>
                          <path d="M4.25054 10.3756C2.44127 10.3756 0.969727 8.90405 0.969727 7.09477V3.34475C0.969727 3.08542 1.1796 2.87555 1.43893 2.87555H7.06336C7.32269 2.87555 7.53256 3.08542 7.53256 3.34475V7.09477C7.53256 8.90405 6.06102 10.3756 4.25175 10.3756H4.25054ZM1.90572 3.81275V7.09357C1.90572 8.38539 2.95751 9.43718 4.24933 9.43718C5.54116 9.43718 6.59295 8.38539 6.59295 7.09357V3.81275H1.90572Z" fill="#828282"/>
                          <path d="M6.12497 3.81274C5.86564 3.81274 5.65577 3.60286 5.65577 3.34354V0.937203H2.84295V3.34354C2.84295 3.60286 2.63307 3.81274 2.37375 3.81274C2.11442 3.81274 1.90454 3.60286 1.90454 3.34354V0.469205C1.90575 0.209876 2.11562 0 2.37495 0H6.12497C6.3843 0 6.59418 0.209876 6.59418 0.469205V3.34474C6.59418 3.60407 6.3843 3.81395 6.12497 3.81395V3.81274Z" fill="#828282"/>
                          <path d="M4.25045 3.81274C3.99113 3.81274 3.78125 3.60286 3.78125 3.34354V0.469205C3.78125 0.209876 3.99113 0 4.25045 0C4.50978 0 4.71966 0.209876 4.71966 0.469205V3.34474C4.71966 3.60407 4.50978 3.81395 4.25045 3.81395V3.81274Z" fill="#828282"/>
                          <path d="M13.6251 16H11.7507C11.4914 16 11.2815 15.7901 11.2815 15.5308V13.6564C11.2815 13.3971 11.4914 13.1872 11.7507 13.1872C12.01 13.1872 12.2199 13.3971 12.2199 13.6564V15.0628H13.1571V13.6564C13.1571 13.3971 13.367 13.1872 13.6263 13.1872C13.8856 13.1872 14.0955 13.3971 14.0955 13.6564V15.5308C14.0955 15.7901 13.8856 16 13.6263 16H13.6251Z" fill="#828282"/>
                          <path d="M14.5622 14.1244H10.8122C10.5529 14.1244 10.343 13.9145 10.343 13.6552V11.7808C10.343 10.489 11.3948 9.43716 12.6866 9.43716C13.9784 9.43716 15.0302 10.489 15.0302 11.7808V13.6552C15.0302 13.9145 14.8204 14.1244 14.561 14.1244H14.5622ZM11.2814 13.1872H14.0942V11.7808C14.0942 11.0052 13.4634 10.3744 12.6878 10.3744C11.9123 10.3744 11.2814 11.0052 11.2814 11.7808V13.1872Z" fill="#828282"/>
                          <path d="M5.18785 5.68716H3.31344C3.05411 5.68716 2.84424 5.47728 2.84424 5.21795C2.84424 4.95862 3.05411 4.74875 3.31344 4.74875H5.18785C5.44718 4.74875 5.65705 4.95862 5.65705 5.21795C5.65705 5.47728 5.44718 5.68716 5.18785 5.68716Z" fill="#828282"/>
                          <path d="M5.18785 7.56277H3.31344C3.05411 7.56277 2.84424 7.35289 2.84424 7.09356C2.84424 6.83424 3.05411 6.62436 3.31344 6.62436H5.18785C5.44718 6.62436 5.65705 6.83424 5.65705 7.09356C5.65705 7.35289 5.44718 7.56277 5.18785 7.56277Z" fill="#828282"/>
                          <path d="M6.59407 16C5.04292 16 3.78125 14.7383 3.78125 13.1872V11.7808C3.78125 11.5215 3.99113 11.3116 4.25045 11.3116C4.50978 11.3116 4.71966 11.5215 4.71966 11.7808V13.1872C4.71966 14.2209 5.56037 15.0616 6.59407 15.0616C7.62776 15.0616 8.46847 14.2209 8.46847 13.1872V2.44373C8.46847 1.88044 8.65784 1.32681 9.0016 0.886549C9.36105 0.425788 9.86523 0.12183 10.4213 0.0313663C11.1088 -0.0808086 11.8048 0.110974 12.3295 0.557262C12.8541 1.00355 13.1557 1.65489 13.1557 2.34362V9.90638C13.1557 10.1657 12.9458 10.3756 12.6865 10.3756C12.4272 10.3756 12.2173 10.1657 12.2173 9.90638V2.34362C12.2173 1.9299 12.0364 1.5403 11.7215 1.27132C11.4019 0.99993 10.9942 0.887755 10.5721 0.956508C9.90745 1.06506 9.40568 1.70434 9.40568 2.44373V13.1872C9.40568 14.7383 8.14401 16 6.59286 16H6.59407Z" fill="#828282"/>
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_545_722">
                          <rect width="16" height="16" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>`,
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
                    iconSvg:
                      `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                          <g clip-path="url(#clip0_539_562)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.60042 6.14669C6.14512 5.51582 5.51537 4.89262 4.80031 4.27325C3.84082 3.97603 2.41932 6.08725 2.68579 7.32694C2.71743 7.47076 2.85354 7.57526 3.00115 7.5791C4.18781 7.6069 5.37542 7.628 5.87961 7.79962C5.86907 7.72579 5.86523 7.65293 5.86523 7.57526C5.86523 6.9837 6.15279 6.46117 6.60042 6.14669ZM7.07969 9.24928C6.51607 9.06711 6.10966 8.62895 5.94862 8.10738C5.20672 8.34228 4.42169 8.75168 3.60982 9.23874C3.03182 10.0585 4.5971 12.0652 5.8614 12.1946C6.00805 12.209 6.14896 12.1141 6.19784 11.9741C6.58988 10.8495 6.97904 9.72963 7.29727 9.30201C7.2273 9.29147 7.15062 9.27037 7.07969 9.24928ZM7.61838 6.47939C7.02697 6.47939 6.55058 6.95877 6.55058 7.54746C6.55058 8.13615 7.02697 8.61553 7.61838 8.61553C8.20979 8.61553 8.68234 8.13902 8.68234 7.54746C8.68234 6.9559 8.20596 6.47939 7.61838 6.47939ZM6.33012 2.80153C6.20359 2.87824 6.148 3.03643 6.19017 3.18025C6.53333 4.31831 6.87648 5.4535 6.86977 5.98562C6.93591 5.95398 7.00588 5.92617 7.07969 5.90125C7.63947 5.71908 8.22417 5.83509 8.66222 6.16012C9.12423 5.53308 9.5201 4.73826 9.89105 3.86961C9.87667 2.86481 7.42955 2.16395 6.33012 2.80153ZM11.3653 10.2895C10.4202 9.56855 9.47121 8.85331 9.1664 8.41898C9.13189 8.48226 9.08972 8.54842 9.04371 8.60786C8.69672 9.08437 8.15803 9.33653 7.61167 9.33269C7.60783 10.1103 7.75161 10.9818 7.96536 11.9032C8.56732 12.7085 10.9588 11.8399 11.4736 10.6779C11.5292 10.5417 11.4803 10.3806 11.3653 10.2895ZM11.764 4.87152C11.648 4.77373 11.4803 4.7699 11.3576 4.85427C10.3809 5.5302 9.40699 6.20997 8.89993 6.36721C8.95265 6.41994 9.00153 6.47939 9.04371 6.54267C9.39357 7.01918 9.46354 7.61074 9.28909 8.12943C10.0281 8.37488 10.9033 8.50432 11.8455 8.58869C12.7983 8.2627 12.7101 5.72004 11.765 4.87248L11.764 4.87152ZM11.764 4.87152C11.648 4.77373 11.4803 4.7699 11.3576 4.85427C10.3809 5.5302 9.40699 6.20997 8.89993 6.36721C8.95265 6.41994 9.00153 6.47939 9.04371 6.54267C9.39357 7.01918 9.46354 7.61074 9.28909 8.12943C10.0281 8.37488 10.9033 8.50432 11.8455 8.58869C12.7983 8.2627 12.7101 5.72004 11.765 4.87248L11.764 4.87152ZM9.1664 8.41898C9.13189 8.48226 9.08972 8.54842 9.04371 8.60786C8.69672 9.08437 8.15803 9.33653 7.61167 9.33269C7.60783 10.1103 7.75161 10.9818 7.96536 11.9032C8.56732 12.7085 10.9588 11.8399 11.4736 10.6779C11.5292 10.5417 11.4803 10.3806 11.3653 10.2895C10.4202 9.56855 9.47121 8.85331 9.1664 8.41898ZM6.86977 5.98562C6.93591 5.95398 7.00588 5.92617 7.07969 5.90125C7.63947 5.71908 8.22417 5.83509 8.66222 6.16012C9.12423 5.53308 9.5201 4.73826 9.89105 3.86961C9.87667 2.86481 7.42955 2.16395 6.33012 2.80153C6.20359 2.87824 6.148 3.03643 6.19017 3.18025C6.53333 4.31831 6.87648 5.4535 6.86977 5.98562ZM7.61838 6.47939C7.02697 6.47939 6.55058 6.95877 6.55058 7.54746C6.55058 8.13615 7.02697 8.61553 7.61838 8.61553C8.20979 8.61553 8.68234 8.13902 8.68234 7.54746C8.68234 6.9559 8.20596 6.47939 7.61838 6.47939ZM5.94862 8.10738C5.20672 8.34228 4.42169 8.75168 3.60982 9.23874C3.03182 10.0585 4.5971 12.0652 5.8614 12.1946C6.00805 12.209 6.14896 12.1141 6.19784 11.9741C6.58988 10.8495 6.97904 9.72963 7.29727 9.30201C7.2273 9.29147 7.15062 9.27037 7.07969 9.24928C6.51607 9.06711 6.10966 8.62895 5.94862 8.10738ZM5.86427 7.57526C5.86427 6.9837 6.15183 6.46117 6.59946 6.14669C6.14416 5.51582 5.51441 4.89262 4.79935 4.27325C3.83986 3.97603 2.41837 6.08725 2.68484 7.32694C2.71647 7.47076 2.85258 7.57526 3.00019 7.5791C4.18685 7.6069 5.37446 7.628 5.87865 7.79962C5.86811 7.72579 5.86427 7.65293 5.86427 7.57526ZM11.5896 0H3.41044C1.52693 0 0 1.52733 0 3.40748V11.5887C0 13.4727 1.52693 15 3.41044 15H11.5896C13.4731 15 15 13.4727 15 11.5887V3.40748C15 1.52637 13.4731 0 11.5896 0ZM12.4992 1.80729C12.7475 1.80729 12.9478 2.00671 12.9478 2.25599C12.9478 2.50527 12.7484 2.7047 12.4992 2.7047C12.25 2.7047 12.0506 2.50144 12.0506 2.25599C12.0506 2.01055 12.25 1.80729 12.4992 1.80729ZM2.19215 1.80729C2.44041 1.80729 2.64074 2.00671 2.64074 2.25599C2.64074 2.50527 2.44137 2.7047 2.19215 2.7047C1.94294 2.7047 1.74356 2.50144 1.74356 2.25599C1.74356 2.01055 1.94294 1.80729 2.19215 1.80729ZM2.19215 13.2071C1.94389 13.2071 1.74356 13.0077 1.74356 12.7584C1.74356 12.5091 1.94294 12.3097 2.19215 12.3097C2.44137 12.3097 2.64074 12.5129 2.64074 12.7584C2.64074 13.0038 2.44137 13.2071 2.19215 13.2071ZM12.4992 13.2071C12.2509 13.2071 12.0506 13.0077 12.0506 12.7584C12.0506 12.5091 12.25 12.3097 12.4992 12.3097C12.7484 12.3097 12.9478 12.5129 12.9478 12.7584C12.9478 13.0038 12.7484 13.2071 12.4992 13.2071ZM7.49952 13.6337C4.11017 13.6337 1.36494 10.8878 1.36494 7.4976C1.36494 4.10738 4.11017 1.36242 7.49952 1.36242C10.8889 1.36242 13.6341 4.10834 13.6341 7.49856C13.6341 10.8888 10.8889 13.6347 7.49952 13.6347V13.6337ZM11.3586 4.85427C10.3818 5.5302 9.40795 6.20997 8.90089 6.36721C8.95361 6.41994 9.00249 6.47939 9.04467 6.54267C9.39453 7.01918 9.4645 7.61074 9.29005 8.12943C10.0291 8.37488 10.9042 8.50432 11.8464 8.58869C12.7992 8.2627 12.711 5.72004 11.7659 4.87248C11.6499 4.77469 11.4822 4.77085 11.3595 4.85523L11.3586 4.85427ZM9.1664 8.41898C9.13189 8.48226 9.08972 8.54842 9.04371 8.60786C8.69672 9.08437 8.15803 9.33653 7.61167 9.33269C7.60783 10.1103 7.75161 10.9818 7.96536 11.9032C8.56732 12.7085 10.9588 11.8399 11.4736 10.6779C11.5292 10.5417 11.4803 10.3806 11.3653 10.2895C10.4202 9.56855 9.47121 8.85331 9.1664 8.41898ZM6.86977 5.98562C6.93591 5.95398 7.00588 5.92617 7.07969 5.90125C7.63947 5.71908 8.22417 5.83509 8.66222 6.16012C9.12423 5.53308 9.5201 4.73826 9.89105 3.86961C9.87667 2.86481 7.42955 2.16395 6.33012 2.80153C6.20359 2.87824 6.148 3.03643 6.19017 3.18025C6.53333 4.31831 6.87648 5.4535 6.86977 5.98562ZM8.6833 7.54746C8.6833 6.95877 8.20691 6.47939 7.61934 6.47939C7.03176 6.47939 6.55154 6.95877 6.55154 7.54746C6.55154 8.13615 7.02793 8.61553 7.61934 8.61553C8.21075 8.61553 8.6833 8.13902 8.6833 7.54746ZM5.94862 8.10738C5.20672 8.34228 4.42169 8.75168 3.60982 9.23874C3.03182 10.0585 4.5971 12.0652 5.8614 12.1946C6.00805 12.209 6.14896 12.1141 6.19784 11.9741C6.58988 10.8495 6.97904 9.72963 7.29727 9.30201C7.2273 9.29147 7.15062 9.27037 7.07969 9.24928C6.51607 9.06711 6.10966 8.62895 5.94862 8.10738ZM5.86427 7.57526C5.86427 6.9837 6.15183 6.46117 6.59946 6.14669C6.14416 5.51582 5.51441 4.89262 4.79935 4.27325C3.83986 3.97603 2.41837 6.08725 2.68484 7.32694C2.71647 7.47076 2.85258 7.57526 3.00019 7.5791C4.18685 7.6069 5.37446 7.628 5.87865 7.79962C5.86811 7.72579 5.86427 7.65293 5.86427 7.57526ZM6.60042 6.14669C6.14512 5.51582 5.51537 4.89262 4.80031 4.27325C3.84082 3.97603 2.41932 6.08725 2.68579 7.32694C2.71743 7.47076 2.85354 7.57526 3.00115 7.5791C4.18781 7.6069 5.37542 7.628 5.87961 7.79962C5.86907 7.72579 5.86523 7.65293 5.86523 7.57526C5.86523 6.9837 6.15279 6.46117 6.60042 6.14669ZM7.07969 9.24928C6.51607 9.06711 6.10966 8.62895 5.94862 8.10738C5.20672 8.34228 4.42169 8.75168 3.60982 9.23874C3.03182 10.0585 4.5971 12.0652 5.8614 12.1946C6.00805 12.209 6.14896 12.1141 6.19784 11.9741C6.58988 10.8495 6.97904 9.72963 7.29727 9.30201C7.2273 9.29147 7.15062 9.27037 7.07969 9.24928ZM7.61838 6.47939C7.02697 6.47939 6.55058 6.95877 6.55058 7.54746C6.55058 8.13615 7.02697 8.61553 7.61838 8.61553C8.20979 8.61553 8.68234 8.13902 8.68234 7.54746C8.68234 6.9559 8.20596 6.47939 7.61838 6.47939ZM6.33012 2.80153C6.20359 2.87824 6.148 3.03643 6.19017 3.18025C6.53333 4.31831 6.87648 5.4535 6.86977 5.98562C6.93591 5.95398 7.00588 5.92617 7.07969 5.90125C7.63947 5.71908 8.22417 5.83509 8.66222 6.16012C9.12423 5.53308 9.5201 4.73826 9.89105 3.86961C9.87667 2.86481 7.42955 2.16395 6.33012 2.80153ZM11.3653 10.2895C10.4202 9.56855 9.47121 8.85331 9.1664 8.41898C9.13189 8.48226 9.08972 8.54842 9.04371 8.60786C8.69672 9.08437 8.15803 9.33653 7.61167 9.33269C7.60783 10.1103 7.75161 10.9818 7.96536 11.9032C8.56732 12.7085 10.9588 11.8399 11.4736 10.6779C11.5292 10.5417 11.4803 10.3806 11.3653 10.2895ZM11.764 4.87152C11.648 4.77373 11.4803 4.7699 11.3576 4.85427C10.3809 5.5302 9.40699 6.20997 8.89993 6.36721C8.95265 6.41994 9.00153 6.47939 9.04371 6.54267C9.39357 7.01918 9.46354 7.61074 9.28909 8.12943C10.0281 8.37488 10.9033 8.50432 11.8455 8.58869C12.7983 8.2627 12.7101 5.72004 11.765 4.87248L11.764 4.87152ZM11.764 4.87152C11.648 4.77373 11.4803 4.7699 11.3576 4.85427C10.3809 5.5302 9.40699 6.20997 8.89993 6.36721C8.95265 6.41994 9.00153 6.47939 9.04371 6.54267C9.39357 7.01918 9.46354 7.61074 9.28909 8.12943C10.0281 8.37488 10.9033 8.50432 11.8455 8.58869C12.7983 8.2627 12.7101 5.72004 11.765 4.87248L11.764 4.87152ZM11.3653 10.2895C10.4202 9.56855 9.47121 8.85331 9.1664 8.41898C9.13189 8.48226 9.08972 8.54842 9.04371 8.60786C8.69672 9.08437 8.15803 9.33653 7.61167 9.33269C7.60783 10.1103 7.75161 10.9818 7.96536 11.9032C8.56732 12.7085 10.9588 11.8399 11.4736 10.6779C11.5292 10.5417 11.4803 10.3806 11.3653 10.2895ZM6.33012 2.80153C6.20359 2.87824 6.148 3.03643 6.19017 3.18025C6.53333 4.31831 6.87648 5.4535 6.86977 5.98562C6.93591 5.95398 7.00588 5.92617 7.07969 5.90125C7.63947 5.71908 8.22417 5.83509 8.66222 6.16012C9.12423 5.53308 9.5201 4.73826 9.89105 3.86961C9.87667 2.86481 7.42955 2.16395 6.33012 2.80153ZM7.61838 6.47939C7.02697 6.47939 6.55058 6.95877 6.55058 7.54746C6.55058 8.13615 7.02697 8.61553 7.61838 8.61553C8.20979 8.61553 8.68234 8.13902 8.68234 7.54746C8.68234 6.9559 8.20596 6.47939 7.61838 6.47939ZM7.07969 9.24928C6.51607 9.06711 6.10966 8.62895 5.94862 8.10738C5.20672 8.34228 4.42169 8.75168 3.60982 9.23874C3.03182 10.0585 4.5971 12.0652 5.8614 12.1946C6.00805 12.209 6.14896 12.1141 6.19784 11.9741C6.58988 10.8495 6.97904 9.72963 7.29727 9.30201C7.2273 9.29147 7.15062 9.27037 7.07969 9.24928ZM6.60042 6.14669C6.14512 5.51582 5.51537 4.89262 4.80031 4.27325C3.84082 3.97603 2.41932 6.08725 2.68579 7.32694C2.71743 7.47076 2.85354 7.57526 3.00115 7.5791C4.18781 7.6069 5.37542 7.628 5.87961 7.79962C5.86907 7.72579 5.86523 7.65293 5.86523 7.57526C5.86523 6.9837 6.15279 6.46117 6.60042 6.14669Z" fill="#828282"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.87861 7.79961C5.37442 7.62799 4.18777 7.6069 3.00015 7.5791C2.8535 7.57526 2.71643 7.47075 2.6848 7.32694C2.41832 6.08724 3.83982 3.97507 4.79931 4.27325C5.51341 4.89357 6.14412 5.51678 6.59942 6.14669C6.15083 6.46213 5.86423 6.9837 5.86423 7.57526C5.86423 7.65196 5.86807 7.72579 5.87861 7.79961Z" fill="#828282"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.07961 9.24929C7.14958 9.27038 7.22626 9.29148 7.29719 9.30202C6.97896 9.72963 6.5898 10.8504 6.19776 11.9741C6.14888 12.1141 6.00893 12.209 5.86132 12.1946C4.59702 12.0652 3.0327 10.0585 3.60974 9.23874C4.42161 8.75169 5.20664 8.34229 5.94855 8.10739C6.10958 8.62896 6.51599 9.06712 7.07961 9.24929Z" fill="#828282"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.68328 7.54747C8.68328 8.13904 8.20689 8.61555 7.61931 8.61555C7.03174 8.61555 6.55151 8.13904 6.55151 7.54747C6.55151 6.95591 7.0279 6.4794 7.61931 6.4794C8.21073 6.4794 8.68328 6.95879 8.68328 7.54747Z" fill="#828282"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.19009 3.18024C6.14791 3.03643 6.20446 2.87919 6.33003 2.80153C7.42946 2.16394 9.87658 2.86481 9.89096 3.8696C9.52001 4.73825 9.12414 5.53307 8.66213 6.16011C8.22408 5.83413 7.63938 5.71907 7.0796 5.90124C7.00579 5.92617 6.93582 5.95397 6.86968 5.98561C6.87639 5.45349 6.53324 4.31831 6.19009 3.18024Z" fill="#828282"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3652 10.2895C11.4812 10.3806 11.5301 10.5417 11.4736 10.6778C10.9588 11.8408 8.5673 12.7095 7.96534 11.9032C7.75159 10.9818 7.60781 10.1103 7.61165 9.33269C8.15801 9.33652 8.6967 9.08436 9.04369 8.60785C9.08874 8.54841 9.13091 8.48225 9.16638 8.41898C9.47119 8.8533 10.4201 9.56759 11.3652 10.2895Z" fill="#828282"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8445 8.58773C10.9022 8.50336 10.0271 8.37392 9.28809 8.12848C9.4635 7.60978 9.39353 7.01822 9.0427 6.54171C9.00053 6.47843 8.95164 6.41899 8.89893 6.36625C9.40695 6.20901 10.3799 5.52924 11.3566 4.85331C11.4793 4.76894 11.647 4.77277 11.763 4.87057C12.7081 5.71812 12.7963 8.26079 11.8435 8.58677L11.8445 8.58773Z" fill="#828282"/>
                            <path d="M8.68328 7.54744C8.68328 8.13901 8.20689 8.61552 7.61931 8.61552C7.03174 8.61552 6.55151 8.13901 6.55151 7.54744C6.55151 6.95588 7.0279 6.47937 7.61931 6.47937C8.21073 6.47937 8.68328 6.95876 8.68328 7.54744Z" fill="#828282"/>
                            <path d="M5.86423 7.57526C5.86423 7.65196 5.86807 7.72579 5.87861 7.79961C5.37442 7.62799 4.18777 7.6069 3.00015 7.5791C2.8535 7.57526 2.71643 7.47075 2.6848 7.32694C2.41832 6.08724 3.83982 3.97507 4.79931 4.27325C5.51341 4.89357 6.14412 5.51678 6.59942 6.14669C6.15083 6.46213 5.86423 6.9837 5.86423 7.57526Z" fill="#828282"/>
                            <path d="M7.29622 9.30199C6.97799 9.7296 6.58882 10.8504 6.19679 11.9741C6.1479 12.1141 6.00796 12.209 5.86034 12.1946C4.59604 12.0652 3.03173 10.0585 3.60876 9.23871C4.42063 8.75166 5.20567 8.34226 5.94757 8.10736C6.1086 8.62893 6.51502 9.06709 7.07863 9.24926C7.1486 9.27035 7.22529 9.29145 7.29622 9.30199Z" fill="#828282"/>
                            <path d="M11.4736 10.6778C10.9588 11.8408 8.5673 12.7095 7.96534 11.9032C7.75159 10.9818 7.60781 10.1103 7.61165 9.33269C8.15801 9.33652 8.6967 9.08436 9.04369 8.60785C9.08874 8.54841 9.13091 8.48225 9.16638 8.41898C9.47119 8.8533 10.4201 9.56759 11.3652 10.2895C11.4812 10.3806 11.5301 10.5417 11.4736 10.6778Z" fill="#828282"/>
                            <path d="M11.8445 8.58773C10.9022 8.50336 10.0271 8.37392 9.28809 8.12848C9.4635 7.60978 9.39353 7.01822 9.0427 6.54171C9.00053 6.47843 8.95164 6.41899 8.89893 6.36625C9.40695 6.20901 10.3799 5.52924 11.3566 4.85331C11.4793 4.76894 11.647 4.77277 11.763 4.87057C12.7081 5.71812 12.7963 8.26079 11.8435 8.58677L11.8445 8.58773Z" fill="#828282"/>
                            <path d="M9.89096 3.8696C9.52001 4.73825 9.12414 5.53307 8.66213 6.16011C8.22408 5.83413 7.63938 5.71907 7.0796 5.90124C7.00579 5.92617 6.93582 5.95397 6.86968 5.98561C6.87639 5.45349 6.53324 4.31831 6.19009 3.18024C6.14791 3.03643 6.20446 2.87919 6.33003 2.80153C7.42946 2.16394 9.87658 2.86481 9.89096 3.8696Z" fill="#828282"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_539_562">
                              <rect width="15" height="15" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>`,
                    linkTo: '/hardware/cooler',
                  },
                  {
                    name: 'Fonte',
                    iconSvg:
                      `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="11" viewBox="0 0 17 11" fill="none">
                        <g clip-path="url(#clip0_537_315)">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.26923 1.22222H13.7308C14.8141 1.22222 15.6923 2.0431 15.6923 3.05556V7.94444C15.6923 8.95687 14.8141 9.77778 13.7308 9.77778H3.26923C2.18591 9.77778 1.30769 8.95687 1.30769 7.94444V3.05556C1.30769 2.0431 2.18591 1.22222 3.26923 1.22222ZM0 3.05556C0 1.36799 1.46369 0 3.26923 0H13.7308C15.5363 0 17 1.36799 17 3.05556V7.94444C17 9.63203 15.5363 11 13.7308 11H3.26923C1.46369 11 0 9.63203 0 7.94444V3.05556ZM4.57692 3.66667H6.53846C6.89958 3.66667 7.19231 3.94029 7.19231 4.27778V6.72222C7.19231 7.05968 6.89958 7.33333 6.53846 7.33333H4.57692C4.21582 7.33333 3.92308 7.05968 3.92308 6.72222V4.27778C3.92308 3.94029 4.21582 3.66667 4.57692 3.66667ZM2.61538 4.27778C2.61538 3.26533 3.4936 2.44444 4.57692 2.44444H6.53846C7.62182 2.44444 8.5 3.26533 8.5 4.27778V6.72222C8.5 7.73465 7.62182 8.55556 6.53846 8.55556H4.57692C3.4936 8.55556 2.61538 7.73465 2.61538 6.72222V4.27778ZM10.4615 3.97222C10.4615 3.466 10.9007 3.05556 11.4423 3.05556H12.75C13.2916 3.05556 13.7308 3.466 13.7308 3.97222C13.7308 4.47845 13.2916 4.88889 12.75 4.88889H11.4423C10.9007 4.88889 10.4615 4.47845 10.4615 3.97222ZM11.4423 6.11111C10.9007 6.11111 10.4615 6.52153 10.4615 7.02778C10.4615 7.53402 10.9007 7.94444 11.4423 7.94444H12.75C13.2916 7.94444 13.7308 7.53402 13.7308 7.02778C13.7308 6.52153 13.2916 6.11111 12.75 6.11111H11.4423Z" fill="#828282"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_537_315">
                            <rect width="17" height="11" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>`,
                    linkTo: '/hardware/fonte',
                  },
                  {
                    name: 'HD',
                    iconSvg:
                      `<svg xmlns="http://www.w3.org/2000/svg" width="23" height="16" viewBox="0 0 23 16" fill="none">
                        <g clip-path="url(#clip0_537_305)">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M20.3462 1.77778H2.65385C2.16532 1.77778 1.76923 2.17578 1.76923 2.66667V13.3333C1.76923 13.8242 2.16532 14.2222 2.65385 14.2222H20.3462C20.8347 14.2222 21.2308 13.8242 21.2308 13.3333V2.66667C21.2308 2.17578 20.8347 1.77778 20.3462 1.77778ZM2.65385 0C1.18816 0 0 1.1939 0 2.66667V13.3333C0 14.8061 1.18816 16 2.65385 16H20.3462C21.8118 16 23 14.8061 23 13.3333V2.66667C23 1.1939 21.8118 0 20.3462 0H2.65385ZM14.1538 11.5556C16.108 11.5556 17.6923 9.96364 17.6923 8C17.6923 6.03636 16.108 4.44444 14.1538 4.44444C12.1996 4.44444 10.6154 6.03636 10.6154 8C10.6154 8.30698 10.654 8.6048 10.7268 8.88889H13.2692V10.6667H11.8134C12.4371 11.2198 13.2565 11.5556 14.1538 11.5556ZM9.55628 10.6667C10.474 12.2608 12.1892 13.3333 14.1538 13.3333C17.0852 13.3333 19.4615 10.9455 19.4615 8C19.4615 5.05449 17.0852 2.66667 14.1538 2.66667C11.2225 2.66667 8.84615 5.05449 8.84615 8C8.84615 8.30284 8.87132 8.59982 8.91958 8.88889H5.30769V10.6667H9.55628Z" fill="#828282"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_537_305">
                            <rect width="23" height="16" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>`,
                    linkTo: '/hardware/hd',
                  },
                  {
                    name: 'SSD',
                    iconSvg:
                      `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
                        <g clip-path="url(#clip0_503_6)">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1538 1.23077H1.84615C1.50628 1.23077 1.23077 1.50631 1.23077 1.84615V2.46154H2.46154C3.14127 2.46154 3.69231 3.01262 3.69231 3.69231V7.38462C3.69231 8.06431 3.14127 8.61539 2.46154 8.61539H1.23077V9.23077C1.23077 9.57059 1.50628 9.84615 1.84615 9.84615H14.1538C14.4937 9.84615 14.7692 9.57059 14.7692 9.23077V1.84615C14.7692 1.50631 14.4937 1.23077 14.1538 1.23077ZM1.23077 7.38462V3.69231H2.46154V7.38462H1.23077ZM0 1.84615V2.46154V3.69231V7.38462V8.61539V9.23077C0 10.2503 0.826548 11.0769 1.84615 11.0769H14.1538C15.1735 11.0769 16 10.2503 16 9.23077V1.84615C16 0.826622 15.1735 0 14.1538 0H1.84615C0.826548 0 0 0.826622 0 1.84615ZM6.76923 3.69231C7.10911 3.69231 7.38462 3.41677 7.38462 3.07692C7.38462 2.73708 7.10911 2.46154 6.76923 2.46154C6.42935 2.46154 6.15385 2.73708 6.15385 3.07692C6.15385 3.41677 6.42935 3.69231 6.76923 3.69231ZM7.38462 8C7.38462 8.33982 7.10911 8.61539 6.76923 8.61539C6.42935 8.61539 6.15385 8.33982 6.15385 8C6.15385 7.66018 6.42935 7.38462 6.76923 7.38462C7.10911 7.38462 7.38462 7.66018 7.38462 8ZM12.9231 3.69231C13.263 3.69231 13.5385 3.41677 13.5385 3.07692C13.5385 2.73708 13.263 2.46154 12.9231 2.46154C12.5832 2.46154 12.3077 2.73708 12.3077 3.07692C12.3077 3.41677 12.5832 3.69231 12.9231 3.69231ZM13.5385 8C13.5385 8.33982 13.263 8.61539 12.9231 8.61539C12.5832 8.61539 12.3077 8.33982 12.3077 8C12.3077 7.66018 12.5832 7.38462 12.9231 7.38462C13.263 7.38462 13.5385 7.66018 13.5385 8ZM8.61539 4.30769H11.0769V6.76923H8.61539V4.30769ZM7.38462 4.30769C7.38462 3.62801 7.93563 3.07692 8.61539 3.07692H11.0769C11.7567 3.07692 12.3077 3.62801 12.3077 4.30769V6.76923C12.3077 7.44892 11.7567 8 11.0769 8H8.61539C7.93563 8 7.38462 7.44892 7.38462 6.76923V4.30769Z" fill="#828282"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_503_6">
                            <rect width="16" height="11.0769" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>`,
                    linkTo: '/hardware/ssd',
                  },
                  // {
                  //   name: 'Placa de rede',
                  //   iconSvg:
                  //     ``,
                  //   linkTo: '/hardware/placa-de-rede',
                  // },
                  {
                    name: 'Placa mãe',
                    iconSvg:
                      `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <g clip-path="url(#clip0_537_136)">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.27273 0.909091H7.72727C8.48039 0.909091 9.09091 1.51961 9.09091 2.27273V4.63673C8.46357 4.7982 8 5.3677 8 6.04548V7.75002C8 8.49055 7.39968 9.09091 6.65909 9.09091H2.27273C1.51961 9.09091 0.909091 8.48039 0.909091 7.72727V5.45455H2.27273C2.52375 5.45455 2.72727 5.25102 2.72727 5C2.72727 4.74898 2.52375 4.54545 2.27273 4.54545H0.909091V4.09091H2.27273C2.52375 4.09091 2.72727 3.88739 2.72727 3.63636C2.72727 3.38534 2.52375 3.18182 2.27273 3.18182H0.909091V2.72727H2.27273C2.52375 2.72727 2.72727 2.52375 2.72727 2.27273C2.72727 2.02171 2.52375 1.81818 2.27273 1.81818H0.986661C1.17387 1.28856 1.67897 0.909091 2.27273 0.909091ZM0 2.27273C0 1.01751 1.01751 0 2.27273 0H7.72727C8.98248 0 10 1.01751 10 2.27273V4.95455C10 5.2558 9.7558 5.5 9.45457 5.5C9.15327 5.5 8.90909 5.74418 8.90909 6.04548V7.75002C8.90909 8.99264 7.90173 10 6.65909 10H2.27273C1.01751 10 0 8.98248 0 7.72727V2.27273ZM4.09091 2.27273C4.09091 2.52375 3.88739 2.72727 3.63636 2.72727C3.38534 2.72727 3.18182 2.52375 3.18182 2.27273C3.18182 2.02171 3.38534 1.81818 3.63636 1.81818C3.88739 1.81818 4.09091 2.02171 4.09091 2.27273ZM3.63636 4.09091C3.88739 4.09091 4.09091 3.88739 4.09091 3.63636C4.09091 3.38534 3.88739 3.18182 3.63636 3.18182C3.38534 3.18182 3.18182 3.38534 3.18182 3.63636C3.18182 3.88739 3.38534 4.09091 3.63636 4.09091ZM4.09091 5C4.09091 5.25102 3.88739 5.45455 3.63636 5.45455C3.38534 5.45455 3.18182 5.25102 3.18182 5C3.18182 4.74898 3.38534 4.54545 3.63636 4.54545C3.88739 4.54545 4.09091 4.74898 4.09091 5ZM7.27273 6.36364C7.27273 6.11261 7.0692 5.90909 6.81818 5.90909C6.56716 5.90909 6.36364 6.11261 6.36364 6.36364V8.18182C6.36364 8.43284 6.56716 8.63636 6.81818 8.63636C7.0692 8.63636 7.27273 8.43284 7.27273 8.18182V6.36364ZM5.45455 5.90909C5.70557 5.90909 5.90909 6.11261 5.90909 6.36364V8.18182C5.90909 8.43284 5.70557 8.63636 5.45455 8.63636C5.20352 8.63636 5 8.43284 5 8.18182V6.36364C5 6.11261 5.20352 5.90909 5.45455 5.90909ZM5 2.27273C5 2.02171 5.20352 1.81818 5.45455 1.81818H6.81818C7.0692 1.81818 7.27273 2.02171 7.27273 2.27273V3.63636C7.27273 3.88739 7.0692 4.09091 6.81818 4.09091H5.45455C5.20352 4.09091 5 3.88739 5 3.63636V2.27273Z" fill="#828282"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_537_136">
                            <rect width="10" height="10" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>`,
                    linkTo: '/hardware/placa-mae',
                  },
                  // {
                  //   name: 'Kit Upgrade',
                  //   iconSvg:
                  //     ``,
                  //   linkTo: '/hardware/kit-upgrade',
                  // },
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

                <MenuItem
                  rounded='rounded-t-lg'
                  iconSvg={`
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="17" viewBox="0 0 13 17" fill="none">
                      <g clip-path="url(#clip0_539_613)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.43809 1.54499H10.5633C11.0114 1.54499 11.3755 1.89132 11.3755 2.31748V14.6812C11.3755 15.1074 11.0114 15.4537 10.5633 15.4537H2.43809C1.99 15.4537 1.62585 15.1074 1.62585 14.6812V2.31877C1.62585 1.89261 1.99 1.54627 2.43809 1.54627V1.54499ZM0 2.31877C0 1.03772 1.09112 0 2.43809 0H10.5633C11.9089 0 13.0014 1.03772 13.0014 2.31877V14.6825C13.0014 15.9623 11.9102 17.0013 10.5633 17.0013H2.43809C1.09247 17.0013 0 15.9636 0 14.6825V2.31877Z" fill="#828282"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.50062 8.55408C4.66901 8.55408 3.1853 9.96645 3.1853 11.7071C3.1853 13.4478 4.67036 14.8602 6.50062 14.8602C8.33088 14.8602 9.81594 13.4478 9.81594 11.7071C9.81594 9.96645 8.33088 8.55408 6.50062 8.55408ZM6.50062 9.45532C6.80657 9.45532 7.09762 9.51068 7.36566 9.60982L5.83052 11.0698L4.82604 10.1145C5.25518 9.70638 5.84676 9.45532 6.50062 9.45532ZM4.13157 11.7071C4.13157 11.4162 4.18978 11.1394 4.29402 10.8844L5.82916 12.3444L4.82469 13.2998C4.39555 12.8916 4.13157 12.329 4.13157 11.7071ZM6.50062 13.9602C6.19467 13.9602 5.90362 13.9049 5.63558 13.8057L7.17072 12.3457L8.1752 13.301C7.74607 13.7092 7.15448 13.9602 6.50062 13.9602ZM8.70587 12.5311L7.17072 11.0711L8.1752 10.1158C8.60434 10.5239 8.86832 11.0866 8.86832 11.7084C8.86832 11.9994 8.81011 12.2762 8.70587 12.5311Z" fill="#828282"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.50062 1.85913C4.66901 1.85913 3.1853 3.27151 3.1853 5.01219C3.1853 6.75288 4.67036 8.16525 6.50062 8.16525C8.33088 8.16525 9.81594 6.75288 9.81594 5.01219C9.81594 3.27151 8.33088 1.85913 6.50062 1.85913ZM6.50062 2.76037C6.80657 2.76037 7.09762 2.81573 7.36566 2.91487L5.83052 4.37488L4.82604 3.41957C5.25518 3.01143 5.84676 2.76037 6.50062 2.76037ZM4.13157 5.01219C4.13157 4.72122 4.18978 4.44441 4.29402 4.18949L5.82916 5.6495L4.82469 6.60481C4.39555 6.19668 4.13157 5.63405 4.13157 5.01219ZM6.50062 7.2653C6.19467 7.2653 5.90362 7.20993 5.63558 7.1108L7.17072 5.65079L8.1752 6.6061C7.74607 7.01424 7.15448 7.2653 6.50062 7.2653ZM8.70587 5.83618L7.17072 4.37617L8.1752 3.42085C8.60434 3.82899 8.86832 4.39162 8.86832 5.01348C8.86832 5.30445 8.81011 5.58126 8.70587 5.83618Z" fill="#828282"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_539_613">
                          <rect width="13" height="17" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  `}
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
                  iconSvg={`
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="17" viewBox="0 0 12 17" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 1.54545H9.75C10.1642 1.54545 10.5 1.89144 10.5 2.31818V14.6818C10.5 15.1085 10.1642 15.4545 9.75 15.4545H2.25C1.83579 15.4545 1.5 15.1085 1.5 14.6818V2.31818C1.5 1.89144 1.83579 1.54545 2.25 1.54545ZM0 2.31818C0 1.03797 1.00736 0 2.25 0H9.75C10.9927 0 12 1.03797 12 2.31818V14.6818C12 15.962 10.9927 17 9.75 17H2.25C1.00736 17 0 15.962 0 14.6818V2.31818ZM3.75 3.09091C3.33579 3.09091 3 3.4369 3 3.86364C3 4.29037 3.33579 4.63636 3.75 4.63636H8.25C8.66422 4.63636 9 4.29037 9 3.86364C9 3.4369 8.66422 3.09091 8.25 3.09091H3.75ZM3 6.95455C3 6.52781 3.33579 6.18182 3.75 6.18182H6H8.25C8.66422 6.18182 9 6.52781 9 6.95455C9 7.38128 8.66422 7.72727 8.25 7.72727H3.75C3.33579 7.72727 3 7.38128 3 6.95455ZM3.75 11.5909C3.33579 11.5909 3 11.9369 3 12.3636C3 12.7903 3.33579 13.1364 3.75 13.1364H5.25C5.66421 13.1364 6 12.7903 6 12.3636C6 11.9369 5.66421 11.5909 5.25 11.5909H3.75Z" fill="#828282"/>
                    </svg>
                  `}
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
                  iconSvg={`
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="17" viewBox="0 0 12 17" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 1.54545H9.75C10.1642 1.54545 10.5 1.89144 10.5 2.31818V14.6818C10.5 15.1085 10.1642 15.4545 9.75 15.4545H2.25C1.83579 15.4545 1.5 15.1085 1.5 14.6818V2.31818C1.5 1.89144 1.83579 1.54545 2.25 1.54545ZM0 2.31818C0 1.03797 1.00736 0 2.25 0H9.75C10.9927 0 12 1.03797 12 2.31818V14.6818C12 15.962 10.9927 17 9.75 17H2.25C1.00736 17 0 15.962 0 14.6818V2.31818ZM3.75 3.09091C3.33579 3.09091 3 3.4369 3 3.86364C3 4.29037 3.33579 4.63636 3.75 4.63636H8.25C8.66422 4.63636 9 4.29037 9 3.86364C9 3.4369 8.66422 3.09091 8.25 3.09091H3.75ZM3 6.95455C3 6.52781 3.33579 6.18182 3.75 6.18182H6H8.25C8.66422 6.18182 9 6.52781 9 6.95455C9 7.38128 8.66422 7.72727 8.25 7.72727H3.75C3.33579 7.72727 3 7.38128 3 6.95455ZM3.75 11.5909C3.33579 11.5909 3 11.9369 3 12.3636C3 12.7903 3.33579 13.1364 3.75 13.1364H5.25C5.66421 13.1364 6 12.7903 6 12.3636C6 11.9369 5.66421 11.5909 5.25 11.5909H3.75Z" fill="#828282"/>
                    </svg>
                  `}
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
                  iconSvg={`
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path d="M4.39058 4.176C3.40208 4.806 2.44508 3.3015 3.43208 2.6715C6.10058 0.968997 8.90258 0.950997 11.5681 2.6715C12.5566 3.306 11.5906 4.809 10.6036 4.176C8.53508 2.841 6.46358 2.8545 4.39058 4.176ZM0.762083 8.6985C-0.218917 9.4155 -0.0344172 10.584 1.12058 10.965C1.78658 11.8455 2.54258 11.9865 3.42308 11.898C3.73358 12.1845 4.37708 11.979 4.29608 11.4375L3.54008 6.5295C3.42908 5.8095 3.51608 5.1885 3.74708 4.6695C3.38108 4.6185 3.04808 4.3815 2.85758 4.068C2.50058 4.7835 2.35508 5.6565 2.51408 6.687L2.59208 7.188C1.73558 7.3575 1.12808 7.6395 0.762083 8.6985ZM11.2276 4.6755C11.4691 5.196 11.5711 5.817 11.4766 6.54L10.7671 11.9685L8.10608 12.585C7.44158 12.7365 7.67258 13.7475 8.33708 13.5945L11.7001 12.816L11.8186 11.9145C12.5971 11.9535 13.2766 11.763 13.8811 10.9635C15.0361 10.584 15.2206 9.4155 14.2396 8.697C13.8751 7.65 13.2766 7.3635 12.4351 7.194L12.5026 6.675C12.6361 5.6565 12.4756 4.794 12.1156 4.0845C11.9161 4.395 11.5966 4.629 11.2276 4.6755Z" fill="#828282"/>
                    </svg>
                  `}
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
                  iconSvg={`
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="11" viewBox="0 0 16 11" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.28571 0H1.14286V1.65H0.571429C0.255859 1.65 0 1.89627 0 2.2V3.3C0 3.60374 0.255859 3.85 0.571429 3.85H1.14286V4.95H0.571429C0.255859 4.95 0 5.19626 0 5.5V8.8C0 9.10374 0.255859 9.35 0.571429 9.35H1.14286V9.9V11H2.28571H10.2857C10.9169 11 11.4286 10.5075 11.4286 9.9V8.8H14.8571C15.4883 8.8 16 8.30753 16 7.7V3.85C16 2.33119 14.7208 1.1 13.1429 1.1H4C3.3568 1.1 2.76325 1.30457 2.28571 1.6498V0ZM2.28571 3.85V7.7H10.2857H11.4286H14.8571V3.85C14.8571 2.93873 14.0896 2.2 13.1429 2.2H4C3.05323 2.2 2.28571 2.93873 2.28571 3.85ZM10.2857 8.8H2.28571V9.9H10.2857V8.8ZM5.71429 6.6C6.66106 6.6 7.42857 5.86127 7.42857 4.95C7.42857 4.03873 6.66106 3.3 5.71429 3.3C4.76751 3.3 4 4.03873 4 4.95C4 5.86127 4.76751 6.6 5.71429 6.6ZM13.1429 4.95C13.1429 5.86127 12.3753 6.6 11.4286 6.6C10.4818 6.6 9.71429 5.86127 9.71429 4.95C9.71429 4.03873 10.4818 3.3 11.4286 3.3C12.3753 3.3 13.1429 4.03873 13.1429 4.95Z" fill="#828282"/>
                    </svg>
                  `}
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
                  href='/para-sua-empresa'
                >
                  <div className='flex gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="17" viewBox="0 0 12 17" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 1.54545H9.75C10.1642 1.54545 10.5 1.89144 10.5 2.31818V14.6818C10.5 15.1085 10.1642 15.4545 9.75 15.4545H2.25C1.83579 15.4545 1.5 15.1085 1.5 14.6818V2.31818C1.5 1.89144 1.83579 1.54545 2.25 1.54545ZM0 2.31818C0 1.03797 1.00736 0 2.25 0H9.75C10.9927 0 12 1.03797 12 2.31818V14.6818C12 15.962 10.9927 17 9.75 17H2.25C1.00736 17 0 15.962 0 14.6818V2.31818ZM3.75 3.09091C3.33579 3.09091 3 3.4369 3 3.86364C3 4.29037 3.33579 4.63636 3.75 4.63636H8.25C8.66422 4.63636 9 4.29037 9 3.86364C9 3.4369 8.66422 3.09091 8.25 3.09091H3.75ZM3 6.95455C3 6.52781 3.33579 6.18182 3.75 6.18182H6H8.25C8.66422 6.18182 9 6.52781 9 6.95455C9 7.38128 8.66422 7.72727 8.25 7.72727H3.75C3.33579 7.72727 3 7.38128 3 6.95455ZM3.75 11.5909C3.33579 11.5909 3 11.9369 3 12.3636C3 12.7903 3.33579 13.1364 3.75 13.1364H5.25C5.66421 13.1364 6 12.7903 6 12.3636C6 11.9369 5.66421 11.5909 5.25 11.5909H3.75Z" fill="#828282"/>
                    </svg>
                    <span>Para sua empresa</span>
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
      <div className='h-28'/>
    </>
  )
}

export default HeaderSHP
