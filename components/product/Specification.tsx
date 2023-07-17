import type { ProductDetailsPage } from 'deco-sites/std/commerce/types.ts'
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
  const handleModal=async (event:MouseEvent)=>{
    modal.current && (
      modal.current.showModal()
    )

    if(opened===0){
      const data=await getPecaLoader(props.pecaName)
      setData(data)
    }

    setOpened(opened+1)
  }


  return(
    <>
      <div className='cursor-pointer flex flex-col items-center justify-center w-48 h-48 border border-[#3d3d3d] re1:rounded-lg' onClick={handleModal}>
        <Image src={props.linkIcon} loading='lazy' decoding='sync' fetchPriority='low' width={props.IconW} height={props.IconH}/>
        <p className='text-xs re1:text-sm text-[#3d3d3d] my-4'>{props.pecaCateg}</p>
        <p className='text-sm re1:text-base text-white'>{props.pecaName}</p>
      </div>
      <dialog ref={modal} className='bg-[#111]/40 min-h-full min-w-[100vw] overflow-hidden flex'>
        <form method='dialog' className='p-4 h-screen re1:h-[70vh] w-2/5 bg-[#0c0c0c] ml-auto re1:m-auto rounded-lg'>
          <button className='absolute m-3 border-[#dd1f26] rounded-full border text-[#dd1f26] w-5 h-5 flex items-center justify-center text-xs'>✕</button>
          <div className='flex flex-col gap-5 overflow-y-scroll'>
            <div className="p-5 bg-[#0a0a0a] ">
              <img src={data[0] || '#'} width={300} height={300}/>
            </div>
            <div dangerouslySetInnerHTML={{__html: data[1] || '' }} />
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
  const descricaoFinal=PCGamer ?  (
    /&nbsp;/.test(description) ? product.isVariantOf?.additionalProperty?.find(item=>item.name==='Bloco Descrição')?.value! : description!
  ) 
    : description!
  
  const [openMenu,setOpenMenu]=useState(false)

  const handleDropdown=(event:MouseEvent)=>{
    setOpenMenu(!openMenu)
  }

  useEffect(()=>console.log(product),[])

  const specsName=['Processador', 'Fonte', 'Placa Mãe', 'Sistema Operacional', 'Fan Adicional', 'Placa de vídeo', 'Memória', 'SSD', 'Cabos Inclusos', 'Gabinete']
  const specs = product.isVariantOf?.additionalProperty
      .map((item) => {
        if (item.name === 'Processador') return { value: item.value, type: item.name }
        if (item.name === 'SSD' || item.name === 'HD') return { value: item.value, type: item.name }
        if (item.name === 'Memória') return { value: item.value, type: item.name }
        if (item.name === 'Placa de vídeo') return { value: item.value, type: item.name }
      })
      .filter((item) => item !== undefined)

    // const processador = pecas?.find((peca) => peca?.type === 'Processador')
    // const mem = pecas?.find((peca) => peca?.type === 'Memória')
    // const placa = pecas?.find((peca) => peca?.type === 'Placa de vídeo')
    // const arm = pecas?.find((peca) => peca?.type === 'HD' || peca?.type === 'SSD')

  return (
    <div className='w-screen px-[10%] border-b border-b-[#3d3d3d]'>
      <label className='text-base re1:text-xl py-[20px] font-bold flex justify-between items-center' onClick={handleDropdown}>
        <p>Especificações Técnicas</p>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/slick-arrow.png' width={15} height={15} 
          loading='eager' decoding='sync' className={`hover:brightness-50 active:hue-rotate-[350deg] cursor-pointer ${openMenu ? 'rotate-[270deg]' : 'rotate-90'}`}
        />
      </label>
      <div className={`${openMenu ? 'block' : 'hidden'}`}>
        {PCGamer ? (
          <div>
            {/* Specs Grid */}
            <div>
              <SpecPeca linkIcon='https://shopinfo.vteximg.com.br/arquivos/icone-produto-processador.png' 
              pecaCateg='processador' pecaName='16GB' IconW={44} IconH={44}/>
            </div>
          </div>
        ) 
        : (<div />)}
      </div>
    </div>
  )
}

export default Specification