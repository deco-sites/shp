import TitleAndText from 'deco-sites/shp/sections/TitleAndText.tsx'

export interface Props{
  title:string
  text:string
}

const Despacho24h=({title, text}:Props)=>{
  return (
    <div className='px-4 re1:px-[5%] re4:px-[15%] text-secondary my-16'>
      <TitleAndText text={text} title={title}/>
    </div>
  )
}

export default Despacho24h