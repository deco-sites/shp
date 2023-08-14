import { useRef } from 'preact/hooks'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import Filtro from 'deco-sites/shp/sections/PagCategEDepto/Filtro.tsx'



interface Props{
  filters:FilterObj[]
}

interface FilterObj{
  label:string
  values:SpecObj[]
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

const FiltroMob=({ filters }:Props)=>{
  const modal=useRef<HTMLDialogElement>(null) 

  return(
    <div className='re1:hidden'>
      <button className='bg-transparent border border-white w-full h-12 px-10 rounded-lg' onClick={()=>modal.current && modal.current.showModal()}>
        <Image className='mx-auto' src='https://shopinfo.vteximg.com.br/arquivos/filterIcon.png' width={30} height={30}/>
      </button>

      <dialog ref={modal} className='bg-[#111] min-h-full min-w-[100vw] overflow-x-hidden overflow-y-auto'>
        <form method='dialog'>
          <button className="btn btn-sm btn-circle absolute right-2 top-2 z-40 bg-[#3d3d3d] text-white border-transparent"
            onClick={()=>modal.current && (
              modal.current.close()
            )}
          >✕</button>

          <div className='flex flex-col py-5 items-center gap-10'>
            <h2 className='text-2xl font-bold px-4'>Filtros</h2>
            <ul className='w-full'>
              {filters.map((filter)=><Filtro title={filter.label} values={filter.values}/>)}
            </ul>
            <div className='px-4 w-full'>
              <button id='filtrar' className='w-full bg-primary px-[5px] py-[10px] rounded-lg text-lg'>Filtrar</button>
            </div>
          </div>

        </form>
      </dialog>
    </div>
  )
}

export default FiltroMob