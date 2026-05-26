---
type: transcript
source: source.mp4
duration_sec: 1395
engine: faster-whisper small int8
language: pt-br
generated: 2026-05-26
---

# Transcript — Kelvin Cleto Playbook Escalar IA 2026

[00:00:00] Esse daqui é o playbook que eu usei, na verdade, que eu documentei pra criar a infraestrutura
[00:00:04] de A do meu negócio.
[00:00:05] E essa infraestrutura, basicamente, ela é dividida em três pilares que eu vou explicar
[00:00:08] aqui pra vocês e vou mostrar como eu apliquei.
[00:00:10] O primeiro pilar é o cérebro.
[00:00:12] Eu não tô falando de planilha, PDF que você joga na janela da IA.
[00:00:16] Não, eu tô falando de dados estruturados reais.
[00:00:18] Assim, ó, cérebro, um banco de dados bem estruturado, onde você vai jogar reuniões.
[00:00:23] Mas foram as objeções que os clientes apresentaram, o que você trata de reuniões
[00:00:26] com seus funcionários, conversas no Teams, no Slack, tudo.
[00:00:29] Tudo tem que ser extraído, integrado, processado, organizado e armazenado, mas não é armazenado
[00:00:34] pra você ler.
[00:00:35] Então, eu não tô falando de obsidia.
[00:00:36] Eu tô falando de um armazenamento feito para uma agente de inteligência artificial
[00:00:39] consumir.
[00:00:40] Segundo pilar, os agentes.
[00:00:41] Então, skills, skills gerais, skills.
[00:00:43] Não sei o que que é skill, Kel.
[00:00:44] Eu peguei o vídeo agora, assim, não sei o que que é.
[00:00:46] São habilidades, arquivos, markdown, textos, falando, olha, você é o agente que
[00:00:50] faz isso, isso, isso, você pode fazer aquilo, aquilo, aquilo, o outro.
[00:00:53] Que skills são essas?
[00:00:54] Skills gerais do teu negócio?
[00:00:56] Skills estratégicas pro dono do negócio, pro empresário.
[00:00:58] Que que é uma skill estratégica?
[00:00:59] Uma skill de CEO, uma skill de CFO, uma skill que ajuda ele na estratégia, no planejamento,
[00:01:02] na parte tática, no análise de dados, identificação de padrões, problemas e tudo mais.
[00:01:07] Skills por setor.
[00:01:08] Isso mesmo.
[00:01:09] Por setor.
[00:01:10] Skills do setor financeiro.
[00:01:11] Skills pra conciliação bancária.
[00:01:13] Skills que se integram, por exemplo, com conta azul, que sabe se integrar com conta
[00:01:16] azul, que sabe se integrar com iPad pra emissão de nota fiscal automática, com
[00:01:19] RB.
[00:01:20] Quantos setores você tiver, você vai ter que ter skills definidas pra cada setor.
[00:01:24] E aí, a gente entra em modelos.
[00:01:25] Qual é o modelo que faz mais sentido pra você?
[00:01:28] Associação assistentes que você usa, OpenCloud, PepeClip, Previve, ferramentas agênticas,
[00:01:32] integrações, por exemplo, com as appis aqui que eu falei, e o terceiro pilar mais importante,
[00:01:35] o dono do negócio.
[00:01:36] Então, nesse vídeo aqui, eu vou mostrar pra você todo esse playbook.
[00:01:38] É um playbook que eu tô aí 1 ano e 2 meses aqui no YouTube, falando pra vocês
[00:01:41] sobre infraestrutura de crescimento com IA, e eu tô implementando no meu negócio.
[00:01:44] E aí, a TV mudando drasticamente.
[00:01:46] E agora, em 2026, cara, tá assustador do que dá ou não pra fazer como a IA.
[00:01:50] No começo do meu canal, eu falava pros empreendedores, falarem assim, ó, cara, vai você ajudar
[00:01:54] o empresário a gerar mais resultado, a trazer mais faturamento, mas mais em mais
[00:01:57] escala pra operação dele.
[00:01:58] Hoje, em 2026, cara, tá assustador, mas o próprio dono do negócio precisa entrar nesse mundo,
[00:02:03] porque se ele não entrar nesse mundo, sabe o que vai acontecer?
[00:02:05] Ele não vai conseguir aplicar.
[00:02:06] Então, pra você que tá me assistindo aí, deixa eu te falar uma coisa.
[00:02:07] Eu tive que enfiar a cabeça, eu sou técnico, logicamente, mas você não precisa ser,
[00:02:11] você só tem que usar no teu dia a dia aplicar e siga esse playbook aqui, porque você
[00:02:15] vai ter clareza do que você tem que fazer.
[00:02:17] Bora começar esse vídeo?
[00:02:18] Vamos lá.
[00:02:19] Ó, pra você que não me conhece, muito prazer.
[00:02:20] Meu nome é Kelvin, eu sou um programador, é esse programador que um dia decidi
[00:02:23] de empreender, montei a minha primeira empresa aos 22 anos, hoje eu tô com 34,
[00:02:26] a General Plains, que é o main short tech do Mercado Seguros, hoje ela é uma das
[00:02:28] principais short techs do Brasil, vendi 50.1% dela pro grupo IS, um grupo gigantesco
[00:02:33] também em 2022 e eu fiz o meu exit no ano passado.
[00:02:35] Hoje, eu tô à frente da acelera 360.
[00:02:37] Pra você que não conhece a acelera, ela nasceu sendo um ecossistema voltado
[00:02:40] para ajudar empreendedores a empreender coerar.
[00:02:42] E hoje, nós estamos ajudando empresários e empresas a fazer essa
[00:02:45] transformação digital, ajudando eles a criar a própria infraestrutura
[00:02:48] de crescimento com inteligência artificial.
[00:02:49] Se você quiser conhecer mais sobre a acelera, te convido a participar do
[00:02:52] nosso workshop, que vai ser prático no dia 30 do 5.
[00:02:55] Nós vamos fazer um workshop onde eu vou ensinar vocês o passo a passo de
[00:02:58] como implementar a IA no dia a dia e ter escala no processo.
[00:03:01] É isso que você vai aprender, você vai aprender a aplicar a IA e gerar resultado real.
[00:03:03] Vou começar pelo dono do negócio.
[00:03:05] Que é alguém, por que que o dono?
[00:03:07] Cara, eu quero terceirizar, por que que o dono tem que fazer?
[00:03:09] Vou explicar meu caso prático pra vocês, mas qual que é o grande ponto, tá?
[00:03:13] O dono, hoje, o que que ele fala?
[00:03:14] Ele fala, cara, a gente tem que usar AI first, ele consome cursos sobre Open Cloud,
[00:03:19] sobre Cloud, ele vai comprando mentorias, ele vai comprando ferramentas e ele vai
[00:03:24] falar assim, cara, eu preciso de tudo isso, ele não consome, né?
[00:03:26] Logicamente ele fica perdido e ele não consegue fazer, ele não consegue aplicar.
[00:03:30] Aí ele chega pra uma agência de IA ou pra uma consultoria ou pra um funcionário
[00:03:34] dele e fala, cara, precisamos usar IA, precisamos implementar IA,
[00:03:37] precisamos ser uma empresa AI first.
[00:03:39] Só que, só que neste modelo aqui, ele não aplica.
[00:03:45] E ele não aplica o que que acontece?
[00:03:46] Ele quer que as pessoas façam pra ele aquilo que ele não faz no dia a dia.
[00:03:50] Então ele não sabe quais são as fronteiras.
[00:03:51] Esse aqui é o grande problema.
[00:03:53] Por isso que o terceiro pilar é o dono.
[00:03:55] Se você não aplicar, se você não usar, se você não tentar fazer,
[00:03:58] você não vai conseguir terceirizar, porque você não vai saber as fronteiras
[00:04:01] e principalmente o que é possível ou não.
[00:04:02] Aqui o que tá acontecendo muito, que eu tô vendo, são as pessoas que são
[00:04:06] séticas, a IA, nossa, um C, aí matou rolê, séticas, pessoas séticas.
[00:04:11] Fica uma pessoa sética.
[00:04:12] Ah, não, isso não dá pra fazer, isso não funciona.
[00:04:14] Ah, mas gasta tá muito toque, mais isso, mais aquilo, mais aquilo outro.
[00:04:17] Aí que é o grande problema, o sético, o sético, ele trava, ele vai travar.
[00:04:22] Então quando você terceiriza pro seu funcionário, fazer pra você
[00:04:26] o seu resultado, você fica sentado esperando assim,
[00:04:28] cada resultado, o resultado vai ser zero.
[00:04:31] Por que que o resultado vai ser zero?
[00:04:32] Porque ninguém vai estar tão comprometido com o negócio como o dono.
[00:04:36] Então se você contratar uma consultoria,
[00:04:38] contrate uma consultoria que coloque você no processo on the mirror,
[00:04:41] você aprendendo também, participando, executando e mexendo.
[00:04:45] Se você vai contratar qualquer empresa que faça isso, entendo uma coisa.
[00:04:49] Isso não tira sua responsabilidade de aplicar.
[00:04:52] Pra você que tá vendendo pra empresário, coloca ele no processo,
[00:04:55] porque se não, não adianta, o resultado não vai vir.
[00:04:58] Porque a IA é nichada, a IA é verticalizada, e você vai entender isso agora.
[00:05:01] Ó, já dá o seu like nesse vídeo, comenta aqui também,
[00:05:03] e se o conteúdo for bom, como é, compartilha, me ajuda a crescer,
[00:05:06] pô, tô crescendo, 22 mil seguidores tem que crescer mais.
[00:05:08] Qual que é o cenário?
[00:05:09] O cenário é o seguinte, precisamos ser AI first.
[00:05:12] Deixa eu entender as fronteiras e usar no meu dia a dia.
[00:05:16] Pois que eu fiz. Primeira coisa, cara, o que dá ou não pra fazer?
[00:05:19] Porque eu pergunto pro programador, ele fala que não serve pra nada.
[00:05:21] Que isso já, não, mas ela pode ir com ruim e tudo quebrar.
[00:05:24] Eu pergunto para as pessoas, pessoas dizem que isso não dá pra fazer ainda,
[00:05:26] e a não é inteligente, quer saber?
[00:05:27] Nenhum nem outro. Deixa eu usar, eu tenho um dia a dia,
[00:05:30] eu tenho muitas tarefas, eu vou começar a colocar elas pra rodar.
[00:05:33] Então o que comecei a fazer? Eu uso, aí não funciona, aí eu ajusto.
[00:05:36] Às vezes eu repasso, uso de novo, não funcionou ainda,
[00:05:38] não tá do jeito que tá, tem que ajustar.
[00:05:40] Opa, cara, esse tem que repasar, eu ajusto e vim direto.
[00:05:42] Falta uma perna aqui, aí você ajustou, pode vim direto pra cá,
[00:05:45] pode vim pra cá pro uso.
[00:05:46] E aí vai indo, você tem que usar, isso é um conceito chamado dog food.
[00:05:49] Que é o quê? O cara fala que é comida de cachorro.
[00:05:50] Você tem que comer esse negócio, tem que saber.
[00:05:52] Aquilo que você quer que as pessoas façam, aplica no teu negócio.
[00:05:55] Faz, usa, entendeu?
[00:05:56] Por quê? Porque aqui você vai identificar as fronteiras
[00:05:59] e vai nascer uma visão do que é ou não possível.
[00:06:02] Neste processo você vai criar skills, suas ferramentas próprias e por aí vai.
[00:06:06] Vou dar um exemplo muito besta pra vocês aqui.
[00:06:08] Eu estou gravando este vídeo aqui e eu estava com a IA aqui, ela já gerou.
[00:06:12] Eu estou gerando as tambineios, então isso daqui foi algo que não dá pra fazer.
[00:06:16] A IA não consegue, ela não tem a capacidade de gerar as tambineios pra mim.
[00:06:20] Claro que tem, olha aqui, pra esse vídeo que você está aqui me assistindo,
[00:06:23] eu gerei aqui várias, de infraestrutura, pra papá, no seu que lá, no playbook.
[00:06:26] Precisei codificar, não, eu falo assim pra ela.
[00:06:29] Gere mais quatro opções diferentes.
[00:06:34] Entendeu? Por quê? Porque eu criei uma skill chamada meu YouTube.
[00:06:39] Entendeu? E essa, pera, minha tambineira.
[00:06:41] E essa skill, essa habilidade, ela foi construída.
[00:06:44] Você tem que aprender a fazer isso daqui.
[00:06:46] Calvin, você vai ensinar a fazer isso no chop?
[00:06:48] Vou ensinar vocês a construir skills com o seu dia a dia.
[00:06:50] Mas entenda uma coisa, foca aqui.
[00:06:52] Você entende que isso aqui antes, qual é o processo?
[00:06:54] Vou até ter até um funil aqui pra você entender.
[00:06:57] O meu processo no começo, ou melhor, o meu processo de vendas,
[00:07:00] ele é gigantesco, ao tamanho dele aqui.
[00:07:02] Vou mostrar até pra vocês.
[00:07:04] Esse vídeo no YouTube que você está assistindo,
[00:07:06] ele faz parte do quê?
[00:07:08] Do meu funil.
[00:07:09] Link do ebinário no canal.
[00:07:10] Link do ebinário.
[00:07:11] Clica aqui agora e se inscreva no workshop que vai ter.
[00:07:13] Você vai clicar, você vai preencher um formulário,
[00:07:14] vai preencher uma landing page, tudo bem por aí.
[00:07:16] Vai cair lá dentro do CRM.
[00:07:17] O CRM já foi configurado pela minha IA.
[00:07:19] E você vai seguir, vai estar lá comigo no domingo,
[00:07:21] vai aprender no sábado, no dia 30, vai aprender.
[00:07:23] Eu vou te ensinar.
[00:07:24] E se fizer sentido pra você, lá eu vou te ofertar algo.
[00:07:26] Por quê?
[00:07:27] Porque é uma empresa.
[00:07:28] É isso aqui, um negócio, entender?
[00:07:29] Então, olha que interessante.
[00:07:31] O YouTube pra mim é importante.
[00:07:33] Ele é um gerador de receita.
[00:07:35] Logo, eu tenho que focar nele.
[00:07:36] Ele é um ponto de...
[00:07:38] Pode ser um gargalo.
[00:07:39] E ele tem fluir de forma automática.
[00:07:41] Então, a pessoa que fazia as tambineias,
[00:07:43] o nome dessa funcionária, dessa pessoa,
[00:07:45] chama Thumb Maker.
[00:07:46] Eu pedi pra fazer com IA.
[00:07:47] Ah, não dá pra fazer.
[00:07:48] Não fica tão bom.
[00:07:49] Eu falei, opa.
[00:07:50] Deixa eu ver se não dá pra fazer.
[00:07:51] Por quê?
[00:07:52] Estamos fazendo até vídeo com IA?
[00:07:55] Quem falou que eu não consigo fazer uma tambineia?
[00:07:57] Não tem como.
[00:07:58] Não tem como.
[00:07:59] Eu uso o Cloud.
[00:08:00] Eu uso o Cloud.
[00:08:01] Uma ferramenta principal hoje.
[00:08:02] IA principal ainda tem.
[00:08:03] Eu tenho também a OpenAI.
[00:08:04] Mas a OpenAI é mais meu psicólogo.
[00:08:05] O Cloud mesmo é o que eu uso pra quebrar.
[00:08:07] Conceito.
[00:08:08] Logo, fudi.
[00:08:09] Olha aqui.
[00:08:10] Ah, o que que tá sendo feito?
[00:08:11] Cadê?
[00:08:12] Deixa eu voltar aqui.
[00:08:13] Por quê que tá sendo feito?
[00:08:14] Vou tentar fazer.
[00:08:15] Ah, hoje eu não tenho tempo pra fazer pra você.
[00:08:16] Deixa eu me vir.
[00:08:17] Vou lá.
[00:08:18] Ficou bom.
[00:08:19] Ficou bom, entendeu?
[00:08:20] Quer ver?
[00:08:21] Eu pedi pra ela gerar aqui.
[00:08:22] Cadê?
[00:08:23] Essa aqui não é isso aqui.
[00:08:24] É o Cerebro Brain.
[00:08:25] Aqui, tambineiro.
[00:08:26] Olha lá.
[00:08:27] Olha isso, velho.
[00:08:28] Construi sozinho em 60 dias.
[00:08:30] Entendeu?
[00:08:31] Olha isso.
[00:08:32] Isso aqui é jogo.
[00:08:33] Olha aqui.
[00:08:34] Layout.
[00:08:35] Tá seguindo um padrão, entendeu?
[00:08:36] Uma estratégia.
[00:08:37] Aprendido.
[00:08:38] Então foi nascendo o quê?
[00:08:39] Uma visão.
[00:08:40] Uma visão do que é e do que não é possível.
[00:08:42] O que que é isso?
[00:08:43] Isso aqui começa a dar pra você as extremidades.
[00:08:46] Do que dá ou não pra fazer.
[00:08:48] O que é uma infraestrutura de dia?
[00:08:50] É quando você começa a juntar esses pedaços em um fluxo,
[00:08:54] em um processo,
[00:08:55] em uma infraestrutura própria.
[00:08:57] Pro teu negócio, do teu jeito, do modo como você trabalha.
[00:09:00] E essa infraestrutura própria te dá resultado.
[00:09:03] Te traz mais faturamento.
[00:09:05] É por isso que eu ensino os meus alunos e parceiros
[00:09:07] a mergulhar num processo, a entender o processo
[00:09:09] e saber o que que mexa num ponteiro pros clientes deles.
[00:09:11] Então olha aqui.
[00:09:12] Com a maturidade na IA,
[00:09:13] começa a nascer o quê?
[00:09:14] A necessidade de mapear novos processos.
[00:09:17] Por quê?
[00:09:18] Porque você começa a perceber
[00:09:19] que o jeito que as coisas são feitas
[00:09:21] não serve mais,
[00:09:22] não serve mais desse jeito.
[00:09:24] Você precisa reestruturar dos seus processos.
[00:09:26] E é aqui que nasce o AI First.
[00:09:29] É aqui que nasce.
[00:09:30] Então ele começa a nascer do dono, usando.
[00:09:32] Eu tenho o meu cérebro de A agora.
[00:09:34] Agora que eu comecei a fazer ele.
[00:09:36] Agora que eu comecei a estruturar.
[00:09:37] Pego uma mensagem no...
[00:09:39] Comecei a pegar mensagens no Teams.
[00:09:41] Por quê? Porque o meu Team conversa no Teams.
[00:09:42] Então eu comecei a mapear
[00:09:44] o suporte do cliente, o suporte do aplicativo,
[00:09:46] que é uma empresa de uma consultoria chamada KCG.
[00:09:48] Comecei a protestar.
[00:09:49] Comecei a integrar com o ClickUp,
[00:09:50] pegar a informação do ClickUp,
[00:09:52] que é uma ferramenta que a gente usa,
[00:09:53] que é um SaaS.
[00:09:54] Comecei a pegar as conversas no WhatsApp.
[00:09:56] E comecei a fazer isso como?
[00:09:58] Com integração.
[00:09:59] Você pode fazer como?
[00:10:00] Com código.
[00:10:01] Mas eu não sei codar, Kelby.
[00:10:03] Tenta fazer com o Cloud sem você saber
[00:10:05] escrever uma linha de código.
[00:10:06] Ah, mas vai gerar código funerável.
[00:10:08] Usa pra você de forma interna,
[00:10:10] sem expor pro mundo,
[00:10:11] sem colocar,
[00:10:12] sem expor,
[00:10:13] sem usar seu computador,
[00:10:14] sem dar pros seus funcionários,
[00:10:15] inicialmente, lá ele.
[00:10:16] Começa a você fazendo.
[00:10:18] Integra com N8n,
[00:10:20] Google Drive,
[00:10:21] vai pegando tudo.
[00:10:22] Um processamento.
[00:10:23] Que que é esse processamento?
[00:10:24] Dessa informação que eu peguei.
[00:10:26] Quais são, por exemplo,
[00:10:28] vou pegar aqui o meu cérebro.
[00:10:30] Aqui, vou mostrar esse aqui.
[00:10:32] O que aqui tá resumido pra vocês entender.
[00:10:34] Então, aqui eu tenho um grupo de alunos.
[00:10:36] O que que saiu ali?
[00:10:38] O Felipe, ele tava...
[00:10:40] Falou, o INS, ah não, aqui é resultado.
[00:10:42] Resultado que ele gerar.
[00:10:43] Isso era importante.
[00:10:44] Quais são as celebrações que teve?
[00:10:45] Quais foram as objeções que teve?
[00:10:46] Quais são os questionamentos?
[00:10:47] Por que?
[00:10:48] As principais dúvidas.
[00:10:49] Eu ia lá e automatizava.
[00:10:51] E aí, comecei a fazer.
[00:10:52] Comecei a entender.
[00:10:53] Desalinhamento entre público de
[00:10:55] building public e target real.
[00:10:57] E algo real.
[00:10:58] Como que eu passo para atrair leads no meu lixo?
[00:10:59] Daí, o Kelvin Kleta respondeu.
[00:11:00] Igual eu te falei pra vocês.
[00:11:01] Tá vendo que foi um aprendizado meu
[00:11:03] que eu mandei num grupo no WhatsApp?
[00:11:04] Aí, o que que eu fiz?
[00:11:05] Olha que loucura.
[00:11:06] Eu criei o cérebro aqui, certo?
[00:11:08] Aí, gente, nos agentes,
[00:11:09] eu falei, pô, tem um cérebro
[00:11:10] que tem todo o meu conhecimento.
[00:11:12] Eu tenho um time de customer success,
[00:11:14] de que a experiência é usuária.
[00:11:15] O que que eu fiz?
[00:11:16] Aí, cara, agora que o meu cérebro
[00:11:18] tá criado, vamos expor ele pro mundo.
[00:11:20] Fui lá e falei, pô,
[00:11:22] vou criar um...
[00:11:24] um SDR chatbot.
[00:11:26] Foi, puta, não, não vai ficar legal.
[00:11:28] Então, eu coloquei o meu time de CS
[00:11:30] no Telegram.
[00:11:31] Cadê?
[00:11:32] Como que eu escondo aqui?
[00:11:33] Eu tenho que mostrar só uma partinha.
[00:11:34] Vocês não tinham que mostrar tudo.
[00:11:35] Coloquei no Telegram
[00:11:36] num modelo piloto assistido.
[00:11:38] Num piloto automático.
[00:11:39] Coloquei a CS pra conversar.
[00:11:40] Ela vai lá e fala,
[00:11:41] agora me ajuda a responder,
[00:11:42] a tirar dúvida desse aluno.
[00:11:43] Aí, a dúvida desse aluno
[00:11:44] é com base em quem?
[00:11:45] No que eu já fiz de vídeo,
[00:11:47] de aula, de treinamento e play-by.
[00:11:49] Entendeu?
[00:11:50] Então, olha que processo interessante.
[00:11:51] O Open Cloud pra mim,
[00:11:53] pra minha empresa,
[00:11:54] não é o meu assistente pessoal.
[00:11:56] Eu tenho um específico pra mim.
[00:11:58] Eu tenho um da empresa.
[00:12:00] O da empresa que me gera Marroy.
[00:12:01] Entendeu?
[00:12:02] Então, como que eu cheguei nesse nível?
[00:12:04] Porque eu aprendi, entendi.
[00:12:06] E aí, eu fui aprendendo ferramentas,
[00:12:08] o próprio SAS,
[00:12:09] consegui criar...
[00:12:10] Você vai criar no SAS,
[00:12:11] vai entender nas fronteiras.
[00:12:12] Por exemplo, esse daqui
[00:12:13] é um que a gente tá desenvolvendo aqui, né?
[00:12:15] Esse aqui vai ser liberado
[00:12:16] pros nossos alunos.
[00:12:17] Que é um agente,
[00:12:18] um bound bem específico mesmo,
[00:12:20] com base de conhecimento.
[00:12:22] Ele já vem com tratamento de objeção,
[00:12:24] persuasão.
[00:12:25] Isso aqui, gente, foi gerado com IA.
[00:12:27] O design foi gerado com IA.
[00:12:29] Eu usei uma ferramenta chamada Open Design.
[00:12:31] E como eu consegui fazer isso?
[00:12:33] Geralmente é um protótipo chamado Open Design.
[00:12:35] Eu montei esse protótipo.
[00:12:37] Tá vendo?
[00:12:38] Eu montei esse protótipo inteiro.
[00:12:39] Aqui já é uma próxima versão dele,
[00:12:40] que a gente tá fazendo catálogo.
[00:12:41] Eu montei um protótipo navegável.
[00:12:43] Tá vendo?
[00:12:44] Como que ia funcionar o cérebro dele.
[00:12:45] Então, eu fui vindo com meu conhecimento
[00:12:46] e fui pedindo, pedindo, pedindo, pedindo.
[00:12:47] Ora que ele montou esse designer,
[00:12:49] eu falei, nossa, é isso.
[00:12:50] Eu joguei, comecei a fazer a construção
[00:12:52] da ferramenta e desenvolvimento.
[00:12:54] Vocês estão entendendo o nível?
[00:12:57] E eu só consigo fazer isso como?
[00:12:59] Porque eu me propus a fazer uma implementação
[00:13:02] AI-first no meu negócio.
[00:13:04] Então, tudo eu penso agora,
[00:13:05] é o seguinte, cara, como que eu faço cunhar?
[00:13:07] Dá pra gente estar vindo cunhar?
[00:13:08] Como que eu faço?
[00:13:09] Estudo, entendo?
[00:13:10] Aí depois eu entendi.
[00:13:11] Timmy, tá aqui, ó.
[00:13:12] Começa a expandir.
[00:13:13] Você vai usar essa skill?
[00:13:14] Você vai usar isso?
[00:13:15] Aí depois a gente entra aqui, ó.
[00:13:16] Essa maturidade de organizar os processos.
[00:13:18] Então, vamos pegar um exemplo muito prático
[00:13:19] que eu gostei pra vocês esses soltos, né?
[00:13:21] Vamos pegar um exemplo muito prático.
[00:13:23] Não vamos ficar falando de automação,
[00:13:25] de CRM, não.
[00:13:26] Vamos fazer o seguinte, ó.
[00:13:27] Isso aqui é uma empresa, certo?
[00:13:28] Isso aqui é uma empresa e isso aqui é um CMPJ.
[00:13:30] O CMPJ?
[00:13:31] O que é um CMPJ, gente?
[00:13:32] É uma máquina de dinheiro.
[00:13:34] Então, tem que tá dinheiro.
[00:13:36] Quanto...
[00:13:37] E como funciona o dinheiro que uma empresa faz?
[00:13:39] A gente tem lá o quanto a gente fatura.
[00:13:40] É aquilo que a gente vende
[00:13:41] e o quanto sobra no final do mês.
[00:13:44] Quanto sobra no caixa.
[00:13:46] Depois de tudo pago.
[00:13:48] Então, aqui, o empresário ganha dinheiro aqui.
[00:13:50] Isso aqui é onde o empresário ganha dinheiro.
[00:13:52] Aqui é onde entra o dinheiro.
[00:13:53] No meio do processo vem saindo o dinheiro.
[00:13:55] É o que sobra tá aqui.
[00:13:56] Então, o jogo da infraestrutura.
[00:13:58] Infraestrutura, dia,
[00:14:01] é usar inteligência artificial
[00:14:04] para aumentar mais o faturamento.
[00:14:08] Essa é a primeira opção.
[00:14:09] Prazer mais dinheiro.
[00:14:10] Como que eu aumento o faturamento?
[00:14:12] Vendendo mais.
[00:14:14] Vendendo mais.
[00:14:15] E como que eu vendo mais com o IA?
[00:14:16] Melhorando os meus funis de venda.
[00:14:18] Fazendo, criando uma agência de marketing interno
[00:14:20] tudo com a gente de IA.
[00:14:21] Tem diversas opções, tá?
[00:14:23] Faturando mais.
[00:14:25] Ou aumentando a margem.
[00:14:27] Mais margem.
[00:14:28] O que é mais margem, gente?
[00:14:30] É você diminuir custos operacionais com o IA.
[00:14:32] O que eu fiz com o YouTube
[00:14:35] do meu funil do meu tabineiro
[00:14:37] é aumentar a margem.
[00:14:38] Por que?
[00:14:39] Porque eu não preciso pagar mais pra alguém fazer.
[00:14:40] O que eu faço de edição de vídeo?
[00:14:42] É aumentar a margem.
[00:14:43] As landbases do construo, as automações do CRM,
[00:14:45] geração de...
[00:14:47] Ai, esqueci o termo agora.
[00:14:49] Em meio-margem?
[00:14:50] É aumentar a margem.
[00:14:51] Eu vou aumentando a margem porque
[00:14:52] eu diminuo o custo operacional.
[00:14:54] Então, se eu diminuo o custo operacional,
[00:14:55] eu aumento a margem.
[00:14:56] Então, se eu trago mais produtividade
[00:14:58] para o time,
[00:14:59] eu também aumento a margem
[00:15:00] porque eu faço mais com o menu, gente.
[00:15:02] Ou com a quantidade igual de pessoas.
[00:15:04] E a outra possibilidade que a gente tem aqui
[00:15:06] é trazer escala para o negócio.
[00:15:08] Que o negócio seja escalável.
[00:15:10] Escala.
[00:15:11] Como assim mais escala?
[00:15:12] Vou dar um exemplo para vocês.
[00:15:13] Uma contabilidade.
[00:15:14] Uma contabilidade geralmente
[00:15:15] ela atende de forma regional.
[00:15:16] Agora, se eu estruturo o processo da contabilidade
[00:15:18] de uma forma que ele fique eficiente,
[00:15:20] com e a, a parte...
[00:15:22] as estruturações de demonstrativos,
[00:15:24] integração com o sistema de com-e-r-p,
[00:15:26] automação de...
[00:15:27] de contas a pagar, contas a receber.
[00:15:29] Isso não faz a contabilidade.
[00:15:30] Emissão de nota fiscal,
[00:15:31] se eu estruturo isso,
[00:15:32] o que eu faço?
[00:15:33] Eu consigo transformar a minha empresa em escalável.
[00:15:35] Por que?
[00:15:36] Porque eu não preciso mais atender
[00:15:37] a minha região.
[00:15:38] Eu posso atender a contabilidade
[00:15:39] que isso é colocada
[00:15:40] e eu começar a atender clientes
[00:15:41] em qualquer cidade do Brasil.
[00:15:42] Entendeu?
[00:15:43] Montando canal de aquisição para isso.
[00:15:44] Então, com a infraestrutura de A,
[00:15:46] é uma forma de a gente unificar a IA,
[00:15:48] mais o processo da empresa,
[00:15:49] para gerar mais faturamento,
[00:15:50] mais margem, mais escala.
[00:15:51] Entendeu?
[00:15:52] Eu falo que a infraestrutura
[00:15:53] é a intersecção entre
[00:15:54] inteligência artificial,
[00:15:56] processos e estratégia.
[00:15:59] Por que?
[00:16:00] Porque tem que ter que ter que ter
[00:16:01] que ter que ter que ter que ter
[00:16:02] que ter que ter que ter que ter
[00:16:03] que ter que ter que ter que ter
[00:16:04] que ter que ter que ter que ter
[00:16:05] que ter que ter que ter que ter que
[00:16:06] ter que ter que ter que ter que ter
[00:16:07] que ter que ter que ter que ter
[00:16:08] que ter que ter que ter que ter
[00:16:09] que ter que ter que ter que ter
[00:16:10] que ter que ter que ter que ter
[00:16:11] que ter que ter que ter que ter
[00:16:12] que ter que ter que ter que ter
[00:16:13] que ter que ter que ter que ter
[00:16:14] que ter que ter que ter que ter
[00:16:15] que ter que ter que ter que ter
[00:16:16] que ter que ter que ter que ter
[00:16:17] que ter que ter que ter que ter
[00:16:18] que ter que ter que ter que ter
[00:16:19] que ter que ter que ter que ter
[00:16:20] que ter que ter que ter que ter
[00:16:21] que ter que ter que ter que ter
[00:16:22] que ter que ter que ter que ter
[00:16:23] que ter que ter que ter que ter
[00:16:24] que ter que ter que ter que
[00:16:25] ter que ter que ter que ter que
[00:16:26] ter que ter que ter que ter que
[00:16:27] ter que ter que ter que ter que
[00:16:28] que são desse vídeo. Ele vai custar 47 reais. Vai ser uma tarde inteira, das uma da tarde,
[00:16:32] às oito da noite, onde eu vou mostrar pra você como você vai configurar o seu Open Cloud,
[00:16:36] como você vai mexer em Cloud, como você vai criar SQL, como você vai mapear o seu processo.
[00:16:39] Eu vou mostrar o meu processo mapeado e o que eu estou fazendo. Você vai sair de lá com
[00:16:43] clareza de como você vai gerar resultado real com o infraestrutura de A. Como você vai montar
[00:16:46] sua própria infra melhor? Como você vai montar sua própria infra? Então, deixa eu mostrar
[00:16:50] aqui pra vocês, isso aqui é o meu negócio. Então, o Instagram pra mim é um canal
[00:16:54] de aquisição, o YouTube é um canal de aquisição, eu rodo o tráfico do PAB e isso aqui são meus
[00:16:58] funis. No final das forças, o que acontece? Eu tenho a acelera 360, eu gravo o vídeo no YouTube,
[00:17:03] eu posto no Instagram, vocês clicam em algum link no webinário, no workshop, em uma aplicação
[00:17:08] direta, isso cai numa landing page. A hora que cai nessa landing page, você se escreve,
[00:17:12] cai no meu CRM, cai no meu CRM, é o meu time comercial, entra em contato com vocês ou vocês
[00:17:16] caem num vídeo, entra num processo de workshop onde eu gero resultado, mostro pra vocês
[00:17:21] e no final eu faço uma oferta para quem faz sentido, entra para dentro da escola ou entra
[00:17:25] para dentro da acelera 360. Então, esse é o meu processo. Agora, onde eu uso IA? O que que eu fiz?
[00:17:30] Vima piano. Todo dia eu tenho que processo de postar DM, mais Reels, Reels com lead magnético.
[00:17:35] Dia a dia, dia a dia não. Store com questions and answers, perguntas e respostas, caixinha de
[00:17:39] pergunta. Caixinha de pergunta, resposta, respondeu, pergunta fake, mais CTA webinário, beleza?
[00:17:43] E link do evento na bio, link do ebinário na bio do Instagram e perfil. Isso aqui é um canal
[00:17:48] que eu faço no dia a dia, você se conecta comigo e aí vocês clicam no ebinário, no link do
[00:17:54] Instagram e no canal ou na ebinário de vídeo. Eds, eu rodo criativa, vou testando criativa,
[00:18:02] vou criando criativa estática, via vídeo e tudo mais e aí tudo isso aqui joga sempre
[00:18:05] para uma página, essa página tem uma pop-up, ela tem um check-out, página, vou mostrar
[00:18:09] aqui pra vocês, página, pop-up, que essa é uma página, a página tem pop-up e garantir
[00:18:14] o preenche disso aqui, clique em check-out, cai no check-out, o check-out é o limpo de pagamento,
[00:18:19] paga, aí entra, recebe, cai no grupo do WhatsApp e por aí vai. Beleza, você clicou aqui, preenche
[00:18:25] os dados e não pagou, a gente tem o processo de trabalhar, tem o e-mail, post pop-up, garantir
[00:18:30] seu ingresso, boas vidas, sequência de follow-up, o que é follow-up? Eu vou ficar enchendo
[00:18:34] o tosac, e aí vai vim, vai vim, vamos, vamos, o mesmo do WhatsApp. Tudo isso aqui é
[00:18:38] um processo, isso aqui começou sendo feito 100% manual, eu só tinha um CRM, um número
[00:18:43] de WhatsApp, e eu fui aprendendo, e aí eu comecei a implementar, falei, cara, capa do YouTube,
[00:18:49] cara demorava dois dias pra fazer, e a, landing page, cada landing page que eu fazia,
[00:18:53] pagava de 800 a 1500 reais, comecei a fazer, tudo isso aqui é feito com e-mail, tudo
[00:18:58] feito com e-mail, no meu estilo, a nova economia da e-mail, eu tenho outros aqui, a última
[00:19:03] chamada, a cena da partners e por aí vai, então várias landing pages, cada uma com
[00:19:08] a pintura, cada uma com a sua copy, com as imagens, e por aí vai, isso aqui custava de 800 a 1500,
[00:19:15] como que eu faço isso agora com e-mail? E agora, consigo fazer landing page com e-mail, consigo
[00:19:20] fazer copy com e-mail, consigo fazer vídeo com e-mail, consigo fazer criativo com e-mail,
[00:19:23] consigo fazer automação com e-mail, tá, o que que tá faltando? O processo, o processo,
[00:19:28] então cadê meu mouse, gente, perdi que, o processo, qual que é o processo? O processo é, o
[00:19:33] que é ouvir, gravar um vídeo com YouTube, o que é ouvir mesmo em Geratumbnaio,
[00:19:36] eu publiquei no YouTube, eu tenho uma automação que pega a transcrição do vídeo e joga no
[00:19:42] cérebro, o cérebro aprende, aí eu tenho uma outra automação que gera os e-mails para fazer a
[00:19:47] notificação para as pessoas falando, olha, sai um novo vídeo no YouTube, eu tenho uma outra que
[00:19:51] gera copy para fazer postagem no LinkedIn, que é, mas eu não ver se é postar no LinkedIn,
[00:19:55] é porque o LinkedIn não dá retorno, então ela está desativada, mas agora, como eu comecei a
[00:19:59] falar para B2B diretamente, de novo, se você é empresário, todo de empresa,
[00:20:02] a gente vai reactivar e vai começar a abrir outros canais de aquisição, então aí isso vai entrando,
[00:20:08] vai entrando para fazer, vou dar um exemplo, a gente usa o ContaZoo aqui, o funcionário manda uma
[00:20:13] despesa para reembolsa o Notizap e a gente já tipifica, entende aquele tipo de despesa e lança no
[00:20:18] ContaZoo, a hora que o faça é muito determinada a venda, que o pagamento não é feito pela
[00:20:23] QFI, quebra a emissão da nota fiscal, a gente tinha um processo de ficar emitindo nota
[00:20:27] fiscal, realmente, a gente criou um agente, integrou com a Sped, que é um SaaS que emitiu
[00:20:32] nota fiscal, configurada em tudo mais, eles pedem para um agente e ele gera nota fiscal e já
[00:20:37] faz o despapo direto, e isso tira o que? Peso operacional, aí a inteligência que só traz
[00:20:43] resultado, aí o Open Cloud traz resultado, aí o Cloud traz resultado, então assim, se você
[00:20:48] acha que pagar 500 reais no Cloud é caro, entendo uma coisa, hoje eu tenho uma custa de
[00:20:52] aproximadamente uns 8 mil e 8 mil e pouco por mês de Cloud, porque eu coloco o Cloud Max
[00:20:57] que é o que diz na mão de cada colaborador, dos que fazem sentido, logicamente, e eles
[00:21:01] usam o Cloud com as skills do meu negócio, e aí vai aparecendo outros problemas, e esses
[00:21:05] problemas você tem que ir resolvendo, por isso que o dono, hoje, ele tem que estar usando,
[00:21:12] porque aí você vai conseguir mapear o seu processo, você vai conseguir mexer no seu
[00:21:15] processo, e você, além de dono, você vira um papel que chama evangelizador, você vai
[00:21:19] evangelizar isso do seu procedimento da tua empresa. Quer ouvir, mas o Cloud, se
[00:21:24] você vai fechar e você fica caro, Tolkien, e se acontecer isso, tendo uma coisa, esse não
[00:21:28] é o momento de pensar desse jeito, eles não vão fechar, eles não vão quebrar, pode
[00:21:32] acontecer, pode, mas é uma possibilidade remota, porque a gente está num mundo
[00:21:35] capitalista, se eles fecharem, tem outros para substituir, tem OpenAI, e outros, eles
[00:21:38] estão numa briga agora de quem vai fazer, quem vai dominar o mercado, isso nos
[00:21:41] beneficia, porque o Tolkien vai baratear, entendeu? Ah, e se ficar caro, tem
[00:21:45] opções de montar LLMs gratuitas, tem o Open Cloud, você pode subir o
[00:21:49] negócio, e qualquer outra LLM, isso não entra no mérito, foca hoje em gerar
[00:21:54] resultado para o seu negócio, para que fica consumindo cursos e cursos e cursos
[00:21:58] no seu canal mais, e começa a seguir um processo que tem que ser executado,
[00:22:01] começa a dar cadência na implementação, na aplicação, em consumir e fazer,
[00:22:05] quer ouvir, meu dia está lotado, não consigo, aí que você tem que fazer
[00:22:09] mesmo, por quê? Porque se você está até a boca de trabalho, tem um problema,
[00:22:14] tem um problema sério, tem muita coisa que você faz de forma manual, cara,
[00:22:18] você está no meu e-mail, eu jogo e-mail para dentro do meu cérebro,
[00:22:21] e alguns e-mails até respondo automático, por quê? Porque eu preciso liberar
[00:22:24] tempo para fazer isso aqui, porque isso aqui gera resultado para mim, isso aqui
[00:22:27] gera resultado, isso aqui gera resultado de autoridade, isso aqui gera
[00:22:31] leads, isso aqui, isso aqui eu digo, criar vídeo aqui no YouTube, gera
[00:22:35] networking, conheço pessoas que eu jamais acessaria de forma tão simples
[00:22:39] quanto o YouTube, porque elas me chamam para me conhecer, conheci as
[00:22:42] minhas empresas, conheci o meu trabalho, elas compartilham da visão
[00:22:45] comigo, e isso vai gerando a roda, vai fazendo a coisa crescer, é
[00:22:48] um negócio de crescer, é um negócio tão rápido, em 2025 com a acelera,
[00:22:52] a gente, porra, basicamente ele bateu 2,7 milhões no primeiro ano de
[00:22:54] operação, entende? Então, mais uma vez, usem e-a, abusem da e-a,
[00:22:59] usem e-a, abusem no seu dia a dia, e vamos para cima, que em
[00:23:02] 2020 você está só começando, o mercado está louco, está doido, é isso,
[00:23:05] já manda esse vídeo aqui para alguém, já dá o seu like aqui,
[00:23:07] então é isso, esse vídeo foi sobre isso, espero que você tenha gostado,
[00:23:09] e vamos com tudo, ah, mais uma vez, o workshop, que era você no
[00:23:12] workshop, vai ser de a 30, vem, um filho de fora, não vai perder, vamos.