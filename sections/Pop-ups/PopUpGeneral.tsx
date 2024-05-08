import { SectionProps } from "deco/types.ts";
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
  /**@description apenas o path delas */
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

export const loader = (props: Props, _req: Request) => {
  return {
    ...props, 
    requestedUrl:_req.url
  }
}

const PopUpGeneral=({ CTA, datas, disparo, paginas, requestedUrl, ...props}:SectionProps<typeof loader>)=>{
  const now=new Date().getTime()
  const inicio=new Date(datas.inicial).getTime()
  const final=new Date(datas.final).getTime()

  if(!(now>=inicio && now<=final)) return null

  const url=new URL(requestedUrl)

  return paginas.includes(url.pathname) ? 
    <PopComponent disparo={disparo} CTA={CTA} {...props}/>
  : null 
}

export default PopUpGeneral