import PopComponent from 'deco-sites/shp/components/ComponentsSHP/PopComponent.tsx'

interface Scroll{
  type:"scroll"
  porcentagem:number
}

interface Carregamento{
  type:"carregamento"
  segundos:number
}
interface CTA{
  type:"CTA"
  link:string
}

interface ClickAndCopy{
  type:"copy"
  conteudo:string
}

interface Pattern{
  funcionabilidade?:CTA|ClickAndCopy
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

const PopUp=({ funcionabilidade, datas, disparo, mobile, ...props}:Props)=>{
  const now=new Date().getTime()
  const inicio=new Date(datas.inicial).getTime()
  const final=new Date(datas.final).getTime()

  if(!(now>=inicio && now<=final)) return null

  return <PopComponent funcionabilidade={funcionabilidade} disparo={disparo} mobile={mobile} {...props}/>
}

export default PopUp
