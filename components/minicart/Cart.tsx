import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import { AnalyticsEvent } from "apps/commerce/types.ts";
import { sendEvent } from "deco-sites/fashion/sdk/analytics.tsx";
import { useUI } from "deco-sites/fashion/sdk/useUI.ts";
import CartItem from "./CartItem.tsx";
import Coupon from "./Coupon.tsx";
import {DescontoPIX} from 'deco-sites/shp/FunctionsSHP/DescontoPix.ts'

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: unknown) => void;
    };
  }
}

const CHECKOUT_URL =
  "https://shopinfo.vtexcommercestable.com.br/checkout";

function Cart() {
  const { displayCart } = useUI();
  const { cart, loading, mapItemsToAnalyticsItems } = useCart();
  const isCartEmpty = cart.value?.items.length === 0;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;

  const productsPricePix:number[]|undefined=cart?.value?.items?.map(item=>DescontoPIX(item.sellingPrice/100, 12))

  if (cart.value === null) {
    return null;
  }

  // Empty State
  if (isCartEmpty) {
    return (
      <div class="flex flex-col justify-center items-center h-full gap-6 text-white">
        <span class="font-medium text-2xl">Sua sacola está vazia</span>
        <Button
          class="bg-[#dd1f26] hover:bg-[#dd1f26] text-white"
          onClick={() => {
            displayCart.value = false;
            (document.querySelector('#close-minicart') as HTMLElement)?.click()
          }}
        >
          Escolher produtos
        </Button>
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-between h-[90vh]'>
      {/* Cart Items */}
      <ul
        role="list"
        class="px-2 flex-grow overflow-y-auto flex flex-col h-full max-h-[66vh] scrollbar-shp"
      >
        {cart.value.items.map((_, index) => (
          <li class='py-4 border-y border-y-[#292929]'>
            <CartItem index={index} key={index} />
          </li>
        ))}
      </ul>

      {/* Cart Footer */}
      <footer class='text-white'>
        {/* Subtotal */}
        <div class="border-t border-[#292929] py-4 flex flex-col gap-4">
          {discounts?.value && (
            <div class="flex justify-between items-center px-4 text-[#00e480]">
              <span class="text-sm">Economia</span>
              <span class="text-sm">
                {formatPrice(discounts.value / 100, currencyCode!, locale)}
              </span>
            </div>
          )}
          <Coupon />
        </div>
        {/* Total */}
        {total?.value && (
          <div class="border-t border-[#292929] pt-4 flex flex-col justify-end items-end gap-2 mx-4">
            <div class="flex justify-between items-center w-full">
              <span>Total no PIX</span>
              <span class="font-bold text-xl text-[#00e480]">
                {productsPricePix?.reduce((acc, item)=>acc+item,0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}
              </span>
            </div>
            <div class="flex justify-between items-center w-full">
              <span>Total</span>
              <span class="font-bold text-xl">
                {formatPrice(total.value / 100, currencyCode!, locale)}
              </span>
            </div>
            <span class="text-sm text-[#828282]">
              Taxas e fretes serão calculados no checkout
            </span>
          </div>
        )}
        <div class="p-4">
          <a
            class="inline-block w-full"
            href={`${CHECKOUT_URL}?orderFormId=${cart.value!.orderFormId}`}
          >
            <Button
              data-deco="buy-button"
              class="w-full bg-[#dd1f26] hover:bg-[#dd1f26] text-white"
              disabled={loading.value || cart.value.items.length === 0}
              onClick={() => {
                sendEvent({
                  name: "begin_checkout",
                  params: {
                    currency: cart.value ? currencyCode! : "",
                    value: total?.value
                      ? (total?.value - (discounts?.value ?? 0)) / 100
                      : 0,
                    coupon: cart.value?.marketingData?.coupon ?? undefined,

                    items: cart.value
                      ? mapItemsToAnalyticsItems(cart.value)
                      : [],
                  },
                });

                console.log(cart)
              }}
            >
              Ir para Checkout
            </Button>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Cart;
