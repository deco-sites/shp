import Button from 'deco-sites/fashion/components/ui/Button.tsx'

const NotFound=()=>(
  <div class='w-full flex justify-center items-center py-28'>
    <div class='flex flex-col items-center justify-center gap-6'>
      <span class='font-medium text-2xl'>Página não encontrada</span>
      <a href='/'>
        <Button>Voltar à página inicial</Button>
      </a>
    </div>
  </div>
)

export default NotFound