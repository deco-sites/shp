import { useMemo } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";
import type { JSX } from "preact";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(globalThis.window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (value:string) => {
  const urlSearchParams = new URLSearchParams(globalThis.window.location.search);

  urlSearchParams.set(SORT_QUERY_PARAM, value);
  globalThis.window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

const portugueseMappings = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  // "release:desc": "Relevância - Decrescente",
  "discount:desc": "Maior desconto",
};
function Sort({ sortOptions }: Props) {
  const sort = useSort();

  return (
    // select antigo
    // <select
    //   id="sort"
    //   name="sort"
    //   onInput={applySort}
    //   class="w-min h-[36px] px-1 rounded m-2 text-white cursor-pointer outline-none"
    // >
    //   {sortOptions.map(({ value, label }) => ({
    //     value,
    //     label: portugueseMappings[label as keyof typeof portugueseMappings],
    //   })).filter(({ label }) => label).map(({ value, label }) => (
    //     <option key={value} value={value} selected={value === sort}>
    //       <span class="text-sm">{label}</span>
    //     </option>
    //   ))}
    // </select>

    <label id='labelOrder' className='text-white text-sm h-12 re1:h-auto re1:text-base bg-[#111] w-[49%] py-[5px] re1:py-[15px] re1:w-full border border-secondary relative after:border-r after:border-b after:border-r-base-content after:border-b-base-content 
      after:right-[20px] after:top-1/2 after:transform after:-translate-y-1/2 after:absolute after:w-[5px] after:h-[5px] re1:after:w-[10px] re1:after:h-[10px] after:rotate-45 cursor-pointer'
      onClick={()=>{
        const label= document.querySelector('#labelOrder') as HTMLLabelElement
        const dropdown = label.querySelector('ul')
        if(dropdown && dropdown.classList.contains('hidden')){
          (label as HTMLLabelElement).classList.add('text-primary','after:rotate-[225deg]','after:border-r-primary','after:border-b-primary')
          dropdown?.classList.remove('hidden')
        }else{
          (label as HTMLLabelElement).classList.remove('text-primary','after:rotate-[225deg]','after:border-r-primary','after:border-b-primary')
          dropdown?.classList.add('hidden')
        }
      }}
    >
      <ul className='hidden z-10 absolute w-full bg-[#111] bottom-12'>
        {sortOptions.map(({ value, label }) => ({
          value,
          label: portugueseMappings[label as keyof typeof portugueseMappings],
        })).filter(({ label }) => label).map(({ value, label }, idx) => (
          <div key={idx} value={value} selected={value === sort} className='p-[10px] bg-[#111] text-white cursor-pointer hover:bg-[#d1d1d1] hover:text-black'
            onClick={()=>{applySort(value)}}
          >
            <span class="text-sm">{label}</span>
          </div>
        ))}
      </ul>
      <span className='font-bold px-[10px] re1:px-[20px]'>Ordenar Por:</span>
      <span className='text-xs line-clamp-1 w-full px-[10px] re1:px-[20px]'>{portugueseMappings[sort as keyof typeof portugueseMappings] ?? 'Selecione'}</span>
    </label>
  );
}

export default Sort;