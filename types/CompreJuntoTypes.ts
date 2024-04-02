import { Product } from "apps/commerce/types.ts";

export interface FiltroType{
  name:string
  iconURL:string
  iconTamanho:{
    width:number
    height:number
  }
}

interface FiltroPreco extends FiltroType{
  /**@description Não altere o valor */
  fqType:'P'
  /**@description Ex: minVal TO maxVal */
  value:string
}

interface FiltroCategoria extends FiltroType{
  /**@description Não altere o valor */
  fqType:'C'
  /**@description Ex: idCateg/idSubCateg */
  value:string
}

interface FiltroCombo extends FiltroType{
  /**@description Não altere o valor */
  fqType:'COMBO'
  /**@description Sku do combo */
  value:string
}

export interface Filtros{
  /**@description Selecione o tipo de Filtro */
  tipoDeFiltro:FiltroPreco[] | FiltroCategoria[] | FiltroCombo[]
}

export type Codigo=string

export type Vazio=null


export interface TipoDeFiltro{
  /**
   * @description Selecione entre Filtros, Código ou deixe vazio caso não haja ambos! Caso seja código, porfavor use a sintaxe HTML normal e tag style pra estilizar!
   */
  tipo:Filtros | Codigo | Vazio
}

export type FinalProd={
  prod:Product
  combo?:comboObj
}

export type Filter={
  index:number
  value:string
  fqType:string
}

export interface objBuyTogether{
  sku:string,
  promotion:string,
}

export interface comboObj{
  id:string
  image:string
  name:string
  finalPrice:number
  link:string
}