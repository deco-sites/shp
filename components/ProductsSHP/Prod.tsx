export interface ProdProps {
  nome?: string;
  imgUrl?: string;
  precoPIX?: string;
  preco10?: string;
  discountFlag?: number;
}

const Prod = ({ ...props }: ProdProps) => {
  if (props) {
    return (
      <div className="flex flex-col min-w-[160px] max-w-[160px] max-h-[326px] min-h-[326px] rounded-lg bg-white">
        <div className="flex flex-col items-center -mb-5">
          <label className="w-4/5 flex relative justify-between bottom-0">
            <div className="bg-green-500 text-white text-sm font-bold">
              {props.discountFlag}%
            </div>
            <div>Frete</div>
            <img
              className=""
              src="https://shopinfo.vteximg.com.br/arquivos/heartRed.png"
              alt="like"
            />
          </label>

          <img
            className="relative w-[130px] -top-5"
            src={props.imgUrl}
            alt="Pc image"
          />
        </div>

        <span className="text-sm text-black font-bold">{props.nome}</span>

        <div className="flex flex-col">
          <span className="text-lg text-[#dd1f26] font-bold">
            10x R$ {props.preco10}
          </span>
          <p className="text-xs">ou por R$ {props.precoPIX} no Pix</p>
        </div>

        <label htmlFor="compare" className="flex gap-1">
          <input
            type="checkbox"
            name="compare"
            id="compare"
            className="rounded-full checked:bg-red-500"
          />
          <p>Compare</p>
        </label>
      </div>
    );
  }

  return <h1>Batata</h1>;
};

export default Prod;
