import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useCallback, useState } from "preact/hooks";
import { DescontoPIX } from "deco-sites/shp/FunctionsSHP/DescontoPix.ts";
import {invoke} from 'deco-sites/shp/runtime.ts'

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: unknown) => void;
    };
  }
}

export interface Item {
  id:string
  image: {
    src: string;
    alt: string;
  };
  name: string;
  quantity: number;
  price: {
    sale: number;
    list: number;
  };
}

export interface Props {
  item: Item;
  index: number;

  locale: string;
  currency: string;

  pix:number

  onUpdateQuantity: (quantity: number, index: number) => Promise<void>;
  itemToAnalyticsItem: (index: number) => AnalyticsItem | null | undefined;
}

const addMaximumIventoryAlert=(itemName:string)=>{
  const divAlert=document.createElement('div')
  divAlert.innerHTML=`
    <div role='alert' class='alert bg-[#dd1f26] text-xs re1:text-base text-white max-w-[95%] re1:max-w-[400px] mx-auto flex items-center'>
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>A quantidade desejada para o item ${itemName} não está disponível</span>
    </div>
      `
  divAlert.classList.add('fixed', 'z-30', 'top-4', 'w-full')

  document.querySelector('body')?.append(divAlert)
  setTimeout(()=>{divAlert.remove()},5000)
}

function CartItem({item, index, locale, currency, pix, onUpdateQuantity, itemToAnalyticsItem}: Props) {
  const { image, name, price: { sale, list }, quantity } = item;
  const isGift = sale < 0.01;
  const [loading, setLoading] = useState(false);

  const withLoading = useCallback(
    <A,>(cb: (args: A) => Promise<void>) => async (e: A) => {
      try {
        setLoading(true);
        await cb(e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <div class="flex flex-row justify-between items-start gap-4">
      <Image
        {...image}
        width={80}
        height={80}
        class="object-cover object-center m-auto"
      />
      <div class="flex-grow">
        <span className='text-secondary line-clamp-2 text-sm re1:text-base'>{name}</span>
        <div class="flex flex-col items-baseline">
          <span class="line-through text-neutral-content text-xs re1:text-sm">
            {formatPrice(list, currency, locale)}
          </span>
          <span class="text-xs re1:text-sm text-secondary">
            {isGift
              ? "Grátis"
              : (<p>
                  <span className='text-primary font-bold'>{formatPrice(sale, currency, locale)}</span> ou <span className='text-primary font-bold'>{DescontoPIX(sale, pix).toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</span> no pix
                </p>)}
          </span>
        </div>
        <div class="mt-6 max-w-min">
          <QuantitySelector
            disabled={loading || isGift}
            quantity={quantity}
            onChange={withLoading(async (quantity) => {
              const analyticsItem = itemToAnalyticsItem(index);
              const diff = quantity - item.quantity;
              
              let block=false

              if(diff>0){
                const prod= await invoke['deco-sites/shp'].loaders.getProductsSearchAPIProdType({queryString:`fq=skuId:${item.id}`})
                const inventory=prod[0].offers.offers[0].inventoryLevel.value

                quantity>inventory && (block=true, addMaximumIventoryAlert(name))
              }
              
              !block && await onUpdateQuantity(quantity, index);

              if (analyticsItem) {
                analyticsItem.quantity = diff;
  
                sendEvent({
                  name: diff < 0 ? "remove_from_cart" : "add_to_cart",
                  params: { items: [analyticsItem] },
                });
              }
            })}
          />
        </div>
      </div>
      <Button
        onClick={withLoading(async () => {
          const analyticsItem = itemToAnalyticsItem(index);

          await onUpdateQuantity(0, index);

          analyticsItem && sendEvent({
            name: "remove_from_cart",
            params: { items: [analyticsItem] },
          });
        })}
        disabled={loading || isGift}
        loading={loading}
        class="btn btn-ghost w-[32px] min-h-[32px] h-[32px] p-0"
      >
        <Icon id="Trash" width={20} height={20} class="m-auto"/>
      </Button>
    </div>
  );
}

export default CartItem;
