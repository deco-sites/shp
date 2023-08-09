import Image from "deco-sites/std/packs/image/components/Image.tsx"

interface Props{
  href:string,
  categoryName:string,
  imgUrl:string
}

const IconeNavegacional=({href, categoryName, imgUrl}:Props)=>(
  <li className='rounded-[8px] border border-transparent bg-[url(https://shopinfo.vteximg.com.br/arquivos/backgroundImg-icons.png)]
    w-[115px] h-[115px] bg-cover bg-center bg-no-repeat hover:bg-[#dd1f26] transition ease-in-out duration-300 hover:re1:shadow-[0_0_20px_0] 
    hover:re1:shadow-[#dd1f26]'>
    <a href={href} className='flex flex-col w-full h-full text-center'>
      <Image className='m-auto' src={imgUrl} alt={categoryName} width={70} height={70} fetchPriority='high' preload loading='eager' decoding='sync'/>
      <span className='text-white text-xs font-bold mb-[10px]'>{categoryName}</span>
    </a> 
  </li>
)

export default IconeNavegacional