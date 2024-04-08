const string=`<div role="main" id="live-ff39f94d402e2e913366"></div><script type="text/javascript" src="https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js"></script><script type="text/javascript"> new RDStationForms('live-ff39f94d402e2e913366', 'null').createForm();</script>`

const FormRD = () => {
  return <div className='px-[30%]' dangerouslySetInnerHTML={{__html:string}}/>
}

export default FormRD