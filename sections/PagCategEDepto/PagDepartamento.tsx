// deno-lint-ignore-file no-window-prefix
import { useEffect, useState } from 'preact/hooks'
import { Runtime } from 'deco-sites/std/runtime.ts'
import IconeNavegacional from 'deco-sites/shp/sections/PagCategEDepto/iconeNavegacional.tsx'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import Benefits from "deco-sites/shp/sections/Benefits.tsx";

export interface Props{
  titleCategoria?:string
  idCategoria:number
  bannerUrl:string
  descText?:string
  seoText?:string
  iconesNavegacionais:Array<{
    href:string,
    categoryName:string,
    imgUrl:string
  }>
}

const fetchData=async (idCateg:number)=>{
  const data= await Runtime.invoke({
    key:'deco-sites/std/loaders/vtex/legacy/productListingPage.ts',
    props:{count:20,fq:`C:/${idCateg}/`}
  }) || []

  return data
}

const fetchProducts= (idCateg:number, from:number, to:number)=>{
  return []
}

const pagDepartamento=({bannerUrl, descText, idCategoria, seoText, titleCategoria, iconesNavegacionais}:Props)=>{
  const [hideDescSeo,setHideDescSeo]=useState(true)
  const fechaDoHTML='<span class="buttonText verMais"> <span class="verMais">Ver mais</span> <span class="fechar">Fechar</span> </span>'

  useEffect(()=>{
    const initialScrollY=0
    let scrolledDown=false

    const header=document.querySelector('body div.z-30.fixed')
    header && ((header.children[0] as HTMLElement).style.opacity='.8')

    const handleScroll=()=>{
      if(window.scrollY > initialScrollY && !scrolledDown){
        header && ((header.children[0] as HTMLElement).style.opacity='1')
        scrolledDown=true
      }else if(window.scrollY <= initialScrollY && scrolledDown){
        header && ((header.children[0] as HTMLElement).style.opacity='.8')
        scrolledDown=false
      }
    }

    (async()=>{
      const pageData=await fetchData(idCategoria)
      console.log(pageData)
    })()
    
    window.addEventListener('scroll',handleScroll)

    return()=>{
      window.removeEventListener('scroll',handleScroll)
    }
  },[])

  return(
    <div className='w-full text-white'>
      <div className='absolute top-0 z-[-1] '>
        <Image src={bannerUrl} width={1920} height={1080}  decoding='async' loading='eager'
          fetchPriority='high' preload 
        />
      </div>
      <div className='re1:px-[15%]'>
        <div className='my-[60px] text-gray-500'>
          <p>Home &gt; {titleCategoria}</p>
        </div>
        <div className='bg-transparent'>
          <h4 className='text-3xl font-bold'>{titleCategoria}</h4>
          <div className='max-w-[40%] my-[50px] text-xl' dangerouslySetInnerHTML={{__html: descText|| '<div>OII Luii</div>'}} />
          <button className='font-bold mb-2' onClick={()=>setHideDescSeo(!hideDescSeo)}>{hideDescSeo ? 'Ver mais' : 'Fechar'}</button>
          <div className={`${hideDescSeo && 'line-clamp-1'}`} dangerouslySetInnerHTML={{__html: seoText?.replace(fechaDoHTML,'')|| '<div>OII Luii</div>'}} />
        </div>

        <Benefits/>

        <div>
          <div className='text-2xl flex justify-between items-center w-full mb-4'>
            <p>Principais categorias</p>
            <hr className='border-[#262626] w-[80%]'/>
          </div>
          <ul className='flex items-center justify-around w-full'>
            {iconesNavegacionais.map((icon)=>(
              <IconeNavegacional href={icon.href} imgUrl={icon.imgUrl} categoryName={icon.categoryName} />
            ))}
          </ul>
        </div>

        <div className='flex justify-between aling-center'>
          <p>Filtros</p>
          <select>
            <option>Batata</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default pagDepartamento