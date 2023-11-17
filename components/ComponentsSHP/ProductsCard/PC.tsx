import Image from 'deco-sites/std/components/Image.tsx'

export interface PCProps {
  nome: string
  imgUrl: string
  placa: string
  processador: string
  memoria: string
  armazenamento: string
  precoPIX: string | number
  preco10: number
  discountFlag: number
  productUrl:string
}

const PC = ({ ...props }: PCProps) => {
  if (props) {
    return (
      <a href={props.productUrl} className='flex flex-col min-w-[160px] max-w-[160px] min-h-[350px] max-h-[350px] bg-secondary rounded-lg p-2 re1:min-h-[326px] re1:max-h-[326px] re1:min-w-[200px] re1:max-w-[200px]'>
        <div className='flex flex-col items-center -mb-5'>
          <label className='w-11/12 flex justify-between bottom-0 z-[5]'>
            <div className='flex items-center justify-center bg-success text-secondary text-[12px] font-bold rounded-lg p-1'>
              {props.discountFlag}%
            </div>
            <div className='flex justify-center items-center gap-1'>
              <div className='w-[25px] h-[25px] re1:w-[30px] re1:h-[30px] bg-[#c44604] flex items-center p-1 rounded-lg'>
                <Image
                  src='https://shopinfo.vteximg.com.br/arquivos/icon-truck-frete.png'
                  alt='frete'
                  width={22}
                  height={13}
                  loading='lazy'
                />
              </div>
              <Image
                src='https://shopinfo.vteximg.com.br/arquivos/heartRed.png'
                alt='like' width={24} height={24}
                loading='lazy'
              />
            </div>
          </label>
          <Image
            className='relative -top-5'
            src={props.imgUrl}
            alt='Pc image'
            width={130}
            height={130}
            preload fetchPriority='low' loading='lazy'
          />
        </div>

        <span className='text-sm text-black font-bold truncate'>
          {props.nome}
        </span>

        <div className='text-[11px] text-[#B1B1B1] flex flex-col gap-1'>
          <label className='flex items-center gap-1'>
            <Image
              src='https://shopinfo.vteximg.com.br/arquivos/icon-placadevideo.svg'
              width={15}
              height={15}
              loading='lazy'
            />
            <p className='font-bold'>{props.placa}</p>
          </label>
          <label className='flex items-center gap-1'>
            <Image
              src='https://shopinfo.vteximg.com.br/arquivos/icon-processador.svg'
              width={15}
              height={15}
              loading='lazy'
            />
            <p>{props.processador}</p>
          </label>
          <label className='flex items-center gap-1'>
            <Image
              src='https://shopinfo.vteximg.com.br/arquivos/icon-memoria.svg'
              width={15}
              height={15}
              loading='lazy'
            />
            <p>{props.memoria}</p>
          </label>
          <label className='flex items-center gap-1'>
            <Image
              src='https://shopinfo.vteximg.com.br/arquivos/icon-hd.svg'
              width={15}
              height={15}
              loading='lazy'
            />
            <p>{props.armazenamento}</p>
          </label>
        </div>

        <div className='flex flex-col'>
          <span className='text-lg text-primary font-bold'>
            10x {props.preco10.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}
          </span>
          <p className='text-xs'>ou por {parseFloat(props.precoPIX.toString()).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})} no Pix</p>
        </div>

        <label htmlFor='compare' className='flex gap-1'>
          <input
            type='checkbox'
            name='compare'
            id='COMPARE-PC'
            className='checked:rounded-full checked:bg-red-500'
          />
          <p>Compare</p>
        </label>
      </a>
    )
  }

  return null
}

export default PC
