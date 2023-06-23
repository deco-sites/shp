import { useState, useEffect } from 'preact/hooks'

const Batata=()=>{

  const rangeMin='2000'
  const [rangeVal, setRangeVal]=useState(rangeMin)
  const [barVal, setBarVal]=useState(rangeMin)
  
  const percentRange=()=>{
    if(parseFloat(barVal)>=10000){
      return 100
    }

    if(parseFloat(barVal)<=parseFloat(rangeMin)){
      return 0
    }
    return ((parseFloat(barVal) - parseFloat(rangeMin)) / (10000 - parseFloat(rangeMin)) * 100)
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
    setBarVal(String(verifyVal(rangeVal,rangeMin)))
  },[rangeVal])

  return(
    <div className='flex items-center h-[300px]'>
      <div className='flex flex-col items-center justify-center text-white gap-10'>
        <div className="flex re1:gap-12 gap-3 items-center justify-between">
          <label className='flex items-center text-green-500 text-lg font-bold'>
            <p>R$</p>
            <input className='bg-transparent text-end appearance-none focus:outline-none' type='text' 
              maxLength={5} pattern='\d*'
              onKeyUp={handleKeyUp}
              onKeyPress={handleKeyPress}
              onBlur={(event)=>setRangeVal((event.target as HTMLInputElement).value)}
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
            min={rangeMin}
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
  )
}

export default Batata