import { useEffect, useRef, useState, useCallback } from 'preact/hooks'
import MenuItem from './MenuItem.tsx'
import MenuItemDesk from './MenuItemDesktop.tsx'
import Image from 'deco-sites/std/components/Image.tsx'

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
    
    // deno-lint-ignore no-window-prefix
    window.addEventListener('resize', handleResize)

    return () => {
      // deno-lint-ignore no-window-prefix
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const close = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {
    if (close.current) {
      close.current.addEventListener('click', closeClickHandler);
    }
    
    return () => {
      if (close.current) {
        close.current.removeEventListener('click', closeClickHandler);
      }
    }
  }, [closeClickHandler])

  const [menuMobileClass, setMenuMobileClass] = useState('hidden')

  const handleClick = useCallback(() => {
    setMenuMobileClass('flex flex-col w-[80%] h-screen absolute top-0 bg-zinc-800')
  }, [])

  const divInputSearchMobile = useRef<HTMLDivElement>(null)

  const [search, setSearch] = useState('hidden')

  //useEffect input search
  useEffect(() => {
    if (window.innerWidth <= 768) {
      const outsideClick = (event: MouseEvent) => {
        if (divInputSearchMobile.current && event.target) {
          if (
            !divInputSearchMobile.current.contains(event.target as Node) &&
            search === ' '
          ) {
            setSearch('hidden')
            if (
              divInputSearchMobile.current.firstChild &&
              divInputSearchMobile.current.firstChild instanceof
                HTMLInputElement
            ) {
              divInputSearchMobile.current.firstChild.value = ''
            }
          }
        }
      }

      document.addEventListener('click', outsideClick)

      return () => {
        document.removeEventListener('click', outsideClick)
      }
    }
  }, [search])

  const handleOpenSearch = () => {
    if (window.innerWidth <= 768) {
      setSearch(' ')
    } else {
      // executa o search caso seja PC
    }
  }

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
    setOpenGamer('flex'), setBorderGamer('border-b-2 border-[#dd1f26]')
  }

  const [openOffice, setOpenOffice] = useState('hidden')
  const [borderOffice, setBorderOffice] = useState('')

  const officeHover = () => {
    openOffice === 'hidden' && hideAll()
    setOpenOffice('flex'), setBorderOffice('border-b-2 border-[#dd1f26]')
  }

  const [openWork, setOpenWork] = useState('hidden')
  const [borderWork, setBorderWork] = useState('')

  const workHover = () => {
    openWork === 'hidden' && hideAll()
    setOpenWork('flex'), setBorderWork('border-b-2 border-[#dd1f26]')
  }

  const [openPeri, setOpenPeri] = useState('hidden')
  const [borderPeri, setBorderPeri] = useState('')

  const periHover = () => {
    openPeri === 'hidden' && hideAll()
    setOpenPeri('flex'), setBorderPeri('border-b-2 border-[#dd1f26]')
  }

  const [openHard, setOpenHard] = useState('hidden')
  const [borderHard, setBorderHard] = useState('')

  const hardHover = () => {
    openHard === 'hidden' && hideAll()
    setOpenHard('flex'), setBorderHard('border-b-2 border-[#dd1f26]')
  }

  return (
    <div className='z-30 relative top-0'>
      <div className='w-screen h-16 flex p-4 re2:text-sm re3:text-base bg-zinc-900 items-center justify-center re1:py-4 re2:px-2 re3:px-4 re4:px-32 re5:px-52 re1:h-24 re1:justify-around'>
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
              <p className='font-bold text-white text-sm cursor-pointer'>
                PC Gamer
              </p>
            </div>

            <div onMouseOver={officeHover} className={borderOffice}>
              <p className='font-bold text-white text-sm cursor-pointer'>
                Home Office
              </p>
            </div>

            <div onMouseOver={workHover} className={borderWork}>
              <p className='font-bold text-white text-sm cursor-pointer'>
                Workstation
              </p>
            </div>

            <div onMouseOver={periHover} className={borderPeri}>
              <p className='font-bold text-white text-sm cursor-pointer'>
                Periféricos
              </p>
            </div>

            <div onMouseOver={hardHover} className={borderHard}>
              <p className='font-bold text-white text-sm cursor-pointer'>
                Hardware
              </p>
            </div>
          </div>
         )
        }

        <div className='flex flex-row gap-2 re1:ml-60'>
          <div className='flex flex-row-reverse'>
            <input
              type='text'
              name='search'
              placeholder='O que você procura...'
              className='hidden re1:block w-48 text-white bg-zinc-800 placeholder:text-neutral-600 
              p-2 border-neutral-600 border-[2px] outline-none top-[26px] rounded-lg focus:shadow-[0_0_5px_2px] focus:shadow-[#dd1f26]/30 
            focus:border-[#dd1f26] absolute focus:w-2/5 transition-all duration-700'
            />
          </div>

          <button onClick={handleOpenSearch} className='w-fit h-fit'>
            <Image
              src='https://shopinfo.vteximg.com.br/arquivos/icon-search.png'
              alt='lupinha' width={23} height={22} preload fetchPriority='high' loading='eager' decoding='sync'
            />
          </button>
        </div>

        <div className='hidden re1:block w-[2px] h-2/4 bg-neutral-600'></div>

        <div className='hidden re1:flex gap-2 items-center'>
          <a href='/teste' className='flex items-center gap-1'>
            <Image
              src='https://shopinfo.vteximg.com.br/arquivos/frete-icon.png'
              alt='caminhão' width={26} height={18} preload fetchPriority='high' loading='eager' decoding='sync'
            />
            <div className='hover:text-white text-neutral-500 font-bold text-sm'>
              Rastreio
            </div>
          </a>

          <a href='/teste' className='flex items-center gap-1'>
            <Image
              src='https://shopinfo.vteximg.com.br/arquivos/icon-user.png'
              alt='conta' width={21} height={25} preload fetchPriority='high' loading='eager' decoding='sync'
            />
            <div className='hover:text-white text-neutral-500 font-bold text-sm'>
              Minha Conta
            </div>
          </a>

          <a href='/teste' className='flex items-center gap-1'>
            <div className='hidden w-fit h-fit border-[#dd1f26] border-2 p-2 rounded-lg ml-0 re1:block'>
              <Image
                src='https://shopinfo.vteximg.com.br/arquivos/header__cart.png'
                alt='carrinho' width={24} height={20} preload fetchPriority='high' loading='eager' decoding='sync'
              />
            </div>
            <div className='hover:text-white text-neutral-500 font-bold text-sm'>
              Carrinho
            </div>
          </a>

          <Image
            src='https://shopinfo.vteximg.com.br/arquivos/heartRed.png'
            alt='favorito' height={24} width={24} preload fetchPriority='high' loading='eager' decoding='sync'
          />
        </div>

        <div className='w-fit h-fit border-[#dd1f26] border-2 p-2 rounded-lg ml-auto re1:hidden'>
          <Image
            src='https://shopinfo.vteximg.com.br/arquivos/header__cart.png'
            alt='carrinho' width={24} height={20} preload fetchPriority='high' loading='eager' decoding='sync'
          />
        </div>
      </div>

      <div
        ref={divInputSearchMobile}
        className={`flex w-full h-16 p-4 items-center justify-between absolute top-0 bg-zinc-900 z-[1] ${search} re1:hidden`}
      >
        <input
          type='text'
          name='search'
          placeholder='O que você procura...'
          className='placeholder:text-neutral-600 w-4/5 bg-zinc-900 outline-none p-4 text-white'
        />
        <Image
          src='https://shopinfo.vteximg.com.br/arquivos/icon-search.png'
          alt='lupinha' width={23} height={22} preload fetchPriority='high' loading='eager' decoding='sync'
        />
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
                  linkTo: '/pcgamer',
                },
                {
                  imgUrl:
                    'https://shopinfo.vteximg.com.br/arquivos/ids/160202/banner-menu-moba.png',
                  linkTo: '/pcgamer',
                },
                {
                  imgUrl:
                    'https://shopinfo.vteximg.com.br/arquivos/banner-menu-pc-stream.png',
                  linkTo: '/pcgamer',
                },
                {
                  imgUrl:
                    'https://shopinfo.vteximg.com.br/arquivos/ids/322885/banner-menu-setup-gamer.png',
                  linkTo: '/pcgamer',
                },
                {
                  imgUrl:
                    'https://shopinfo.vteximg.com.br/arquivos/ids/370491/banner-menu-vai-jogar-o-que.png',
                  linkTo: '/pcgamer',
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
                  linkTo: '/pcgamer',
                },
                {
                  imgUrl:
                    'https://shopinfo.vteximg.com.br/arquivos/banner-menu-escritorio-pchome.png',
                  linkTo: '/pcgamer',
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
                  linkTo: '/pcgamer',
                },
                {
                  imgUrl:
                    'https://shopinfo.vteximg.com.br/arquivos/banner-menu-arquitetura.png',
                  linkTo: '/pcgamer',
                },
                {
                  imgUrl:
                    'https://shopinfo.vteximg.com.br/arquivos/banner-menu-engenheiro.png',
                  linkTo: '/pcgamer',
                },
                {
                  imgUrl:
                    'https://shopinfo.vteximg.com.br/arquivos/banner-menu-modelagem3d.png',
                  linkTo: '/pcgamer',
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
                  linkTo: '/pcgamer',
                },
                {
                  imgUrl:
                    'https://shopinfo.vteximg.com.br/arquivos/banner-menu-acessorios-mouse.png',
                  linkTo: '/pcgamer',
                },
                {
                  imgUrl:
                    'https://shopinfo.vteximg.com.br/arquivos/banner-menu-acessorios-teclado.png',
                  linkTo: '/pcgamer',
                },
                {
                  imgUrl:
                    'https://shopinfo.vteximg.com.br/arquivos/banner-menu-acessorios-cadeira.png?v=637465887851700000',
                  linkTo: '/pcgamer',
                },
              ]}
              subCategsNoImg={[
                {
                  name: 'Mousepad Gamer',
                  iconUrl:
                    'https://shopinfo.vteximg.com.br/arquivos/menu-icons.png',
                  linkTo: '/teste',
                },
                {
                  name: 'Kit Gamer',
                  iconUrl:
                    'https://shopinfo.vteximg.com.br/arquivos/menu-icons.png',
                  linkTo: '/teste',
                },
                {
                  name: 'Monitor Gamer',
                  iconUrl: 'https://shopinfo.vteximg.com.br/arquivos/menu-icons.png',
                  linkTo: '/teste',
                },
                {
                  name: 'Adaptadores',
                  iconUrl: 'https://shopinfo.vteximg.com.br/arquivos/menu-icons.png',
                  linkTo: '/teste',
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
                  linkTo: '/pcgamer',
                },
                {
                  imgUrl:
                    'https://shopinfo.vteximg.com.br/arquivos/banner-menu-hardware--placadevideo.png',
                  linkTo: '/pcgamer',
                },
                {
                  imgUrl:
                    'https://shopinfo.vteximg.com.br/arquivos/banner-menu-hardware-memora.png',
                  linkTo: '/pcgamer',
                },
                {
                  imgUrl:
                    'https://shopinfo.vteximg.com.br/arquivos/banner-menu-hardware-gabinete.png',
                  linkTo: '/pcgamer',
                },
              ]}
              subCategsNoImg={[
                {
                  name: 'Cooler',
                  iconUrl:
                    'https://shopinfo.vteximg.com.br/arquivos/menu-icons.png',
                  linkTo: '/teste',
                },
                {
                  name: 'Fonte',
                  iconUrl:
                    'https://shopinfo.vteximg.com.br/arquivos/menu-icons.png',
                  linkTo: '/teste',
                },
                {
                  name: 'HD',
                  iconUrl:
                    'https://shopinfo.vteximg.com.br/arquivos/menu-icons.png',
                  linkTo: '/teste',
                },
                {
                  name: 'SSD',
                  iconUrl:
                    'https://shopinfo.vteximg.com.br/arquivos/menu-icons.png',
                  linkTo: '/teste',
                },
                {
                  name: 'Placa de rede',
                  iconUrl:
                    'https://shopinfo.vteximg.com.br/arquivos/menu-icons.png',
                  linkTo: '/teste',
                },
                {
                  name: 'Placa mãe',
                  iconUrl:
                    'https://shopinfo.vteximg.com.br/arquivos/menu-icons.png',
                  linkTo: '/teste',
                },
                {
                  name: 'Kit Upgrade',
                  iconUrl:
                    'https://shopinfo.vteximg.com.br/arquivos/menu-icons.png',
                  linkTo: '/teste',
                },
              ]}
            />
          </div>
        </>
      ) : (
        <>
          <div className={menuMobileClass}>
            <div className='bg-[#dd1f26] flex flex-col h-32 justify-between'>
              <div className='w-full justify-between flex p-2'>
                <p className='font-bold text-xl text-white'>
                  Entre ou Cadastre-se
                </p>
                <span
                  ref={close}
                  className='text-white font-extrabold cursor-pointer'
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
                  <p className='text-white'>Rastreio</p>
                </div>

                <div className='flex gap-2'>
                  <a href='https://api.whatsapp.com/send?phone=5519982013576'>
                    <img
                      src='https://shopinfo.vteximg.com.br/arquivos/icone-mobile-whatsappp.png'
                      alt='carrinho'
                    />
                  </a>

                  <p className='text-white'>Atendimento</p>
                </div>
              </div>
            </div>

            <div className='flex flex-col w-full h-screen overflow-y-auto scrollbar scrollbar-thin'>
              <a
                className='flex w-[95%] bg-neutral-700 rounded-lg border-2 border-transparent h-12 text-white font-bold justify-between p-5 my-[2px] mx-auto items-center'
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
                    link: '/pcgamer',
                  },
                  {
                    name: 'Start',
                    link: '/teste',
                  },
                ]}
              />

              <MenuItem
                iconLink='https://shopinfo.vteximg.com.br/arquivos/icone-mobile-pchome.png'
                itemName='Home Office'
                links={[
                  {
                    name: 'Ver tudo',
                    link: '/teste',
                  },
                  {
                    name: 'Acessórios',
                    link: '/teste',
                  },
                  {
                    name: 'PC Home',
                    link: 'https://www.shopinfo.com.br/solucoes/home',
                  },
                ]}
              />

              <MenuItem
                iconLink='https://shopinfo.vteximg.com.br/arquivos/icone-mobile-pchome.png'
                itemName='Workstation'
                links={[
                  {
                    name: 'Ver tudo',
                    link: '/teste',
                  },
                  {
                    name: 'PC para Edição',
                    link: '/teste',
                  },
                  {
                    name: 'PC para Arquitetura',
                    link: '/pcgamer',
                  },
                  {
                    name: 'PC para Engenharia',
                    link: '/pcgamer',
                  },
                  {
                    name: 'PC para Modelagem 3D e 2D',
                    link: '/pcgamer',
                  },
                ]}
              />

              <MenuItem
                iconLink='https://shopinfo.vteximg.com.br/arquivos/icone-mobile-perifericos.png'
                itemName='Periféricos'
                links={[
                  {
                    name: 'Ver tudo',
                    link: '/teste',
                  },
                  {
                    name: 'Headset Gamer',
                    link: '/teste',
                  },
                  {
                    name: 'Mouse Gamer',
                    link: '/teste',
                  },
                  {
                    name: 'Cadeira Gamer',
                    link: '/teste',
                  },
                  {
                    name: 'Mousepad Gamer',
                    link: '/teste',
                  },
                  {
                    name: 'Teclado Gamer',
                    link: '/teste',
                  },
                  {
                    name: 'Kit Gamer',
                    link: '/teste',
                  },
                  {
                    name: 'Monitor Gamer',
                    link: '/teste',
                  },
                  {
                    name: 'Adaptadores',
                    link: '/teste',
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
                    link: '/teste',
                  },
                  {
                    name: 'Cooler',
                    link: '/teste',
                  },
                  {
                    name: 'Fonte',
                    link: '/pcgamer',
                  },
                  {
                    name: 'Gabinete',
                    link: '/pcgamer',
                  },
                  {
                    name: 'HD',
                    link: '/pcgamer',
                  },
                  {
                    name: 'SSD',
                    link: '/pcgamer',
                  },
                  {
                    name: 'Memória',
                    link: '/pcgamer',
                  },
                  {
                    name: 'Placa de rede',
                    link: '/pcgamer',
                  },
                  {
                    name: 'Placa mãe',
                    link: '/pcgamer',
                  },
                  {
                    name: 'Kit Upgrade',
                    link: '/pcgamer',
                  },
                  {
                    name: 'Placa de vídeo',
                    link: '/pcgamer',
                  },
                  {
                    name: 'Processador',
                    link: '/pcgamer',
                  },
                ]}
              />

              <a
                className='flex w-[95%] bg-neutral-700 rounded-lg border-2 border-transparent h-12 text-[#53a752] font-bold justify-between p-5 my-[2px] mx-auto items-center'
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
                className='flex w-[95%] bg-neutral-700 rounded-lg border-2 border-transparent h-12 text-[#53a752] font-bold justify-between p-5 my-[2px] mx-auto items-center'
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
  )
}

export default HeaderSHP
