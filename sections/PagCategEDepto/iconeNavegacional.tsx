import Image from "deco-sites/std/packs/image/components/Image.tsx"

interface Props{
  href:string,
  categoryName:string,
  imgUrl:string
}

const IconeNavegacional=({href, categoryName, imgUrl}:Props)=>(
  <li className='rounded-[8px] border border-transparent bg-[url(https://shopinfo.vteximg.com.br/arquivos/backgroundImg-icons.png)]
    min-w-[115px] max-w-[115px] min-h-[115px] max-h-[115px] 
    bg-cover bg-center bg-no-repeat hover:bg-primary transition ease-in-out duration-300 hover:re1:shadow-[0_0_20px_0] hover:re1:shadow-primary
    flex items-center justify-center'>
    <a href={href} className='flex flex-col w-full h-full text-center'>
      <Image className='m-auto' src={imgUrl} alt={categoryName} width={70} height={70} fetchPriority='high' preload loading='eager' decoding='sync'/>
      <span className='text-secondary text-[11px] re1:text-xs font-bold mb-[10px]'>{categoryName}</span>
    </a> 
  </li>
)

export default IconeNavegacional