// deno-lint-ignore-file no-window-prefix no-explicit-any
import { useState, useEffect, useRef } from 'preact/hooks'
import IconeNavegacional from "deco-sites/shp/sections/PagCategEDepto/iconeNavegacional.tsx";
import Card from "deco-sites/shp/components/ComponentsSHP/ProductsCard/CardVtexProdType.tsx";
import CategoriaModal from 'deco-sites/shp/components/ComponentsSHP/searchSHP/CategoriaModal.tsx';

export interface Props{
  produtos:any
  termo:string
  iconesNavegacionais:Array<{
    href:string,
    categoryName:string,
    imgUrl:string
  }>
}

interface Category{
  name:string,
  value:string
}

const fetchProducts=async (queryString:string)=>{
  const url=`https://api.shopinfo.com.br/Deco/getProductsList.php?${queryString}`
  console.log(url)
  const data=await fetch(url).then(async (r)=>{
    const resp=r.clone()
    const text=await r.text()
    if(text==='empty'){
      return null
    }else{
      return resp.json()
    }
  }).catch(err=>console.error('Error: ',err))
  return data
}

const makeCategories=(prods:any)=>{
  const categories:Category[]=[]
  prods.forEach((prod:any)=>{
    const categsName:string[]=prod.categories
    const categsValues:string[]=prod.categoriesIds

    for(let i=0;i<categsName.length-1;i++){
      categories.push({name:categsName[i], value:categsValues[i]})
    }
  })

  return categories.filter((obj,index,self)=>index===self.findIndex(item=>(item.name === obj.name && item.value === obj.value)))
}

