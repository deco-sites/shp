import { Signal, useSignal } from '@preact/signals'
import { useCallback } from 'preact/hooks'
import Button from '$store/components/ui/Button.tsx'
import { formatPrice } from '$store/sdk/format.ts'
import { useCart } from 'apps/vtex/hooks/useCart.ts'
import Image from 'deco-sites/std/components/Image.tsx'
import type {
  SimulationOrderForm,
  SKU,
  Sla,
} from "apps/vtex/utils/types.ts"
import { sendEvent } from "deco-sites/shp/sdk/analytics.tsx";

export interface Props {
  items: SKU[]
}

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/)

  if (type === "bd") return `${time} dias úteis`
  if (type === "d") return `${time} dias`
  if (type === "h") return `${time} horas`
}

function ShippingContent({ simulation }: {
  simulation: Signal<SimulationOrderForm | null>;
}) {
  const { cart } = useCart();

  const methods = simulation.value?.logisticsInfo?.reduce(
    (initial, { slas }) => [...initial, ...slas],
    [] as Sla[],
  ) ?? []

  const locale = cart.value?.clientPreferencesData?.locale || "pt-BR"
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL"

  if (simulation.value == null) {
    return null
  }

  if (methods.length === 0) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-4 p-4 bg-[#272727] rounded-[4px]">
      {methods.map((method) => (
        <li className="flex gap-4 re1:justify-between re1:gap-0 items-center border-base-200 not-first-child:border-t">
          <span className="text-button text-center">
            Entrega {method.name}
          </span>
          <span className="text-button">
            até {formatShippingEstimate(method.shippingEstimate)}
          </span>
          <span className="text-base font-semibold text-right">
            {method.price === 0 ? "Grátis" : (
              formatPrice(method.price / 100, currencyCode, locale)
            )}
          </span>
        </li>
      ))}
      <span className="text-base-content">
        Os prazos de entrega começam a contar a partir da confirmação do
        pagamento e podem variar de acordo com a quantidade de produtos na
        sacola.
      </span>
    </ul>
  )
}

function ShippingSimulation({ items }: Props) {
  const postalCode = useSignal("")
  const loading = useSignal(false)
  const simulateResult = useSignal<SimulationOrderForm | null>(null)
  const { simulate, cart } = useCart()

  const handleSimulation = useCallback(async () => {
    if (postalCode.value.length !== 8) {
      return
    }

    try {
      loading.value = true
      simulateResult.value = await simulate({
        items: items,
        postalCode: postalCode.value,
        country: cart.value?.storePreferencesData.countryCode || "BRA",
      })

      
      sendEvent({name:'freight_pdp', params:{
        cep: postalCode.value
      }})

    } finally {
      loading.value = false
    }
  }, [])

  return (
    <div class="flex flex-col gap-2">
      <div class="flex flex-col">
        <span className='flex gap-2'>
          <div className='flex items-center justify-center'>
            <Image src='https://shopinfo.vteximg.com.br/arquivos/vector-shipping-truck-icon.png'
              width={24} height={18} loading='eager' decoding='auto' fetchPriority='high'
            />
          </div>
          Calcular frete e prazo de entrega
        </span>
      </div>
      <div>
        <form
          class="flex justify-between re1:w-80"
          onSubmit={(e) => {
            e.preventDefault()
            handleSimulation()
          }}
        >
            <input
              as="input"
              type="text"
              class="input input-bordered focus:outline-none bg-[#272727] w-4/5"
              placeholder="Digite seu cep"
              value={postalCode.value}
              maxLength={8}
              onChange={(e: { currentTarget: { value: string } }) => {
                postalCode.value = e.currentTarget.value
              }}
            />
            <Button type="submit" loading={loading.value} class='bg-primary border-primary hover:border-primary hover:bg-primary'>
              <Image src='https://shopinfo.vteximg.com.br/arquivos/vector-arrow-right.png'
                width={16} height={12} loading='eager' decoding='auto' fetchPriority='high'
              />
            </Button>
        </form>
      </div>
      <div>
        <div>
          <ShippingContent simulation={simulateResult} />
        </div>
      </div>
    </div>
  )
}

export default ShippingSimulation;
