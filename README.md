# Distrito Refrigeração — Landing page

Site de uma página para converter visitantes em contato pelo WhatsApp.
HTML, CSS e JavaScript puros, sem build: é só abrir o `index.html` ou publicar a pasta.

No ar (GitHub Pages): https://gabrielbotelhoeng.github.io/Distrito_Refrigera-o/

## Estrutura

```
index.html        → só o HTML (seções da página)
css/style.css     → todo o visual (tokens de cor, tipografia, layout, responsivo)
js/config.js      → DADOS DO CLIENTE: WhatsApp, região, garantia, pagamento, depoimentos, mensagens
js/main.js        → comportamento: links do WhatsApp, menu, vídeo do Hero, animações
assets/           → vídeo, fotos, logo, favicon e logos das marcas (créditos em assets/README.md)
```

## Onde editar

- **Dados da empresa:** `js/config.js`. Enquanto um valor estiver entre `[colchetes]`, o site mostra o
  texto de placeholder. Os depoimentos só aparecem quando pelo menos um estiver preenchido.
- **Textos das seções:** `index.html`.
- **Cores e espaçamentos:** variáveis no topo de `css/style.css` (`:root`).

A ordem dos scripts no fim do `index.html` importa: `config.js` antes de `main.js`.
