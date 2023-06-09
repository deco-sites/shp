// deno-lint-ignore-file no-window-prefix
import Game, {gameProps} from 'deco-sites/shp/components/ComponentsSHP/SelectGames/Game.tsx'
import GameContextProvider, {useGameContext, GameContextType}  from 'deco-sites/shp/contexts/Games/GameContext.tsx'
import Slider from 'deco-sites/shp/components/ui/Slider.tsx'
import SliderJS from 'deco-sites/shp/components/ui/SliderJS.tsx'
import { useId, useState, useEffect, useCallback } from 'preact/hooks'
import { signal } from '@preact/signals'
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'
import DataJson from 'deco-sites/shp/static/fpsData_test.json' assert { type: "json" } 
import { Runtime } from 'deco-sites/std/runtime.ts'

//arrumar filtro de checkbox e de preco

export interface Props{
  Games:Array<gameProps>
}

const count=signal(1)
const gamesChecked=signal<string[]>([])
const checkboxChecked=signal<string>('')
const minPrice=signal<string>('2000')
const block144=signal(false)
const block60=signal(false)
const RangeVal=signal('')

const BTNFinal= () => {
  
  const { games }: GameContextType = useGameContext()
  const [jogos, setJogos]=useState<string[]>([])

  const [systems60,setSys60]=useState<typeof DataJson.fps>([])
  const [systems144,setSys144]=useState<typeof DataJson.fps>([])

  const fetchPrice=useCallback(async ()=>{
    const data= await Runtime.invoke({
      key:'deco-sites/std/loaders/vtex/legacy/productList.ts',
      props:{
        fq:['C:/10/'],
        sort:'OrderByPriceASC',
        count:1
      }
    }) || []

    return data[0].offers ? data[0].offers.highPrice.toString().split('.')[0] : '2000'
  },[])

  const fetchData=useCallback(async (fqs:string[])=>{
    const data= await Runtime.invoke({
      key:'deco-sites/std/loaders/vtex/legacy/productList.ts',
      props:{fq:fqs, count:50}
    }) || []

    return data
  },[])

  const callPromises=async(system:typeof DataJson.fps)=>{
    const term:string[]=[]
    system.forEach(obj=>term.push(`fq=C:/10/&fq=specificationFilter_20:${obj.placa},specificationFilter_19:${obj.processador}&fq=P:[${parseFloat(minPrice.value)} TO ${parseFloat(RangeVal.value)}]`)) 
    console.log('Term:'+ term)
    const arrayRespPromisses=term.map(req=>fetchData(req.replace('&','').split('fq=')))
    const arrayResp=await Promise.all(arrayRespPromisses)
    const sku:string[]=[]
    arrayResp.forEach(items=>items.forEach((item)=>sku.push(item.sku)))
    //verifica se há duplicatas, caso o pc esteja presente em mais de um request
    const verifiedSku=[...new Set(sku)]
    return verifiedSku
  }

  const handleButtonClick = () => {
    switch (count.value) {
      case 1:
        if(jogos.length>=1){
          (async()=>{
            count.value===1 && (gamesChecked.value=jogos)
            minPrice.value=await fetchPrice()
            setSys60(DataJson.fps.filter(system => gamesChecked.value.some(game => system.games[game as keyof typeof system.games] > 60)))
            setSys144(DataJson.fps.filter(system => gamesChecked.value.some(game => system.games[game as keyof typeof system.games] > 144)))
            count.value++
          })()
        }else{
          alert('Você precisa selecionar um ou mais jogos!')
        }
        break;

      case 2:
        { 
          if(Object.keys(systems144).length===0){
            (async()=>{
              block144.value=true
              const Ids=await callPromises(systems60)
              if(Ids.length<1){
                block60.value=true
              }else{
                checkboxChecked.value='60+'
                block60.value=false
              }
            })()
            
          }else{
            (async()=>{
              console.log('executou')
              const Ids60=await callPromises(systems60)
              const Ids144= await callPromises(systems144)
              Ids60.length<1 ? block60.value=true : block60.value=false
              Ids144.length<1 ? block144.value=true : block144.value=false
            })()
          }
          
          count.value++
        }
        break;
      case 3:
        if(checkboxChecked.value === '' && !block144.value && !block60.value){alert('Você precisa selecionar uma das opções!')
        }else{
          (async()=>{
            const Skus=await callPromises((checkboxChecked.value!=='' && checkboxChecked.value==='60+') ? systems60 : systems144)
            console.log({
              prices:[minPrice.value, RangeVal.value],
              Skus
            })
            window.location.href=`shelf/?q=${Skus}`
          })()
        }
        
        break;

      default:
        break;
    } 
  }

  useEffect(()=>{
    const checkedGames:string[]=[]
    for(const [game,checked] of games){
      checked && checkedGames.push(game)
    }
    setJogos(checkedGames)
  },[games])

  return (
    <div className='flex gap-2'>
      {count.value>=2 && (
        <button className='btn btn-circle min-w-[45px] min-h-[45px] max-h-[45px] max-w-[45px] bg-transparent hover:bg-transparent border border-[#dd1f26] hover:border-[#dd1f26]'
          onClick={()=>count.value>1 && count.value--}
        >
          <Icon
            class='text-[#dd1f26]'
            size={25}
            id='ChevronLeft'
            strokeWidth={3}
          />
        </button>
      )}
      <button
        className='bg-[#dd1f26] rounded-lg px-5 py-2 text-white font-bold flex gap-2 items-center justify-center'
        onClick={handleButtonClick}
        >
        {count.value<3 ? (
          <>
            <p>Próxima Etapa</p>
            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" width="20px" viewBox="0 0 512.009 512.009" style="enable-background:new 0 0 512.009 512.009;">
              <g>
              <g>
              <path d="M508.625,247.801L508.625,247.801L392.262,131.437c-4.18-4.881-11.526-5.45-16.407-1.269    c-4.881,4.18-5.45,11.526-1.269,16.407c0.39,0.455,0.814,0.88,1.269,1.269l96.465,96.582H11.636C5.21,244.426,0,249.636,0,256.063    s5.21,11.636,11.636,11.636H472.32l-96.465,96.465c-4.881,4.18-5.45,11.526-1.269,16.407s11.526,5.45,16.407,1.269    c0.455-0.39,0.88-0.814,1.269-1.269l116.364-116.364C513.137,259.67,513.137,252.34,508.625,247.801z"></path>
              </g>
              </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
            </svg>
          </>
        ):(
          <p>Encontre seu PC ideal</p>
        )}
      </button>
    </div>
  )
}

