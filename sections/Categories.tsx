import Image from "deco-sites/std/packs/image/components/Image.tsx"

export interface Props {
  Categs: Array<{
    categImg: string
    linkTo: string
    name: string
  }>
}

const Categories = ({ Categs }: Props) => {
  return (
    <div className='my-5'>
      <p className='text-secondary text-center text-3xl font-bold my-2'>
        Principais categorias
      </p>
      <div className='flex gap-2 overflow-x-scroll scrollbar-none mx-2 re1:justify-center re1:items-center'>
        {Categs?.map((categ) => (
        <li className='rounded-[8px] border border-transparent bg-[url(https://shopinfo.vteximg.com.br/arquivos/backgroundImg-icons.png)]
          min-w-[115px] max-w-[115px] min-h-[115px] max-h-[115px] 
          bg-cover bg-center bg-no-repeat hover:bg-primary transition ease-in-out duration-300 hover:re1:shadow-[0_0_20px_0] hover:re1:shadow-primary
          flex items-center justify-center'
        >
          <a href={categ.linkTo} className='flex flex-col w-full h-full text-center'>
            <Image className='m-auto' src={categ.categImg} alt={categ.name} width={70} height={70} fetchPriority='high' preload loading='lazy' decoding='sync'/>
            <span className='text-secondary text-[11px] re1:text-xs font-bold mb-[10px]'>{categ.name}</span>
          </a> 
        </li>
        ))}
      </div>
    </div>
  )
}

export default Categories
