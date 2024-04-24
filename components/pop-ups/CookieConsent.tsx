import Button from "deco-sites/fashion/components/ui/Button.tsx";
import { useId, useEffect, useRef } from "preact/hooks";

// const script = (id: string) => `
// const callback = () => {
//   const KEY = 'store-cookie-consent';
//   const ACCEPTED = 'accepted';
//   const HIDDEN = "translate-y-[200%]";
  
//   const consent = localStorage.getItem(KEY);
//   const elem = document.getElementById("${id}");
  
//   if (consent !== ACCEPTED) {
//     elem.querySelector('[data-button-cc-accept]').addEventListener('click', function () {
//       localStorage.setItem(KEY, ACCEPTED);
//       console.log('Consent')
//       elem.classList.add(HIDDEN);
//     });
//     // elem.querySelector('[data-button-cc-close]').addEventListener('click', function () {
//     //   elem.classList.add(HIDDEN);
//     // });
//     elem.classList.remove(HIDDEN);
//   }
// };

// // window.onload=callback()
// `;

const CookieConsent=()=>{
  const id = `cookie-consent-${useId()}`;
  const element = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    if(typeof globalThis.window!=='undefined'){
      console.log('Window carregada')
      const KEY = 'store-cookie-consent'
      const ACCEPTED = 'accepted'
      const consent = localStorage.getItem(KEY)

      if (consent !== ACCEPTED){
        element.current?.classList.remove('hidden');
        element.current?.querySelector('[data-button-cc-accept]')?.addEventListener('click', ()=>{
          localStorage.setItem(KEY, ACCEPTED);
          element.current?.classList.add('hidden');
        });
      }
    }
  })

  return(
    <>
      <div
        id={id}
        ref={element}
        className='hidden'
      >
        <div class="bg-white text-[#111] flex flex-col re1:flex-row gap-4 items-center justify-center w-screen text-xs p-3">
          <p className='text-center'>
            <b className='font-bold'>Cookies:</b> Nós utilizamos cookies para personalizar anúncios e melhoras a sua experiência na Shopinfo. Ao continuar, você concorda com a nossa <a href='/institucional#politica-de-privacidade' className='font-bold underline'>política de privacidade.</a>
          </p>

          <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button data-button-cc-accept class='!bg-success text-white uppercase font-bold !border-none !rounded-md !p-1 cursor-pointer !text-xs !h-auto !min-h-0'>Concordar e Fechar</Button>
            {/* <Button data-button-cc-close class="btn-outline">Fechar</Button> */}
          </div>
        </div>
      </div>
      {/* <script type="module" dangerouslySetInnerHTML={{ __html: script(id) }} /> */}
    </>
  )
}

export default CookieConsent