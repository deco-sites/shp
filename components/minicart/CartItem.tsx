import Image from "deco-sites/std/components/Image.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import QuantitySelector from "deco-sites/fashion/components/ui/QuantitySelector.tsx";
import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import { AnalyticsEvent } from "apps/commerce/types.ts";
import { sendEvent } from "deco-sites/fashion/sdk/analytics.tsx";
import { DescontoPIX } from "deco-sites/shp/FunctionsSHP/DescontoPix.ts";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: unknown) => void;
    };
  }
}

interface Props {
  index: number;
}

function CartItem({ index }: Props) {
  const { loading, cart, updateItems, mapItemsToAnalyticsItems } = useCart();
  const item = cart.value!.items[index];
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const {
    imageUrl,
    skuName,
    sellingPrice,
    listPrice,
    name,
    quantity,
  } = item;

  const isGift = sellingPrice < 0.01;

  return (
    <div class="flex flex-row justify-between items-start gap-4">
      <Image
        src={imageUrl}
        alt={skuName}
        width={80}
        height={80}
        class="object-cover object-center m-auto"
      />
      <div class="flex-grow">
        <span className='text-white line-clamp-2'>{name}</span>
        <div class="flex flex-col items-baseline">
          <span class="line-through text-[#828282] text-sm">
            {formatPrice(listPrice / 100, currencyCode!, locale)}
          </span>
          <span class="text-sm text-white">
            {isGift
              ? "Grátis"
              : (<p>
                  <span className='text-[#dd1f26] font-bold'>{formatPrice(sellingPrice / 100, currencyCode!, locale)}</span> ou <span className='text-[#dd1f26] font-bold'>{DescontoPIX(sellingPrice / 100, 12).toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</span> no pix
                </p>)}
          </span>
        </div>
        <div class="mt-6 max-w-min">
          <QuantitySelector
            disabled={loading.value || isGift}
            quantity={quantity}
            onChange={(quantity) => {
              updateItems({ orderItems: [{ index, quantity }] });
              const quantityDiff = quantity - item.quantity;

              if (!cart.value) return;

              sendEvent({
                name: quantityDiff < 0 ? "remove_from_cart" : "add_to_cart",
                params: {
                  items: mapItemsToAnalyticsItems({
                    items: [{
                      ...item,
                      quantity: Math.abs(quantityDiff),
                    }],
                    marketingData: cart.value.marketingData,
                  }),
                },
              });
            }}
          />
        </div>
      </div>
      <Button
        onClick={() => {
          updateItems({ orderItems: [{ index, quantity: 0 }] });
          if (!cart.value) return;
          sendEvent({
            name: "remove_from_cart",
            params: {
              items: mapItemsToAnalyticsItems({
                items: [item],
                marketingData: cart.value.marketingData,
              }),
            },
          });
        }}
        disabled={loading.value || isGift}
        loading={loading.value}
        class="btn btn-ghost w-[32px] min-h-[32px] h-[32px] p-0"
      >
        <Icon id="Trash" width={20} height={20} class="m-auto"/>
      </Button>
    </div>
  );
}

export default CartItem;
