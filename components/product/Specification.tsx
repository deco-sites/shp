import {  useEffect, useRef, useState } from 'preact/hooks'
import type { ProductDetailsPage } from 'apps/commerce/types.ts'
import Image from 'deco-sites/std/components/Image.tsx'
import { sendEvent } from 'deco-sites/shp/sdk/analytics.tsx'
import SpecPeca from "deco-sites/shp/components/product/SpecPeca.tsx";

export interface Props {
  page: ProductDetailsPage
}

const Specification=({page}:Props)=>{
  const {product}=page
  const categoriesId = product.additionalProperty?.map((item) =>
    item.name === 'category' ? item.propertyID : undefined
  )
  const PCGamer = categoriesId?.some((item) => item === '10')
  const description:string=product.description!
  const [openMenu,setOpenMenu]=useState(false)

  const [specVazio,setSpecVazio]=useState(false)
  const productSpec=useRef<HTMLDivElement>(null)

  const [alreadyOpened,setAlreadyOpened]=useState(false)

  const handleDropdown=(event:MouseEvent)=>{
    try{
      if(!alreadyOpened && !PCGamer){
        const descElement=document.createElement('div')
        descElement.innerHTML=description
        const pDesc=Array.from(descElement.querySelectorAll('p'))!
        const specsPossibleNames=['ESPECIFICAÇÕES','ESPECIFICAÇÃO','CARACTERÍSTICAS','CARACTERISTICAS','CARACTERISTICA']
        const indexSpec=pDesc.indexOf(pDesc.find(element=>specsPossibleNames.some(string=>element.innerText.toUpperCase().includes(string)))!)
        const specs=pDesc.slice(indexSpec,pDesc.length)
        specs.forEach((p,index)=>{
          index !== 0 && p.previousSibling?.remove()
          p.remove()
        })
        const specsText = specs.map((e, index)=>{
          if (e.innerHTML.includes('\u003Cbr\u003E')) {
            const arry = e.innerHTML.split('\u003Cbr\u003E')
            arry.shift()
            return arry
          } else {
            if (e.innerText.includes(':')) {
              if (index !== 0) {
                return e.innerText
              }
            }
          }
  
          return ''
        }).filter(e=>e!=='' && e)
  
        const specsObj:string[] & Array<string[]> = []
        specsText.forEach((element)=>{
          if (typeof (element) !== 'string') {
            element!.forEach((arr)=>{
              let[key,value]:string[] = arr.split(':')

              if (!((key === undefined || value === undefined) ||  (/^\s*$/.test(key) || /^\s*$/.test(value)) || !(/[A-Za-z]/.test(key) || /[A-Za-z]/.test(value)) || (key.includes('\u003C') || value.includes('\u003C')))) {
                if (key.split('')[0] === '-') {
                  const arrKey = key.split('')
                  arrKey.shift()
                  key = arrKey.join('')
                }
                specsObj.push([key, value])
              }
            })
          } else {
            let[key,value] = element.split(':')

            if (!((key === undefined || value === undefined) || (/^\s*$/.test(key) || /^\s*$/.test(value)) || !(/[A-Za-z]/.test(key) || /[A-Za-z]/.test(value)) || (key.includes('\u003C') || value.includes('\u003C')))) {
              if (key.split('')[0] === '-') {
                const arrKey = key.split('')
                arrKey.shift()
                key = arrKey.join('')
              }
              specsObj.push([key, value])
            }
          }
        })
  
        const table1 = document.createElement('table')
        table1.classList.add('w-[90%]','re1:w-[45%]','text-left')
        table1.innerHTML = '<tbody></tbody>'
        const tbody1 = table1.querySelector('tbody')!
  
        const table2 = document.createElement('table')
        table2.classList.add('w-[90%]','re1:w-[45%]','text-left')
        table2.innerHTML = '<tbody></tbody>'
        const tbody2 = table2.querySelector('tbody')!
  
        const middleIndex = Math.ceil((specsObj.length - 1) / 2)
        const isOdd = specsObj.length % 2 === 0
  
        specsObj.forEach(function(e, index) {
          const [key,value] = e
          const tr = document.createElement('tr')
          if (((index + 1) % 2) !== 0) {
            tr.classList.add('bg-[#151515]','re1:bg-transparent')
          }
          tr.innerHTML = `
            <th class="w-[35%] text-neutral-content pl-4 text-normal">${key}</th><td class="w-[65%] pl-4 text-normal">${value}</td>
          `
          tr.classList.add('re1:even:bg-[#151515]','text-sm','h-[40px]')
          if (isOdd) {
            index > (specsObj.length / 2) - 1 ? tbody2.append(tr) : tbody1.append(tr)
          } else {
            index > middleIndex ? tbody2.append(tr) : tbody1.append(tr)
          }
        
        })
  
        const tableWrapper = document.createElement('div')
        tableWrapper.classList.add('flex','flex-col','re1:flex-row','re1:gap-5','justify-center','items-center','re1:items-baseline')
        tableWrapper.append(table1)
        tableWrapper.append(table2)
        
        tableWrapper.innerText !== '' ? (productSpec.current && productSpec.current.append(tableWrapper)) : setSpecVazio(true)
      }
    }catch(err){
      console.error(err)
    }
    setAlreadyOpened(true)
    setOpenMenu(!openMenu)
  }

  const specsName=['Processador', 'Fonte', 'Placa Mãe', 'Sistema Operacional', 'Fan Adicional', 'Placa de vídeo', 'Memória', 'Garantia', 'SSD', 'HD', 'Cabos Inclusos', 'Gabinete']
  const pecasOrdem=['Processador', 'Fonte', 'Placa Mãe', 'Fan Adicional', 'Placa de vídeo', 'Memória', 'SSD', 'HD', 'Gabinete']
  const specs = (product.isVariantOf?.additionalProperty.map((item) => {
    if(specsName.includes(item.name!)){
      return item
    }
  }) || [] ).filter((item)=> item !== undefined)!

  const pecas=specs.filter(item=>pecasOrdem.includes(item!.name!)).sort((a,b)=>pecasOrdem.indexOf(a!.name!) - pecasOrdem.indexOf(b!.name!))

  useEffect(()=>{
    openMenu && sendEvent({name:'select_content', params:{content_type:'specification'}})
  },[openMenu])

  return (
    <div className={`w-full re1:px-[10%] border-b border-b-neutral ${specVazio ? 'hidden' : ''}`}>
      <label className='text-base px-[10%] re1:px-0 re1:text-xl py-[20px] font-bold flex justify-between items-center' onClick={handleDropdown}>
        <p className='w-[90%] re1:w-auto'>Especificações Técnicas</p>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/slick-arrow.png' width={15} height={15} 
          loading='eager' decoding='sync' className={`hover:brightness-50 active:hue-rotate-[350deg] cursor-pointer ${openMenu ? 'rotate-[270deg]' : 'rotate-90'}`}
        />
      </label>
      <div className={`${openMenu ? 'block' : 'hidden'} my-5`}>
        {PCGamer ? (
          <>
            <div className='flex flex-col re1:flex-row gap-5 re1:gap-2 re1:justify-around'>
              {/* Specs Grid */}
              <div className='grid grid-cols-2 re1:grid-cols-3 re1:gap-x-5 re1:gap-y-5'>
                {pecas.map((item, index)=>{
                  let width:number
                  let height:number
                  let iconImg:string

                  switch (item!.name) {
                    case 'Processador':
                      width=44
                      height=44
                      iconImg='https://shopinfo.vteximg.com.br/arquivos/icone-produto-processador.png'
                      break;
                  
                    case 'Fonte':
                      width=52
                      height=36
                      iconImg='https://shopinfo.vteximg.com.br/arquivos/icone-produto-fonte.png'
                      break;

                    case 'Placa Mãe':
                      width=44
                      height=44
                      iconImg='https://shopinfo.vteximg.com.br/arquivos/icone-produto-placamae.png'
                      break;
                    
                    case 'Fan Adicional':
                      width=44
                      height=44
                      iconImg='https://shopinfo.vteximg.com.br/arquivos/icone-produto-cooler.png'
                      break;

                    case 'Placa de vídeo':
                      width=57
                      height=40
                      iconImg='https://shopinfo.vteximg.com.br/arquivos/icone-produto-placadevideo.png'
                      break;

                    case 'Memória':
                      width=57
                      height=40
                      iconImg='https://shopinfo.vteximg.com.br/arquivos/icone-produto-memoria.png'
                      break;

                    case ('SSD' || 'HD'):
                      width=52
                      height=36
                      iconImg='https://shopinfo.vteximg.com.br/arquivos/icon-hd.svg'
                      break;

                    case 'Gabinete':
                      width=32
                      height=44
                      iconImg='https://shopinfo.vteximg.com.br/arquivos/icone-gabinete-gamer.png'
                      break;

                    default:
                      width=0
                      height=0
                      iconImg='https://shopinfo.vteximg.com.br/arquivos/menu-icons.png'
                      break;
                  }

                  return(
                    <SpecPeca pecaName={item!.value || ''} pecaCateg={item!.name!} prod={product}
                      IconW={width} IconH={height} linkIcon={iconImg} key={index} modalId={index}
                    />
                  )
                })}
                <Image width={212} height={175} src='https://shopinfo.vteximg.com.br/arquivos/icone-pc-pronto-pra-jogarr.png'
                  loading='lazy' decoding='sync' fetchPriority='low'
                />
              </div>

              {/* Specs Table */}
              <table className='w-screen re1:w-[25vw] re4:w-[40vw]'>
                <tbody>
                  {specs.map(item=>(
                    <tr className='even:bg-[#151515] text-left'>
                      <th className='text-neutral-content font-normal w-[40%] p-2'>{item?.name}</th>
                      <td className='text-secondary w-[60%] p-2'>{item?.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='my-6 p-2 re1:p-0 flex flex-col re1:flex-row re1:justify-between gap-4 re1:gap-0'>
              <div className='w-full re1:w-2/5 flex flex-col gap-3'>
                <span>Recomendações</span>
                <p className='text-xs re1:text-sm'>{product.isVariantOf?.additionalProperty.find(item=>item.name==='Recomendações')?.value || 'Informação indisponível'}</p>
              </div>
              <div className='w-full re1:w-2/5 flex flex-col gap-3'>
                <span>Imagem do Fabricante</span>
                <p className='text-xs re1:text-sm'>{product.isVariantOf?.additionalProperty.find(item=>item.name==='Imagem do Fabricante')?.value || 'Informação indisponível'}</p>
              </div>
            </div>
          </>
        ) 
        : (<div ref={productSpec}/>)}
      </div>
    </div>
  )
}

export default Specification