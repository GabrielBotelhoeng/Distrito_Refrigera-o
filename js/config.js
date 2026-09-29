/* =========================================================
   CONFIGURAÇÃO — troque os dados aqui, em um só lugar.
   Enquanto o valor estiver entre [colchetes], a página mantém
   o texto de placeholder visível.
   ========================================================= */
const CONFIG = {
  WHATSAPP_NUMBER: '5561981004337',           // formato 55 + DDD + número, só dígitos. Ex.: 5561912345678
  anosExperiencia: '[X anos]',               // ex.: '12 anos'
  garantia: '3 meses',                       // ex.: '90 dias'
  cidadeRegiao: 'todo o Distrito Federal',   // completa "Atendimento em ..." e "Atendemos ..."
  telefone: '(61) 98100-4337',              // como aparece na tela
  email: 'contato@distritorefrigeracao.com.br',
  endereco: '[inserir]',
  // Respostas do FAQ. Os logos do Pix e das bandeiras ficam no index.html (seção Perguntas).
  formasPagamento: 'Pix, dinheiro e cartão de crédito/débito. Aceitamos todas as bandeiras.',
  taxaVisita: 'O orçamento é totalmente gratuito. Cobramos apenas a taxa de visita, calculada pela distância (em km) até o seu endereço. Mande sua localização no WhatsApp para saber o valor.',
  instagramUrl: '',                          // ex.: 'https://instagram.com/distritorefrigeracao'
  facebookUrl: '',
  // Depoimentos REAIS de clientes. A seção só aparece no site quando pelo menos um estiver preenchido.
  depoimentos: [
    { frase: '[frase curta do cliente]', nome: '[nome]', local: '[cidade/bairro]', equipamento: '[equipamento consertado]' },
    { frase: '[frase curta do cliente]', nome: '[nome]', local: '[cidade/bairro]', equipamento: '[equipamento consertado]' },
    { frase: '[frase curta do cliente]', nome: '[nome]', local: '[cidade/bairro]', equipamento: '[equipamento consertado]' }
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
