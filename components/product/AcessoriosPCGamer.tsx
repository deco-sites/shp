import Image from 'deco-sites/std/components/Image.tsx'
import { useEffect, useState, useId } from 'preact/hooks'
import Slider from 'deco-sites/fashion/components/ui/Slider.tsx'
import SliderJS from 'deco-sites/fashion/components/ui/SliderJS.tsx'

interface AcessorioProps {
  imgUrl: string
  href: string
  w: number
  h: number
}

export interface Props{
  /** @description  Coloque 9 acessorios*/
  acessorios:Array<AcessorioProps>
}

const Acessorio = ({ imgUrl, href, w, h }: AcessorioProps) => {
  return (
    <a
      href={href}
      className={`block border w-[${w}px] h-[${h}px] border-transparent hover:re1:border-primary hover:re1:shadow-[0_0_20px_0] hover:re1:shadow-primary`}
    >
      <Image
        src={imgUrl}
        width={w}
        height={h}
        loading='lazy'
        decoding='sync'
        fetchPriority='low'
      />
    </a>
  )
}

const Acessorios = ({acessorios}:Props) => {
  const id = 'acessorios-' + useId()

  const [isMobile, setIsMobile] = useState(globalThis.window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(globalThis.window.innerWidth < 768)
    }

    handleResize()

    globalThis.window.addEventListener('resize', handleResize)

    return () => {
      globalThis.window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className='bg-base-100 py-8'>
      <p className='font-bold re1:font-black text-left re1:text-center re1:text-[27px] mx-[10%] re1:mx-[32%] text-secondary'>
        De um Upgrade no seu PC Gamer com os acessórios Shopinfo
      </p>
      {isMobile ? (
        <>
          <div id={id} className='flex flex-col gap-8 mt-5'>
            <Slider className='carousel carousel-center scrollbar-none gap-4 w-screen'>
              <Slider.Item
                index={0}
                className='carousel-item min-w-[100vw] justify-center gap-4'
              >
                {acessorios[0] && (
                  <Acessorio
                    imgUrl={acessorios[0].imgUrl}
                    href={acessorios[0].href} w={acessorios[0].w}
                    h={acessorios[0].h}
                  />
                )}
                {acessorios[1] && (
                  <Acessorio
                    imgUrl={acessorios[1].imgUrl}
                    href={acessorios[1].href} w={acessorios[1].w}
                    h={acessorios[1].h}
                  />
                )}
                {acessorios[2] && (
                  <Acessorio
                    imgUrl={acessorios[2].imgUrl}
                    href={acessorios[2].href} w={acessorios[2].w}
                    h={acessorios[2].h}
                  />
                )}
              </Slider.Item>

              <Slider.Item
                index={1}
                className='carousel-item min-w-[100vw] justify-center gap-4'
              >
                {acessorios[3] && (
                  <Acessorio
                    imgUrl={acessorios[3].imgUrl}
                    href={acessorios[3].href} w={acessorios[3].w}
                    h={acessorios[3].h}
                  />
                )}
                {acessorios[4] && (
                  <Acessorio
                    imgUrl={acessorios[4].imgUrl}
                    href={acessorios[4].href} w={acessorios[4].w}
                    h={acessorios[4].h}
                  />
                )}
                {acessorios[5] && (
                  <Acessorio
                    imgUrl={acessorios[5].imgUrl}
                    href={acessorios[5].href} w={acessorios[5].w}
                    h={acessorios[5].h}
                  />
                )}
              </Slider.Item>

              <Slider.Item
                index={2}
                className='carousel-item min-w-[100vw] justify-center gap-4'
              >
                {acessorios[6] && (
                  <Acessorio
                    imgUrl={acessorios[6].imgUrl}
                    href={acessorios[6].href} w={acessorios[6].w}
                    h={acessorios[6].h}
                  />
                )}
                {acessorios[7] && (
                  <Acessorio
                    imgUrl={acessorios[7].imgUrl}
                    href={acessorios[7].href} w={acessorios[7].w}
                    h={acessorios[7].h}
                  />
                )}
                {acessorios[8] && (
                  <Acessorio
                    imgUrl={acessorios[8].imgUrl}
                    href={acessorios[8].href} w={acessorios[8].w}
                    h={acessorios[8].h}
                  />
                )}
              </Slider.Item>
            </Slider>

            <ul className='carousel justify-center gap-4 z-[5]'>
              <li>
                <Slider.Dot index={0}>
                  <div className='bg-[#2d2d2d] group-disabled:bg-primary rounded-full h-[12px] w-[12px]' />
                </Slider.Dot>
              </li>

              <li>
                <Slider.Dot index={1}>
                  <div className='bg-[#2d2d2d] group-disabled:bg-primary rounded-full h-[12px] w-[12px]' />
                </Slider.Dot>
              </li>

              <li>
                <Slider.Dot index={2}>
                  <div className='bg-[#2d2d2d] group-disabled:bg-primary rounded-full h-[12px] w-[12px]' />
                </Slider.Dot>
              </li>
            </ul>

            <SliderJS rootId={id} infinite={true} scroll='smooth'/>
          </div>
        </>
      ) : (
        <ul className='flex gap-5 items-center justify-center mt-5'>
          {acessorios.map(acessorio=>
            <li>
              <Acessorio
                imgUrl={acessorio.imgUrl}
                href={acessorio.href} w={acessorio.w} h={acessorio.h}
              />
            </li>
          )}
        </ul>
      )}
    </div>
  )
}

export default Acessorios
