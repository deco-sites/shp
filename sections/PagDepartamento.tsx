import { useCallback, useEffect } from 'preact/hooks'
import { Runtime } from 'deco-sites/std/runtime.ts'
import renderToString from 'preact-render-to-string'

export interface Props{
  titleCategoria?:string
  idCategoria:number
  bannerUrl?:string
  descText?:string
  seoText?:string
}

const fetchData=async (idCateg:number)=>{
  const data= await Runtime.invoke({
    key:'deco-sites/std/loaders/vtex/legacy/productListingPage.ts',
    props:{count:50,fq:`C:/${idCateg}/`}
  }) || []

  return data
}

const pagCategoria=({bannerUrl, descText, idCategoria, seoText, titleCategoria}:Props)=>{
 

  useEffect(()=>{
    (async()=>{
      const pageData=await fetchData(idCategoria)
      console.log(pageData)
    })()
  },[])

  return(
    <div className='w-full'>
      <div className={`bg-[url("${bannerUrl}")]`}>
        <h4>{titleCategoria}</h4>
        <div dangerouslySetInnerHTML={{__html: descText|| '<div>OII Luii</div>'}} />
        <div dangerouslySetInnerHTML={{__html: seoText|| '<div>OII Luii</div>'}} />
      </div>
    </div>
  )
}

export default pagCategoria