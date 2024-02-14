import Image from 'deco-sites/std/components/Image.tsx'

const Benefits = () => {
  return (
    <div className="flex flex-row text-secondary items-center re1:justify-center mx-auto gap-2 re1:gap-5 m-3 w-11/12 h-40 overflow-x-auto scrollbar-none">
        <label className="min-w-[150px] re1:min-w-0 text-center re1:text-left flex re1:flex-row flex-col items-center gap-1">
          <Image
            decoding='sync' loading='eager' fetchPriority='high'
            className="" width={40} height={40} src="https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-pcmontado.png" 
          />
          <p><b>PC Montado</b> <br/> Pronto para Jogar</p>
        </label>
        <label className="min-w-[150px] re1:min-w-0 text-center re1:text-left flex re1:flex-row flex-col items-center gap-1">
          <Image
            decoding='sync' loading='eager' fetchPriority='high'
            className="" width={40} height={40} src="https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-pix-.png" 
          />
          <p><b>15%</b> OFF<br/>no PIX</p>
        </label>
        <label className="min-w-[150px] re1:min-w-0 text-center re1:text-left flex re1:flex-row flex-col items-center gap-1">
          <Image
            decoding='sync' loading='eager' fetchPriority='high'
            className="" width={80} height={34} src="https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-10x-.png" 
          />
          <p>Sem juros <br/> no cartão</p>
        </label>    
        <label className="min-w-[150px] re1:min-w-0 text-center re1:text-left flex re1:flex-row flex-col items-center gap-1">
          <Image
            decoding='sync' loading='eager' fetchPriority='high'
            className="" width={46} height={40} src="https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-2cartoes-.png" 
          />
          <p>Parcele sua compra<br/> com<b> 2 cartões</b></p>
        </label>
        <label className="min-w-[150px] re1:min-w-0 text-center re1:text-left flex re1:flex-row flex-col items-center gap-1">
          <Image
            decoding='sync' loading='eager' fetchPriority='high'
            className="" width={63} height={36} src="https://shopinfo.vteximg.com.br/arquivos/icon-truck-frete.png" 
          />
          <p><b>Frete Grátis</b> <br/> Sul e Sudeste em PCs</p>
        </label>
    </div>
  );
};

export default Benefits;
