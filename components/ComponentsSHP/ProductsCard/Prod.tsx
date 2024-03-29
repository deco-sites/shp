import Image from 'deco-sites/std/components/Image.tsx'

export interface ProdProps {
  nome: string
  imgUrl: string
  precoPIX: string | number
  preco10: number
  discountFlag: number
  productUrl:string
}

const Prod = ({ ...props }: ProdProps) => {
  if (props) {
    return (
      <a href={props.productUrl} className='flex flex-col min-w-[160px] max-w-[160px] max-h-[326px] min-h-[326px] re1:min-w-[200px] re1:max-w-[200px] justify-around rounded-lg bg-secondary p-2'>
        <div className='flex flex-col items-center -mb-5'>
          <label className='w-11/12 flex justify-between bottom-0 z-[5]'>
            <div className='flex items-center justify-center bg-success text-secondary text-[12px] p-1 font-bold rounded-lg'>
              {props.discountFlag}%
            </div>
            <div className='flex justify-center items-center gap-1'>
              {/* <div className='w-[25px] h-[25px] re1:w-[30px] re1:h-[30px] bg-[#c44604] flex items-center p-1 rounded-lg'>
                <Image
                  src='https://shopinfo.vteximg.com.br/arquivos/icon-truck-frete.png' alt='frete' width={25} height={25}
                  preload fetchPriority='low' loading='lazy'
                />
              </div> */}
              <Image
                src='https://shopinfo.vteximg.com.br/arquivos/heartRed.png' alt='like' width={24} height={24}
                loading='lazy' 
              />
            </div>
          </label>

          <Image
            className='relative -top-5' src={props.imgUrl} width={135} height={135}
            preload={false} fetchPriority='low' loading='lazy' alt={props.nome} title={props.nome}
          />
        </div>

        <span className='text-sm text-black font-bold truncate'>
          {props.nome}
        </span>

        <div className='flex flex-col'>
          <span className='text-lg text-primary font-bold'>
            10x {props.preco10.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}
          </span>
          <p className='text-xs'>ou por {parseFloat(props.precoPIX.toString()).toLocaleString('pt-BR',{style:'currency', currency:'BRL'})} no Pix</p>
        </div>
      </a>
    )
  }

  return null
}

export default Prod
