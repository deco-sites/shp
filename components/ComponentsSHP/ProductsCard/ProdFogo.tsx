import Image from 'deco-sites/std/components/Image.tsx'
import {TimeRemaining} from 'deco-sites/shp/FunctionsSHP/useTimer.ts'

export interface Props {
  nome: string
  imgUrl: string
  precoPIX: string | number
  preco10: number
  discountFlag: number
  timeRemaining: TimeRemaining
  productUrl: string
}


const ProdFogo = ({...props}: Props) => {
  const {days, hours, minutes, seconds} = props.timeRemaining || {days:'00', hours:'00', minutes:'00', seconds:'00'};

  return (
    <a href={props.productUrl} className="bg-[#262626] flex flex-col w-72 justify-between rounded-lg p-2 h-44">
      <label className="flex h-8 justify-between z-[5]">
        <div className="bg-primary rounded-lg flex justify-around p-1 items-center w-40">
          <Image width={16} height={20} src="https://shopinfo.vteximg.com.br/arquivos/icon-esquenta-black.png"
            loading='lazy'
          />
          <label>
            <p className="flex flex-col text-secondary">
              <p className="text-[10px]">A OFERTA EXPIRA EM</p>
              <span className="font-bold text-sm leading-3">{`${days}D ${hours}:${minutes}:${seconds}`}</span>
            </p>
          </label>
        </div>
        <div className="flex items-center justify-center bg-success text-secondary text-[12px] p-1 font-bold rounded-lg">
          {props.discountFlag}%
        </div>
      </label>
      <div className="flex items-center my-auto">
        <Image src={props.imgUrl} width={85} height={85} alt={props.nome} title={props.nome}
          fetchPriority='low' loading='lazy' preload={false}
        />

        <div className="flex flex-col max-w-[200px] overflow-hidden">
          <span className="text-xs text-secondary font-bold line-clamp-3">
            {props.nome}
          </span>

          <span className="text-lg text-primary font-bold">
            10x {props.preco10.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}
          </span>
          <p className="text-xs font-semibold text-[rgba(255,255,255,.7)]">ou por {parseFloat(props.precoPIX.toString()).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})} no Pix</p>
        </div>
      </div>
    </a>
  )
}

export default ProdFogo
