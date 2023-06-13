export interface Props {
  nome?: string
  imgUrl?: string
  precoPIX?: string | number
  preco10?: number
  discountFlag?: number
}

const ProdFogo = ({ ...props }: Props) => {
  return (
    <div className="flex flex-col w-72 justify-between rounded-lg bg-white p-2 h-44">
      <label className="flex h-8 justify-between z-10">
        <div className="bg-[#dd1f26] rounded-lg flex justify-around p-1 items-center w-28">
          <img className="w-4 h-5" src="https://shopinfo.vteximg.com.br/arquivos/icon-esquenta-black.png" alt="" />
          <label>
            <p>Contador</p>
          </label>
        </div>
        <div className="flex items-center justify-center bg-green-500 text-white text-[12px] p-1 font-bold rounded-lg">
          {props.discountFlag}%
        </div>
      </label>
      <div className="flex items-center my-auto">
        <img className="w-[85px] h-auto" src={props.imgUrl} alt="" />

        <div className="flex flex-col max-w-[200px] overflow-hidden">
          <span className="text-xs max-h- text-black font-bold">
            {props.nome}
          </span>

          <span className="text-lg text-[#dd1f26] font-bold">
            10x R$ {props.preco10}
          </span>
          <p className="text-xs">ou por R$ {props.precoPIX} no Pix</p>
        </div>
      </div>
    </div>
  )
}

export default ProdFogo
