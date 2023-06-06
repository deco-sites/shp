const Benefits = () => {
  return (
    <div className="flex flex-row items-center re1:justify-center mx-auto gap-2 m-3 w-11/12 h-40 overflow-x-auto scrollbar-none">
        <label className="min-w-[150px] text-center flex flex-col items-center gap-1">
          <img className="grayscale brightness-50 w-[40px] h-[40px]" src="https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-pcmontado.png" alt="" />
          <p><b>PC Montado</b> <br/> Pronto para Jogar</p>
        </label>
        <label className="min-w-[150px] text-center flex flex-col items-center gap-1">
          <img className="grayscale brightness-50 w-[40px] h-[40px]" src="https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-pix-.png" alt="" />
          <p><b>15%</b> OFF<br/>no PIX</p>
        </label>
        <label className="min-w-[150px] text-center flex flex-col items-center gap-1">
          <img className="grayscale brightness-50 w-[80px] h-[40px]" src="https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-10x-.png" alt="" />
          <p><b>10X</b> sem juros <br/> no cartão</p>
        </label>    
        <label className="min-w-[150px] text-center flex flex-col items-center gap-1">
          <img className="grayscale brightness-50 w-[46px] h-[40px]" src="https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-2cartoes-.png" alt="" />
          <p>Parcele sua compra<br/> com<b> 2 cartões</b></p>
        </label>
        <label className="min-w-[150px] text-center flex flex-col items-center gap-1">
          <img className="grayscale brightness-50 w-[63px] h-[40px]" src="https://shopinfo.vteximg.com.br/arquivos/icon-truck-frete.png" alt="" />
          <p><b>Frete Grátis</b> <br/> Brasil em PCs</p>
        </label>
    </div>
  );
};

export default Benefits;
