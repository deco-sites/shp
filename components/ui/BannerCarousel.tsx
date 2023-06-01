import { useState } from "preact/hooks";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Slider from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderJS from "deco-sites/fashion/islands/SliderJS.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useId } from "preact/hooks";
//import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Banner {
  /** @description desktop otimized image */
  desktop: string;
  /** @description mobile otimized image */
  mobile: string;
  /** @description Image's alt text */
  alt: string;
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
  };
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function BannerItem({ image, lcp }: { image: Banner; lcp?: boolean }) {
  const {
    alt,
    mobile,
    desktop,
    action,
  } = image;

  const [Mobile, setMobile] = useState(window.innerWidth <= 768 ? true : false);

  window.addEventListener("resize", () => {
    window.innerWidth <= 768 ? setMobile(true) : setMobile(false);
  });

  return (
    <a
      href={action?.href ?? "#"}
      class="relative h-fit overflow-y-hidden w-full"
    >
      <Picture preload={lcp}>
        {
          /* <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={360}
          height={600}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={1440}
          height={600}
        /> */
        }
        <img
          class="object-cover w-full"
          loading={lcp ? "eager" : "lazy"}
          src={Mobile ? mobile : desktop}
          alt={alt}
        />
      </Picture>
    </a>
  );
}

function Dots({ images, interval = 0 }: Props) {
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
      <ul class="carousel justify-center gap-4 z-10">
        {images?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="py-5">
                <div
                  class="w-16 sm:w-20 h-0.5 rounded group-disabled:animate-progress bg-gradient-to-r from-base-100 from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)]"
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

function Buttons() {
  return (
    <>
    </>
  );
}

function BannerCarousel({ images, preload, interval }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      //class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px]"
      class="flex flex-col"
    >
      <div class="flex justify-center items-center">
        <div class="hidden re1:flex items-center justify-center relative z-[2] -right-12">
          <Slider.PrevButton class="btn btn-circle glass">
            <Icon
              class="text-base-100"
              size={20}
              id="ChevronLeft"
              strokeWidth={3}
            />
          </Slider.PrevButton>
        </div>

        <Slider class="carousel carousel-center scrollbar-none">
          {images?.map((image, index) => (
            <Slider.Item index={index} class="carousel-item w-[100vw] h-fit">
              <BannerItem image={image} lcp={index === 0 && preload} />
            </Slider.Item>
          ))}
        </Slider>

        <div class="hidden re1:flex items-center justify-center relative z-[2] -left-12">
          <Slider.NextButton class="btn btn-circle glass">
            <Icon
              class="text-base-100"
              size={20}
              id="ChevronRight"
              strokeWidth={3}
            />
          </Slider.NextButton>
        </div>
      </div>
    
      <div className="absolute re1:top-[30rem] top-[23rem] w-full">
        <Dots images={images} interval={interval} />
      </div>

      <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default BannerCarousel;
