import type { ProductDetailsPage, PropertyValue } from 'apps/commerce/types.ts'
import { useEffect, useRef, useState } from 'preact/hooks'
import Image from 'deco-sites/std/components/Image.tsx'

export interface Props {
  page: ProductDetailsPage
}

interface PecaProps{
  linkIcon:string
  IconW:number
  IconH:number
  pecaCateg:string
  pecaName:string
  modalId:number
}

const getPecaLoader= async(term:string) =>{
  const url='https://api.shopinfo.com.br/especificacoes-pecas/getPecas.php'
  const formData=new FormData()
  formData.append('data',term)
  const data:string[]=await fetch(url,{
    method: "POST",
    body: formData 
  }).then(r=>r.json()).catch(err=>console.log('Error: ',err)) || []

  return data
}

const SpecPeca=({ ...props }:PecaProps)=>{
  const [opened, setOpened]=useState(0)
  const [data,setData]=useState<string[]>([])
  const modal=useRef<HTMLDialogElement>(null)
  const defaultMsg=`<span class="defaultMsg"><br><p>Garantia de 12 meses (contra defeitos de fabricação)</p><p><br></p><p>*Não é considerado defeito de fabricação: oxidação de peças, problemas no sistema operacional e quebra de peças.</p><p><br></p><p>Troca ou devolução:</p><p>Solicitação de troca ou devolução em até 7 dias corridos após o recebimento do produto.</p><p><br></p><p>As imagens são meramente ilustrativas. As marcas das peças podem variar de acordo com nosso estoque, mas garantimos que as peças são de excelente qualidade. Especificações técnicas sujeito a alterações sem aviso prévio.</p><p><br></p><p>IMPORTANTE: &nbsp;No ato da entrega, confira o(s) produto(s) e no caso de avarias no transporte, registre a ocorrência no documento da entrega, seguindo o Art. 754 Código Civil; reclamações posteriores não serão aceitas.</p></span>`

  const openModal=async (event:MouseEvent)=>{
    if(opened===0){
      const data=await getPecaLoader(props.pecaName)
      setData(data)
    }
    
    modal.current && (
      modal.current.showModal()
    )
    setOpened(opened+1)
  }

  return(
    <>
      <div onClick={openModal}
        className='cursor-pointer flex flex-col items-center justify-center w-auto re1:w-[212px] 
        h-48 re1:h-[175px] border border-[#1e1e1e] re1:rounded-lg hover:border-[#dd1f26] hover:bg-[#dd1f1624]' 
      >
        <Image src={props.linkIcon} loading='lazy' decoding='sync' fetchPriority='low' width={props.IconW} height={props.IconH}/>
        <p className='text-xs re1:text-sm text-[#3d3d3d] my-4'>{props.pecaCateg}</p>
        <p className='text-sm re1:text-base text-white max-w-[160px] text-center'>{props.pecaName}</p>
      </div>
      <dialog id={props.modalId.toString()} ref={modal} className='bg-[#111]/40 min-h-full min-w-[100vw] fixed p-0 top-0'>
        <form method='dialog' className='p-10 re1:p-12 h-screen re1:h-[70vh] w-4/5 re1:w-2/5 bg-[#303030] ml-auto re1:m-auto re1:mt-[15vh] rounded-lg overflow-y-scroll'>
          <button
            onClick={()=>modal.current?.close()}
            className='absolute top-0 re1:top-[15.5vh] left-[20%] re1:left-[30.25%] m-3 border-[#dd1f26] rounded-full border text-[#dd1f26] w-5 h-5 flex items-center justify-center text-xs'
          >✕</button>
          <div className='flex flex-col gap-5 text-white [overflow-wrap:break-word]'>
            <div className="p-5 bg-[#0a0a0a]">
            {data[0] ? (
              <Image className='m-auto' src={data[0]} width={300} height={300}/>
            ) : (
              <div className='h-[300px] w-[300px]'/>
            )}
            </div>
            <div dangerouslySetInnerHTML={{__html: (data[1] || '') + defaultMsg }} />
          </div>
        </form>
      </dialog>
    </>
  )
}

const Specification=({page}:Props)=>{
  const {product}=page
  const categoriesId = product.additionalProperty?.map((item) =>
    item.name === 'category' ? item.propertyID : undefined
  )
  const PCGamer = categoriesId?.some((item) => item === '10')
  const description:string=product.description!
  const [alreadyOpened,setAlreadyOpened]=useState(false)
  const [openMenu,setOpenMenu]=useState(false)
  const productSpec=useRef<HTMLDivElement>(null)

  const handleDropdown=(event:MouseEvent)=>{
    setOpenMenu(!openMenu)
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
          <th class="w-[35%] text-[#828282] pl-4 text-normal">${key}</th><td class="w-[65%] pl-4 text-normal">${value}</td>
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
      

      productSpec.current && productSpec.current.append(tableWrapper)

    }
    setAlreadyOpened(true)
  }

  const specsName=['Processador', 'Fonte', 'Placa Mãe', 'Sistema Operacional', 'Fan Adicional', 'Placa de vídeo', 'Memória', 'Garantia', 'SSD', 'HD', 'Cabos Inclusos', 'Gabinete']
  const pecasOrdem=['Processador', 'Fonte', 'Placa Mãe', 'Fan Adicional', 'Placa de vídeo', 'Memória', 'SSD', 'HD', 'Gabinete']
  const specs = (product.isVariantOf?.additionalProperty.map((item) => {
    if(specsName.includes(item.name!)){
      return item
    }
  }) || [] ).filter((item)=> item !== undefined)!

  const pecas=specs.filter(item=>pecasOrdem.includes(item!.name!)).sort((a,b)=>pecasOrdem.indexOf(a!.name!) - pecasOrdem.indexOf(b!.name!))


  return (
    <div className='w-full re1:px-[10%] border-b border-b-[#3d3d3d]'>
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
                      iconImg='https:/shopinfo.vteximg.com.br/arquivos/menu-icons.png'
                      break;

                    default:
                      width=0
                      height=0
                      iconImg='https:/shopinfo.vteximg.com.br/arquivos/menu-icons.png'
                      break;
                  }

                  return(
                    <SpecPeca pecaName={item!.value || ''} pecaCateg={item!.name!}
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
                      <th className='text-[#828282] font-normal w-[40%] p-2'>{item?.name}</th>
                      <td className='text-white w-[60%] p-2'>{item?.value}</td>
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