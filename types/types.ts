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

export interface OpenMinicartParams{
  path?:string
}

export interface OpenMinicartEvent extends IEvent<OpenMinicartParams>{
  name:'open_minicart'
}

export interface CheckoutMinicartParams{
  currency?:string
  value?:number
}

export interface CheckoutMinicartEvent extends IEvent<CheckoutMinicartParams>{
  name:'checkout_minicart'
}

export interface TrackOrderParams{
  path?:string
}

export interface TrackOrderEvent extends IEvent<TrackOrderParams>{
  name:'track_order'
}

export interface MyAccountParams{
  path?:string
}

export interface MyAccountEvent extends IEvent<MyAccountParams>{
  name:'my_account'
}

export interface ViewItemUnavailableParams{
  item_id?:string
  item_name?:string
}

export interface ViewItemUnavailableEvent extends IEvent<ViewItemUnavailableParams>{
  name:'view_item_unavailable'
}

export interface LeadItemUnavailableParams{
  item_id?:string
  item_name?:string
}

export interface LeadItemUnavailableEvent extends IEvent<LeadItemUnavailableParams>{
  name:'lead_item_unavailable'
}

export interface BrandParams{
  currency?:string
  value?:number
  item_id?:string
  item_name?:string
}

export interface BrandEvent extends IEvent<BrandParams>{
  name:'brand'
}

export interface SearchDetailsParams{
  content_type?:string
  path?:string
}

export interface SearchDetailsEvent extends IEvent<SearchDetailsParams>{
  name:'search_details'
}

export interface ShowMoreParams{
  item_list_id?:string
  item_list_name?:string
}

export interface ShowMoreEvent extends IEvent<ShowMoreParams>{
  name:'show_more'
}

export interface FiltersParams{
  filter?:string
  filtred_by?:string
}

export interface FiltersEvent extends IEvent<FiltersParams>{
  name:'filters'
}

export interface StockCountParams{
  stock_count?:number
  currency?:string
  value?:number
  item_id?:string
  item_name?:string
}

export interface StockCountEvent extends IEvent<StockCountParams>{
  name:'stock_count'
}

export type CustomEvents=
  ShareEvent |
  SelectContentEvent |
  DesempenhoAproxEvent |
  ItemImageEvent |
  ItemSpecificationEvent |
  EncontrePC1Event| EncontrePC2Event | EncontrePC3Event |
  FreightPDPEvent |
  OpenMinicartEvent | CheckoutMinicartEvent |
  TrackOrderEvent |
  MyAccountEvent |
  ViewItemUnavailableEvent |
  LeadItemUnavailableEvent |
  BrandEvent |
  SearchDetailsEvent |
  ShowMoreEvent |
  FiltersEvent |
  StockCountEvent

export type GA4Events=
  CustomEvents | AnalyticsEvent