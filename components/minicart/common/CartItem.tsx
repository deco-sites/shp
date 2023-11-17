import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useCallback, useState } from "preact/hooks";
import { DescontoPIX } from "deco-sites/shp/FunctionsSHP/DescontoPix.ts";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: unknown) => void;
    };
  }
}

export interface Item {
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

  onUpdateQuantity: (quantity: number, index: number) => Promise<void>;
  itemToAnalyticsItem: (index: number) => AnalyticsItem | null | undefined;
}

function CartItem({item, index, locale, currency, onUpdateQuantity, itemToAnalyticsItem}: Props) {
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
                  <span className='text-primary font-bold'>{formatPrice(sale, currency, locale)}</span> ou <span className='text-primary font-bold'>{DescontoPIX(sale, 12).toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</span> no pix
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
  
              await onUpdateQuantity(quantity, index);
  
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
