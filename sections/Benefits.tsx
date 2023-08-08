import Image from 'deco-sites/std/components/Image.tsx'

const Benefits = () => {
  return (
    <div className="flex flex-row items-center re1:justify-center mx-auto gap-2 m-3 w-11/12 h-40 overflow-x-auto scrollbar-none">
        <label className="min-w-[150px] text-center flex flex-col items-center gap-1">
          <Image
            preload decoding='sync' loading='eager' fetchPriority='high'
            className="grayscale brightness-50" width={40} height={40} src="https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-pcmontado.png" 
          />
          <p><b>PC Montado</b> <br/> Pronto para Jogar</p>
        </label>
        <label className="min-w-[150px] text-center flex flex-col items-center gap-1">
          <Image
            preload decoding='sync' loading='eager' fetchPriority='high'
            className="grayscale brightness-50" width={40} height={40} src="https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-pix-.png" 
          />
          <p><b>15%</b> OFF<br/>no PIX</p>
        </label>
        <label className="min-w-[150px] text-center flex flex-col items-center gap-1">
          <Image
            preload decoding='sync' loading='eager' fetchPriority='high'
            className="grayscale brightness-50" width={80} height={34} src="https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-10x-.png" 
          />
          <p><b>10X</b> sem juros <br/> no cartão</p>
        </label>    
        <label className="min-w-[150px] text-center flex flex-col items-center gap-1">
          <Image
            preload decoding='sync' loading='eager' fetchPriority='high'
            className="grayscale brightness-50" width={46} height={40} src="https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-2cartoes-.png" 
          />
          <p>Parcele sua compra<br/> com<b> 2 cartões</b></p>
        </label>
        <label className="min-w-[150px] text-center flex flex-col items-center gap-1">
          <Image
            preload decoding='sync' loading='eager' fetchPriority='high'
            className="grayscale brightness-50" width={63} height={36} src="https://shopinfo.vteximg.com.br/arquivos/icon-truck-frete.png" 
          />
          <p><b>Frete Grátis</b> <br/> Sul e Sudeste em PCs</p>
        </label>
    </div>
  );
};

export default Benefits;
