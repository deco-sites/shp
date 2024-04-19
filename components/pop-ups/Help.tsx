import { memo } from 'preact/compat'
import { useState } from 'preact/hooks'

const Help = () =>{

  const [hover, setHover]=useState(false)

  return (
    <a className="relative inline-block" href='https://shopinfo.movidesk.com/kb' target='__blank'>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="flex items-center justify-end overflow-hidden bg-white rounded-full cursor-pointer"
        style={{ width: hover ? '220px' : '3rem', height: '3rem', transition: 'width 0.3s ease' }}
      >
        <span
          className="absolute left-0 flex items-center h-full text-sm font-bold text-black"
          style={{ transition: 'opacity 0.3s ease 150ms', opacity: hover ? '100' : '0', paddingLeft: hover ? '1rem' : 'unset' }}
        >
          {hover && 'Central de Ajuda'}
        </span>
        <svg className={`z-10 ${hover ? 'mr-3' : 'm-auto'}`} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000">
          {/* O path do seu ícone */}
          <g>
            <path d="M818.4,10H181.6C113.7,10,58.4,65.2,58.4,133.1v563.3c0,67.9,55.2,123.1,123.1,123.1h26.7v138.3c0,11.2,5.8,21.6,15.4,27.4c5.1,3.1,10.9,4.7,16.7,4.7c5,0,10.1-1.2,14.7-3.5L580,819.6h238.5c67.9,0,123.1-55.2,123.1-123.1V133.1C941.6,65.2,886.3,10,818.4,10z M877.4,696.4c0,32.5-26.4,58.9-58.9,58.9H572.2c-5.1,0-10.1,1.2-14.7,3.5l-285,146.4V787.5c0-17.7-14.4-32.1-32.1-32.1h-58.8c-32.5,0-58.9-26.4-58.9-58.9V133.1c0-32.5,26.4-58.9,58.9-58.9h636.9c32.5,0,58.9,26.4,58.9,58.9L877.4,696.4L877.4,696.4z"></path>
            <path d="M500,189.2c-80.4,0-145.9,65.4-145.9,145.9c0,17.4,14.2,31.6,31.6,31.6c17.4,0,31.6-14.2,31.6-31.6c0-45.6,37.1-82.7,82.7-82.7c45.6,0,82.7,37.1,82.7,82.7c0,33.5-20.1,63.5-51.2,76.4c-38.3,16.1-63.1,53.4-63.1,95c0,17.4,14.2,31.6,31.6,31.6c15.2,0,28.2-10.8,31-25.7c0.4-1.8,0.6-3.8,0.6-6c0-16.3,9.8-30.8,25.1-37l0.7-0.4c53.8-23,88.5-75.6,88.5-134C645.9,254.6,580.4,189.2,500,189.2z"></path>
            <path d="M496.9,572.5c-24.9,0-45.1,20.3-45.1,45.1s20.2,45.1,45.1,45.1s45.1-20.3,45.1-45.1S521.8,572.5,496.9,572.5z"></path>
          </g>
        </svg>
      </div>
    </a>
  )
}

const Memoized=memo(Help)

export default Memoized

