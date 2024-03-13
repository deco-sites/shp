const SignNewsletter = () => {

  const secondScriptText=`
    new RDStationForms('footer-057c7ba33caa73ecd1d1', 'null').createForm();
    document.querySelector('#footer-057c7ba33caa73ecd1d1 form button').addEventListener('click',()=>{
      const event={event:'sign_up',params:{
        method:'newsletter'
      }};
      console.log(event);
      dataLayer.push(event);
    })
  `

  return(
    <div className='re1:px-[30%]' dangerouslySetInnerHTML={{__html: `
      <div role="main" id="footer-057c7ba33caa73ecd1d1"></div>
      <script type="text/javascript">
        var firstScript = document.createElement('script');
        firstScript.src = 'https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js';
        firstScript.defer = true;

        firstScript.onload = function() {
          var secondScript = document.createElement('script');
          secondScript.text = ${secondScriptText}
          document.body.appendChild(secondScript);
        };

        document.body.appendChild(firstScript);
      </script>
    `}}/>
  )
}

export default SignNewsletter;
