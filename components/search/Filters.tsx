import Avatar from "$store/components/ui/Avatar.tsx";
import { parseRange } from "deco-sites/std/utils/filters.ts";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import Icon from "deco-sites/shp/components/ui/Icon.tsx";
import { useSignal } from "@preact/signals";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox checkbox-primary checkbox-xs rounded-none [--chkfg:transparent]" />
      <span class="text-sm text-white">{label}</span>
      {/* {quantity > 0 && <span class="text-sm text-base-content">({quantity})</span>} */}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={'flex flex-col gap-2 bg-[#141414] overflow-y-auto max-h-[300px] re1:scrollbar-shp'}>
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        if (key === "cor" || key === "tamanho") {
          return (
            <a href={url}>
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from,'BRL')} - ${formatPrice(range.to,'BRL')}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filtro({filter}:{filter:FilterToggle}){
  const open=useSignal(true)

  return(
    <li class="w-full flex flex-col bg-base-100 re1:bg-[#1e1e1e] border border-[#1e1e1e] re1:border-0">
      <h5 className='px-3 py-5 flex justify-between cursor-pointer'
        onClick={()=>{
          open.value=!open
        }}
      >
        {filter.label}
        <Icon 
          id={open ? 'ChevronUp' : 'ChevronDown'}
          size={12}
          strokeWidth={2}
        />
      </h5>
      <div className={`${open ? 'max-h-[340px]' : 'max-h-0'} trasition-[max-height] overflow-hidden duration-500 ease-in-out`}>
        <FilterValues {...filter} />
      </div>
    </li>
  )
}

function Filters({ filters }: Props) {
  return (
    <ul class="flex flex-col gap-6 p-4">
      {filters
        .filter(isToggle)
        .map((filter) => (
          <Filtro filter={filter} />
        ))}
    </ul>
  );
}

export default Filters;