import { useEffect, useState, useId } from "preact/hooks"
import Slider from "deco-sites/shp/components/ui/Slider.tsx"
import SliderJS from "deco-sites/shp/components/ui/SliderJS.tsx"
import Icon from "deco-sites/fashion/components/ui/Icon.tsx"

const PCNivelGamer = () => {
  const [isMobile, setIsMobile] = useState(false)
  const id=useId()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()

    // deno-lint-ignore no-window-prefix
    window.addEventListener("resize", handleResize)

    return () => {
      // deno-lint-ignore no-window-prefix
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="my-5">
      {isMobile
        ? (
          <>
            <div className="flex flex-col gap-4 justify-center items-center">
              <h1>ESCOLHA SEU PC GAMER</h1>
              <p>de acordo com seu nível de jogo</p>
              <div className="w-[100px] bg-[#dd1f26] h-1" />
            </div>
            <div id={id} className="flex justify-center items-center">
              <div className="flex justify-center items-center">
                <Slider.PrevButton class="btn bg-none border-none">
                  <Icon
                    class="text-[#dd1f26]"
                    size={15}
                    id="ChevronLeft"
                    strokeWidth={3}
                  />
                </Slider.PrevButton>
              </div>

              <Slider className="carousel carousel-center scrollbar-none w-[300px]">
                <Slider.Item index={0} class="min-w-[300px]">
                  <div className="w-[300px] flex justify-center items-center">1</div>
                </Slider.Item>

                <Slider.Item index={1} class="min-w-[300px]">
                  <div className="w-[300px] flex justify-center items-center">2</div>
                </Slider.Item>

                <Slider.Item index={2} class="min-w-[300px]">
                  <div className="w-[300px] flex justify-center items-center">3</div>
                </Slider.Item>

                <Slider.Item index={3} class="min-w-[300px]">
                  <div className="w-[300px] flex justify-center items-center">4</div>
                </Slider.Item>
              </Slider>

              <div class="flex items-center justify-center ">
                <Slider.NextButton class="btn bg-none border-none">
                  <Icon
                    class="text-[#dd1f26]"
                    size={15}
                    id="ChevronRight"
                    strokeWidth={3}
                  />
                </Slider.NextButton>
              </div>

              <SliderJS rootId={id} infinite={true} />
            </div>
          </>
        )
        : (
          <>
            <h1>Desktop</h1>
            {/* Coloque aqui o conteúdo adicional específico para desktops */}
          </>
        )}
    </div>
  )
}

export default PCNivelGamer
