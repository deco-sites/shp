const Benefits = () => {
  return (
    <div className="flex flex-col re1:flex-row items-center justify-center mx-auto gap-2 m-3 w-11/12">
      <div className="flex justify-between">
        <label className="w-[130px] re1:w-[200px] text-center flex flex-col items-center gap-1">
          <img className="w-[30px] h-[30px]" src="https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-pcmontado.png" alt="" />
          <p><b>PC Montado</b> <br/> Pronto para Jogar</p>
        </label>
        <label className="w-[130px] re1:w-[200px] text-center flex flex-col items-center gap-1">
          <img className="w-[30px] h-[30px]" src="https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-pix-.png" alt="" />
          <p><b>15%</b> OFF<br/>no PIX</p>
        </label>
        <label className="w-[130px] re1:w-[200px] text-center flex flex-col items-center gap-1">
          <img className="w-[70px] h-[30px]" src="https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-10x-.png" alt="" />
          <p><b>10X</b> sem juros <br/> no cartão</p>
        </label>
      </div>
      <div className="flex justify-between">
        <label className="w-[150px] re1:w-[200px] text-center flex flex-col items-center gap-1">
          <img className="w-[36px] h-[30px]" src="https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-2cartoes-.png" alt="" />
          <p>Parcele sua compra<br/> com<b> 2 cartões</b></p>
        </label>
        <label className="w-[150px] re1:w-[200px] text-center flex flex-col items-center gap-1">
          <img className="w-[53px] h-[30px]" src="https://shopinfo.vteximg.com.br/arquivos/icon-truck-frete.png" alt="" />
          <p><b>Frete Grátis</b> <br/> Brasil em PCs</p>
        </label>
      </div>
    </div>
  );
};

export default Benefits;
