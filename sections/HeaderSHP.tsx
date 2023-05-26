export interface Props {
  categ: Array<{
    name: string;
  }>;
  logoUrl: string;

  cta: Array<{
    name: string;
    icon: string;
  }>;
}

const HeaderSHP = ({ categ = [], logoUrl = "", cta = [] }: Props) => {
  return (
    <div className="w-full h-28 flex flex-row bg-[#000000]  items-center px-7">
      <div className="w-38 h-16 ">
        <img src={logoUrl} alt="shp-logo" className="w-full h-full" />
      </div>

      {categ.map((cat) => (
        <div className="font-bold max-h-2 w-fit text-white text-base mx-4">
          {cat.name}
        </div>
      ))}

      <div className="w-26">
        <label className="flex gap-1">
          <input className="" type="text" name="search" id="nav-search" />
          <button>
            <img
              src="https://shopinfo.vteximg.com.br/arquivos/icon-search.png"
              alt="lupinha"
            />
          </button>
        </label>
      </div>

      <div className="h-2/4 bg-slate-600 w-[2px] mx-1 "></div>

      {cta.map((btn) => (
        <div className="w-6 text-base flex gap-1 mx-2">
          <img src={btn.icon} alt="cta-icon" />
          <p className="text-white font-bold hover:text-[#3d3d3d] cursor-pointer">
            {btn.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HeaderSHP;
