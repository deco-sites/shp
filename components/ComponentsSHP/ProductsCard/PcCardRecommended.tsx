import { memo } from 'preact/compat'
import { PcCard as Props}  from "deco-sites/shp/components/product/RecommendedProds.tsx"
import Image from 'deco-sites/std/components/Image.tsx'
import { DescontoPIX } from "deco-sites/shp/FunctionsSHP/DescontoPix.ts";

const PcCard=({...props}:Props)=>{
  const {productId, prodName, precoVista, valorParcela, parcelas, linkProd, imgUrl, placaVideo, processador, memoria, armazenamento, tipoArm, precoDe, precoParcelado, pix} = props
  const precoDeNum=precoDe!=='' ? parseFloat((precoDe.split('R$ ')[1]).replace('.','').replace(',','.')) : parseFloat(precoParcelado.replace('.','').replace(',','.'))
  const vistaNum=parseFloat(precoVista.replace('.','').replace(',','.'))
  const percent=precoDe!=='' ? Math.floor(((precoDeNum - vistaNum) / precoDeNum) * 100) : 15

  return(
    <a className='flex flex-col h-[370px] w-full max-w-[250px] bg-[#262626] rounded-lg p-0 border relative
    border-transparent hover:re1:border-primary hover:re1:shadow-[0_0_20px_0] hover:re1:shadow-primary' href={linkProd.replace('https://www.shopinfo.com.br','')}>
      <div className='flex flex-col px-3 pt-8 re1:pt-3 h-auto w-auto'>
        <div>
          <span className={`absolute h-[30px] w-[35px] flex items-center justify-center bg-success text-secondary text-[12px] p-1 font-bold rounded-lg`}>-{percent}%</span>
        </div>
        <Image className='m-auto' src={imgUrl} width={185} height={185} decoding='sync' loading='lazy' fetchPriority='low'/>
        <div className='text-success flex flex-col gap-1 w-[85px] absolute mt-[45%] re1:mt-[50%]'>
          <p className='text-secondary font-bold line-clamp-1 text-xs bg-[#000000] bg-opacity-90 px-1'>{processador}</p>
          <p className='font-bold line-clamp-2 text-xs bg-[#000000] bg-opacity-90 px-1'>{placaVideo}</p>
        </div>
      </div>
      <div className='flex flex-col px-3 justify-between my-auto h-[40%]'>
        <p className='text-sm line-clamp-2 leading-4 text-secondary'>
          {prodName}
        </p>
        <div className='flex justify-between re1:justify-start re1:gap-2'>
          <label className='flex items-center gap-1' title={memoria}>
            <Image
              src='https://shopinfo.vteximg.com.br/arquivos/icon-memoria.svg'
              width={15}
              height={15}
              loading='lazy'
              fetchPriority='low' decoding='sync'
            />
            <p className='text-[12px] line-clamp-1'>{memoria}</p>
          </label>
          <label className='flex items-center gap-1 w-[100px]' title={(armazenamento.toUpperCase().includes('HD') || armazenamento.toUpperCase().includes('SSD')) ? armazenamento : `${tipoArm} ${armazenamento}`}>
            <Image
              src='https://shopinfo.vteximg.com.br/arquivos/icon-hd.svg'
              width={15}
              height={15}
              loading='lazy'
              fetchPriority='low' decoding='sync'
            />
            <p className='text-[12px] line-clamp-1'>{(armazenamento.toUpperCase().includes('HD') || armazenamento.toUpperCase().includes('SSD')) ? armazenamento : `${tipoArm} ${armazenamento}`}
            </p>
          </label>
        </div>
        <span className='text-lg font-bold text-success leading-3 mt-4'>{parcelas}x {parseFloat(valorParcela).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span>
        <p className='text-[11px] text-[#b4b4b4]'>ou por {DescontoPIX(parseFloat(precoVista.replace(/[^\d,]/g, '').replace(',', '.')), pix).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})} no Pix</p>
      </div>
    </a>
  )
}

export default memo(PcCard)