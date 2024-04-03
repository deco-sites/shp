import { useEffect } from 'preact/hooks';
import { sendEvent } from "deco-sites/shp/sdk/analytics.tsx";

const SignNewsletter = () => {
  useEffect(() => {
    // Verifica se o script já foi adicionado para evitar duplicatas
    if (!document.querySelector('script[src="https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js"]')) {
      const firstScript = document.createElement('script');
      firstScript.src = 'https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js';
      firstScript.defer = true;

      firstScript.onload = () => {
        const secondScript = document.createElement('script');

        secondScript.text = "new RDStationForms('footer-057c7ba33caa73ecd1d1', 'null').createForm()";
        
        document.body.appendChild(secondScript);
      };
      
      globalThis.window.onload=()=>{
        document.querySelector('#footer-057c7ba33caa73ecd1d1 form button')!.addEventListener('click',()=>{
          sendEvent({name:'sign_up',params:{method:'newsletter'}})
        })
      }
      
      const StyleTag=document.createElement('style')
      StyleTag.innerHTML=`
        #footer-057c7ba33caa73ecd1d1 p{
          text-align:center!important;
          font-size:24pt!important;
        }

        #footer-057c7ba33caa73ecd1d1 h4{
          text-align:center!important;
        }
      `
      document.body.append(firstScript, StyleTag)
    }
  }, [])

  return <div className='re1:px-[30%]'><div role="main" id="footer-057c7ba33caa73ecd1d1"/></div>;
}

export default SignNewsletter;