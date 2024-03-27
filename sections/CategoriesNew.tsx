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
    <div className='my-5 px-[5%] re1:px-[15%]'>
      <p className='text-secondary text-center text-3xl font-bold my-2'>
        Principais categorias
      </p>
      <div className='flex gap-2 overflow-x-scroll scrollbar-none re1:justify-between re1:items-center'>
        {Categs?.map((categ) => (
        <li className='min-w-[145px] max-w-[145px] hover:scale-90 transition ease-in-out duration-300 flex items-center justify-center'>
          <a href={categ.linkTo} className='flex flex-col w-full h-full text-center'>
            <Image className='m-auto' src={categ.categImg} alt={categ.name} width={145} height={196} fetchPriority='high' loading='lazy' decoding='sync'/>
            <span className='text-secondary text-[18px] font-bold mb-[10px]'>{categ.name}</span>
          </a> 
        </li>
        ))}
      </div>
    </div>
  )
}

export default Categories
