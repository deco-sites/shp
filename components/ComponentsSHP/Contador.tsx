import {memo} from 'preact/compat'
import useTimer from 'deco-sites/shp/FunctionsSHP/useTimer.ts'

import Image from 'deco-sites/std/components/Image.tsx'
interface Props{
  /** @description Datas para exibir o banner, Ex. 2020-10-05T18:30:00*/
  dataFinal:string
  /** @description As classes da div q engloba o items*/
  classes:string
}

const Contador=({dataFinal, classes}:Props)=>{
  const {days, hours, minutes, seconds, milliseconds}=useTimer(new Date(dataFinal))
  return (
    <div className={classes}>
      <Image width={61} height={61} src="https://shopinfo.vteximg.com.br/arquivos/relogio.gif"
        loading='lazy' className='re1:mr-0 mr-2 w-[40px] re1:w-[61px] h-[40px] re1:h-[61px]'
      />
      <p className="font-bold text-[20px] leading-3 w-[80%] re1:w-[40%] text-center re1:text-end flex gap-2">
        <span>{days}D</span> <span>{hours}</span> : <span>{minutes}</span> : <span>{seconds}</span> : <span>{milliseconds}</span>
      </p>
    </div>
  )
}

export default memo(Contador)