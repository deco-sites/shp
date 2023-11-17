import type { ProductDetailsPage } from 'apps/commerce/types.ts'
import { useEffect, useRef, useState } from 'preact/hooks'
import Image from 'deco-sites/std/components/Image.tsx'

export interface Props {
  page: ProductDetailsPage
}

const Description=({page}:Props)=>{
  const {product}=page
  const description:string=product.description!
  const blockDescription=product.isVariantOf?.additionalProperty?.find(item=>item.name==='Bloco Descrição')?.value
  const descriptionDiv=useRef<HTMLDivElement>(null)
  const [openMenu,setOpenMenu]=useState(false)
  const descriptionFromBD=description==='&nbsp;'
  const [alreadyOpened,setAlreadyOpened]=useState(false)
  const [vazio,setVazio]=useState(false)
  const [loading,setLoading]=useState('loading loading-spinner text-primary loading-lg mb-[20px]')

  const handleDropdown=(event:MouseEvent)=>{
    let batata=''
    setOpenMenu(!openMenu)
    if(!alreadyOpened){
      if(descriptionDiv.current){
        if(!descriptionFromBD){
          descriptionDiv.current.classList.add('max-w-[1230px]')
          descriptionDiv.current.classList.add('mx-auto')
          descriptionDiv.current.classList.add('px-[16px]','px-[10%]')
  
          Array.from(descriptionDiv.current.querySelectorAll('section.descricao-desktop'))
          .forEach((section)=>{
            section.classList.add('hidden')
            section.classList.add('re1:block')
          })
          
          Array.from(descriptionDiv.current.querySelectorAll('section.descricao-mobile'))
          .forEach((section)=>{
            section.classList.add('re1:hidden')
          })
          
          Array.from(descriptionDiv.current.querySelectorAll('section.descricao-img-bg-all'))
          .forEach((element,index)=>{
            const classes=['w-full','h-auto','bg-[center_top]','bg-no-repeat','bg-cover']
            index!==0 && classes.push('re1:my-[2.5em]')
            if((element as HTMLElement).style.backgroundImage!=='url("")') classes.push('re1:h-[51vh]')
            if((element as HTMLElement).innerText!== '') element.classList.add(...classes)
          })
          
  
          Array.from(descriptionDiv.current.querySelectorAll('.row'))
          .forEach((element,index)=>{
            if(index===1){
              const classes=['re1:!p-0','!p-[5em]']
              if((element as HTMLElement).innerText!== '') element.classList.add(...classes)
            }else{
              const classes=['re1:!p-0','!p-[2em]']
              if((element as HTMLElement).innerText!== '') element.classList.add(...classes)
            }
          })
  
          Array.from(descriptionDiv.current.querySelectorAll('.descricao-aling-img-mob'))
          .forEach((element)=>{
            const classes=['flex','justify-center']
            if((element as HTMLElement).innerText!== '') element.classList.add(...classes)
          })
          
          Array.from(descriptionDiv.current.querySelectorAll('.descricao-img-info'))
          .forEach((element)=>{
            const classes=['w-[20em]','re1:w-[22em]','mx-auto','re1:mx-0']
            element.classList.add(...classes)
          })
  
          Array.from(descriptionDiv.current.querySelectorAll('.descricao-h1-title'))
          .forEach((element)=>{
            const classes=['font-bold','leading-[40px]','mb-[.5em]','text-2xl','re1:text-4xl','text-center','re1:text-left']
            if((element as HTMLElement).innerText!== '') element.classList.add(...classes)
          })
          
          Array.from(descriptionDiv.current.querySelectorAll('.descricao-desktop-container'))
          .forEach((element)=>{
            const classes=['flex','!p-0','!pl-[4em]','items-center']
            if((element as HTMLElement).innerText!== '') element.classList.add(...classes)
          })
          
          Array.from(descriptionDiv.current.querySelectorAll('.descricao-desktop-container'))
          .forEach((element)=>{
            const classes=['flex','!p-0','!pl-[4em]','items-center','flex-row-reverse']
            if((element as HTMLElement).innerText!== '') element.classList.add(...classes)
          })
          
          Array.from(descriptionDiv.current.querySelectorAll('.descricao-desktop-container-2'))
          .forEach((element)=>{
            const classes=['flex','!p-0','!pl-[4em]','items-center','justify-around']
            if(element.querySelector('img') && element.querySelector('div')) classes.push('bg-[#1c1c1c]')
            if((element as HTMLElement).innerText!== '') element.classList.add(...classes)
          })
          
          Array.from(descriptionDiv.current.querySelectorAll('.order-2.order-md-1'))
          .forEach((element)=>{
            const classes=['w-[37vw]']
            if((element as HTMLElement).innerText!== '') element.classList.add(...classes)
          })
          
          Array.from(descriptionDiv.current.querySelectorAll('.container-text-des'))
          .forEach((element)=>{
            const classes=['w-[37vw]','ml-[6em]']
            if((element as HTMLElement).innerText!== '') element.classList.add(...classes)
          })
          
          Array.from(descriptionDiv.current.querySelectorAll('.text-center-desc'))
          .forEach((element)=>{
            const classes=['text-center','re1:mt-[5em]']
            if((element as HTMLElement).innerText!== '') element.classList.add(...classes)
          })
          
          Array.from(descriptionDiv.current.querySelectorAll('.descricao-p-info'))
          .forEach((element)=>{
            const classes=['text-center','re1:text-left']
            if((element as HTMLElement).innerText!== '') element.classList.add(...classes)
          })
          
          const pDesc=Array.from(descriptionDiv.current.querySelectorAll('p'))!
          const specsPossibleNames=['ESPECIFICAÇÕES:','ESPECIFICAÇÃO:','CARACTERÍSTICAS:','CARACTERISTICAS:','CARACTERISTICA:']
          const indexSpec=pDesc.indexOf(pDesc.find(element=>specsPossibleNames.some(string=>element.innerText.toUpperCase().includes(string)))!)
          pDesc.slice(indexSpec,pDesc.length).forEach((p)=>{
            p.previousSibling?.remove()
            p.remove()
          })
        }

        descriptionDiv.current.innerHTML==='' && (setTimeout(()=>{
          setVazio(true)
        },3000), batata='batata')
      }
      batata==='' && setLoading('')
    }
    setAlreadyOpened(true)
  }
  
  useEffect(()=>{
    if(descriptionDiv.current){
      Array.from(descriptionDiv.current.querySelectorAll('img')).forEach(img=>{
        if(img.hasAttribute('data-src')){
          img.src=img.getAttribute('data-src')!
          img.removeAttribute('data-src')
          img.style.display='unset'
        }
      })

      Array.from(descriptionDiv.current.querySelectorAll('source')).forEach(source=>{
        if(source.hasAttribute('data-srcset')){
          source.srcset=source.getAttribute('data-srcset')!
          source.removeAttribute('data-srcset')
          source.style.display='unset'
        }
      })

      Array.from(descriptionDiv.current.querySelectorAll('.benefitsContent .benefit div span'))
      .forEach((element)=>{
        console.log(element)
        const classes=['!text-[18px]']
        element.classList.add(...classes)
      })
    }
  },[])
  

  return (
    <div className={`w-full re1:px-[10%] border-y border-y-neutral ${vazio ? 'hidden' : ''}`}>
      <label className='text-base re1:text-xl px-[10%] re1:px-0 py-[20px] font-bold flex justify-between items-center' onClick={handleDropdown}>
        <p className='w-[90%] re1:w-auto'>Descrição</p>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/slick-arrow.png' width={15} height={15} 
          loading='eager' decoding='sync' className={`hover:brightness-50 active:hue-rotate-[350deg] cursor-pointer ${openMenu ? 'rotate-[270deg]' : 'rotate-90'}`}
        />
      </label>
      <div className={`${openMenu ? 'flex items-center justify-center' : 'hidden'}`}>
        <div className={loading}/>
        {descriptionFromBD ? (<div ref={descriptionDiv} dangerouslySetInnerHTML={{__html: blockDescription!}}/>) 
        : (<div ref={descriptionDiv} dangerouslySetInnerHTML={{__html: description!}}/>)}
      </div>
    </div>
  )
}

export default Description