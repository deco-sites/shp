import { useRef } from 'preact/hooks'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'

interface Scroll{
  type:"scroll"
  porcentagem:number
}

interface Carregamento{
  type:"carregamento"
  segundos:number
}

interface Pattern{
  CTA?:string
  /** @description Datas para exibir o banner, Ex. 2020-10-05T18:30:00*/
  datas:{
    inicial:string
    final:string
  }
  disparo:Scroll|Carregamento
  mobile:boolean
}

interface Conteudo extends Pattern{
  type:"Content"
  titulo1:string
  titulo2:string
  /**@format color */
  corFundo:string
  /**@format color */
  corTexto:string
}

interface Imagem extends Pattern{
  type:"Image"
  bannerLink:string
}

export type Props=Conteudo|Imagem

const PopComponent=({ CTA, datas, disparo, mobile, ...props}:Props)=>{
  const modalRef=useRef<HTMLDialogElement>(null)

  const handleClick=()=>{
    CTA && (globalThis.window.location.href=CTA)
  }

  const close=()=>{
    modalRef.current?.close()
  }

  return (
    <dialog ref={modalRef} className={`${!mobile?'hidden re1:block':''} fixed bottom-4 ml-4 w-fit`} onClick={handleClick} open>
      {props.type==='Image' ? (
        // Image content
        null
      ) : (
        // Content content
        <form method='dialog' className='flex p-5 items-center justify-center gap-5 relative w-[400px] rounded-lg' style={{backgroundColor:props.corFundo, color:props.corTexto}}>
          <button className='absolute top-2 right-2' onClick={close}>✕</button>
          <div>
            <Image src='https://shopinfo.vteximg.com.br/arquivos/logo-shopinfo.png' width={67} height={64}/>
          </div>
          <div>
            <span className='font-bold text-xl'>{props.titulo1}</span>
            <p className='whitespace-break-spaces' dangerouslySetInnerHTML={{__html:props.titulo2.replaceAll('  ', '<br/>')}}/>
          </div>
        </form>
      )}
    </dialog>
  )
}

export default PopComponent