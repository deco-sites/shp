import { useEffect, useRef, useState } from 'preact/hooks'
import MenuItem from './MenuItem.tsx'
import MenuItemDesk from './MenuItemDesktop.tsx'
import Image from 'deco-sites/std/components/Image.tsx'

const HeaderSHP = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()

    // deno-lint-ignore no-window-prefix
    window.addEventListener('resize', handleResize)

    return () => {
      // deno-lint-ignore no-window-prefix
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const close = useRef<HTMLSpanElement>(null)
  close.current &&
    close.current.addEventListener('click', () => {
      setMenuMobileClass('hidden')
    })

  const [menuMobileClass, setMenuMobileClass] = useState('hidden')

  const handleClick = () => {
    setMenuMobileClass(
      'flex flex-col w-[80%] h-screen absolute top-0 bg-zinc-800'
    )
  }

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
                    'data:image/svg+xml base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyOCAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KPHRpdGxlPnYyPC90aXRsZT4KPGRlc2M+Q3JlYXRlZCB1c2luZyBGaWdtYTwvZGVzYz4KPGcgaWQ9IkNhbnZhcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTExMCAyMjM3KSI+CjxnIGlkPSJ2MiI+CjxnIGlkPSJSZWN0YW5nbGUgMy4xIj4KPG1hc2sgaWQ9Im1hc2swX291dGxpbmVfaW5zIj4KPHVzZSB4bGluazpocmVmPSIjcGF0aDBfZmlsbCIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDExMCAtMjIzNykiLz4KPC9tYXNrPgo8ZyBtYXNrPSJ1cmwoI21hc2swX291dGxpbmVfaW5zKSI+Cjx1c2UgeGxpbms6aHJlZj0iI3BhdGgxX3N0cm9rZV8yeCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTEwIC0yMjM3KSIgZmlsbD0iIzY2NjY2NiIvPgo8L2c+CjwvZz4KPGcgaWQ9Ikdyb3VwIj4KPGcgaWQ9IlJlY3RhbmdsZSAyIj4KPG1hc2sgaWQ9Im1hc2sxX291dGxpbmVfaW5zIj4KPHVzZSB4bGluazpocmVmPSIjcGF0aDJfZmlsbCIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0ibWF0cml4KDAuODY2MDI1IC0wLjUgMC41IDAuODY2MDI1IDEyMSAtMjIyOCkiLz4KPC9tYXNrPgo8ZyBtYXNrPSJ1cmwoI21hc2sxX291dGxpbmVfaW5zKSI+Cjx1c2UgeGxpbms6aHJlZj0iI3BhdGgzX3N0cm9rZV8yeCIgdHJhbnNmb3JtPSJtYXRyaXgoMC44NjYwMjUgLTAuNSAwLjUgMC44NjYwMjUgMTIxIC0yMjI4KSIgZmlsbD0iIzY2NjY2NiIvPgo8L2c+CjwvZz4KPGcgaWQ9IlJlY3RhbmdsZSAzIj4KPHVzZSB4bGluazpocmVmPSIjcGF0aDRfZmlsbCIgdHJhbnNmb3JtPSJtYXRyaXgoMC44NjYwMjUgLTAuNSAwLjUgMC44NjYwMjUgMTI0Ljk2NCAtMjIyOS4xMykiIGZpbGw9IiM2NjY2NjYiLz4KPC9nPgo8ZyBpZD0iUmVjdGFuZ2xlIDMuMSI+Cjx1c2UgeGxpbms6aHJlZj0iI3BhdGg1X2ZpbGwiIHRyYW5zZm9ybT0ibWF0cml4KC0wLjUgLTAuODY2MDI1IDAuODY2MDI1IC0wLjUgMTI1LjM2NiAtMjIyMi40NCkiIGZpbGw9IiM2NjY2NjYiLz4KPC9nPgo8L2c+CjwvZz4KPC9nPgo8ZGVmcz4KPHBhdGggaWQ9InBhdGgwX2ZpbGwiIGQ9Ik0gMCAzQyAwIDEuMzQzMTUgMS4zNDMxNSAwIDMgMEwgMjUgMEMgMjYuNjU2OSAwIDI4IDEuMzQzMTUgMjggM0wgMjggMTlDIDI4IDIwLjY1NjkgMjYuNjU2OSAyMiAyNSAyMkwgMyAyMkMgMS4zNDMxNSAyMiAwIDIwLjY1NjkgMCAxOUwgMCAzWiIvPgo8cGF0aCBpZD0icGF0aDFfc3Ryb2tlXzJ4IiBkPSJNIDMgMkwgMjUgMkwgMjUgLTJMIDMgLTJMIDMgMlpNIDI2IDNMIDI2IDE5TCAzMCAxOUwgMzAgM0wgMjYgM1pNIDI1IDIwTCAzIDIwTCAzIDI0TCAyNSAyNEwgMjUgMjBaTSAyIDE5TCAyIDNMIC0yIDNMIC0yIDE5TCAyIDE5Wk0gMyAyMEMgMi40NDc3MiAyMCAyIDE5LjU1MjMgMiAxOUwgLTIgMTlDIC0yIDIxLjc2MTQgMC4yMzg1NzcgMjQgMyAyNEwgMyAyMFpNIDI2IDE5QyAyNiAxOS41NTIzIDI1LjU1MjMgMjAgMjUgMjBMIDI1IDI0QyAyNy43NjE0IDI0IDMwIDIxLjc2MTQgMzAgMTlMIDI2IDE5Wk0gMjUgMkMgMjUuNTUyMyAyIDI2IDIuNDQ3NzIgMjYgM0wgMzAgM0MgMzAgMC4yMzg1NzYgMjcuNzYxNCAtMiAyNSAtMkwgMjUgMlpNIDMgLTJDIDAuMjM4NTc3IC0yIC0yIDAuMjM4NTc2IC0yIDNMIDIgM0MgMiAyLjQ0NzcyIDIuNDQ3NzIgMiAzIDJMIDMgLTJaIi8+CjxwYXRoIGlkPSJwYXRoMl9maWxsIiBkPSJNIDAuNDA4OTAzIDIuNzI2NjhDIDAuNDg5Mzg3IDEuOTczMzIgMS4wMDkwNCAxLjM0Njk1IDEuNzI2OTEgMS4xMDQ2N0wgNC4zNjA0NCAwLjIxNTg1QyA0Ljc3NTMyIDAuMDc1ODI5OCA1LjIyNDY4IDAuMDc1ODMgNS42Mzk1NiAwLjIxNTg1MUwgOC4yNzMwOSAxLjEwNDY3QyA4Ljk5MDk2IDEuMzQ2OTUgOS41MTA2MSAxLjk3MzMyIDkuNTkxMSAyLjcyNjY4QyA5LjczODY4IDQuMTA4MDYgOS45MjYxOCA2LjM3MjA2IDkuNzg4MzYgOEMgOS42MTgxMiAxMC4wMTEgNy45OTY0NiAxMiA1Ljk3ODMgMTJMIDQuMDIxNyAxMkMgMi4wMDM1NCAxMiAwLjM4MTg4MSAxMC4wMTEgMC4yMTE2NCA4QyAwLjA3MzgyNDggNi4zNzIwNiAwLjI2MTMyNSA0LjEwODA2IDAuNDA4OTAzIDIuNzI2NjhaIi8+CjxwYXRoIGlkPSJwYXRoM19zdHJva2VfMngiIGQ9Ik0gNC4zNjA0NCAwLjIxNTg1TCAzLjcyMDg5IC0xLjY3OTEzTCA0LjM2MDQ0IDAuMjE1ODVaTSAxLjcyNjkxIDEuMTA0NjdMIDEuMDg3MzUgLTAuNzkwMzE3TCAxLjcyNjkxIDEuMTA0NjdaTSA1Ljk3ODMgMTBMIDQuMDIxNyAxMEwgNC4wMjE3IDE0TCA1Ljk3ODMgMTRMIDUuOTc4MyAxMFpNIDIuMzY2NDcgMi45OTk2NUwgNSAyLjExMDg0TCAzLjcyMDg5IC0xLjY3OTEzTCAxLjA4NzM1IC0wLjc5MDMxN0wgMi4zNjY0NyAyLjk5OTY1Wk0gNSAyLjExMDg0TCA3LjYzMzUzIDIuOTk5NjVMIDguOTEyNjUgLTAuNzkwMzE3TCA2LjI3OTExIC0xLjY3OTEzTCA1IDIuMTEwODRaTSA3LjYwMjQxIDIuOTM5MTRDIDcuNzUwMjMgNC4zMjI3MiA3LjkxNTQxIDYuNDE0NzEgNy43OTU0OSA3LjgzMTI5TCAxMS43ODEyIDguMTY4NzFDIDExLjkzNjkgNi4zMjk0IDExLjcyNzEgMy44OTM0IDExLjU3OTggMi41MTQyM0wgNy42MDI0MSAyLjkzOTE0Wk0gMi4yMDQ1MSA3LjgzMTI5QyAyLjA4NDU5IDYuNDE0NzEgMi4yNDk3NyA0LjMyMjcyIDIuMzk3NTkgMi45MzkxNEwgLTEuNTc5NzggMi41MTQyM0MgLTEuNzI3MTIgMy44OTM0IC0xLjkzNjk0IDYuMzI5NCAtMS43ODEyMyA4LjE2ODcxTCAyLjIwNDUxIDcuODMxMjlaTSA1IDIuMTEwODRMIDUgMi4xMTA4NEwgNi4yNzkxMSAtMS42NzkxM0MgNS40NDkzNiAtMS45NTkxNyA0LjU1MDY0IC0xLjk1OTE4IDMuNzIwODkgLTEuNjc5MTNMIDUgMi4xMTA4NFpNIDQuMDIxNyAxMEMgMy42OTkxIDEwIDMuMjk1NyA5Ljg0MTExIDIuOTA1MTYgOS40MTA1MUMgMi41MDk4NSA4Ljk3NDY0IDIuMjUxMjYgOC4zODM1NCAyLjIwNDUxIDcuODMxMjlMIC0xLjc4MTIzIDguMTY4NzFDIC0xLjY1Nzc0IDkuNjI3NDIgLTEuMDIwMzggMTEuMDM2MyAtMC4wNTc3NjQyIDEyLjA5NzdDIDAuOTA5NjMgMTMuMTY0NCAyLjMyNjEzIDE0IDQuMDIxNyAxNEwgNC4wMjE3IDEwWk0gNS45NzgzIDE0QyA3LjY3Mzg3IDE0IDkuMDkwMzcgMTMuMTY0NCAxMC4wNTc4IDEyLjA5NzdDIDExLjAyMDQgMTEuMDM2MyAxMS42NTc3IDkuNjI3NDIgMTEuNzgxMiA4LjE2ODcxTCA3Ljc5NTQ5IDcuODMxMjlDIDcuNzQ4NzQgOC4zODM1NCA3LjQ5MDE1IDguOTc0NjQgNy4wOTQ4NCA5LjQxMDUxQyA2LjcwNDMgOS44NDExMSA2LjMwMDkgMTAgNS45NzgzIDEwTCA1Ljk3ODMgMTRaTSA3LjYzMzUzIDIuOTk5NjVDIDcuNjM1NDIgMy4wMDAyOSA3LjYzMDA3IDIuOTk4OSA3LjYyMjU1IDIuOTg5N0MgNy42MTg3IDIuOTg0OTkgNy42MTQxNCAyLjk3ODA1IDcuNjEwMTYgMi45Njg2M0MgNy42MDYwMyAyLjk1ODg2IDcuNjAzNDEgMi45NDg1MSA3LjYwMjQxIDIuOTM5MTRMIDExLjU3OTggMi41MTQyM0MgMTEuNDEzMyAwLjk1NTYwNCAxMC4zNDE3IC0wLjMwODAwMiA4LjkxMjY1IC0wLjc5MDMxN0wgNy42MzM1MyAyLjk5OTY1Wk0gMS4wODczNSAtMC43OTAzMTdDIC0wLjM0MTcyNiAtMC4zMDgwMDIgLTEuNDEzMjcgMC45NTU2MDQgLTEuNTc5NzggMi41MTQyM0wgMi4zOTc1OSAyLjkzOTE0QyAyLjM5NjU5IDIuOTQ4NTEgMi4zOTM5NyAyLjk1ODg2IDIuMzg5ODQgMi45Njg2M0MgMi4zODU4NiAyLjk3ODA1IDIuMzgxMyAyLjk4NDk5IDIuMzc3NDUgMi45ODk3QyAyLjM2OTkzIDIuOTk4OSAyLjM2NDU4IDMuMDAwMjkgMi4zNjY0NyAyLjk5OTY1TCAxLjA4NzM1IC0wLjc5MDMxN1oiLz4KPHBhdGggaWQ9InBhdGg0X2ZpbGwiIGQ9Ik0gMCAxQyAwIDAuNDQ3NzE1IDAuNDQ3NzE1IDAgMSAwQyAxLjU1MjI4IDAgMiAwLjQ0NzcxNSAyIDFMIDIgNUMgMiA1LjU1MjI4IDEuNTUyMjggNiAxIDZDIDAuNDQ3NzE1IDYgMCA1LjU1MjI4IDAgNUwgMCAxWiIvPgo8cGF0aCBpZD0icGF0aDVfZmlsbCIgZD0iTSAwIDFDIDAgMC40NDc3MTUgMC40NDc3MTUgMCAxIDBDIDEuNTUyMjggMCAyIDAuNDQ3NzE1IDIgMUwgMiA3QyAyIDcuNTUyMjggMS41NTIyOCA4IDEgOEMgMC40NDc3MTUgOCAwIDcuNTUyMjggMCA3TCAwIDFaIi8+CjwvZGVmcz4KPC9zdmc+Cg==',
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
                  iconUrl: '',
                  linkTo: '/teste',
                },
                {
                  name: 'Adaptadores',
                  iconUrl: '',
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
                    'data:image/svg+xml base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iNDQiIHZpZXdCb3g9IjAgMCA0NCA0NCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KPHRpdGxlPlVuaW9uPC90aXRsZT4KPGRlc2M+Q3JlYXRlZCB1c2luZyBGaWdtYTwvZGVzYz4KPGcgaWQ9IkNhbnZhcyIgdHJhbnNmb3JtPSJtYXRyaXgoMiAwIDAgMiAtMzE0IDQ3NjQpIj4KPGcgaWQ9IlVuaW9uIj4KPHVzZSB4bGluazpocmVmPSIjcGF0aDBfZmlsbCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTU3IC0yMzgyKSIgZmlsbD0iIzgyODI4MiIvPgo8L2c+CjwvZz4KPGRlZnM+CjxwYXRoIGlkPSJwYXRoMF9maWxsIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0gNSAyTCAxNyAyQyAxOC42NTY5IDIgMjAgMy4zNDMyNiAyMCA1TCAyMCAxN0MgMjAgMTguNjU2NyAxOC42NTY5IDIwIDE3IDIwTCA1IDIwQyAzLjM0MzE0IDIwIDIgMTguNjU2NyAyIDE3TCAyIDVDIDIgMy4zNDMyNiAzLjM0MzE0IDIgNSAyWk0gMCA1QyAwIDIuMjM4NTMgMi4yMzg1NyAwIDUgMEwgMTcgMEMgMTkuNzYxNCAwIDIyIDIuMjM4NTMgMjIgNUwgMjIgMTdDIDIyIDE5Ljc2MTUgMTkuNzYxNCAyMiAxNyAyMkwgNSAyMkMgMi4yMzg1NyAyMiAwIDE5Ljc2MTUgMCAxN0wgMCA1Wk0gMTQuNTM1NSAxNC41MzU2QyAxMy42MzA3IDE1LjQ0MDQgMTIuMzgwNyAxNiAxMSAxNkMgMTAuMzU1MiAxNiA5LjczODgzIDE1Ljg3NzkgOS4xNzI4NyAxNS42NTU4TCAxMi40MTQyIDEyLjQxNDNMIDE0LjUzNTUgMTQuNTM1NlpNIDkuNTg1NzggMTIuNDE0M0wgNy40NjQ0NiAxNC41MzU2QyA2LjU1OTY1IDEzLjYzMDkgNiAxMi4zODA2IDYgMTFDIDYgMTAuMzU1MiA2LjEyMjA2IDkuNzM4NzcgNi4zNDQzNSA5LjE3Mjg1TCA5LjU4NTc4IDEyLjQxNDNaTSA5LjU4NTc4IDkuNTg1NjlMIDEyLjgyNzEgNi4zNDQyNEMgMTIuMjYxMiA2LjEyMjA3IDExLjY0NDggNiAxMSA2QyA5LjYxOTI4IDYgOC4zNjkyOCA2LjU1OTU3IDcuNDY0NDYgNy40NjQzNkwgOS41ODU3OCA5LjU4NTY5Wk0gMTUuNjU1NyAxMi44MjcxTCAxMi40MTQyIDkuNTg1NjlMIDE0LjUzNTUgNy40NjQzNkMgMTUuNDQwNCA4LjM2OTE0IDE2IDkuNjE5MzggMTYgMTFDIDE2IDExLjY0NDggMTUuODc3OSAxMi4yNjEyIDE1LjY1NTcgMTIuODI3MVpNIDE4IDExQyAxOCAxNC44NjYgMTQuODY2IDE4IDExIDE4QyA3LjEzNCAxOCA0IDE0Ljg2NiA0IDExQyA0IDcuMTM0MDMgNy4xMzQgNCAxMSA0QyAxNC44NjYgNCAxOCA3LjEzNDAzIDE4IDExWiIvPgo8L2RlZnM+Cjwvc3ZnPgo=',
                  linkTo: '/teste',
                },
                {
                  name: 'Fonte',
                  iconUrl:
                    'data:image/svg+xml base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCA1MiAzNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KPHRpdGxlPlVuaW9uPC90aXRsZT4KPGRlc2M+Q3JlYXRlZCB1c2luZyBGaWdtYTwvZGVzYz4KPGcgaWQ9IkNhbnZhcyIgdHJhbnNmb3JtPSJtYXRyaXgoMiAwIDAgMiAtMjMwIDQ3NjApIj4KPGcgaWQ9IlVuaW9uIj4KPHVzZSB4bGluazpocmVmPSIjcGF0aDBfZmlsbCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTE1IC0yMzgwKSIgZmlsbD0iIzgyODI4MiIvPgo8L2c+CjwvZz4KPGRlZnM+CjxwYXRoIGlkPSJwYXRoMF9maWxsIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0gNSAyTCAyMSAyQyAyMi42NTY5IDIgMjQgMy4zNDMyNiAyNCA1TCAyNCAxM0MgMjQgMTQuNjU2NyAyMi42NTY5IDE2IDIxIDE2TCA1IDE2QyAzLjM0MzE1IDE2IDIgMTQuNjU2NyAyIDEzTCAyIDVDIDIgMy4zNDMyNiAzLjM0MzE1IDIgNSAyWk0gMCA1QyAwIDIuMjM4NTMgMi4yMzg1OCAwIDUgMEwgMjEgMEMgMjMuNzYxNCAwIDI2IDIuMjM4NTMgMjYgNUwgMjYgMTNDIDI2IDE1Ljc2MTUgMjMuNzYxNCAxOCAyMSAxOEwgNSAxOEMgMi4yMzg1OCAxOCAwIDE1Ljc2MTUgMCAxM0wgMCA1Wk0gNyA2TCAxMCA2QyAxMC41NTIzIDYgMTEgNi40NDc3NSAxMSA3TCAxMSAxMUMgMTEgMTEuNTUyMiAxMC41NTIzIDEyIDEwIDEyTCA3IDEyQyA2LjQ0NzcyIDEyIDYgMTEuNTUyMiA2IDExTCA2IDdDIDYgNi40NDc3NSA2LjQ0NzcyIDYgNyA2Wk0gNCA3QyA0IDUuMzQzMjYgNS4zNDMxNSA0IDcgNEwgMTAgNEMgMTEuNjU2OSA0IDEzIDUuMzQzMjYgMTMgN0wgMTMgMTFDIDEzIDEyLjY1NjcgMTEuNjU2OSAxNCAxMCAxNEwgNyAxNEMgNS4zNDMxNSAxNCA0IDEyLjY1NjcgNCAxMUwgNCA3Wk0gMTYgNi41QyAxNiA1LjY3MTYzIDE2LjY3MTYgNSAxNy41IDVMIDE5LjUgNUMgMjAuMzI4NCA1IDIxIDUuNjcxNjMgMjEgNi41QyAyMSA3LjMyODM3IDIwLjMyODQgOCAxOS41IDhMIDE3LjUgOEMgMTYuNjcxNiA4IDE2IDcuMzI4MzcgMTYgNi41Wk0gMTcuNSAxMEMgMTYuNjcxNiAxMCAxNiAxMC42NzE2IDE2IDExLjVDIDE2IDEyLjMyODQgMTYuNjcxNiAxMyAxNy41IDEzTCAxOS41IDEzQyAyMC4zMjg0IDEzIDIxIDEyLjMyODQgMjEgMTEuNUMgMjEgMTAuNjcxNiAyMC4zMjg0IDEwIDE5LjUgMTBMIDE3LjUgMTBaIi8+CjwvZGVmcz4KPC9zdmc+Cg==',
                  linkTo: '/teste',
                },
                {
                  name: 'HD',
                  iconUrl:
                    'data:image/svg+xml base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCA1MiAzNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KPHRpdGxlPlVuaW9uPC90aXRsZT4KPGRlc2M+Q3JlYXRlZCB1c2luZyBGaWdtYTwvZGVzYz4KPGcgaWQ9IkNhbnZhcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTk1NzAgLTE1MzgwKSI+CjxnIGlkPSJVbmlvbiI+Cjx1c2UgeGxpbms6aHJlZj0iI3BhdGgwX2ZpbGwiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDk1NzAgMTUzODApIiBmaWxsPSIjODI4MjgyIi8+CjwvZz4KPC9nPgo8ZGVmcz4KPHBhdGggaWQ9InBhdGgwX2ZpbGwiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTSA0NiA0TCA2IDRDIDQuODk1NTEgNCA0IDQuODk1NTEgNCA2TCA0IDMwQyA0IDMxLjEwNDUgNC44OTU1MSAzMiA2IDMyTCA0NiAzMkMgNDcuMTA0NSAzMiA0OCAzMS4xMDQ1IDQ4IDMwTCA0OCA2QyA0OCA0Ljg5NTUxIDQ3LjEwNDUgNCA0NiA0Wk0gNiAwQyAyLjY4NjI4IDAgMCAyLjY4NjI4IDAgNkwgMCAzMEMgMCAzMy4zMTM3IDIuNjg2MjggMzYgNiAzNkwgNDYgMzZDIDQ5LjMxMzcgMzYgNTIgMzMuMzEzNyA1MiAzMEwgNTIgNkMgNTIgMi42ODYyOCA0OS4zMTM3IDAgNDYgMEwgNiAwWk0gMzIgMjZDIDM2LjQxODIgMjYgNDAgMjIuNDE4MiA0MCAxOEMgNDAgMTMuNTgxOCAzNi40MTgyIDEwIDMyIDEwQyAyNy41ODE4IDEwIDI0IDEzLjU4MTggMjQgMThDIDI0IDE4LjY5MDcgMjQuMDg3NCAxOS4zNjA4IDI0LjI1MiAyMEwgMzAgMjBMIDMwIDI0TCAyNi43MDg1IDI0QyAyOC4xMTg3IDI1LjI0NDYgMjkuOTcxMiAyNiAzMiAyNlpNIDIxLjYwNTUgMjRDIDIzLjY4MDQgMjcuNTg2OSAyNy41NTgzIDMwIDMyIDMwQyAzOC42Mjc0IDMwIDQ0IDI0LjYyNzQgNDQgMThDIDQ0IDExLjM3MjYgMzguNjI3NCA2IDMyIDZDIDI1LjM3MjYgNiAyMCAxMS4zNzI2IDIwIDE4QyAyMCAxOC42ODE0IDIwLjA1NjkgMTkuMzQ5NiAyMC4xNjYgMjBMIDEyIDIwTCAxMiAyNEwgMjEuNjA1NSAyNFoiLz4KPC9kZWZzPgo8L3N2Zz4K',
                  linkTo: '/teste',
                },
                {
                  name: 'SSD',
                  iconUrl:
                    'data:image/svg+xml base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCA1MiAzNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KPHRpdGxlPlVuaW9uPC90aXRsZT4KPGRlc2M+Q3JlYXRlZCB1c2luZyBGaWdtYTwvZGVzYz4KPGcgaWQ9IkNhbnZhcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTk1NzAgLTE1MzgwKSI+CjxnIGlkPSJVbmlvbiI+Cjx1c2UgeGxpbms6aHJlZj0iI3BhdGgwX2ZpbGwiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDk1NzAgMTUzODApIiBmaWxsPSIjODI4MjgyIi8+CjwvZz4KPC9nPgo8ZGVmcz4KPHBhdGggaWQ9InBhdGgwX2ZpbGwiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTSA0NiA0TCA2IDRDIDQuODk1NTEgNCA0IDQuODk1NTEgNCA2TCA0IDMwQyA0IDMxLjEwNDUgNC44OTU1MSAzMiA2IDMyTCA0NiAzMkMgNDcuMTA0NSAzMiA0OCAzMS4xMDQ1IDQ4IDMwTCA0OCA2QyA0OCA0Ljg5NTUxIDQ3LjEwNDUgNCA0NiA0Wk0gNiAwQyAyLjY4NjI4IDAgMCAyLjY4NjI4IDAgNkwgMCAzMEMgMCAzMy4zMTM3IDIuNjg2MjggMzYgNiAzNkwgNDYgMzZDIDQ5LjMxMzcgMzYgNTIgMzMuMzEzNyA1MiAzMEwgNTIgNkMgNTIgMi42ODYyOCA0OS4zMTM3IDAgNDYgMEwgNiAwWk0gMzIgMjZDIDM2LjQxODIgMjYgNDAgMjIuNDE4MiA0MCAxOEMgNDAgMTMuNTgxOCAzNi40MTgyIDEwIDMyIDEwQyAyNy41ODE4IDEwIDI0IDEzLjU4MTggMjQgMThDIDI0IDE4LjY5MDcgMjQuMDg3NCAxOS4zNjA4IDI0LjI1MiAyMEwgMzAgMjBMIDMwIDI0TCAyNi43MDg1IDI0QyAyOC4xMTg3IDI1LjI0NDYgMjkuOTcxMiAyNiAzMiAyNlpNIDIxLjYwNTUgMjRDIDIzLjY4MDQgMjcuNTg2OSAyNy41NTgzIDMwIDMyIDMwQyAzOC42Mjc0IDMwIDQ0IDI0LjYyNzQgNDQgMThDIDQ0IDExLjM3MjYgMzguNjI3NCA2IDMyIDZDIDI1LjM3MjYgNiAyMCAxMS4zNzI2IDIwIDE4QyAyMCAxOC42ODE0IDIwLjA1NjkgMTkuMzQ5NiAyMC4xNjYgMjBMIDEyIDIwTCAxMiAyNEwgMjEuNjA1NSAyNFoiLz4KPC9kZWZzPgo8L3N2Zz4K',
                  linkTo: '/teste',
                },
                {
                  name: 'Placa de rede',
                  iconUrl:
                    'data:image/svg+xml base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA1MCA0OCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KPHRpdGxlPkdyb3VwPC90aXRsZT4KPGRlc2M+Q3JlYXRlZCB1c2luZyBGaWdtYTwvZGVzYz4KPGcgaWQ9IkNhbnZhcyIgdHJhbnNmb3JtPSJtYXRyaXgoMiAwIDAgMiAtMzEwIDQ2OTQpIj4KPGcgaWQ9Ikdyb3VwIj4KPGcgaWQ9IlJlY3RhbmdsZSI+CjxtYXNrIGlkPSJtYXNrMF9vdXRsaW5lX2lucyI+Cjx1c2UgeGxpbms6aHJlZj0iI3BhdGgwX2ZpbGwiIGZpbGw9IndoaXRlIiB0cmFuc2Zvcm09Im1hdHJpeCgtMSA4Ljc0MjI4ZS0wOCAtOC43NDIyOGUtMDggLTEgMTgwIC0yMzMwKSIvPgo8L21hc2s+CjxnIG1hc2s9InVybCgjbWFzazBfb3V0bGluZV9pbnMpIj4KPHVzZSB4bGluazpocmVmPSIjcGF0aDFfc3Ryb2tlXzJ4IiB0cmFuc2Zvcm09Im1hdHJpeCgtMSA4Ljc0MjI4ZS0wOCAtOC43NDIyOGUtMDggLTEgMTgwIC0yMzMwKSIgZmlsbD0iIzY2NjY2NiIvPgo8L2c+CjwvZz4KPGcgaWQ9IlJlY3RhbmdsZSAyIj4KPHVzZSB4bGluazpocmVmPSIjcGF0aDJfZmlsbCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTcyIC0yMzM5KSIgZmlsbD0iIzY2NjY2NiIvPgo8L2c+CjxnIGlkPSJSZWN0YW5nbGUgMi4zIj4KPHVzZSB4bGluazpocmVmPSIjcGF0aDNfZmlsbCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTY4IC0yMzM5KSIgZmlsbD0iIzY2NjY2NiIvPgo8L2c+CjxnIGlkPSJSZWN0YW5nbGUgMi4yIj4KPHVzZSB4bGluazpocmVmPSIjcGF0aDRfZmlsbCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYzIC0yMzM4KSIgZmlsbD0iIzY2NjY2NiIvPgo8L2c+CjxnIGlkPSJSZWN0YW5nbGUgMi4xIj4KPHVzZSB4bGluazpocmVmPSIjcGF0aDVfZmlsbCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYyIC0yMzMyKSIgZmlsbD0iIzY2NjY2NiIvPgo8L2c+CjxnIGlkPSJFeGNsdWRlIj4KPHVzZSB4bGluazpocmVmPSIjcGF0aDZfZmlsbCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTU1IC0yMzQ3KSIgZmlsbD0iIzY2NjY2NiIvPgo8L2c+CjwvZz4KPC9nPgo8ZGVmcz4KPHBhdGggaWQ9InBhdGgwX2ZpbGwiIGQ9Ik0gMCAzQyAwIDEuMzQzMTUgMS4zNDMxNSAwIDMgMEwgMjIgMEwgMjIgMTNMIDMgMTNDIDEuMzQzMTUgMTMgMCAxMS42NTY5IDAgMTBMIDAgM1oiLz4KPHBhdGggaWQ9InBhdGgxX3N0cm9rZV8yeCIgZD0iTSAyMiAwTCAyNCAwTCAyNCAtMkwgMjIgLTJMIDIyIDBaTSAyMiAxM0wgMjIgMTVMIDI0IDE1TCAyNCAxM0wgMjIgMTNaTSAzIDJMIDIyIDJMIDIyIC0yTCAzIC0yTCAzIDJaTSAyMCAwTCAyMCAxM0wgMjQgMTNMIDI0IDBMIDIwIDBaTSAyMiAxMUwgMyAxMUwgMyAxNUwgMjIgMTVMIDIyIDExWk0gMiAxMEwgMiAzTCAtMiAzTCAtMiAxMEwgMiAxMFpNIDMgMTFDIDIuNDQ3NzIgMTEgMiAxMC41NTIzIDIgMTBMIC0yIDEwQyAtMiAxMi43NjE0IDAuMjM4NTc1IDE1IDMgMTVMIDMgMTFaTSAzIC0yQyAwLjIzODU3NiAtMiAtMiAwLjIzODU3NyAtMiAzTCAyIDNDIDIgMi40NDc3MiAyLjQ0NzcyIDIgMyAyTCAzIC0yWiIvPgo8cGF0aCBpZD0icGF0aDJfZmlsbCIgZD0iTSAwIDFDIDAgMC40NDc3MTUgMC40NDc3MTUgMCAxIDBMIDMgMEMgMy41NTIyOCAwIDQgMC40NDc3MTUgNCAxTCA0IDNDIDQgMy41NTIyOCAzLjU1MjI4IDQgMyA0TCAxIDRDIDAuNDQ3NzE1IDQgMCAzLjU1MjI4IDAgM0wgMCAxWiIvPgo8cGF0aCBpZD0icGF0aDNfZmlsbCIgZD0iTSAwIDFDIDAgMC40NDc3MTUgMC40NDc3MTUgMCAxIDBDIDEuNTUyMjggMCAyIDAuNDQ3NzE1IDIgMUwgMiAzQyAyIDMuNTUyMjggMS41NTIyOCA0IDEgNEMgMC40NDc3MTUgNCAwIDMuNTUyMjggMCAzTCAwIDFaIi8+CjxwYXRoIGlkPSJwYXRoNF9maWxsIiBkPSJNIDAgMUMgMCAwLjQ0NzcxNSAwLjQ0NzcxNSAwIDEgMEwgNiAwQyA2LjU1MjI4IDAgNyAwLjQ0NzcxNSA3IDFDIDcgMS41NTIyOCA2LjU1MjI4IDIgNiAyTCAxIDJDIDAuNDQ3NzE1IDIgMCAxLjU1MjI4IDAgMVoiLz4KPHBhdGggaWQ9InBhdGg1X2ZpbGwiIGQ9Ik0gMCAxQyAwIDAuNDQ3NzE1IDAuNDQ3NzE1IDAgMSAwTCAxMyAwQyAxMy41NTIzIDAgMTQgMC40NDc3MTUgMTQgMUwgMTQgM0MgMTQgMy41NTIyOCAxMy41NTIzIDQgMTMgNEwgMSA0QyAwLjQ0NzcxNiA0IDAgMy41NTIyOCAwIDNMIDAgMVoiLz4KPHBhdGggaWQ9InBhdGg2X2ZpbGwiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTSA1IDIzQyA1IDIzLjU1MjMgNC41NTIyOCAyNCA0IDI0QyAzLjQ0NzcyIDI0IDMgMjMuNTUyMyAzIDIzTCAzIDMuMjcyNzNDIDMgMy4yNzI3MyAzIDMuMjcyNzMgMyAzLjI3MjczQyAzIDIuNjcwMjggMi41NTIyOCAyLjE4MTgyIDIgMi4xODE4MkwgMSAyLjE4MTgyQyAwLjQ0NzcxNSAyLjE4MTgyIDAgMS43MzQxIDAgMS4xODE4MkwgMCAxQyAwIDAuNDQ3NzE1IDAuNDQ3NzE1IDAgMSAwTCAyIDBDIDMuNjU2ODYgMCA1IDEuNDY1MzggNSAzLjI3MjczQyA1IDMuMjcyNzMgNSAzLjI3MjczIDUgMy4yNzI3M0wgNSAyM1oiLz4KPC9kZWZzPgo8L3N2Zz4K',
                  linkTo: '/teste',
                },
                {
                  name: 'Placa mãe',
                  iconUrl:
                    'data:image/svg+xml base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iNDQiIHZpZXdCb3g9IjAgMCA0NCA0NCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KPHRpdGxlPlVuaW9uPC90aXRsZT4KPGRlc2M+Q3JlYXRlZCB1c2luZyBGaWdtYTwvZGVzYz4KPGcgaWQ9IkNhbnZhcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTk1NzQgLTE1MTg0KSI+CjxnIGlkPSJVbmlvbiI+Cjx1c2UgeGxpbms6aHJlZj0iI3BhdGgwX2ZpbGwiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDk1NzQgMTUxODQpIiBmaWxsPSIjODI4MjgyIi8+CjwvZz4KPC9nPgo8ZGVmcz4KPHBhdGggaWQ9InBhdGgwX2ZpbGwiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTSAxMCA0TCAzNCA0QyAzNy4zMTM3IDQgNDAgNi42ODYyOCA0MCAxMEwgNDAgMjAuNDAxNkMgMzcuMjM5NyAyMS4xMTIxIDM1LjIgMjMuNjE3OSAzNS4yIDI2LjYwMDFMIDM1LjIgMzQuMTAwMUMgMzUuMiAzNy4zNTg0IDMyLjU1ODYgNDAgMjkuMyA0MEwgMTAgNDBDIDYuNjg2MjggNDAgNCAzNy4zMTM3IDQgMzRMIDQgMjRMIDEwIDI0QyAxMS4xMDQ1IDI0IDEyIDIzLjEwNDUgMTIgMjJDIDEyIDIwLjg5NTUgMTEuMTA0NSAyMCAxMCAyMEwgNCAyMEwgNCAxOEwgMTAgMThDIDExLjEwNDUgMTggMTIgMTcuMTA0NSAxMiAxNkMgMTIgMTQuODk1NSAxMS4xMDQ1IDE0IDEwIDE0TCA0IDE0TCA0IDEyTCAxMCAxMkMgMTEuMTA0NSAxMiAxMiAxMS4xMDQ1IDEyIDEwQyAxMiA4Ljg5NTUxIDExLjEwNDUgOCAxMCA4TCA0LjM0MTMxIDhDIDUuMTY1MDQgNS42Njk2OCA3LjM4NzQ1IDQgMTAgNFpNIDAgMTBDIDAgNC40NzcwNSA0LjQ3NzA1IDAgMTAgMEwgMzQgMEMgMzkuNTIyOSAwIDQ0IDQuNDc3MDUgNDQgMTBMIDQ0IDIxLjhDIDQ0IDIzLjEyNTUgNDIuOTI1NSAyNC4yIDQxLjYwMDEgMjQuMkMgNDAuMjc0NCAyNC4yIDM5LjIgMjUuMjc0NCAzOS4yIDI2LjYwMDFMIDM5LjIgMzQuMTAwMUMgMzkuMiAzOS41Njc2IDM0Ljc2NzYgNDQgMjkuMyA0NEwgMTAgNDRDIDQuNDc3MDUgNDQgMCAzOS41MjI5IDAgMzRMIDAgMTBaTSAxOCAxMEMgMTggMTEuMTA0NSAxNy4xMDQ1IDEyIDE2IDEyQyAxNC44OTU1IDEyIDE0IDExLjEwNDUgMTQgMTBDIDE0IDguODk1NTEgMTQuODk1NSA4IDE2IDhDIDE3LjEwNDUgOCAxOCA4Ljg5NTUxIDE4IDEwWk0gMTYgMThDIDE3LjEwNDUgMTggMTggMTcuMTA0NSAxOCAxNkMgMTggMTQuODk1NSAxNy4xMDQ1IDE0IDE2IDE0QyAxNC44OTU1IDE0IDE0IDE0Ljg5NTUgMTQgMTZDIDE0IDE3LjEwNDUgMTQuODk1NSAxOCAxNiAxOFpNIDE4IDIyQyAxOCAyMy4xMDQ1IDE3LjEwNDUgMjQgMTYgMjRDIDE0Ljg5NTUgMjQgMTQgMjMuMTA0NSAxNCAyMkMgMTQgMjAuODk1NSAxNC44OTU1IDIwIDE2IDIwQyAxNy4xMDQ1IDIwIDE4IDIwLjg5NTUgMTggMjJaTSAzMiAyOEMgMzIgMjYuODk1NSAzMS4xMDQ1IDI2IDMwIDI2QyAyOC44OTU1IDI2IDI4IDI2Ljg5NTUgMjggMjhMIDI4IDM2QyAyOCAzNy4xMDQ1IDI4Ljg5NTUgMzggMzAgMzhDIDMxLjEwNDUgMzggMzIgMzcuMTA0NSAzMiAzNkwgMzIgMjhaTSAyNCAyNkMgMjUuMTA0NSAyNiAyNiAyNi44OTU1IDI2IDI4TCAyNiAzNkMgMjYgMzcuMTA0NSAyNS4xMDQ1IDM4IDI0IDM4QyAyMi44OTU1IDM4IDIyIDM3LjEwNDUgMjIgMzZMIDIyIDI4QyAyMiAyNi44OTU1IDIyLjg5NTUgMjYgMjQgMjZaTSAyMiAxMEMgMjIgOC44OTU1MSAyMi44OTU1IDggMjQgOEwgMzAgOEMgMzEuMTA0NSA4IDMyIDguODk1NTEgMzIgMTBMIDMyIDE2QyAzMiAxNy4xMDQ1IDMxLjEwNDUgMTggMzAgMThMIDI0IDE4QyAyMi44OTU1IDE4IDIyIDE3LjEwNDUgMjIgMTZMIDIyIDEwWiIvPgo8L2RlZnM+Cjwvc3ZnPgo=',
                  linkTo: '/teste',
                },
                {
                  name: 'Kit Upgrade',
                  iconUrl:
                    'data:image/svg+xml        base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iNDIiIHZpZXdCb3g9IjAgMCAzMiA0MiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KPHRpdGxlPkdyb3VwPC90aXRsZT4KPGRlc2M+Q3JlYXRlZCB1c2luZyBGaWdtYTwvZGVzYz4KPGcgaWQ9IkNhbnZhcyIgdHJhbnNmb3JtPSJtYXRyaXgoMiAwIDAgMiAtNDAwIDQ2OTIpIj4KPGcgaWQ9Ikdyb3VwIj4KPGcgaWQ9IlJlY3RhbmdsZSAyLjMiPgo8dXNlIHhsaW5rOmhyZWY9IiNwYXRoMF9maWxsIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMDcgLTIzNDUpIiBmaWxsPSIjNjY2NjY2Ii8+CjwvZz4KPGcgaWQ9IlJlY3RhbmdsZSAyLjQiPgo8dXNlIHhsaW5rOmhyZWY9IiNwYXRoMV9maWxsIiB0cmFuc2Zvcm09Im1hdHJpeCgwLjcwNzEwNyAtMC43MDcxMDcgMC43MDcxMDcgMC43MDcxMDcgMjA2LjU4NiAtMjM0NC41OSkiIGZpbGw9IiM2NjY2NjYiLz4KPC9nPgo8ZyBpZD0iUmVjdGFuZ2xlIDIuNSI+Cjx1c2UgeGxpbms6aHJlZj0iI3BhdGgxX2ZpbGwiIHRyYW5zZm9ybT0ibWF0cml4KDAuNzA3MTA3IDAuNzA3MTA3IC0wLjcwNzEwNyAwLjcwNzEwNyAyMDggLTIzNDYpIiBmaWxsPSIjNjY2NjY2Ii8+CjwvZz4KPGcgaWQ9IlJlY3RhbmdsZSAyLjEiPgo8dXNlIHhsaW5rOmhyZWY9IiNwYXRoMl9maWxsIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMDAgLTIzMjcpIiBmaWxsPSIjNjY2NjY2Ii8+CjwvZz4KPC9nPgo8L2c+CjxkZWZzPgo8cGF0aCBpZD0icGF0aDBfZmlsbCIgZD0iTSAwIDFDIDAgMC40NDc3MTYgMC40NDc3MTUgMCAxIDBDIDEuNTUyMjggMCAyIDAuNDQ3NzE1IDIgMUwgMiAxM0MgMiAxMy41NTIzIDEuNTUyMjggMTQgMSAxNEMgMC40NDc3MTUgMTQgMCAxMy41NTIzIDAgMTNMIDAgMVoiLz4KPHBhdGggaWQ9InBhdGgxX2ZpbGwiIGQ9Ik0gMCAxQyAwIDAuNDQ3NzE1IDAuNDQ3NzE1IDAgMSAwQyAxLjU1MjI4IDAgMiAwLjQ0NzcxNSAyIDFMIDIgN0MgMiA3LjU1MjI4IDEuNTUyMjggOCAxIDhDIDAuNDQ3NzE1IDggMCA3LjU1MjI4IDAgN0wgMCAxWiIvPgo8cGF0aCBpZD0icGF0aDJfZmlsbCIgZD0iTSAwIDFDIDAgMC40NDc3MTUgMC40NDc3MTUgMCAxIDBMIDE1IDBDIDE1LjU1MjMgMCAxNiAwLjQ0NzcxNSAxNiAxQyAxNiAxLjU1MjI4IDE1LjU1MjMgMiAxNSAyTCAxIDJDIDAuNDQ3NzE1IDIgMCAxLjU1MjI4IDAgMVoiLz4KPC9kZWZzPgo8L3N2Zz4K',
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
