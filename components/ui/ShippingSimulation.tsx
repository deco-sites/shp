import { Signal, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import Image from 'deco-sites/std/components/Image.tsx'
import type {
  SimulationOrderForm,
  SKU,
  Sla,
} from "deco-sites/std/packs/vtex/types.ts";

export interface Props {
  items: Array<SKU>;
}

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function ShippingContent({ simulation }: {
  simulation: Signal<SimulationOrderForm | null>;
}) {
  const { cart } = useCart();

  const methods = simulation.value?.logisticsInfo?.reduce(
    (initial, { slas }) => [...initial, ...slas],
    [] as Sla[],
  ) ?? [];

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  if (simulation.value == null) {
    return null;
  }

  if (methods.length === 0) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <ul class="flex flex-col gap-4 p-4 bg-base-200 rounded-[4px]">
      {methods.map((method) => (
        <li class="flex justify-between items-center border-base-200 not-first-child:border-t">
          <span class="text-button text-center">
            Entrega {method.name}
          </span>
          <span class="text-button">
            até {formatShippingEstimate(method.shippingEstimate)}
          </span>
          <span class="text-base font-semibold text-right">
            {method.price === 0 ? "Grátis" : (
              formatPrice(method.price / 100, currencyCode, locale)
            )}
          </span>
        </li>
      ))}
      <span class="text-base-300">
        Os prazos de entrega começam a contar a partir da confirmação do
        pagamento e podem variar de acordo com a quantidade de produtos na
        sacola.
      </span>
    </ul>
  );
}

function ShippingSimulation({ items }: Props) {
  const postalCode = useSignal("");
  const loading = useSignal(false);
  const simulateResult = useSignal<SimulationOrderForm | null>(null);
  const { simulate, cart } = useCart();

  const handleSimulation = useCallback(async () => {
    if (postalCode.value.length !== 8) {
      return;
    }

    try {
      loading.value = true;
      simulateResult.value = await simulate({
        items: items,
        postalCode: postalCode.value,
        country: cart.value?.storePreferencesData.countryCode || "BRA",
      });
    } finally {
      loading.value = false;
    }
  }, []);

  return (
    <div class="flex flex-col gap-2">
      <div class="flex flex-col">
        <span className='flex gap-2'>
          <Image src='https://shopinfo.vteximg.com.br/arquivos/vector-shipping-truck-icon.png'
            width={24} height={20} loading='eager' decoding='auto' fetchPriority='high'
          />
          Calcular frete e prazo de entrega
        </span>
      </div>
      <div>
        <form
          class="form-control input-group"
          onSubmit={(e) => {
            e.preventDefault();
            handleSimulation();
          }}
        >
          <div class="input-group">
            <input
              as="input"
              type="text"
              class="input input-bordered"
              placeholder="Digite seu cep"
              value={postalCode.value}
              maxLength={8}
              onChange={(e: { currentTarget: { value: string } }) => {
                postalCode.value = e.currentTarget.value;
              }}
            />
            <Button type="submit" loading={loading.value} class='bg-[#dd1f26] border-[#dd1f26] hover:border-[#dd1f26] hover:bg-[#dd1f26]'>
              <Image src='https://shopinfo.vteximg.com.br/arquivos/vector-arrow-right.png'
                width={16} height={12} loading='eager' decoding='auto' fetchPriority='high'
              />
            </Button>
          </div>
        </form>
      </div>
      <div>
        <div>
          <ShippingContent simulation={simulateResult} />
        </div>
      </div>
    </div>
  );
}

export default ShippingSimulation;
