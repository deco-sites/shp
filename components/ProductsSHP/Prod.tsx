import Image from 'deco-sites/std/components/Image.tsx'

export interface ProdProps {
  nome?: string
  imgUrl: string
  precoPIX?: string | number
  preco10?: number
  discountFlag?: number
}

const Prod = ({ ...props }: ProdProps) => {
  if (props) {
    return (
      <div className='flex flex-col min-w-[160px] max-w-[160px] max-h-[326px] min-h-[326px] re1:min-w-[200px] re1:max-w-[200px] justify-around rounded-lg bg-white p-2'>
        <div className='flex flex-col items-center -mb-5'>
          <label className='w-11/12 flex justify-between bottom-0 z-10'>
            <div className='flex items-center justify-center bg-green-500 text-white text-[12px] p-1 font-bold rounded-lg'>
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
            className='relative -top-5' src={props.imgUrl} alt='Pc image' width={135} height={135}
            preload fetchPriority='low' loading='lazy'
          />
        </div>

        <span className='text-sm text-black font-bold truncate'>
          {props.nome}
        </span>

        <div className='flex flex-col'>
          <span className='text-lg text-[#dd1f26] font-bold'>
            10x R$ {props.preco10}
          </span>
          <p className='text-xs'>ou por R$ {props.precoPIX} no Pix</p>
        </div>

        <label htmlFor='compare' className='flex gap-1'>
          <input
            type='checkbox'
            name='compare'
            id='compare'
            className='rounded-full checked:bg-red-500'
          />
          <p>Compare</p>
        </label>
      </div>
    )
  }

  return null
}

export default Prod
