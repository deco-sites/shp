import { useEffect, useState, useId } from 'preact/hooks'
import Slider from 'deco-sites/shp/components/ui/Slider.tsx'
import SliderJS from 'deco-sites/shp/components/ui/SliderJS.tsx'
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'
import Image from 'deco-sites/std/components/Image.tsx'

export interface Props {
  items: Array<{
    imgUrl: string
    title: string
    subTitle: string
    href: string
  }>
}

const PCNivelGamer = ({ items = [] }: Props) => {
  const [isMobile, setIsMobile] = useState(false)
  const id = useId() + '-PCNivelGamer'

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

  return (
    <div className='my-5 text-white font-bold'>
      {isMobile ? (
        <div className="bg-[url('https://shopinfo.vteximg.com.br/arquivos/home-minibanner-background-mobile.jpg')] bg-no-repeat bg-center bg-cover py-16">
          <div className='flex flex-col justify-center items-center'>
            <h1 className='text-2xl '>ESCOLHA SEU PC GAMER</h1>
            <p className='text-lg'>de acordo com seu nível de jogo</p>
            <div className='w-[100px] bg-[#dd1f26] h-1 mt-4' />
          </div>
          <div id={id} className='flex justify-center items-center my-4'>
            <div className='flex justify-center items-center prev'>
              <Slider.PrevButton class='btn bg-transparent hover:bg-transparent border-none relative bottom-8'>
                <Icon
                  class='text-[#dd1f26]'
                  size={25}
                  id='ChevronLeft'
                  strokeWidth={3}
                />
              </Slider.PrevButton>
            </div>

            <Slider className='carousel carousel-center scrollbar-none w-[70vw]'>
              {items.map((item, index) => (
                <Slider.Item
                  index={index}
                  class='carousel-item min-w-full max-w-full'
                >
                  <div className='flex flex-col gap-4 justify-center items-center mx-auto'>
                    <Image src={item.imgUrl} width={265} height={262} preload
                      decoding='async' loading='lazy' fetchPriority='low' 
                    />
                    <h2 className='text-xl'>{item.title}</h2>
                    <p className='text-center text-base'>{item.subTitle}</p>
                    <a className='text-[#dd1f26]' href={item.href}>
                      Ver soluções&gt;
                    </a>
                  </div>
                </Slider.Item>
              ))}
            </Slider>

            <div class='flex items-center justify-center next'>
              <Slider.NextButton class='btn bg-transparent hover:bg-transparent border-none relative bottom-8'>
                <Icon
                  class='text-[#dd1f26]'
                  size={25}
                  id='ChevronRight'
                  strokeWidth={3}
                />
              </Slider.NextButton>
            </div>

            <SliderJS rootId={id} infinite />
          </div>
        </div>
      ) : (
        <div className="bg-[url('https://shopinfo.vteximg.com.br/arquivos/home-minibanner-background.jpg')] bg-no-repeat bg-center bg-cover py-5">
          <div className='flex flex-col justify-center items-center'>
            <h1 className='text-2xl '>ESCOLHA SEU PC GAMER</h1>
            <p className='text-lg'>de acordo com seu nível de jogo</p>
            <div className='w-[100px] bg-[#dd1f26] h-1 mt-4' />
          </div>

          <div className='flex gap-5 justify-center items-start mt-5'>
            {items.map((item) => (
              <div
                className='flex flex-col gap-6 justify-center items-center border-transparent border-2 hover:border-[#dd1f26] hover:shadow-[0_0_5px_2px]
               hover:shadow-[#dd1f26]/30 rounded-lg p-5'
              >
                <Image src={item.imgUrl} width={265} height={262} preload
                  decoding='async' loading='lazy' fetchPriority='low' 
                />
                <h2 className='text-xl'>{item.title}</h2>
                <p className='text-center text-base w-64'>{item.subTitle}</p>
                <a className='text-[#dd1f26]' href={item.href}>
                  Ver soluções&gt;
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PCNivelGamer
