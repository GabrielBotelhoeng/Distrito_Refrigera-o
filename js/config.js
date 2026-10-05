/* =========================================================
   CONFIGURAÇÃO — troque os dados aqui, em um só lugar.
   Enquanto o valor estiver entre [colchetes], a página mantém
   o texto de placeholder visível.
   ========================================================= */
const CONFIG = {
  // Ao trocar o número, mude também "telefone" abaixo, os 2 data-cfg="telefone" e o JSON-LD do index.html.
  WHATSAPP_NUMBER: '5561982669555',           // formato 55 + DDD + número, só dígitos. Ex.: 5561912345678
  anosExperiencia: '4 anos',                 // ex.: '12 anos'
  garantia: '3 meses',                       // ex.: '90 dias'
  cidadeRegiao: 'todo o Distrito Federal',   // completa "Atendimento em ..." e "Atendemos ..."
  telefone: '(61) 98266-9555',              // como aparece na tela
  email: 'distritorefrigeracao@gmail.com',
  // Loja (o foco é o atendimento a domicílio). Vira link do Google Maps no rodapé; vazio, o link some.
  // O \n quebra a linha no site: rua na 1ª linha, bairro/cidade/CEP na 2ª.
  endereco: 'QE 40, Conjunto R, Lote 26, Loja 2\nGuará II, Brasília – DF, 71070-182',
  // Respostas do FAQ. Os logos do Pix e das bandeiras ficam no index.html (seção Perguntas).
  formasPagamento: 'Pix, dinheiro e cartão de crédito/débito. Aceitamos todas as bandeiras.',
  taxaVisita: 'O orçamento é totalmente gratuito. Cobramos apenas a taxa de visita, calculada pela distância (em km) até o seu endereço. Mande sua localização no WhatsApp para saber o valor.',
  // Redes sociais: a linha "Redes" do rodapé só aparece quando houver pelo menos um link.
  instagramUrl: '',                          // Instagram em criação. Ex.: 'https://instagram.com/distritorefrigeracao'
  facebookUrl: '',
  // Depoimentos REAIS de clientes. A seção só aparece no site quando pelo menos um estiver preenchido.
  depoimentos: [
    { frase: 'Minha experiência com a Distrito Refrigeração foi excelente! A equipe veio até minha casa, avaliou meu freezer e fez o conserto com muito cuidado e rapidez. O freezer voltou a funcionar perfeitamente. Serviço bem feito e profissionais muito atenciosos!', nome: 'João Silva', local: 'Taguatinga/DF', equipamento: 'Freezer' },
    { frase: 'Minha geladeira estava apresentando problemas e eu já estava preocupada com os alimentos. Entrei em contato com a equipe e o atendimento foi muito rápido. O técnico identificou o problema e realizou o reparo com muita eficiência. Recomendo o serviço!', nome: 'Mariana Oliveira', local: 'Águas Claras/DF', equipamento: 'Geladeira' },
    { frase: 'Minha máquina de lavar estava com defeito e precisava de um reparo. A equipe veio até minha casa, identificou o problema e fez o serviço com muita atenção. Ficou funcionando perfeitamente novamente. Profissionais muito bons e serviço de qualidade!', nome: 'Carlos Santos', local: 'Ceilândia/DF', equipamento: 'Máquina de lavar' },
    { frase: 'Chamei a Distrito Refrigeração para verificar meu freezer que não estava funcionando corretamente. O atendimento foi rápido e o técnico explicou tudo antes de realizar o serviço. O problema foi resolvido e o freezer voltou a funcionar perfeitamente. Recomendo muito!', nome: 'Fernanda Costa', local: 'Sobradinho/DF', equipamento: 'Freezer' }
  ]
};

/* Mensagens pré-preenchidas (seção 14 da copy) */
const WA_MESSAGES = {
  geral: 'Olá! Vim pelo site da Distrito Refrigeração e gostaria de um orçamento.',
  geladeira: 'Olá! Minha geladeira/freezer não está gelando direito. Podemos agendar uma avaliação?',
  lavar: 'Olá! Preciso consertar minha máquina de lavar/tanquinho. Podemos agendar?',
  comercial: 'Olá! Preciso de manutenção em equipamento de refrigeração comercial. Podem me atender?',
  filtro: 'Olá! Preciso de manutenção no meu filtro/purificador de água. Podem me atender?'
};
