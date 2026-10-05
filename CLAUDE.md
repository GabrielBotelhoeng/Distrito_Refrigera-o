# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projeto

Landing page da **Distrito Refrigeração** (assistência técnica em refrigeração e eletrodomésticos, DF).
Objetivo único: converter visitante em contato pelo **WhatsApp**. Responder sempre em português.

- HTML, CSS e JS puros, **sem build e sem framework**. Não há `package.json`, lint nem testes automatizados.
- Publicado no GitHub Pages a cada push em `main` (leva ~1 min):
  https://gabrielbotelhoeng.github.io/Distrito_Refrigera-o/
- Repositório git **próprio desta pasta** (`GabrielBotelhoeng/Distrito_Refrigera-o`). A pasta `Desktop` acima
  tem OUTRO repositório git — rode git sempre de dentro de `Distrito_Refrigeraçao/`.
- Confirmar com o usuário antes de `git push` (o push publica no ar).

## Estrutura

```
index.html      → só o HTML das seções
css/style.css   → todo o CSS; tokens do design system em :root
js/config.js    → DADOS DO CLIENTE (CONFIG) e mensagens do WhatsApp (WA_MESSAGES)
js/main.js      → comportamento: preenche dados do CONFIG, monta links wa.me, menu, vídeo, animações
assets/         → vídeo do Hero, fotos, logo, favicon, logos das marcas e de pagamento (créditos em assets/README.md)
assets/raw/     → originais e versões antigas (IA); fora do git (.gitignore)
```

Detalhes que quebram fácil:
- `config.js` precisa carregar **antes** de `main.js` (usa `const CONFIG` global).
- Caminhos de imagem dentro do CSS são relativos a `css/` → usar `url("../assets/...")`.
- O único JS embutido é a linha no `<head>` que adiciona a classe `js` (evita "piscar" das animações de entrada).
- Placeholders: elementos com `data-cfg="chave"` recebem o valor do CONFIG; valores entre `[colchetes]`
  são tratados como não preenchidos e o texto de placeholder continua visível.
- Botões de WhatsApp usam `data-wa="geral|geladeira|comercial|lavar|filtro"`; o link é montado no `main.js`.
- Depoimentos: a seção `#depoimentos` fica `hidden` até existir um depoimento real em `CONFIG.depoimentos`.
- Redes sociais: a linha "Redes" do rodapé fica `hidden` até existir `instagramUrl` ou `facebookUrl`.
  `[hidden]` tem `display: none !important` no CSS porque as linhas do rodapé usam `display: grid`.
- `data-fallback`: texto mostrado quando o valor do CONFIG está vazio ou entre colchetes.
- Endereço: `CONFIG.endereco` usa `\n` para quebrar a linha (classe `.address`, `white-space: pre-line`) e
  `data-cfg-maps` vira link do Google Maps; sem endereço, o link sai e fica só "Atendimento a domicílio".

## Decisões do cliente (não reverter)

- **Não trabalha com ar-condicionado.** Nada de AC no site (texto, imagem, marca, mensagem).
- **Não faz mais fogões.** No lugar entrou "Filtros e Purificadores de Água" (purificador elétrico de casa e
  filtros industriais de escolas/empresas).
- Voz de **empresa com equipe** ("a gente", "nós"), não de técnico autônomo.
- Atende **todo o Distrito Federal** (`CONFIG.cidadeRegiao`); fora do DF, o valor é combinado com o técnico
  antes. Por isso saiu o modelo "cidade + cidades vizinhas" do config.
- Orçamento grátis; só a taxa de visita é cobrada, calculada pela distância (km) até o cliente.
- Foco em **atendimento a domicílio**: o cliente manda mensagem, explica o problema e a equipe vai até ele.
  A loja (QE 40, Conjunto R, Lote 26, Loja 2 – Guará II, CEP 71070-182 conferido no ViaCEP) aparece só no
  rodapé, sempre acompanhada da linha "Atendimento a domicílio".
- Peças: a equipe mostra o preço da peça original e da paralela, com vantagens e desvantagens, e o cliente
  escolhe. Faz instalação e manutenção preventiva de todos os equipamentos e atende urgência.
- **Depoimentos só reais.** Não escrever depoimentos fictícios, mesmo a pedido (seria propaganda enganosa,
  CDC art. 37). Ajudar a coletar os reais com autorização do cliente.
- O **mesmo vídeo** no Hero para celular e PC.

## Imagens: só reais

- O usuário rejeitou vídeo/imagens gerados por IA (Higgsfield) por parecerem artificiais.
- Usar fotos/filmagens reais com licença de uso comercial. Fonte usada: **Pexels** (as páginas de busca
  funcionam com curl + header `Accept-Language`; Unsplash bloqueia robô). Registrar créditos em `assets/README.md`.
- **Não usar** imagens do Pinterest nem material de fabricantes (ex.: propaganda da HKN), nem "editar no
  Higgsfield" para disfarçar — é imagem de terceiro. O ideal é foto do próprio cliente.
