// deno-lint-ignore-file no-explicit-any
import { LoaderReturnType, SectionProps } from 'deco/types.ts'
import { TipoDeFiltro, Filtros } from 'deco-sites/shp/types/CampanhaTypes.ts'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import { Product } from 'apps/commerce/types.ts'
import { useEffect, useState, useRef } from 'preact/hooks'
import {invoke} from 'deco-sites/shp/runtime.ts'
import Card from 'deco-sites/shp/components/ComponentsSHP/ProductsCard/CampanhaCard.tsx'
import useTimer,{ TimeRemaining } from 'deco-sites/shp/FunctionsSHP/useTimer.ts'
import prodQntd from 'deco-sites/shp/FunctionsSHP/productQntHotsite.ts'
import FiltroMob from 'deco-sites/shp/sections/Campanha/FiltroMob.tsx'
import CompareContextProvider from 'deco-sites/shp/contexts/Compare/CompareContext.tsx'
import { sendEvent } from "deco-sites/shp/sdk/analytics.tsx";
import { OrgSchemaToAnalytics } from "deco-sites/shp/FunctionsSHP/ProdsToItemAnalytics.ts";
import { AppContext } from "deco-sites/shp/apps/site.ts";

//montando interface com infos que precisam de descricao no ADMIN
interface NeedDesc{
  /**@description Setas padrão entre os filtros */
  setasPadrao:boolean
  /**@description Escreva aqui o texto da tag de frete grátis */
  freteGratis?:string
}

interface Contador{
  contador:true
  /** @description formato AAAA-MM-DD*/
  inicioDaOferta:string
  /** @description formato AAAA-MM-DD*/
  finalDaOferta:string
  ofertaMadruga?:boolean
}

interface SemContador{contador:false}

type CompreEGanhe={
  tem:true
  /** @description Adicione palavras chaves dos brindes q n devem aparecer. Ex: Kaspersky */
  naoMostrar?:string[]
}|{tem:false}

export type Props={
  /** @description Não precisa preencher */
  descontoPix?:number
  compreEGanhe:CompreEGanhe
  collection:string
  produtos: LoaderReturnType<Product[] | null>
  bannerUrl:{
    desktop:string
    mobile:string
    linkCta?:string
  } 
} & NeedDesc & TipoDeFiltro & (Contador | SemContador)

type FinalProd={
  prod:Product
  brinde?:any
}

type Filter={
  index:number
  value:string
  fqType:string
}

const createContadorMadrugada=()=>{
  const agora=new Date()
  const horas = agora.getHours()
  let inicioContador: Date
  let fimContador: Date

  if (horas < 20) {
    // Antes das 20:00, o contador ainda não começou hoje
    inicioContador = new Date(agora.setHours(20, 0, 0, 0)) // Define para hoje às 20:00
    fimContador = new Date(inicioContador.getTime() + (14 * 60 * 60 * 1000)) // Adiciona 14 horas para acabar às 10:00 do dia seguinte
  } else {
    // Depois das 20:00, o contador já começou
    inicioContador = new Date(agora.setHours(20, 0, 0, 0)) // Começou hoje às 20:00
    fimContador = new Date(agora.setHours(34, 0, 0, 0)) // Define para amanhã às 10:00 (34 horas porque 24 + 10)
  }

  return fimContador
}

const loaderData= async(idCollection:string, order?:string, filter?:string):Promise<Product[]>=>{
  const arrQueryString=[`fq=productClusterIds:${idCollection}`]
  if(order && !(order==='' || order==='inicio')) arrQueryString.push(`O=${order}`)
  filter && arrQueryString.push('fq='+filter)
  arrQueryString.push('_from=0&_to=49')
  const queryString=encodeURI(arrQueryString.join('&'))

  return await invoke['deco-sites/shp'].loaders.getProductsSearchAPIProdType({queryString})
}

export const loader = (props: Props, _req: Request, ctx: AppContext & {descontoPix:number}) => {
  return {
    ...props, 
    descontoPix:ctx.descontoPix
  }
}

