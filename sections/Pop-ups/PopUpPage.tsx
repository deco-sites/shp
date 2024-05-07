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

const PopUp=({ CTA, datas, disparo, mobile, ...props}:Props)=>{
  return <PopComponent CTA={CTA} datas={datas} disparo={disparo} mobile={mobile} {...props}/>
}

export default PopUp
