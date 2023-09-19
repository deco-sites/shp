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

export interface Filtros{
  /**@description Selecione o tipo de Filtro */
  tipoDeFiltro:FiltroPreco[] | FiltroCategoria[]
}

export type Codigo=string

export type Vazio=null

export interface TipoDeFiltro{
  /**
   * @description Selecione entre Filtros, Código ou deixe vazio caso não haja ambos! 
   */
  tipo:Filtros | Codigo | Vazio
}