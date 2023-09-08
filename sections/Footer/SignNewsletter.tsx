const SignNewsletter=()=>{
  return(
    <div className='my-5 w-full text-white bg-[#3d3d3d] px-[10%] py-6'>
      <label className='text-center font-bold flex flex-col gap-2 my-4 re1:my-6'>
        <h1 className='text-2xl re1:text-3xl'>Assine a Newsletter Shopinfo</h1>
        <p className='text-base re1:text-lg'>Tenha acesso às promoções e novidades antes de todo mundo.</p>
      </label>
      <div className='flex flex-col re1:flex-row re1:justify-center re1:items-center gap-5'>
        <input className='border border-[#979797] rounded-lg placeholder:text-[#979797] h-[40px] px-3 py-1 
          appearance-none bg-transparent text-sm outline-none re1:w-[350px]' 
          type='text' name='nome' placeholder='Digite seu nome'
        />
        <input className='border border-[#979797] rounded-lg  placeholder:text-[#979797] h-[40px] px-3 py-1 
          appearance-none bg-transparent text-sm outline-none re1:w-[350px]' 
          type='text' name='email' placeholder='Digite seu email'
        />
        <input className='border border-[#dd1f26] bg-[#dd1f26] font-bold text-lg rounded-lg placeholder
          px-3 py-1 cursor-pointer re1:w-[150px]' type='submit' value='Assinar' 
        />
      </div>
    </div>
  )
}

export default SignNewsletter