const Search=({produtos, termo, iconesNavegacionais=[]}:Props)=>{

  const [loading, setLoading]=useState(true)
  const [isMobile, setIsMobile]=useState(window.innerWidth<=768)
  const [fromTo,setFromTo]=useState<Record<string,number>>({from:0, to:produtos.length-1,first:1})
  const [order,setOrder]=useState('selecione')
  const [products, setProducts]=useState<any>([])
  const [divFlut, setDivFlut]=useState(false)
  const [fetchLength, setFetchLength]=useState(produtos.length)
  const [showMore, setShowMore]=useState(false)
  const [categories,setCategories]=useState<Category[]>([])
  const [category, setCategory]=useState<Category>({name:'selecione', value:'inicio'})

  const orderFilters=[
    {'Menor Preço':'OrderByPriceASC'},
    {'Maior Preço':'OrderByPriceDESC'},
    {'Mais Vendidos':'OrderByTopSaleDESC'},
    {'Melhores Avaliações':'OrderByReviewRateDESC'},
    {'A - Z':'OrderByNameASC'},
    {'Z - A':'OrderByNameDESC'},
    {'Data de Lançamento':'OrderByReleaseDateDESC'},
    {'Melhor Desconto':'OrderByBestDiscountDESC'}
  ]
  
  const categoryLabel=useRef<HTMLLabelElement>(null)

  const divFlutLabel=useRef<HTMLLabelElement>(null)

  const contentWrapper=useRef<HTMLDivElement>(null)

  const addModalFunctionality=()=>{
    const modalTop=document.querySelector('dialog#top')!
    const modalBottom=document.querySelector('dialog#bottom')!

    const buttonTop=modalTop.querySelector('button#filtrar')!
    const buttonBottom=modalBottom.querySelector('button#filtrar')!

    buttonTop.addEventListener('click',()=>{
      const valueSelected=modalTop.querySelector('input[type="radio"]:checked')! as HTMLInputElement
      setCategory({name:valueSelected.name, value:valueSelected.value})
    })

    buttonBottom.addEventListener('click',()=>{
      const valueSelected=modalTop.querySelector('input[type="radio"]:checked')! as HTMLInputElement
      setCategory({name:valueSelected.name, value:valueSelected.value})
    })
  }

  const getProductsStartY=()=>{
    if(categoryLabel.current){
      const categoryLabelRect=categoryLabel.current.getBoundingClientRect()
      const posY=categoryLabelRect.top + window.scrollY
      return posY
    }else{
      return 700
    }
  }

  const handleMoreProducts=async()=>{
    !showMore && setLoading(true)
    const queryString=[`ft=${termo}`,`_from=${fromTo.from}&_to=${fromTo.to}`]
    order!=='selecione' && queryString.push(`O=${order}`)
    category.value!=='' && (category.value!=='inicio' && queryString.unshift(`fq=C:${category.value}`))
    const data= await fetchProducts(queryString.join('&'))
    setFetchLength(data.length)
    fromTo.to>19 ? setProducts((prevProducts: any)=>[...prevProducts, ...data]) : setProducts(data)
    setLoading(false)
    setShowMore(false)
  }

  useEffect(()=>{
    const handleResize=()=>setIsMobile(window.innerWidth<=768)

    const handleScroll=()=>{
      if(contentWrapper.current){
        const contentRect=contentWrapper.current.getBoundingClientRect()
        const endContent=contentRect.bottom + window.scrollY
        if(window.scrollY > getProductsStartY() && window.scrollY < endContent){
          setDivFlut(true)
        }else{
          divFlutLabel.current && ((divFlutLabel.current.querySelector('dialog') as HTMLDialogElement).open!==true && setDivFlut(false))
        }
      }
    }
    
    if(typeof window!=='undefined'){setProducts(produtos), addModalFunctionality()}

    window.addEventListener('resize',handleResize)
    window.addEventListener('scroll',handleScroll)

    return ()=>{
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll',handleScroll)
    }
  },[])

  useEffect(()=>{
    (category.value==='' || category.value==='inicio') && setCategories(makeCategories(products))
    setLoading(false)
  },[products])

  useEffect(()=>{
    if(category.value!=='inicio'){
      typeof window!=='undefined' && setFromTo({from:0, to:19, first:0})
    }
  },[category])

  useEffect(()=>{
    if(order!=='selecione'){
      typeof window!=='undefined' && setFromTo({from:0, to:19, first:0})
    }
  },[order])

  useEffect(()=>{
    if(fromTo.first!==1){
      typeof window!=='undefined' && handleMoreProducts()
    }
  },[fromTo])

  return (
    <div className='w-full text-white appearance-none'>
      <div ref={contentWrapper} className='re1:px-[5%] re4:px-[15%]'>
        <div className='bg-transparent px-4 re1:px-0'>
          <h4 className='text-3xl font-bold'>Sua busca por "{decodeURI(termo)}"</h4>
        </div>

        <div className='mb-8 re1:mb-0'>
          <ul className='flex re1:items-center justify-start re1:justify-around gap-4 re1:gap-0 w-full mb-4 px-4 re1:px-0 overflow-x-auto'>
            {iconesNavegacionais.map((icon)=>(
              <IconeNavegacional href={icon.href} imgUrl={icon.imgUrl} categoryName={icon.categoryName} />
            ))}
          </ul>
        </div>

        <div className='flex justify-between items-end px-4 re1:px-0 my-5'>
          <label className='flex flex-col re1:focus-within:text-primary w-[45%] re1:w-auto'>
            <span className='font-bold'>Categorias</span>
            <select id='categorySelector' className='text-white hidden re1:select !outline-none bg-transparent border border-white focus:bg-[#1e1e1e] w-full max-w-xs'
              onInput={(event)=>{
                const Target=event.target as HTMLInputElement
                const value=Target.value
                const name=Target.querySelector(`option[value="${value}"]`)!.getAttribute('name')!
                setCategory({name, value})
              }}
            >
              <option disabled selected value='inicio' name='selecione'>Selecione</option>
              <option value='' name='nenhuma'>Nenhuma</option>
              {categories.map(category=>(
                <option className='hover:bg-[#d1d1d1]' value={category.value} name={category.name}>{category.name.replaceAll('/',' ')}</option>
              ))}
            </select>
            <CategoriaModal categories={categories} id='top'/>
          </label>
          <label className='flex flex-col focus-within:text-primary w-[45%] re1:w-auto'>
            <span className='font-bold'>Ordenar Por</span>
            <select id='order' className='text-white !outline-none select bg-transparent border border-white focus:bg-[#1e1e1e] w-full max-w-xs'
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

        <div className='flex w-full justify-center'>
          <div className='flex flex-col items-center w-full re1:w-[80%] px-4 re1:px-0'>
            {loading ? (<div className='loading loading-spinner loading-lg text-primary my-20'/>) : (
              <>
                {products.length > 0 ? (
                  <div className='grid grid-cols-2 re1:grid-cols-4 gap-x-4 gap-y-4'>
                    {products.map((product:any)=><Card product={product}/>)}
                  </div>
                ) : (
                  <p className='text-2xl font-bold mx-auto mt-10'>Não há produtos com esta combinação de filtros!</p>
                )}
                {fetchLength===20 && 
                <button className='font-bold w-full re1:w-[70%] bg-primary px-[15px] py-[20px] rounded-lg mx-auto my-6 re1:my-20' onClick={()=>{
                  if(fetchLength===20){
                    const {from,to}=fromTo
                    setShowMore(true)
                    setFromTo({from:from+20, to:to+20, first:0})
                  }
                }}>{showMore ? <div className='loading loading-spinner'/> : 'Carregar mais Produtos'}</button>}
              </>
            )}
          </div>
        </div>
        
        
      </div>
      <div className={`fixed bottom-0 ${divFlut ? 'flex':'hidden'} re1:hidden justify-between items-end px-4 py-5 bg-[#111]`}>
          <label className='w-[45%]' id='divFlut-mob' ref={divFlutLabel}>
            <span className='font-bold'>Categorias</span>
            <CategoriaModal categories={categories} id={'bottom'}/>
          </label>
          <label className='focus-within:text-primary w-[45%] re1:w-auto'>
            <span className='font-bold'>Ordenar Por</span>
            <select id='order' className='text-white !outline-none select bg-transparent border border-white focus:bg-[#1e1e1e] w-full max-w-xs'
              onInput={event=>{
                setOrder((event.target as HTMLSelectElement).value)
                isMobile && window.scrollTo({top:getProductsStartY()-200, behavior:'smooth'})
              }}
            >
              <option disabled selected value='selecione'>Selecione</option>
              {orderFilters.map(filter=>(
                <option className='hover:bg-[#d1d1d1]' value={Object.values(filter)[0]}>{Object.keys(filter)[0]}</option>
              ))}
            </select>
          </label>
        </div>
    </div>
  )
}

export default Search