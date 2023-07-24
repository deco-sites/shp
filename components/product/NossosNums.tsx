// deno-lint-ignore-file no-window-prefix
import { useId, useEffect, useState } from 'preact/hooks'
import Slider from 'deco-sites/fashion/components/ui/Slider.tsx'
import SliderJS from 'deco-sites/fashion/components/ui/SliderJS.tsx'

const NossosNums = ()=>{
  const id='ourNums-'+ useId()
  const [isMobile, setIsMobile]=useState(window.innerWidth<768)

  useEffect(()=>{
    const handleResize=()=>{
      setIsMobile(window.innerWidth<768)
      console.log(isMobile)
    }

    handleResize()
    
    window.addEventListener('resize', handleResize)

    return ()=>{
      window.removeEventListener('resize', handleResize)
    }
  },[])

  return(
    <div className='text-white bg-[#111]'>
      <h4 className='text-2xl font-bold text-left mb-5'>Nossos Números</h4>
        <div className='flex flex-col w-full'>
          <div className='flex w-full items-center justify-center h-56'>
              <div className='flex flex-col items-center justify-between w-[27%] h-32'>
                  <div className='flex items-center justify-center min-w-[84px] min-h-[84px] border-[5px] border-[#dd1f26] rounded-full mb-2'>
                      <span className='text-3xl font-bold'>15k</span>
                  </div>
                  <span className='w-[84px] text-center text-base leading-4'>
                      + de 15Mil PCs<br/>montados<br/>anualmente
                  </span>
              </div>
              <div className='flex flex-col items-center justify-between w-[27%] h-32'>
                  <div className='flex items-center justify-center min-w-[84px] min-h-[84px] border-[5px] border-[#dd1f26] rounded-full mb-2 before:absolute before:w-[30px]
                    before:h-[36px] before:content-[""] before:bg-[url("https://shopinfo.vteximg.com.br/arquivos/icone-reputacao-otimo.png")] before:bg-no-repeat before:bg-[length:30px]
                  before:top-[17.5%] before:left-[40%]'>
                      <span className='text-3xl font-bold'>9,0</span>
                  </div>
                  <span className='w-[84px] text-center text-base leading-4'>
                      Nota <b>RA 1000</b><br/>Reclame Aqui
                  </span>
              </div>
              <div className='flex flex-col items-center justify-between w-[27%] h-32'>
                  <div className='flex items-center justify-center min-w-[84px] min-h-[84px] border-[5px] border-[#dd1f26] rounded-full mb-2'>
                      <span className='text-xl text-center font-bold leading-4'>ISO <br/> 9001</span>
                  </div>
                  <span className='w-[84px] text-center text-base leading-4'>
                      Selo de<br/>qualidade ISO<br/>9001
                  </span>
              </div>
          </div>
        </div>

        <div id={id} className='divComentarios w-full mb-[25px]'>
          {isMobile ? 
          (
            <>
              <Slider className='carousel carousel-center slick-comentarios overflow-hidden carousel'>
                {/* Google */}
                <Slider.Item index={0} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback'> Daniele C. </span> <span className='textFeedback'> Realmente atendimento maravilhoso, fiz minha compra com o vendedor Ivan, atencioso e disposto a explicar todas as minhas dúvidas, envio super rápido, meu filho está super feliz, com certeza foi a nossa primeira compra de muitas, obrigada a equipe Shopinfo pelo suporte e atenção prestada durante a compra. Meu filho estava há 3 anos querendo um PC gamer e está super satisfeito. </span> </div></Slider.Item>
                <Slider.Item index={1} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback'> Breno P. </span> <span className='textFeedback'> Atendimento de suporte excelente. Quem me atendeu foi o Matheus, muito atencioso, responde rápido, entrou em contato com o fabricante do produto para ver as possibilidades que eu tinha de concerto. Obrigado ShopInfo e, principalmente, Matheus Santos </span> </div></Slider.Item>
                <Slider.Item index={2} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback'> Fábio S. </span> <span className='textFeedback'> Computador chegou com problemas para ligar, entrei em contato com o SAC e imediatamente um técnico entrou em contato e resolveu o meu problema. </span> </div></Slider.Item>
                <Slider.Item index={3} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback'> Patricia P. </span> <span className='textFeedback'> Vendedores atenciosos em atendimento on line fiz a retirada no local por opção mas eles enviam por transportadora. O PC gamer está fazendo a felicidade da criança! </span> </div></Slider.Item>
                <Slider.Item index={4} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback'> Paulo F. </span> <span className='textFeedback'> Gostaria de elogiar o atendimento realizado pelos funcionários da empresa. Comprei um PC GAMER (4800 reais) e ele chegou no prazo (outubro/2020) e em perfeito estado. Meu filho está muito feliz. O computador foi devidamente configurado e funciona plenamente. Palmas/Tocantins </span> </div></Slider.Item>
                <Slider.Item index={5} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback'> DFMP </span> <span className='textFeedback'> Precisei usar a garantia e fui rapidamente direcionada p autorizada... Todo serviço mesmo C peças vindo da sede foi em menos de 10 dias. O suporte por email do funcionário Matheus foi excepcional! A empresa está de parabéns </span> </div></Slider.Item>
                <Slider.Item index={6} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback'> Kaoru O. </span> <span className='textFeedback'> Comprei um computador gamer e entregaram em 2 dias, só que veio com problemas... Mas o suporte pós-venda (Márcio), foi muito atencioso e competente e resolveu o problema rapidamente. </span> </div></Slider.Item>
                <Slider.Item index={7} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback'> Marcelo A. </span> <span className='textFeedback'> Compramos uma cadeira gamers, da PCTOP, por essa loja! Chegou antes do prazo! Da forma como foi anunciado! Ótimo atendimento e profissionalismo! Meus parabéns a todos! Em meio a tanta propaganda enganosa e tentativa de golpe, essa é uma empresa seria e profissional! </span> </div></Slider.Item>
                <Slider.Item index={8} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback'> Douglas S. </span> <span className='textFeedback'> Entrei em contato pelo telefone e falei com Claudiney. Atendimento bom e foi rápido no orçamento. Só vim fazer esse comentário porque tive tanta experiência ruim com outros lugares que faz bem ter alguém te passando as informações certinhas e com voz de quem está a fim de te atender. </span> </div></Slider.Item>
                <Slider.Item index={9} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback'> Rafael S. </span> <span className='textFeedback'> Comprei um computador com eles e tive um ótimo atendimento. Chegou antes do prazo e tudo conforme combinado no ato da compra. Empresa se mostra séria. </span> </div></Slider.Item>
                
                {/* Whatsapp */}
                <Slider.Item index={10} className='carousel-item'><div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-whatsapp'><span className='nomeFeedback'>Luan</span><span className='textFeedback'>Só queria agradecer mesmo pela rapidez de vocês em resolverem as coisas e pelo ótimo atendimento.Sem dúvidas vou comprar mais vezes com vcs!!!</span></div></Slider.Item>
                
                {/* Twitter */}
                <Slider.Item index={11} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-twitter'> <span className='nomeFeedback'> Lucas B. </span> <span className='textFeedback'> Inclusive se um dia for comprar um pc! compra da shopinfo, se nao fosse eles nao teria programa nenhum nesse sistema de streaming que fizemos </span> </div></Slider.Item>
                <Slider.Item index={12} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-twitter'> <span className='nomeFeedback'> LELEB </span> <span className='textFeedback'> Comprei o meu na shopinfo e tá tudo certo, só comprei uma memória RAM de 8gb pra ficar 16gb depois de uns meses pq tava com promoção na Aliexpress. Tive problemas quando ele chegou, mas por estar na garantia, eles me mandaram um novo e não tive mais problemas. </span> </div></Slider.Item>
                <Slider.Item index={13} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-twitter'> <span className='nomeFeedback'> Not Wesley </span> <span className='textFeedback'> @Shopinfo tem uma equipe muito boa viu, O Márcio um dos atendentes do site me atendeu super bem e já providenciou o envio da cadeira antes mesmo da coleta da nova, bom demais!! </span> </div></Slider.Item>
                
                {/* Instagram */}
                <Slider.Item index={14} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> Bia F. </span> <span className='textFeedback'> Amando meu PC, vocês são demais! </span> </div></Slider.Item>
                <Slider.Item index={15} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> Teu Z. </span> <span className='textFeedback'> O meu chegou mês passado, só alegria envio rápido e chegou tudo do jeito que pedi ganharam um cliente. </span> </div></Slider.Item>
                <Slider.Item index={16} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> JP N. </span> <span className='textFeedback'> Mt boa a loja, comprei meu pc com vcs e recomendei pra meu amigo que comprou tbm ai. Ambos pcs vieram certinho sem nenhum problema! </span> </div></Slider.Item>
                <Slider.Item index={17} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> Rayron </span> <span className='textFeedback'> Shopinfo arrebentando estão de parabéns, fazendo o diferente e com ótimos preços </span> </div></Slider.Item>
                <Slider.Item index={18} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> SOUZA </span> <span className='textFeedback'> Estou muito feliz om o meu PC Gmer, entregue em 04 dias. </span> </div></Slider.Item>
                <Slider.Item index={19} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> GIAN </span> <span className='textFeedback'> Cara ainda bem que vcs existem </span> </div></Slider.Item>
                <Slider.Item index={20} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> Lucas G. </span> <span className='textFeedback'> Top demais, decidi comprar meu pczao em vcs justamente por isso, a diferença entre outros era insignificante perto da garantida de vir tudo montado  </span> </div></Slider.Item>
                <Slider.Item index={21} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> Rian R. </span> <span className='textFeedback'> O meu pc chegou em 8 DIAS (MORO NO NORDESTE) </span> </div></Slider.Item>
                <Slider.Item index={22} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> Cau M. </span> <span className='textFeedback'> Meu PC da shopinfo fez um ano... Só felicidades.. nunca formatei tá do jeito q montaram </span> </div></Slider.Item>
                <Slider.Item index={23} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> Lan House do C. </span> <span className='textFeedback'> Shop info é tudo de bom . Seria interessante ter um CD aqui no nordeste também. Eu gostaria de comprar mais coisas de baixo valor com vocês. Mas o frete sai caro, pega distancia. Porém comprei um PC gamer e não me arrependo. Foi só ligar e usar já veio todo otimizado para o hardware </span> </div></Slider.Item>
                <Slider.Item index={24} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> Off The. </span> <span className='textFeedback'> Eu tenho meu Pc já tem mais de um ano , confiança total </span> </div></Slider.Item>
                <Slider.Item index={25} className='carousel-item'> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> White Z. </span> <span className='textFeedback'> VOU MANDA O PAPO RETO, NÃO COMPREM UM PC NA @shopinfooficial COMPRE DOIS POIS OS PREÇOS SÃO ÓTIMOS É A QUALIDADE MELHOR AINDA </span> </div></Slider.Item>
              </Slider>

              <SliderJS rootId={id} scroll='smooth'/>
            </>
          )
          :
          (
            <div className='slick-comentarios overflow-hidden'>
                {/* Google */}
                <li>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback'> Daniele C. </span> <span className='textFeedback'> Realmente atendimento maravilhoso, fiz minha compra com o vendedor Ivan, atencioso e disposto a explicar todas as minhas dúvidas, envio super rápido, meu filho está super feliz, com certeza foi a nossa primeira compra de muitas, obrigada a equipe Shopinfo pelo suporte e atenção prestada durante a compra. Meu filho estava há 3 anos querendo um PC gamer e está super satisfeito. </span> </div></a>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback'> Breno P. </span> <span className='textFeedback'> Atendimento de suporte excelente. Quem me atendeu foi o Matheus, muito atencioso, responde rápido, entrou em contato com o fabricante do produto para ver as possibilidades que eu tinha de concerto. Obrigado ShopInfo e, principalmente, Matheus Santos </span> </div></a>
                </li>
                <li>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback'> Fábio S. </span> <span className='textFeedback'> Computador chegou com problemas para ligar, entrei em contato com o SAC e imediatamente um técnico entrou em contato e resolveu o meu problema. </span> </div></a>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback'> Patricia P. </span> <span className='textFeedback'> Vendedores atenciosos em atendimento on line fiz a retirada no local por opção mas eles enviam por transportadora. O PC gamer está fazendo a felicidade da criança! </span> </div></a>
                </li>
                <li>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback'> Paulo F. </span> <span className='textFeedback'> Gostaria de elogiar o atendimento realizado pelos funcionários da empresa. Comprei um PC GAMER (4800 reais) e ele chegou no prazo (outubro/2020) e em perfeito estado. Meu filho está muito feliz. O computador foi devidamente configurado e funciona plenamente. Palmas/Tocantins </span> </div></a>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback'> DFMP </span> <span className='textFeedback'> Precisei usar a garantia e fui rapidamente direcionada p autorizada... Todo serviço mesmo C peças vindo da sede foi em menos de 10 dias. O suporte por email do funcionário Matheus foi excepcional! A empresa está de parabéns </span> </div></a>
                </li>
                <li>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback'> Kaoru O. </span> <span className='textFeedback'> Comprei um computador gamer e entregaram em 2 dias, só que veio com problemas... Mas o suporte pós-venda (Márcio), foi muito atencioso e competente e resolveu o problema rapidamente. </span> </div></a>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback'> Marcelo A. </span> <span className='textFeedback'> Compramos uma cadeira gamers, da PCTOP, por essa loja! Chegou antes do prazo! Da forma como foi anunciado! Ótimo atendimento e profissionalismo! Meus parabéns a todos! Em meio a tanta propaganda enganosa e tentativa de golpe, essa é uma empresa seria e profissional! </span> </div></a>
                </li>
                <li>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback'> Douglas S. </span> <span className='textFeedback'> Entrei em contato pelo telefone e falei com Claudiney. Atendimento bom e foi rápido no orçamento. Só vim fazer esse comentário porque tive tanta experiência ruim com outros lugares que faz bem ter alguém te passando as informações certinhas e com voz de quem está a fim de te atender. </span> </div></a>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-google'> <span className='nomeFeedback'> Rafael S. </span> <span className='textFeedback'> Comprei um computador com eles e tive um ótimo atendimento. Chegou antes do prazo e tudo conforme combinado no ato da compra. Empresa se mostra séria. </span> </div></a>
                </li>
                
                <li>
                  {/* Whatsapp */}
                  <a><div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-whatsapp'><span className='nomeFeedback'>Luan</span><span className='textFeedback'>Só queria agradecer mesmo pela rapidez de vocês em resolverem as coisas e pelo ótimo atendimento.Sem dúvidas vou comprar mais vezes com vcs!!!</span></div></a>
                  
                  {/* Twitter */}
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-twitter'> <span className='nomeFeedback'> Lucas B. </span> <span className='textFeedback'> Inclusive se um dia for comprar um pc! compra da shopinfo, se nao fosse eles nao teria programa nenhum nesse sistema de streaming que fizemos </span> </div></a>
                </li>
                <li>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-twitter'> <span className='nomeFeedback'> LELEB </span> <span className='textFeedback'> Comprei o meu na shopinfo e tá tudo certo, só comprei uma memória RAM de 8gb pra ficar 16gb depois de uns meses pq tava com promoção na Aliexpress. Tive problemas quando ele chegou, mas por estar na garantia, eles me mandaram um novo e não tive mais problemas. </span> </div></a>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-twitter'> <span className='nomeFeedback'> Not Wesley </span> <span className='textFeedback'> @Shopinfo tem uma equipe muito boa viu, O Márcio um dos atendentes do site me atendeu super bem e já providenciou o envio da cadeira antes mesmo da coleta da nova, bom demais!! </span> </div></a>
                </li>
                
                {/* Instagram */}
                <li>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> Bia F. </span> <span className='textFeedback'> Amando meu PC, vocês são demais! </span> </div></a>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> Teu Z. </span> <span className='textFeedback'> O meu chegou mês passado, só alegria envio rápido e chegou tudo do jeito que pedi ganharam um cliente. </span> </div></a>
                </li>
                <li>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> JP N. </span> <span className='textFeedback'> Mt boa a loja, comprei meu pc com vcs e recomendei pra meu amigo que comprou tbm ai. Ambos pcs vieram certinho sem nenhum problema! </span> </div></a>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> Rayron </span> <span className='textFeedback'> Shopinfo arrebentando estão de parabéns, fazendo o diferente e com ótimos preços </span> </div></a>
                </li>
                <li>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> SOUZA </span> <span className='textFeedback'> Estou muito feliz om o meu PC Gmer, entregue em 04 dias. </span> </div></a>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> GIAN </span> <span className='textFeedback'> Cara ainda bem que vcs existem </span> </div></a>
                </li>
                <li>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> Lucas G. </span> <span className='textFeedback'> Top demais, decidi comprar meu pczao em vcs justamente por isso, a diferença entre outros era insignificante perto da garantida de vir tudo montado  </span> </div></a>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> Rian R. </span> <span className='textFeedback'> O meu pc chegou em 8 DIAS (MORO NO NORDESTE) </span> </div></a>
                </li>
                <li>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> Cau M. </span> <span className='textFeedback'> Meu PC da shopinfo fez um ano... Só felicidades.. nunca formatei tá do jeito q montaram </span> </div></a>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> Lan House do C. </span> <span className='textFeedback'> Shop info é tudo de bom . Seria interessante ter um CD aqui no nordeste também. Eu gostaria de comprar mais coisas de baixo valor com vocês. Mas o frete sai caro, pega distancia. Porém comprei um PC gamer e não me arrependo. Foi só ligar e usar já veio todo otimizado para o hardware </span> </div></a>
                </li>
                <li>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> Off The. </span> <span className='textFeedback'> Eu tenho meu Pc já tem mais de um ano , confiança total </span> </div></a>
                  <a> <div className='flex flex-col bg-[#424242] text-xs leading-[19px] italic w-[250px] h-[250px] p-[10px] platform platform-instagram'> <span className='nomeFeedback'> White Z. </span> <span className='textFeedback'> VOU MANDA O PAPO RETO, NÃO COMPREM UM PC NA @shopinfooficial COMPRE DOIS POIS OS PREÇOS SÃO ÓTIMOS É A QUALIDADE MELHOR AINDA </span> </div></a>
                </li>
            </div>
          )
          }
        </div>
    </div>
  )
}

export default NossosNums