export interface Props {
  open: string;

  subCategs: Array<{
    imgUrl: string;
    linkTo: string;
  }>;

  subCategsNoImg?: Array<{
    iconUrl: string;
    name: string;
    linkTo: string;
  }>;
}
// {classnamePai, subCategs, subCategsNoImg}:Props

const MenuItemDesk = ({ open, subCategs, subCategsNoImg }: Props) => {
  return (
    <div
      className={`w-full h-48 bg-zinc-800 absolute gap-8 justify-center items-center hover:flex ${open}`}
    >
      <div className="flex gap-2">
        {subCategs.map((img) => (
          <div className="w-fit h-fit border-2 border-zinc-800 hover:border-[#dd1f26] border-solid rounded-lg">
            <a href={img.linkTo}>
              <img
                className="rounded-lg"
                src={img.imgUrl}
                alt="FotoCateg"
                width={120}
                height={120}
              />
            </a>
          </div>
        ))}
      </div>

      {subCategsNoImg && (
        <>
          <div className="w-[2px] h-3/5 bg-neutral-500" />

          <div className="grid grid-cols-3 gap-4">
            {subCategsNoImg.map((el)=>(
              <a href={el.linkTo} className="flex items-center content-center gap-2 hover:brightness-200">
                <img src={el.iconUrl} alt="icon" width={28} height={22}/>
                <span className="text-[#828282] font-bold">{el.name}</span>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MenuItemDesk;
