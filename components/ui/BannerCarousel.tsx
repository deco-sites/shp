import { useEffect, useState } from 'preact/hooks'
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'
import Slider from 'deco-sites/shp/components/ui/Slider.tsx'
import SliderJS from 'deco-sites/shp/islands/SliderJS.tsx'
import { Picture, Source } from 'deco-sites/std/components/Picture.tsx'
import { useId } from 'preact/hooks'
import { sendEvent } from "deco-sites/shp/sdk/analytics.tsx";
//import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Banner {
  /** @description desktop otimized image */
  desktop: string
  /** @description mobile otimized image */
  mobile: string
  /** @description Image's alt text */
  alt: string
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string
  }
}

export interface Props {
  images?: Banner[]
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number
}

function BannerItem({ image, lcp, idx }: { image: Banner; lcp?: boolean, idx:number }) {
  const { alt, mobile, desktop, action } = image

  const [Mobile, setMobile] = useState(globalThis.window.innerWidth <= 768)

  useEffect(()=>{
    const handleResize=() => {
      setMobile(globalThis.window.innerWidth <= 768)
    }

    handleResize()

    globalThis.window.addEventListener('resize', handleResize)

    return ()=>{
      globalThis.window.removeEventListener('resize', handleResize)
    }
  },[])

  return (
    <a
      href={action?.href ?? '#'}
      class='relative h-fit overflow-y-hidden w-full'
      onClick={()=>{
        sendEvent({
          name:'select_promotion',
          params:{
            creative_name:alt,
            creative_slot:`banner_${idx}`,
            promotion_name:alt
          }
        })
      }}
    >
      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={351}
          height={251}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={1691}
          height={394}
        />
        <img
          class='object-cover w-full'
          loading={lcp ? 'eager' : 'lazy'}
          src={Mobile ? mobile : desktop}
          alt={alt}
          width={Mobile ? 351 : 1691}
          height={Mobile ? 251 : 394}
        />
      </Picture>
    </a>
  )
}

function Dots({ images, interval = 0 }: Props) {
  const [animationKey, setAnimationKey] = useState(0)
  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1)
  }, [interval])

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      />
      <ul class='carousel justify-center gap-4 z-[5]'>
        {images?.map((_, index) => (
          <li class='carousel-item'>
            <Slider.Dot index={index}>
              <div class='py-5'>
                <div
                  class='w-6 md:w-16 h-0.5 rounded group-disabled:animate-progress bg-gradient-to-r from-white from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)]'
                  style={{ animationDuration: `${interval}s` }}
                  key={animationKey}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  )
}

function BannerCarousel({ images, preload, interval }: Props) {
  const id = useId() + '-bannerCarousel'
  const [pause, setPause] = useState(false)

  return (
    <div id={id} class='flex flex-col'>
      <div class='flex justify-center items-center my-5'>
        <div class='hidden re1:flex items-center justify-center z-[2] absolute left-[150px]'>
          <Slider.PrevButton class='btn btn-circle glass'>
            <Icon
              class='text-[rgba(255,255,255,0.7)]'
              size={20}
              id='ChevronLeft'
              strokeWidth={3}
            />
          </Slider.PrevButton>
        </div>

        <Slider class='carousel carousel-center scrollbar-none w-[90vw] rounded-lg'>
          {images?.map((image, index) => (
            <Slider.Item index={index} class='carousel-item w-[90vw] h-fit'>
              <BannerItem image={image} lcp={index === 0 && preload} idx={index} />
            </Slider.Item>
          ))}
        </Slider>

        <div class='hidden re1:flex items-center justify-center absolute z-[2] right-[150px]'>
          <Slider.NextButton class='btn btn-circle glass'>
            <Icon
              class='text-[rgba(255,255,255,0.7)]'
              size={20}
              id='ChevronRight'
              strokeWidth={3}
            />
          </Slider.NextButton>
        </div>
      </div>

      <div className='absolute flex justify-center items-center gap-2 top-[85vw] re2:top-[340px] re3:top-[370px] re4:top-[430px] re5:top-[450px] w-full'>
        <Dots images={images} interval={!pause ? interval : 0} />
        <button
          class='btn rounded-[50%] glass max-w-[20px] min-w-[20px] max-h-[20px] min-h-[20px] p-0 md:pl-[1px]'
          onClick={() => {
            pause ? setPause(false) : setPause(true)
          }}
        >
          {!pause ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              version='1.1'
              width='10'
              height='10'
              x='0'
              y='0'
              viewBox='0 0 47.607 47.607'
              style='enable-background:new 0 0 512 512'
            >
              <g>
                <path
                  d='M17.991 40.976a6.631 6.631 0 0 1-13.262 0V6.631a6.631 6.631 0 0 1 13.262 0v34.345zM42.877 40.976a6.631 6.631 0 0 1-13.262 0V6.631a6.631 6.631 0 0 1 13.262 0v34.345z'
                  fill='#fff'
                  data-original='#000000'
                />
              </g>
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              version='1.1'
              width='10'
              height='10'
              x='0'
              y='0'
              viewBox='0 0 512 512'
              style='enable-background:new 0 0 512 512'
            >
              <g>
                <path
                  fill-rule='evenodd'
                  d='M468.8 235.007 67.441 3.277A24.2 24.2 0 0 0 55.354-.008h-.07A24.247 24.247 0 0 0 43.19 3.279a24 24 0 0 0-12.11 20.992v463.456a24.186 24.186 0 0 0 36.36 20.994L468.8 276.99a24.238 24.238 0 0 0 0-41.983z'
                  fill='#ffffff'
                  data-original='#000000'
                />
              </g>
            </svg>
          )}
        </button>
      </div>

      <SliderJS
        rootId={id}
        interval={!pause ? interval && interval * 1e3 : 0}
        infinite
      />
    </div>
  )
}

export default BannerCarousel
