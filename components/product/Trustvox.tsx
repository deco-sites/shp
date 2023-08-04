import type { ProductDetailsPage } from 'deco-sites/std/commerce/types.ts'
import { useState } from 'preact/hooks'
import Image from 'deco-sites/std/components/Image.tsx'

export interface Props {
  page: ProductDetailsPage
  storeId:string
}

const Trustvox=({page, storeId}:Props)=>{

  const {product} = page
  const vazio=''
  const scriptText=`
    window._trustvox=[]

    _trustvox.push(['_storeId', '${storeId}'])
    _trustvox.push(['_productId',  '${product.name}'])
    _trustvox.push(['_productName', ${product.productID}])
    _trustvox.push(['_productPhotos', ['${product.image![0].url}']])
  `
  
  const [alreadyOpened,setAlreadyOpened]=useState(false)
  const [openMenu,setOpenMenu]=useState(false)

  const handleDropdown=()=>{
    setOpenMenu(!openMenu)
    if(!alreadyOpened){
      const script=document.createElement('script')
      script.type='text/javascript'
      script.innerHTML=scriptText
      const script2=document.createElement('script')
      script2.type='text/javascript'
      script2.async=true
      script2.src='https://static.trustvox.com.br/assets/widget.js'
      document.head.append(script)
      document.head.append(script2)
    }
    setAlreadyOpened(true)
  }
  
  return(
    <div className='w-full re1:px-[10%] border-b border-b-[#3d3d3d]'>
      <label className='text-base re1:text-xl px-[10%] re1:px-0 py-[20px] font-bold flex justify-between items-center' onClick={handleDropdown}>
        <p className='w-[90%] re1:w-auto'>Pergunte e veja opiniões de quem já comprou</p>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/slick-arrow.png' width={15} height={15} 
          loading='eager' decoding='sync' className={`hover:brightness-50 active:hue-rotate-[350deg] cursor-pointer ${openMenu ? 'rotate-[270deg]' : 'rotate-90'}`}
        />
      </label>
      <div className={`${openMenu ? '!block' : '!hidden'}`} id="_trustvox_widget"></div>
    </div>
  )
}

export default Trustvox