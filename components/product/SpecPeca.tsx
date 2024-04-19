import { memo } from 'preact/compat'
import {  useEffect, useRef, useState } from 'preact/hooks'
import { Product } from 'apps/commerce/types.ts'
import Image from 'deco-sites/std/components/Image.tsx'
import { sendEvent } from "deco-sites/shp/sdk/analytics.tsx";

interface PecaProps{
  linkIcon:string
  IconW:number
  IconH:number
  pecaCateg:string
  pecaName:string
  modalId:number
  prod:Product
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
      sendEvent({name:'item_specification',params:{
        specification_title:props.pecaCateg,
        item_id:props.prod.isVariantOf?.model ?? props.prod.productID,
        item_name:props.prod.name
      }})
      const data=await getPecaLoader(props.pecaName)
      setData(data)
    }
    
    modal.current && (
      modal.current.showModal()
    )
    setOpened(opened+1)
  }

  return (
    <>
      <div onClick={openModal}
        className='cursor-pointer flex flex-col items-center justify-center w-auto re1:w-[212px] 
        h-48 re1:h-[175px] border border-[#1e1e1e] re1:rounded-lg hover:border-primary hover:bg-[#dd1f1624]' 
      >
        <Image src={props.linkIcon} loading='lazy' decoding='sync' fetchPriority='low' width={props.IconW} height={props.IconH}/>
        <p className='text-xs re1:text-sm text-neutral my-4'>{props.pecaCateg}</p>
        <p className='text-sm re1:text-base text-secondary max-w-[160px] text-center'>{props.pecaName}</p>
      </div>
      <dialog id={props.modalId.toString()} ref={modal} className='bg-base-100/40 min-h-full min-w-[100vw] fixed p-0 top-0'>
        <form method='dialog' className='p-10 re1:p-12 h-screen re1:h-[70vh] w-4/5 re1:w-2/5 bg-[#303030] ml-auto re1:m-auto re1:mt-[15vh] rounded-lg overflow-y-scroll'>
          <button
            onClick={()=>modal.current?.close()}
            className='absolute top-0 re1:top-[15.5vh] left-[20%] re1:left-[30.25%] m-3 border-primary rounded-full border text-primary w-5 h-5 flex items-center justify-center text-xs'
          >✕</button>
          <div className='flex flex-col gap-5 text-secondary [overflow-wrap:break-word]'>
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

export default memo(SpecPeca)