- Evitar pessoas identificáveis e crianças; preferir equipamentos e mãos.
- Faixa de marcas: logos oficiais em SVG (Wikimedia Commons; Fischer veio do fischer.com.br — o
  "Fischer logo.svg" do Commons é de esqui). Continental foi removida (sem logo da marca de eletrodomésticos).
  Abaixo da faixa há o aviso "assistência técnica independente, sem vínculo com os fabricantes".
- Selos de pagamento no FAQ (`assets/brand/pagamento/`): Pix aparece só como **símbolo**, e o manual da
  marca Pix proíbe bandeira mais alta que ele e a palavra "Pix" escrita ao lado em outra fonte
  (regras completas em `assets/README.md`).

## Design system e acessibilidade

- Azul domina (`--blue-500 #0047BB` e tons até `#000E25`); cinza gelo `#E5E5E5`; fonte Sora.
- Laranja só em ação/urgência: `#D93A0F` nos botões com texto (AA 4,6:1) e `#FA4616` no botão flutuante.
- Linguagem reta/angular: raio pequeno (3–8px), cortes diagonais entre seções, padrão de linhas escalonadas.
- Mobile-first, breakpoints 768px e 1100px, largura máx. 1200px, sem rolagem horizontal de 320px a 1440px.
- Respeitar `prefers-reduced-motion` (sem vídeo e sem animações), `:focus-visible`, skip link, alvos ≥ 44px.
- Vídeo do Hero: **MP4 como primeira fonte** (iPhone), tenta tocar ao abrir, no `canplay` e no 1º
  toque/rolagem; pausa fora da tela.

## SEO

- Domínio oficial assumido: `https://distritorefrigeracao.com.br/` (sem www). Está no `canonical`, `og:url`,
  `og:image`, JSON-LD (`LocalBusiness`) do `<head>`, `robots.txt` e `sitemap.xml`. Se mudar, trocar em todos.
- O JSON-LD repete telefone, e-mail, endereço e horário do `config.js` (o Google não lê o JS): manter iguais.
- Rodapé tem "Serviços" (links para `#srv-*`) e "Regiões atendidas no DF". Não encher de palavras-chave
  repetidas (o Google pune). Depois de publicar: Google Search Console + Perfil da Empresa no Google.

## Como verificar mudanças

Sem suíte de testes. Abrir o `index.html` no navegador e, para checagem automática, usar o Chrome headless
(`C:\Program Files\Google\Chrome\Application\chrome.exe --headless=new`): larguras menores que ~500px
precisam de `<iframe>`; checar `scrollWidth === clientWidth` (sem rolagem horizontal) em 320/375/414/1440,
links `wa.me`, vídeo tocando e ausência de erros de JS. `ffmpeg` está instalado para tratar vídeo/imagem.

## Pendências (próximos passos)

1. `js/config.js`: link do Instagram (em criação; não há Facebook). O resto está preenchido e confirmado
   pelo cliente em 29/09/2026.
2. Depoimentos: 4 reais em 29/09/2026, com autorização dos clientes e nas palavras deles (não editar o texto). Novos entram em `CONFIG.depoimentos`
   (grade de 2 colunas a partir de 768px, pensada para número par).
3. Foto real da equipe para a seção Sobre (a atual é provisória, de banco de imagens; o cliente vai tentar).
4. Confirmar com o cliente se atende marcas de purificadores (IBBL, Europa, Latina, Libell, Everest) para
   incluir na faixa de marcas.
5. WhatsApp definitivo `5561982669555` / (61) 98266-9555 (05/10/2026). Se mudar, trocar `WHATSAPP_NUMBER` e
   `telefone` no `config.js`, os 2 `data-cfg="telefone"` e o `telephone` do JSON-LD no `index.html`.
6. E-mail oficial: `distritorefrigeracao@gmail.com` (29/09/2026). Domínio `distritorefrigeracao.com.br`
   confirmado (05/10/2026). Vercel: projeto `distrito-refrigeracao` (deploy a cada push em `main`), domínio
   principal sem www e `www` com 308 para ele. DNS no Registro.br (modo avançado): A @ 216.198.79.1 e
   CNAME www a443a2a08dfe8046.vercel-dns-017.com. Site no ar com HTTPS desde 05/10/2026.
   Search Console: propriedade de domínio verificada pelo TXT `google-site-verification=...` (NÃO remover
   do DNS) e sitemap enviado — provisoriamente na conta pessoal do desenvolvedor; quando houver acesso ao
   Gmail da Distrito, adicioná-la como proprietária (verifica sozinha pelo mesmo TXT) e remover a pessoal.
8. Perfil da Empresa no Google criado em 05/10/2026 na conta distritorefrigeracao@gmail.com (categoria
   "Assistência técnica de eletrodomésticos", loja + área DF, horário, serviços, descrição). **Falta a
   verificação por vídeo** (fachada, interior e comprovante) e fotos reais; só aparece no Maps depois disso.
7. Quando os dados estiverem completos: revisar `og:image`/domínio próprio e testar num celular de verdade
   (o vídeo não tocava no celular do usuário — corrigido no commit 7c76a75, aguardando confirmação).
