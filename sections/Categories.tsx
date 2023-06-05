export interface Props {
  Categs: Array<{
    categImg: string;
    linkTo: string;
    name: string;
  }>;
}

const Categories = ({ Categs }: Props) => {
  return (
    <>
      <p className="text-center text-3xl font-bold">Principais categorias</p>
      <div className="flex gap-2 overflow-x-scroll scrollbar-none mx-2 re1:justify-center re1:items-center">
        {Categs?.map((categ) => (
          <a
            href={categ.linkTo}
            className="min-h-[115px] min-w-[115px] bg-[#262626] text-center border-transparent border-[2px] rounded-lg hover:border-[#dd1f26]  hover:shadow-[0_0_5px_2px]
        hover:shadow-[#dd1f26]/30 transition-all duration-700 font-bold text-xs text-[#3d3d3d] flex flex-col justify-around items-center"
          >
            <img
              src={categ.categImg}
              alt="Batata"
              className="w-[90px] h-[75px]"
            />
            <p>{categ.name}</p>
          </a>
        ))}
      </div>
    </>
  );
};

export default Categories;
