const stringForm=`<div role="main" id="faca-o-seu-orcamento-bef11f7753f56d72d54b"></div><script type="text/javascript" src="https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js"></script><script type="text/javascript"> new RDStationForms('faca-o-seu-orcamento-bef11f7753f56d72d54b', 'null').createForm();</script>`

const Form=()=>{
  return <div dangerouslySetInnerHTML={{__html:stringForm}}/>
}

export default Form