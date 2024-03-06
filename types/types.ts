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

export type CustomEvents=
  ShareEvent 

export type GA4Events=
  CustomEvents | AnalyticsEvent