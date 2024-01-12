// deno-lint-ignore-file no-window-prefix
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

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
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
                <Acessorio
                  imgUrl='https://shopinfo.vteximg.com.br/arquivos/carrossel-categoria5.jpg'
                  href='/' w={100}
                  h={100}
                />
                <Acessorio
                  imgUrl='https://shopinfo.vteximg.com.br/arquivos/carrossel-categoria7.jpg'
                  href='/' w={100}
                  h={100}
                />
                <Acessorio
                  imgUrl='https://shopinfo.vteximg.com.br/arquivos/carrossel-categoria8.jpg'
                  href='/' w={100}
                  h={100}
                />
              </Slider.Item>

              <Slider.Item
                index={1}
                className='carousel-item min-w-[100vw] justify-center gap-4'
              >
                <Acessorio
                  imgUrl='https://shopinfo.vteximg.com.br/arquivos/carrossel-categoria-hardware6.jpg'
                  href='/' w={100}
                  h={100}
                />
                <Acessorio
                  imgUrl='https://shopinfo.vteximg.com.br/arquivos/carrossel-categoria-hardware5.jpg'
                  href='/' w={100}
                  h={100}
                />
                <Acessorio
                  imgUrl='https://shopinfo.vteximg.com.br/arquivos/carrossel-categoria-hardware2.jpg'
                  href='/' w={100}
                  h={100}
                />
              </Slider.Item>

              <Slider.Item
                index={2}
                className='carousel-item min-w-[100vw] justify-center gap-4'
              >
                <Acessorio
                  imgUrl='https://shopinfo.vteximg.com.br/arquivos/carrossel-categoria-hardwarePlaca.jpg'
                  href='/' w={100}
                  h={100}
                />
                <Acessorio
                  imgUrl='https://shopinfo.vteximg.com.br/arquivos/carrossel-categoria-hardware4.jpg'
                  href='/' w={100}
                  h={100}
                />
                <Acessorio
                  imgUrl='https://shopinfo.vteximg.com.br/arquivos/carrossel-categoria-hardware3.jpg'
                  href='/' w={100}
                  h={100}
                />
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
          <li>
            <Acessorio
              imgUrl='https://shopinfo.vteximg.com.br/arquivos/carrossel-categoria5.jpg'
              href='/' w={115} h={115}
            />
          </li>
          <li>
            <Acessorio
              imgUrl='	https://shopinfo.vteximg.com.br/arquivos/carrossel-categoria7.jpg'
              href='/' w={115} h={115}
            />
          </li>
          <li>
            <Acessorio
              imgUrl='https://shopinfo.vteximg.com.br/arquivos/carrossel-categoria8.jpg'
              href='/' w={115} h={115}
            />
          </li>
          <li>
            <Acessorio
              imgUrl='https://shopinfo.vteximg.com.br/arquivos/carrossel-categoria-hardware6.jpg'
              href='/' w={115} h={115}
            />
          </li>
          <li>
            <Acessorio
              imgUrl='https://shopinfo.vteximg.com.br/arquivos/carrossel-categoria-hardware5.jpg'
              href='/' w={115} h={115}
            />
          </li>
          <li>
            <Acessorio
              imgUrl='https://shopinfo.vteximg.com.br/arquivos/carrossel-categoria-hardware2.jpg'
              href='/' w={115} h={115}
            />
          </li>
          <li>
            <Acessorio
              imgUrl='https://shopinfo.vteximg.com.br/arquivos/carrossel-categoria-hardwarePlaca.jpg'
              href='/' w={115} h={115}
            />
          </li>
          <li>
            <Acessorio
              imgUrl='https://shopinfo.vteximg.com.br/arquivos/carrossel-categoria-hardware4.jpg'
              href='/' w={115} h={115}
            />
          </li>
          <li>
            <Acessorio
              imgUrl='https://shopinfo.vteximg.com.br/arquivos/carrossel-categoria-hardware3.jpg'
              href='/' w={115} h={115}
            />
          </li>
        </ul>
      )}
    </div>
  )
}

export default Acessorios
