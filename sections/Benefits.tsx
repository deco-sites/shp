import Image from 'deco-sites/std/components/Image.tsx'
import { AppContext } from 'deco-sites/shp/apps/site.ts'
import type { SectionProps } from 'deco/types.ts'

export interface Props{
  /** @description Não preencher*/
  descontoPix?: number
}

export const loader = (props: Props, _req: Request, ctx: AppContext & {descontoPix:number}) => {
  return {
    ...props, 
    descontoPix:ctx.descontoPix
  }
}

const Benefits = ({descontoPix}:SectionProps<typeof loader>) => {
  return (
    <div className="flex flex-row text-secondary items-center re1:justify-center mx-auto gap-6 re1:gap-16 re4:gap-24 m-3 w-11/12 h-24 overflow-x-scroll scrollbar-none text-sm">
        <label className="min-w-[45%] re1:min-w-0 text-left flex items-center gap-3">
          <Image
            decoding='sync' loading='eager' fetchPriority='high'
            className="" width={49} height={49} src="https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-pcmontado.png" 
          />
          <p><b>PC Montado</b> <br/> Pronto para Jogar</p>
        </label>
        <label className="min-w-[45%] re1:min-w-0 text-left flex items-center gap-3">
          <Image
            decoding='sync' loading='eager' fetchPriority='high'
            className="" width={47} height={47} src="https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-pix-.png" 
          />
          <p><b>{descontoPix}%</b> OFF<br/>no PIX</p>
        </label>
        <label className="min-w-[45%] re1:min-w-0 text-left flex items-center gap-3">
          <Image
            decoding='sync' loading='eager' fetchPriority='high'
            className="" width={84} height={35} src="https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-10x-.png" 
          />
          <p>Sem juros <br/> no cartão</p>
        </label>    
        <label className="min-w-[45%] re1:min-w-0 text-left flex items-center gap-3">
          <Image
            decoding='sync' loading='eager' fetchPriority='high'
            className="" width={48} height={40} src="https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-2cartoes-.png" 
          />
          <p>Parcele sua compra<br/> com<b> 2 cartões</b></p>
        </label>
        <label className="min-w-[45%] re1:min-w-0 text-left flex items-center gap-3">
          <Image
            decoding='sync' loading='eager' fetchPriority='high'
            className="" width={62} height={35} src="https://shopinfo.vteximg.com.br/arquivos/icon-truck-frete.png" 
          />
          <p><b>Frete Grátis</b> <br/> Brasil em PCs</p>
        </label>
    </div>
  )
}

export default Benefits
