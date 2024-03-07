import { AnalyticsEvent, IEvent } from "apps/commerce/types.ts";

export type ObjTrust={
  product_code:string
  average:number
  count:number
  product_name:string
}

export interface ShareParams{
  method?:string
  content_type?:string
  item_id?:string
}

export interface ShareEvent extends IEvent<ShareParams>{
  name:'share'
}

export interface SelectContentParams{
  content_type?:string
}

export interface SelectContentEvent extends IEvent<SelectContentParams>{
  name:'select_content'
}

export interface DesempenhoAproxParams{
  item_id?:string
  item_name?:string
}

export interface DesempenhoAproxEvent extends IEvent<DesempenhoAproxParams>{
  name:'desempenho_aprox'
}

export interface ItemImageParams{
  item_id?:string
  item_name?:string
}

export interface ItemImageEvent extends IEvent<ItemImageParams>{
  name:'item_image'
}

export interface ItemSpecificationParams{
  specification_title?:string
  item_id?:string
  item_name?:string
}

export interface ItemSpecificationEvent extends IEvent<ItemSpecificationParams>{
  name:'item_specification'
}

export interface EncontrePC1Params{
  selected_games?:string[]
}

export interface EncontrePC1Event extends IEvent<EncontrePC1Params>{
  name:'encontre_pc_1'
}

export interface EncontrePC2Params{
  selected_value?:string
}

export interface EncontrePC2Event extends IEvent<EncontrePC2Params>{
  name:'encontre_pc_2'
}

export interface EncontrePC3Params{
  selected_performance?:string
}

export interface EncontrePC3Event extends IEvent<EncontrePC3Params>{
  name:'encontre_pc_3'
}

export interface FreightPDPParams{
  cep?:string
  avaiability?:string 
  freight_value?:number
  carrier_name?:string
  delivery_time?:string
  item_id?:string
  item_name?:string
}

export interface FreightPDPEvent extends IEvent<FreightPDPParams>{
  name:'freight_pdp'
}

export type CustomEvents=
  ShareEvent |
  SelectContentEvent |
  DesempenhoAproxEvent |
  ItemImageEvent |
  ItemSpecificationEvent |
  EncontrePC1Event| EncontrePC2Event | EncontrePC3Event |
  FreightPDPEvent

export type GA4Events=
  CustomEvents | AnalyticsEvent