const selectGames=({Games=[]}:Props)=>{
  const [isMobile, setIsMobile] = useState(window.innerWidth<=768)

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768)
  }, [])

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)  
    }
  }, [])

  const id=useId()+'-SelectGames'

  const [rangeVal, setRangeVal]=useState(minPrice.value)
  const [barVal, setBarVal]=useState(minPrice.value)


  useEffect(()=>{
    setRangeVal(minPrice.value)
    setBarVal(minPrice.value)
  },[minPrice.value])
  
  const percentRange=()=>{
    if(parseFloat(barVal)>=10000){
      return 100
    }

    if(parseFloat(barVal)<=parseFloat(minPrice.value)){
      return 0
    }
    return ((parseFloat(barVal) - parseFloat(minPrice.value)) / (10000 - parseFloat(minPrice.value)) * 100)
  }

  const handleKeyUp=(event: KeyboardEvent)=>{
    setBarVal((event.target as HTMLInputElement).value.replace(/[^0-9]/g, ''))
  }

  const handleKeyPress=(event:KeyboardEvent)=>{
    !/^[0-9]$/.test(event.key) && event.preventDefault()
  }

  const verifyVal=(val:string, min:string)=>{
    if(parseFloat(val)<=parseFloat(min)){
      return parseFloat(min)
    }

    if(parseFloat(val) >= 10000){
      return 10000
    }

    return parseFloat(val)
  }

  useEffect(()=>{
    setBarVal(String(verifyVal(rangeVal,minPrice.value)))
    RangeVal.value=String(verifyVal(rangeVal,minPrice.value))
  },[rangeVal])

  Games.length<1 && null

  return(
    <div className='bg-[#272727] w-screen h-fit my-5 py-3'>
      <div className='flex flex-col items-center w-[90vw] re1:w-[70vw] mx-auto gap-8'>

        <div className='flex flex-col items-center justify-center w-4/6'>
          <h1 className='font-bold text-white re1:text-3xl text-xl mb-4 text-center'>Encontre o PC Gamer Completo para seus Jogos</h1>
          <div className='flex items-center justify-center gap-5 re1:text-base text-sm'>
            <label className='flex flex-col items-center content-center text-white gap-1'>
              <div className={`flex rounded-full border border-white w-[50px] h-[50px] items-center justify-center ${count.value>=1 && 'bg-[#dd1f26]'}`}>1</div>
              <p className='text-center'>Selecione seus<br/> jogos</p>
            </label>
            <hr className='re1:w-[100px] w-10 relative re1:bottom-6 bottom-8'/>
            <label className='flex flex-col items-center content-center text-white gap-1'>
              <div className={`flex rounded-full border border-white w-[50px] h-[50px] items-center justify-center ${count.value>=2 && 'bg-[#dd1f26]'}`}>2</div>
              <p className='text-center'>Escolha o<br/>preço</p>
            </label>
            <hr className='re1:w-[100px] w-10 relative re1:bottom-6 bottom-8'/>
            <label className='flex flex-col items-center content-center text-white gap-1'>
              <div className={`flex rounded-full border border-white w-[50px] h-[50px] items-center justify-center ${count.value>=3 && 'bg-[#dd1f26]'}`}>3</div>
              <p className='text-center'>Selecione<br/>o Desempenho</p>
            </label>
          </div>
        </div>

        <GameContextProvider>
        {count.value===1 && (
          <div className='flex items-center h-[300px]'>
            <div id={id} className='container grid grid-cols-[20px_1fr_20px] re1:grid-cols-[35px_1fr_35px] px-0 re1:px-5'>
              <div className='hidden re1:flex justify-center items-center prev'>
                <Slider.PrevButton class='btn bg-transparent hover:bg-transparent border-none relative'>
                  <Icon
                    class='text-[#dd1f26]'
                    size={25}
                    id='ChevronLeft'
                    strokeWidth={3}
                  />
                </Slider.PrevButton>
              </div>
              <Slider className={`carousel carousel-center scrollbar-none gap-2 ${isMobile && 'col-span-full row-start-2 row-end-5'}`}>
                {Games.map((game,index)=>(
                  <Slider.Item index={index} className={`carousel-item first:pl-6 last:pr-6 `}>
                    <Game gameName={game.gameName} imgUrl={game.imgUrl}/>
                  </Slider.Item>
                ))}
              </Slider>
              <div class='hidden re1:flex items-center justify-center next'>
                <Slider.NextButton class='btn bg-transparent hover:bg-transparent border-none relative'>
                  <Icon
                    class='text-[#dd1f26]'
                    size={25}
                    id='ChevronRight'
                    strokeWidth={3}
                  />
                </Slider.NextButton>
              </div>

              <SliderJS rootId={id} infinite />
            </div>
          </div>
          )}

          {count.value===2 && (
            <div className='flex items-center h-[300px]'>
              <div className='flex flex-col items-center justify-center text-white gap-10'>
                <div className="flex re1:gap-12 gap-3 items-center justify-between">
                  <label className='flex items-center text-green-500 text-lg font-bold'>
                    <p>R$</p>
                    <input className='bg-transparent text-end appearance-none focus:outline-none w-[60px]' type='text' 
                      maxLength={5}
                      onKeyUp={handleKeyUp}
                      onKeyPress={handleKeyPress}
                      onfocusout={(event)=>setRangeVal((event.target as HTMLInputElement).value)}
                      value={barVal}
                    />
                    <p>,00</p>
                  </label>
                  <div className='self-center'>
                  <hr className='w-[2px] h-[70px] bg-white'/>
                  </div>
                  <label className='flex items-center gap-2'>
                      <span className='text-lg font-bold'>
                        {`R$ ${(parseFloat(barVal)/10).toFixed(2).replace("." , ',')}`}
                      </span>
                      <span className='relative w-[50px] text-xs text-center'>10X sem juros</span>
                  </label>
                </div>
        
                <label className='re1:w-[600px] w-[300px] flex flex-col items-start'>
                  <div className='h-[4px] relative top-[4px] bg-[#dd1f26]' style={{width:`${percentRange()}%`}}/>
                  <input
                    type="range"
                    min={minPrice.value}
                    max="10000"
                    step="1"
                    value={barVal}
                    onInput={(event)=>setRangeVal((event.target as HTMLInputElement).value)}
                    className="appearance-none w-full h-[4px] bg-[#615d5d] rounded-md outline-none focus:outline-none
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[20px] [&::-webkit-slider-thumb]:rounded-md 
                    [&::-webkit-slider-thumb]:w-[40px] [&::-webkit-slider-thumb]:bg-[#dd1f26] cursor-pointer"
                  />
                </label>
              </div>
            </div>
          )}  

          {count.value===3 && (
            <div className='flex items-center h-[300px]'>
              <div className='flex flex-col items-center justify-center text-white gap-6'>
                <div className="flex gap-12 items-center justify-center">
                  <label className='flex gap-2 items-center'>
                    {block60.value && (<span className='text-5xl text-[#dd1f26] font-bold tooltip tooltip-bottom mr-1' data-tip='Não existem produtos com essa configuração para os jogos e a faixa de preço selecionados!'>!</span>)}
                    <div className={`flex flex-col text-sm re1:text-lg font-bold items-start ${block60.value && 'brightness-50 cursor-not-allowed'}`}>
                      <p>Acima de</p>
                      <p>60FPS</p>
                    </div>
                    <input className='checked:bg-[#dd1f26] border border-[#dd1f26] rounded-full appearance-none h-5 w-5' type="radio" name='fps' 
                      onClick={()=>{if(!block144.value)checkboxChecked.value='60+'}} disabled={block60.value}
                    />
                  </label>
                  <hr className='w-[2px] h-[70px] bg-white'/>
                  <label className='flex gap-2 items-center'>
                    {block144.value && (<span className='text-[#dd1f26] font-bold text-5xl tooltip tooltip-bottom mr-1' data-tip='Não existem produtos com essa configuração para os jogos e a faixa de preço selecionados!'>!</span>)}
                    <div className={`flex flex-col text-sm re1:text-lg font-bold items-start ${block144.value && 'brightness-50 cursor-not-allowed'}`}>
                      <p>Acima de</p>
                      <p>144FPS</p>
                    </div>
                    <input className='checked:bg-[#dd1f26] border border-[#dd1f26] rounded-full appearance-none h-5 w-5' type="radio" name='fps' 
                      onClick={()=>{if(!block144.value)checkboxChecked.value='144+'}} disabled={block144.value}
                    />
                  </label>
                </div>

                <p className='w-80 text-center text-lg'>FPS(frames per second) Quanto mais FPS, mais rápida será a imagem</p>
              </div>
            </div>
          )}  
          <BTNFinal/>
        </GameContextProvider>
    </div>
  </div>
  )
}

export default selectGames