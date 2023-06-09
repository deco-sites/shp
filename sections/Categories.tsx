export interface Props {
  Categs: Array<{
    categImg: string;
    linkTo: string;
    name: string;
  }>;
}

const Categories = ({ Categs }: Props) => {
  return (
    <div className="my-5">
      <p className="text-center text-3xl font-bold my-2">Principais categorias</p>
      <div className="flex gap-2 overflow-x-scroll scrollbar-none mx-2 re1:justify-center re1:items-center">
        {Categs?.map((categ) => (
          <a
            href={categ.linkTo}
            className="min-h-[40px] min-w-[90px] bg-[#d3d2d2] text-center border-transparent border-[2px] rounded-lg
        hover:re1:bg-black hover:re1:text-white transition-all duration-700 font-bold text-xs text-[#3d3d3d] flex flex-col justify-around items-center"
          >
            {
              /* <img
              src={categ.categImg}
              alt="Batata"
              className="w-[90px] h-[75px]"
            /> */
            }
            <p>{categ.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Categories;