const Campanha=({collection, produtos, bannerUrl, tipo, freteGratis, setasPadrao, descontoPix, ...props}:SectionProps<typeof loader>)=>{
  const finalDate = props.contador ? new Date(
    props.ofertaMadruga ? 
    createContadorMadrugada() : 
    props.finalDaOferta
  ) : undefined
  const timeRemaining:TimeRemaining|undefined=props.contador ? useTimer(finalDate) : undefined

  const [filterSelected, setFilterSelected]=useState<Filter>({index:777,value:'inicio',fqType:''})
  const [products, setProducts]=useState<Product[]>(produtos || [])
  const [order, setOrder]=useState('inicio')
  const [loading,setLoading]=useState(true)
  const [finalProducts,setFinalProducts]=useState<FinalProd[]>([])
  const [sentEvent,setSentEvent]=useState(false)

  const ulFilters=useRef<HTMLUListElement>(null)
  const filtrosMob=useRef<HTMLDivElement>(null)

  const orderFilters:Record<string,string>[] =[
    {'Menor Preço':'OrderByPriceASC'},
    {'Maior Preço':'OrderByPriceDESC'},
    {'Mais Vendidos':'OrderByTopSaleDESC'},
    {'Melhores Avaliações':'OrderByReviewRateDESC'},
    {'A - Z':'OrderByNameASC'},
    {'Z - A':'OrderByNameDESC'},
    {'Data de Lançamento':'OrderByReleaseDateDESC'},
    {'Melhor Desconto':'OrderByBestDiscountDESC'}
  ]

  const fetchData=async()=>{
    setLoading(true)
    const filterVal=filterSelected.fqType==='P' ? '['+filterSelected.value+']' : filterSelected.value
    const Filter=filterSelected.value==='' ? undefined : `${filterSelected.fqType}:${filterVal}`
    console.log(Filter)
    const data=await loaderData(collection, order, Filter)
    console.log('Fetched Products: '+data)
    setProducts(data)
  }

  useEffect(()=>{
    if(filterSelected.value!=='inicio'){
      fetchData()
    }
  },[filterSelected])

  useEffect(()=>{
    if(order!=='inicio'){
      fetchData()
    }
  },[order])

  useEffect(()=>{
    if(products.length){
      if(!sentEvent){
        // mandar evento apenas uma vez quando puxar os prods pela primeira vez
        setSentEvent(true)
        sendEvent({name:'view_item_list', params:{
          item_list_id: collection,
          item_list_name: globalThis.window.location.pathname,
          items:OrgSchemaToAnalytics(products)
        }})
      }
    }

    const checkCompreGanhe=async()=>{
      let gifts:any=null
      const giftsSkus=products.reduce((acc:string[],obj)=>{
        const giftSkus=obj.offers?.offers[0].giftSkuIds

        if(giftSkus){
          giftSkus.forEach(sku=>!acc.includes(sku) && acc.push(sku))
        }
        return acc
      },[])
      
      if(props.compreEGanhe.tem===true){
        // Assegura ao TypeScript que naoMostrar existe aqui
        const compreEGanhe = props.compreEGanhe as { tem: true, naoMostrar?: string[] }

        const objGifts = await Promise.all(giftsSkus.map(sku=>fetch(`https://api.shopinfo.com.br/Deco/getProdByInternalSkuId.php/?id=${sku}`).then(r=>r.json()).catch(err=>console.error(err))))

        console.log(objGifts, objGifts.filter(obj=>!compreEGanhe.naoMostrar?.some(item=>obj.ProductName.toUpperCase().includes(item.toUpperCase()))))

        gifts=objGifts.filter(obj=>!compreEGanhe.naoMostrar?.some(item=>obj.ProductName.toUpperCase().includes(item.toUpperCase())))

        console.log(gifts)
      }

      setFinalProducts(products.map(product=>{
        if(gifts){
          // const brindeObj=gifts.find((obj:any)=> product.offers?.offers[0].giftSkuIds?.includes(obj.Id.toString()))
          const brindeObj=gifts[0]
          return {prod:product, brinde:brindeObj}
        }else{
          return {prod:product, brinde:undefined}
        }
      }))
    }

    checkCompreGanhe()
  },[products])

  useEffect(()=>{
    finalProducts.length && setLoading(false)
  },[finalProducts])

  useEffect(()=>{
    if(typeof globalThis.window!=='undefined' && !(tipo===null || typeof tipo==='string')){
      const LisMobile=Array.from(filtrosMob.current!.querySelectorAll('dialog li'))
      LisMobile.forEach((li)=>{(li as HTMLLIElement).addEventListener('click',handleClickMobFilters)})
    }
  },[])

  const handleClickFilters=(event:MouseEvent)=>{
    const Target=(event.target! as HTMLImageElement).parentElement! as HTMLLIElement
    const value=Target.getAttribute('data-value')!
    const index=parseFloat(Target.getAttribute('data-index')!)
    const fqType=Target.getAttribute('data-fq')!
    const ulFiltersCurrent=ulFilters.current!
    const liAlreadySelected=ulFiltersCurrent.querySelector(`li[data-index="${filterSelected.index}"]`)

    const filtrosMobCurrent=filtrosMob.current!
    const liMobAlreadySelected=filtrosMobCurrent.querySelector(`dialog li[data-index="${filterSelected.index}"]`)

    liAlreadySelected && (liAlreadySelected as HTMLLIElement).classList.replace('border-b-primary','border-b-transparent')
    liMobAlreadySelected && (liMobAlreadySelected as HTMLLIElement).classList.replace('text-primary','text-secondary')

    const liMobWillSelect=filtrosMobCurrent.querySelector(`dialog li[data-index="${index}"]`)
    
    Target.classList.replace('border-b-transparent','border-b-primary')
    liMobWillSelect && (liMobWillSelect as HTMLLIElement).classList.replace('text-secondary','text-primary')
    
    setFilterSelected({index,value,fqType})
  }

  const handleClickMobFilters=(event:MouseEvent)=>{
    const Target=event.target! as HTMLLIElement
    const value=Target.getAttribute('data-value')!
    const index=parseFloat(Target.getAttribute('data-index')!)
    const fqType=Target.getAttribute('data-fq')!
    const ulFiltersCurrent=ulFilters.current!
    const liAlreadySelected=ulFiltersCurrent.querySelector(`li[data-index="${filterSelected.index}"]`)

    const filtrosMobCurrent=filtrosMob.current!
    const liMobAlreadySelected=filtrosMobCurrent.querySelector(`dialog li[data-index="${filterSelected.index}"]`)

    liAlreadySelected && (liAlreadySelected as HTMLLIElement).classList.replace('border-b-primary','border-b-transparent')
    liMobAlreadySelected && (liMobAlreadySelected as HTMLLIElement).classList.replace('text-primary','text-secondary')

    const liDeskWillSelect=ulFiltersCurrent.querySelector(`li[data-index="${index}"]`)
    
    Target.classList.replace('text-secondary','text-primary')
    liDeskWillSelect && (liDeskWillSelect as HTMLLIElement).classList.replace('border-b-transparent','border-b-primary')
    
    setFilterSelected({index,value,fqType})
  }


  return (
  <CompareContextProvider>
    <div className='bg-[#262626]'>
      <a href={bannerUrl.linkCta}><Image width={1968} height={458} src={bannerUrl.desktop} className='hidden re1:block' preload loading='eager'/></a>
      <a href={bannerUrl.linkCta}><Image width={420} height={300} src={bannerUrl.mobile} className='re1:hidden' preload loading='eager'/></a>
      
      {/* Código */}
      {(tipo!==null && typeof tipo==='string') && <div dangerouslySetInnerHTML={{__html:tipo}}/>}   

      {/* Desktop */}
      {tipo!==null && (typeof tipo!=='string' && (
        <ul className='hidden re1:grid gap-32 my-4 items-center justify-center px-8' style={{ gridTemplateColumns: `repeat(${tipo.tipoDeFiltro.length+1}, auto)` }} ref={ulFilters}>
          {tipo.tipoDeFiltro.map((filtro,idx)=>(
            <li data-index={idx} data-value={filtro.value} data-fq={filtro.fqType} 
              className={`flex flex-col items-center cursor-pointer py-2 border-b-2 border-b-transparent ${setasPadrao && `after:content-[""] after:min-w-[70%] 
              after:min-h-full after:bg-[url(https://shopinfo.vteximg.com.br/arquivos/lp-captacao-black-2021-seta.png)] after:bg-contain after:bg-no-repeat after:bg-center after:-rotate-90`}`}
            >
              <Image src={filtro.iconURL} width={filtro.iconTamanho.width} height={filtro.iconTamanho.height}
                onClick={handleClickFilters}
                className='hover:scale-105'
              />
              {filtro.showName && <p className='mt-1 text-secondary font-bold'>{filtro.name}</p>}
            </li>
          ))}

            <li data-index={777} data-value='' data-fq='' className='flex items-center cursor-pointer py-2 border-b-2 border-b-transparent h-full '>
              <Image src='https://shopinfo.vteximg.com.br/arquivos/icon-vertodos.png' width={125} height={30}
                onClick={handleClickFilters}
                className='hover:scale-105 max-h-[30px]'
              />
            </li>
        </ul>
      ))}
    </div>

    <div className='flex flex-col gap-5 w-full px-[10px] py-[10px] re1:px-[5%] re4:px-[10%]'>
      {/* Mobile */}
      {tipo!==null && (typeof tipo!=='string' && (
        <div className='flex re1:hidden justify-between' ref={filtrosMob}>
          <FiltroMob filters={tipo.tipoDeFiltro}/>
          <label className='focus-within:text-primary w-[45%] re1:w-auto'>
            <span className='font-bold'>Ordenar Por</span>
            <select id='order' className='text-secondary !outline-none select bg-transparent border border-secondary focus:bg-[#1e1e1e] w-full max-w-xs'
              onInput={(event)=>{
                setOrder((event.target as HTMLSelectElement).value)
              }}
            >
              <option disabled selected value='selecione'>Selecione</option>
              {orderFilters.map(filter=>(
                <option className='hover:bg-[#d1d1d1]' value={Object.values(filter)[0]}>{Object.keys(filter)[0]}</option>
              ))}
            </select>
          </label>
        </div>
      ))}
      {loading ? <div className='loading loading-spinner w-32 mx-auto my-5 text-primary'/> : 
        (finalProducts.map((product)=>{
          const quantidade=prodQntd(product.prod, new Date(props.contador ? props.inicioDaOferta : '2023-06-30'), new Date(props.contador ? props.finalDaOferta : '2023-12-02'))

          return <Card product={product.prod} frete={freteGratis} timeRemaining={timeRemaining} quantidade={quantidade} brinde={product.brinde} descontoPix={descontoPix}/>
        }))
      }
    </div>
  </CompareContextProvider>)
}

export default Campanha