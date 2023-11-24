import Icon from "$store/components/ui/Icon.tsx";

const ScrollToTop = () =>{
  const handleClick=()=>window.scrollTo({ top:0, behavior: 'smooth' })
    
  return(
    <button className="btn btn-circle btn-outline text-white bg-base-100" onClick={handleClick}>
      <Icon
        id="ChevronUp" size={24} strokeWidth={2}
      />
    </button>
  )
}

export default ScrollToTop