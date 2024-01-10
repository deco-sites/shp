import { useId, useEffect, useState } from 'preact/hooks'
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'
import Image from 'deco-sites/std/components/Image.tsx'
import { JSX } from 'preact'
import { renderToString } from 'preact-render-to-string'
import Slider from 'deco-sites/fashion/components/ui/Slider.tsx'
import SliderJS from 'deco-sites/fashion/components/ui/SliderJS.tsx'

const NossosNums = () => {
  const id = 'ourNums-' + useId()

  const elements: JSX.Element[] = [
    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-google.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
      Daniele C. </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> Realmente atendimento maravilhoso, fiz minha compra com o vendedor Ivan, atencioso e disposto a explicar todas as minhas dúvidas, envio super rápido, meu filho está super feliz, com certeza foi a nossa primeira compra de muitas, obrigada a equipe Shopinfo pelo suporte e atenção prestada durante a compra. Meu filho estava há 3 anos querendo um PC gamer e está super satisfeito. </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,
    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-google.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
      Breno P. </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> Atendimento de suporte excelente. Quem me atendeu foi o Matheus, muito atencioso, responde rápido, entrou em contato com o fabricante do produto para ver as possibilidades que eu tinha de concerto. Obrigado ShopInfo e, principalmente, Matheus Santos </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,
    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-google.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
      Fábio S. </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> Computador chegou com problemas para ligar, entrei em contato com o SAC e imediatamente um técnico entrou em contato e resolveu o meu problema. </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,
    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-google.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
      Patricia P. </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> Vendedores atenciosos em atendimento on line fiz a retirada no local por opção mas eles enviam por transportadora. O PC gamer está fazendo a felicidade da criança! </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,
    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-google.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
      Paulo F. </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> Gostaria de elogiar o atendimento realizado pelos funcionários da empresa. Comprei um PC GAMER (4800 reais) e ele chegou no prazo (outubro/2020) e em perfeito estado. Meu filho está muito feliz. O computador foi devidamente configurado e funciona plenamente. Palmas/Tocantins </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,
    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-google.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
      DFMP </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> Precisei usar a garantia e fui rapidamente direcionada p autorizada... Todo serviço mesmo C peças vindo da sede foi em menos de 10 dias. O suporte por email do funcionário Matheus foi excepcional! A empresa está de parabéns </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,
    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-google.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
      Kaoru O. </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> Comprei um computador gamer e entregaram em 2 dias, só que veio com problemas... Mas o suporte pós-venda (Márcio), foi muito atencioso e competente e resolveu o problema rapidamente. </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,
    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-google.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
      Marcelo A. </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> Compramos uma cadeira gamers, da PCTOP, por essa loja! Chegou antes do prazo! Da forma como foi anunciado! Ótimo atendimento e profissionalismo! Meus parabéns a todos! Em meio a tanta propaganda enganosa e tentativa de golpe, essa é uma empresa seria e profissional! </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,
    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-google.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
      Douglas S. </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> Entrei em contato pelo telefone e falei com Claudiney. Atendimento bom e foi rápido no orçamento. Só vim fazer esse comentário porque tive tanta experiência ruim com outros lugares que faz bem ter alguém te passando as informações certinhas e com voz de quem está a fim de te atender. </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,
    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-google.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
      Rafael S. </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> Comprei um computador com eles e tive um ótimo atendimento. Chegou antes do prazo e tudo conforme combinado no ato da compra. Empresa se mostra séria. </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,


    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-whatsapp'><span className='nomeFeedback flex gap-2'>
      <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-whatsapp.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
        Luan</span><span className='mt-[20px] max-h-[190px] overflow-y-hidden'>Só queria agradecer mesmo pela rapidez de vocês em resolverem as coisas e pelo ótimo atendimento.Sem dúvidas vou comprar mais vezes com vcs!!!</span></div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,


    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-twitter'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-twitter.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
         Lucas B. </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> Inclusive se um dia for comprar um pc! compra da shopinfo, se nao fosse eles nao teria programa nenhum nesse sistema de streaming que fizemos </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,
    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-twitter'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-twitter.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
         LELEB </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> Comprei o meu na shopinfo e tá tudo certo, só comprei uma memória RAM de 8gb pra ficar 16gb depois de uns meses pq tava com promoção na Aliexpress. Tive problemas quando ele chegou, mas por estar na garantia, eles me mandaram um novo e não tive mais problemas. </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,
    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-twitter'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-twitter.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
         Not Wesley </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> @Shopinfo tem uma equipe muito boa viu, O Márcio um dos atendentes do site me atendeu super bem e já providenciou o envio da cadeira antes mesmo da coleta da nova, bom demais!! </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,


    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-instagramm.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
         Bia F. </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> Amando meu PC, vocês são demais! </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,
    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-instagramm.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
         Teu Z. </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> O meu chegou mês passado, só alegria envio rápido e chegou tudo do jeito que pedi ganharam um cliente. </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,
    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-instagramm.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
         JP N. </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> Mt boa a loja, comprei meu pc com vcs e recomendei pra meu amigo que comprou tbm ai. Ambos pcs vieram certinho sem nenhum problema! </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,
    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-instagramm.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
         Rayron </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> Shopinfo arrebentando estão de parabéns, fazendo o diferente e com ótimos preços </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,
    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-instagramm.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
         SOUZA </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> Estou muito feliz om o meu PC Gmer, entregue em 04 dias. </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,
    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-instagramm.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
         GIAN </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> Cara ainda bem que vcs existem </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,
    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-instagramm.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
         Lucas G. </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> Top demais, decidi comprar meu pczao em vcs justamente por isso, a diferença entre outros era insignificante perto da garantida de vir tudo montado  </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,
    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-instagramm.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
         Rian R. </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> O meu pc chegou em 8 DIAS (MORO NO NORDESTE) </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,
    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-instagramm.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
         Cau M. </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> Meu PC da shopinfo fez um ano... Só felicidades.. nunca formatei tá do jeito q montaram </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,
    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-instagramm.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
         Lan House do C. </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> Shop info é tudo de bom . Seria interessante ter um CD aqui no nordeste também. Eu gostaria de comprar mais coisas de baixo valor com vocês. Mas o frete sai caro, pega distancia. Porém comprei um PC gamer e não me arrependo. Foi só ligar e usar já veio todo otimizado para o hardware </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,
    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-instagramm.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
         Off The. </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> Eu tenho meu Pc já tem mais de um ano , confiança total </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div>,
    <div className='w-[250px] flex flex-col align-center items-center'>
      <div className='w-[85%] bg-primary h-[10px] rounded-tl-lg rounded-tr-lg'/>
      <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback flex gap-2'>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-instagramm.png' width={20} height={20} fetchPriority='low' decoding='auto' loading='lazy' />
         White Z. </span> <span className='mt-[20px] max-h-[190px] overflow-y-hidden'> VOU MANDA O PAPO RETO, NÃO COMPREM UM PC NA @shopinfooficial COMPRE DOIS POIS OS PREÇOS SÃO ÓTIMOS É A QUALIDADE MELHOR AINDA </span> </div>
      <div className='w-[85%] bg-primary h-[10px] rounded-bl-lg rounded-br-lg'/>
    </div> 
  ]

  const shuffledElements: JSX.Element[] = [...elements]
  for (let i = shuffledElements.length - 1; i > 0; i--) {
    const randomIndex: number = Math.floor(Math.random() * (i + 1))
    const temp: JSX.Element = shuffledElements[i]
    shuffledElements[i] = shuffledElements[randomIndex]
    shuffledElements[randomIndex] = temp
  }

  const randomLimit = Math.random() < 0.5 ? 6 : 8

  const sliderItemsMobile = () => {
    const finalElements: JSX.Element[] = []

    shuffledElements.forEach((element, index) => {
      if (index < randomLimit) {
        const html = renderToString(element)
        const item = (
          <Slider.Item index={index} className='carousel-item first:pl-14 last:pr-14' dangerouslySetInnerHTML={{ __html: html }} />
        )
        finalElements.push(item)
      }
    })
    return finalElements
  }

  const sliderItemsDesktop = () => {
    const sliderElements: JSX.Element[] = []
    const finalPairs: string[] = []

    shuffledElements.forEach((element, index) => {index < randomLimit && sliderElements.push(element)})

    for (let i = 0; i < sliderElements.length; i += 2) {
      const pair =
        renderToString(sliderElements[i]) +
        renderToString(sliderElements[i + 1])
      finalPairs.push(pair)
    }

    return finalPairs.map((innerHTML, index) => (
      <Slider.Item
        index={index}
        className='carousel-item gap-6'
        dangerouslySetInnerHTML={{ __html: innerHTML }}
      />
    ))
  }

  return (
    <div id='REVIEW' className='text-secondary bg-base-100 py-[20px]'>
      <h4 className='px-[10%] text-center text-2xl font-bold mb-5 re1:hidden'>Nossos Números</h4>
      <div className='flex flex-col re1:flex-row w-full re1:justify-between re1:px-[10%]'>
        <div className='flex flex-col re1:w-[40%] items-center justify-center'>
          <h4 className='hidden text-2xl font-bold text-left re1:block'>Nossos Números</h4>
          <div className='flex w-full items-center justify-center h-56 my-auto'>
            <div className='flex flex-col items-center justify-between w-[27%] h-32'>
              <div className='flex items-center justify-center min-w-[84px] min-h-[84px] border-[5px] border-primary rounded-full mb-2'>
                <span className='text-3xl font-bold'>15k</span>
              </div>
              <span className='w-[84px] text-center text-base leading-4'>
                + de 15Mil PCs
                <br />
                montados
                <br />
                anualmente
              </span>
            </div>
            <div className='flex flex-col items-center justify-between w-[27%] h-32'>
              <div
                className='flex items-center justify-center min-w-[84px] min-h-[84px] border-[5px] border-primary rounded-full mb-2 before:absolute before:w-[30px]
                before:h-[36px] before:content-[""] before:bg-[url("https://shopinfo.vteximg.com.br/arquivos/icone-reputacao-otimo.png")] before:bg-no-repeat 
                before:bg-[length:30px] before:mr-[15%] before:mb-[15%] re1:before:mr-[3%] re1:before:mb-[3%]'
              >
                <span className='text-3xl font-bold'>9,0</span>
              </div>
              <span className='w-[84px] text-center text-base leading-4'>
                Nota <b>RA 1000</b>
                <br />
                Reclame Aqui
              </span>
            </div>
            <div className='flex flex-col items-center justify-between w-[27%] h-32'>
              <div className='flex items-center justify-center min-w-[84px] min-h-[84px] border-[5px] border-primary rounded-full mb-2'>
                <span className='text-xl text-center font-bold leading-4'>
                  ISO <br /> 9001
                </span>
              </div>
              <span className='w-[84px] text-center text-base leading-4'>
                Selo de
                <br />
                qualidade ISO
                <br />
                9001
              </span>
            </div>
          </div>
        </div>
        

        <h4 className='re1:hidden text-2xl font-bold px-[10%] text-center mb-5'>O que os clientes dizem sobre nós</h4>

        <div
          id={'mob-' + id}
          className='flex re1:hidden flex-col w-full mb-[25px]'
        >
          <Slider className='slick-comentários carousel carousel-center gap-6 scrollbar-none'>
            {sliderItemsMobile().map((item) => item)}
          </Slider>

          <ul className='carousel justify-center gap-4 z-[5] mt-6'>
            {sliderItemsMobile().map((__, index) => (
              <Slider.Dot index={index}>
                <div className='bg-[#2d2d2d] group-disabled:bg-primary rounded-full h-[12px] w-[12px]' />
              </Slider.Dot>
            ))}
          </ul>
          <SliderJS rootId={'mob-' + id} scroll='smooth' />
        </div>
        
        <div className='hidden re1:flex flex-col w-[50%] items-center justify-center'>
          <h4 className='text-2xl font-bold text-left mb-5'>O que os clientes dizem sobre nós</h4>
          <div
            id={'desk-' + id}
            className='grid grid-cols-[20px_1fr_20px] w-[565px] mb-[25px]'
          >
            <div className='flex justify-center items-center prev'>
              <Slider.PrevButton class='relative right-[20px] btn min-w-[20px] min-h-[20px] rounded-full disabled:grayscale bg-primary hover:bg-primary border-none hover:border-none'>
                <Icon
                  class='text-secondary'
                  size={15}
                  id='ChevronLeft'
                  strokeWidth={3}
                />
              </Slider.PrevButton>
            </div>

            <Slider className=' carousel carousel-center gap-6 scrollbar-none'>
              {sliderItemsDesktop().map((item) => item)}
            </Slider>

            <div class='flex items-center justify-center next'>
              <Slider.NextButton class='relative left-[20px] btn min-w-[20px] min-h-[20px] rounded-full disabled:grayscale bg-primary hover:bg-primary border-none hover:border-none'>
                <Icon
                  class='text-secondary'
                  size={15}
                  id='ChevronRight'
                  strokeWidth={3}
                />
              </Slider.NextButton>
            </div>

            <SliderJS rootId={'desk-' + id} scroll='smooth' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NossosNums
