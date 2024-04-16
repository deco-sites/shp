import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Filters from "deco-sites/fashion/components/search/Filters.tsx";
import Sort from "deco-sites/fashion/components/search/Sort.tsx";
import Modal from "deco-sites/fashion/components/ui/Modal.tsx";
import Breadcrumb from "deco-sites/fashion/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";

type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
  };

function SearchControls(
  { filters, breadcrumb, displayFilter, sortOptions }: Props,
) {
  const open = useSignal(false);

  return (
    <div class="flex flex-col justify-between my-5 sm:p-0 sm:gap-4 sm:flex-row">
      <div class="flex flex-row items-center sm:p-0 mb-2">
        <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
      </div>

      <div class="flex flex-row items-center justify-between border-b border-base-200 sm:gap-4 sm:border-none w-full re1:w-[15%]">
        <Button
          class={`${displayFilter ? "" : "sm:hidden"} w-[45%] text-white flex bg-transparent border border-secondary h-12 items-center justify-center gap-2 rounded-none`}
          onClick={() => {
            open.value = true;
          }}
        >
          <Icon id="FilterList" width={16} height={16} />
          <p>Filtros</p>
        </Button>
        {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
      </div>

      <Modal
        loading="lazy"
        title="Filtros"
        mode="sidebar-right"
        open={open.value}
        onClose={() => {
          open.value = false;
        }}
      >
        <Filters filters={filters} />
      </Modal>
    </div>
  );
}

export default SearchControls;
