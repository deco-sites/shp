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

export type CustomEvents=
  ShareEvent |
  SelectContentEvent |
  DesempenhoAproxEvent

export type GA4Events=
  CustomEvents | AnalyticsEvent