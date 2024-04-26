import { useRef, useState } from 'preact/hooks'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import Filtro from './Filtro.tsx'
import PriceFilter from './PriceFilter.tsx'


interface Props{
  filters:FilterObj[]
  id:string
}

interface FilterObj{
  label:string
  values:string[]
}

interface SpecObj{
  Link:string
  LinkEncoded:string
  Map:string
  Name:string
  Position: number | null
  Quantity: number | null
  Value:string
}

const FiltroMob=({ filters, id }:Props)=>{
  const modal=useRef<HTMLDialogElement>(null)
  const [modalOpen, setModalOpen]=useState(false)

  const openModal=()=>{
    if(modal.current && !modalOpen){
      modal.current.showModal()
      setModalOpen(true)
    }
  }

  const closeModal=()=>{
    if(modal.current && modalOpen){
      modal.current.close()
      setModalOpen(false)
    }
  }

  return(
    <div className='re1:hidden' >
      <button className='flex bg-transparent w-full items-center justify-start gap-[10px]' onClick={openModal}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_278_2979)">
          <path d="M1.26587 3.363H8.63824C8.86849 4.4265 9.81562 5.226 10.947 5.226C12.0784 5.226 13.0255 4.4265 13.2557 3.363H14.7341C15.0102 3.363 15.2341 3.13912 15.2341 2.863C15.2341 2.58687 15.0102 2.363 14.7341 2.363H13.2557C13.0255 1.2995 12.0784 0.5 10.947 0.5C9.81562 0.5 8.86849 1.2995 8.63824 2.363H1.26587C0.989744 2.363 0.765869 2.58687 0.765869 2.863C0.765869 3.13912 0.989744 3.363 1.26587 3.363ZM10.947 1.5C11.6986 1.5 12.31 2.1115 12.31 2.863C12.31 3.6145 11.6985 4.226 10.947 4.226C10.1955 4.226 9.58399 3.6145 9.58399 2.863C9.58399 2.1115 10.1954 1.5 10.947 1.5Z" fill="#DD1F26"/>
          <path d="M14.7341 7.49996H7.36174C7.13149 6.43646 6.18437 5.63696 5.05299 5.63696C3.92162 5.63696 2.97449 6.43646 2.74424 7.49996H1.26587C0.989744 7.49996 0.765869 7.72384 0.765869 7.99996C0.765869 8.27609 0.989744 8.49996 1.26587 8.49996H2.74424C2.97449 9.56346 3.92162 10.363 5.05299 10.363C6.18437 10.363 7.13149 9.56346 7.36174 8.49996H14.7341C15.0102 8.49996 15.2341 8.27609 15.2341 7.99996C15.2341 7.72384 15.0102 7.49996 14.7341 7.49996ZM5.05299 9.36296C4.30137 9.36296 3.68999 8.75146 3.68999 7.99996C3.68999 7.24846 4.30149 6.63696 5.05299 6.63696C5.80449 6.63696 6.41599 7.24834 6.41599 7.99996C6.41599 8.75159 5.80462 9.36296 5.05299 9.36296Z" fill="#DD1F26"/>
          <path d="M14.7341 12.637H13.2557C13.0255 11.5735 12.0784 10.774 10.947 10.774C9.81562 10.774 8.86849 11.5735 8.63824 12.637H1.26587C0.989744 12.637 0.765869 12.8609 0.765869 13.137C0.765869 13.4132 0.989744 13.637 1.26587 13.637H8.63824C8.86849 14.7005 9.81562 15.5 10.947 15.5C12.0784 15.5 13.0255 14.7005 13.2557 13.637H14.7341C15.0102 13.637 15.2341 13.4132 15.2341 13.137C15.2341 12.8609 15.0102 12.637 14.7341 12.637ZM10.947 14.5C10.1954 14.5 9.58399 13.8885 9.58399 13.137C9.58399 12.3855 10.1955 11.774 10.947 11.774C11.6985 11.774 12.31 12.3855 12.31 13.137C12.31 13.8885 11.6986 14.5 10.947 14.5Z" fill="#DD1F26"/>
          </g>
          <defs>
          <clipPath id="clip0_278_2979">
          <rect width="16" height="16" fill="white"/>
          </clipPath>
          </defs>
        </svg>
        <p className='font-bold'>Filtros</p>
      </button>

      <dialog id={id} ref={modal} className='bg-base-100 min-h-full min-w-[100vw] overflow-x-hidden overflow-y-auto'>
        <form>
          <button className="btn btn-sm btn-circle absolute right-2 top-2 z-40 bg-neutral text-secondary border-transparent"
            onClick={(event)=>{
              event.preventDefault()
              if(modal.current){
                const inputs=Array.from(modal.current.querySelectorAll('input[type="checkbox"]'))
                const priceInputs=Array.from(modal.current.querySelectorAll('input[name="min"], input[name="max"]'))

                const hasChecked=inputs.some(input=>(input as HTMLInputElement).checked===true)
                const hasPriceInputed=priceInputs.some(input=>(input as HTMLInputElement).value.length>0)

                if(hasChecked || hasPriceInputed){
                  alert('Existem filtros selecionados, clique em Filtrar!\n Ou deselecione os filtros')
                }else{
                  closeModal()
                }
              }
            }}
          >✕</button>

          <div className='flex flex-col py-5 items-center gap-10 text-secondary'>
            <span className='text-2xl font-bold px-4'>Filtros</span>
            <ul className='w-full'>
              {filters.map((filtro,index)=>index!==filters.length-1 ?
                (<Filtro title={filtro.label} values={filtro.values} />) : null
                // (<PriceFilter filtro={filtro}/>)
              )}
            </ul>
            <div className='px-4 w-full'>
              <button onClick={()=>{
                const priceInputs=Array.from(modal.current!.querySelectorAll('input[name="min"], input[name="max"]'))
                const priceInputsLength=priceInputs.filter(input=>(input as HTMLInputElement).value.length===0).length
                const hasInputPriceVoid=(priceInputsLength>0 && priceInputsLength!==2)
                hasInputPriceVoid ? alert('Há somente um campo de preço preenchido!') : closeModal()
              }} id='filtrar' className='w-full bg-primary px-[5px] py-[10px] rounded-lg text-lg' type='button'>Filtrar</button>
            </div>
          </div>
        </form>
      </dialog>
    </div>
  )
}

export default FiltroMob