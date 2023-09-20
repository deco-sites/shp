import TitleAndText from 'deco-sites/shp/sections/TitleAndText.tsx'

interface Div{
  /**@description o id que será passado no link pra referenciar a div */
  id:string
  title:string
  /**@description Coloque o HTML, caso queira estilizar coloque uma tag <style> no começo*/
  text:string
}

export interface Props{
  Divs:Div[]
}

const Institucional=({Divs}:Props)=>{
  return (
    <div>
      {Divs.map((element)=>{
        const title=element.title
        const text=element.text
        return (
        <div id={element.id} className='collapse collapse-arrow'>
          <TitleAndText title={title} text={text}/>
        </div>)
      })}
    </div>
  )
}

export default Institucional