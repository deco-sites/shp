import { useEffect, useState } from 'preact/hooks'
import { SectionProps } from 'deco/types.ts'
import PopComponent from 'deco-sites/shp/components/ComponentsSHP/PopComponent.tsx'

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
  /**@description apenas o path das paginas q n queira mostrar */
  paginas:string[]
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

const PopUpGeneral=({ CTA, datas, disparo, paginas, ...props}:Props)=>{
  const [show, setShow]=useState(false)
  const now=new Date().getTime()
  const inicio=new Date(datas.inicial).getTime()
  const final=new Date(datas.final).getTime()

  if(!(now>=inicio && now<=final)) return null

  useEffect(()=>{
    const pathname=globalThis.window.location.pathname
    !paginas.some(page=>pathname.includes(page)) && setShow(true)
  },[])

  return show ? <PopComponent disparo={disparo} CTA={CTA} {...props}/> : null
}

export default PopUpGeneral