import Image from 'deco-sites/std/components/Image.tsx'

export interface Props {
  peca: Array<{
    iconUrl: string
    name: string
    options: Array<{
      placeholder: string
      value: string
    }>
  }>
}

const PCGamerIdeal = ({ peca = [] }: Props) => {
  return (
    <div className='my-5'>
      <p className='text-center text-2xl font-bold text-neutral'>
        Encontre seu Pc Gamer Ideal
      </p>
      <div className='grid grid-cols-2 mx-2 my-4 rounded-lg text-neutral gap-4 re1:flex re1:justify-center'>
        {peca?.map((peca, index) => (
          <div className='flex flex-col justify-center items-center'>
            <label className='flex gap-1 items-center h-[25px]'>
              <Image
                src={peca.iconUrl} width={25} height={20} preload fetchPriority='high' loading='eager' decoding='sync'
              />
              <p className='text-sm re1:text-lg font-bold'>{peca.name}</p>
            </label>
            <div
              className=' after:ml-auto after:mr-1.5 after:mt-[-20px] after:bg-[url(https://shopinfo.vteximg.com.br/arquivos/slick-arrow.png)] after:bg-no-repeat 
            after:bg-right after:flex after:w-[15px] after:h-[15px] after:rotate-90'
            >
              <select
                name={`select ${peca.name}`}
                id={index.toString()}
                className='bg-transparent rounded-lg text-sm re1:text-base p-2 py-1 border-neutral-400 border-[2px] appearance-none outline-none pr-6'
              >
                <option value='Todos os valores'>Todas as Opções</option>
                {peca.options?.map((option) => (
                  <option value={option.value}>{option.placeholder}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
        <button className='bg-primary text-lg w-[200px] re1:flex rounded-lg text-secondary pl-[45px] py-[6px] h-[31px] items-center justify-center hidden self-end'>
          <b>Buscar</b>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
            width='50'
            height='20'
            x='0'
            y='0'
            viewBox='0 0 512.009 512.009'
            style='enable-background:new 0 0 512 512'
            class=''
          >
            <g>
              <path
                d='M508.625 247.801 392.262 131.437c-4.18-4.881-11.526-5.45-16.407-1.269-4.881 4.18-5.45 11.526-1.269 16.407.39.455.814.88 1.269 1.269l96.465 96.582H11.636C5.21 244.426 0 249.636 0 256.063s5.21 11.636 11.636 11.636H472.32l-96.465 96.465c-4.881 4.18-5.45 11.526-1.269 16.407s11.526 5.45 16.407 1.269c.455-.39.88-.814 1.269-1.269l116.364-116.364c4.511-4.537 4.511-11.867-.001-16.406z'
                fill='#ffffff'
                data-original='#000000'
              />
            </g>
          </svg>
        </button>
      </div>
      <div className='flex justify-center w-5/6 mx-auto mt-8 re1:hidden'>
        <button className='bg-primary text-lg w-full flex rounded-lg text-secondary pl-[45px] py-2 justify-center items-center'>
          <b>Buscar</b>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
            width='50'
            height='20'
            x='0'
            y='0'
            viewBox='0 0 512.009 512.009'
            style='enable-background:new 0 0 512 512'
            class=''
          >
            <g>
              <path
                d='M508.625 247.801 392.262 131.437c-4.18-4.881-11.526-5.45-16.407-1.269-4.881 4.18-5.45 11.526-1.269 16.407.39.455.814.88 1.269 1.269l96.465 96.582H11.636C5.21 244.426 0 249.636 0 256.063s5.21 11.636 11.636 11.636H472.32l-96.465 96.465c-4.881 4.18-5.45 11.526-1.269 16.407s11.526 5.45 16.407 1.269c.455-.39.88-.814 1.269-1.269l116.364-116.364c4.511-4.537 4.511-11.867-.001-16.406z'
                fill='#ffffff'
                data-original='#000000'
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default PCGamerIdeal
