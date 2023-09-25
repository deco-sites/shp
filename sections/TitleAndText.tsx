export interface Props{
  title:string
  /**@description Coloque o HTML, caso queira estilizar coloque uma tag <style> no começo*/
  text:string
  /**@description Caso esta section seja importada via código e seja necessário passar uma classe pra div incial, coloque a classe TailwindCSS */
  classes?:string
}

const TitleAndText=({title, text, classes}:Props)=>{
  return <div className={classes ? classes : 'w-full'}>
    <p className='text-xl re1:text-4xl font-bold'>{title}</p>
    <div dangerouslySetInnerHTML={{__html:text}}/>
  </div>
}

export default TitleAndText