import Icon from "$store/components/ui/Icon.tsx";
import { memo } from 'preact/compat'

const ScrollToTop = () =>{
  const handleClick=()=>globalThis.window.scrollTo({ top:0, behavior: 'smooth' })
    
  return(
    <button className="btn btn-circle btn-outline text-white bg-base-100" onClick={handleClick}>
      <Icon
        id="ChevronUp" size={24} strokeWidth={2}
      />
    </button>
  )
}

const Memoized=memo(ScrollToTop)

export default Memoized