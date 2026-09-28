# Assets do Hero — Distrito Refrigeração

Vídeo de fundo da capa: 4 equipamentos (geladeira → lavadora → fogão → expositor), cada um em loop
ping-pong (monta → desmonta em vista explodida → monta), gerados no Higgsfield e processados com ffmpeg.

## Arquivos finais

| Arquivo | Formato | Resolução | Duração | Tamanho |
|---|---|---|---|---|
| `hero.mp4` | H.264, CRF 28, preset slow, faststart, sem áudio | 1920x1080, 30 fps | 32,4 s | 3,66 MB (3.842.120 bytes) |
| `hero.webm` | VP9, CRF 34, b:v 0, sem áudio | 1920x1080, 30 fps | 32,4 s | 3,79 MB (3.975.944 bytes) |
| `hero-poster.jpg` | JPEG, 1º frame (geladeira montada) | 1920x1080 | — | 50 KB (51.008 bytes) |

Metas: `hero.mp4` < 5 MB ✔ · `hero-poster.jpg` < 200 KB ✔.

O **mesmo vídeo** é usado no celular e no PC (fundo do Hero com `object-fit: cover`). A versão 9:16 recortada foi gerada, mas descartada a pedido: está em `raw/hero-mobile_nao-usado.mp4`.

## Modelos

| Uso | Modelo | Configuração | Custo unitário |
|---|---|---|---|
| Fotos | GPT Image 2.5 (`gpt_image_2_5`, variante flare) | quality high, 2K (2688x1520), 16:9 | 2,75 créditos |
| Vídeos (image-to-video) | Kling v3.0 (`kling3_0`) | mode pro, 4 s, 16:9, sound off, foto como `start_image` | 7 créditos |

As fotos 2–4 usaram a foto 1 (geladeira aprovada) como `image_references` para manter fundo, luz e enquadramento.
Saída do Kling: 1912x1080, 24 fps — normalizada para 1920x1080, 30 fps antes do concat.

## Créditos gastos

| Item | Qtd. | Créditos |
|---|---|---|
| Fotos | 4 | 11 |
| Vídeos | 4 | 28 |
| Nova tentativa do vídeo do fogão (chama azul acesa no v1) | 1 | 7 |
| **Total** | | **46** (saldo 1000 → 954) |

## Arquivos em `raw/`

- `foto1_geladeira.png`, `foto2_lavadora.png`, `foto3_fogao.png`, `foto4_expositor.png` — originais do GPT Image 2.5
- `clipe1_geladeira.mp4`, `clipe2_lavadora.mp4`, `clipe3_fogao.mp4`, `clipe4_expositor.mp4` — originais do Kling
- `clipe3_fogao_v1_descartado.mp4` — 1ª versão do fogão, descartada (queimador interno com chama azul acesa)
- `clipeN_*_loop.mp4` — versões ping-pong normalizadas (1920x1080, 30 fps, H.264 CRF 16)
- `hero_full.mp4` — concat sem reencode dos 4 loops (32,4 s, ~27 MB, master para novas compressões)
- `list.txt` — lista usada no concat
- `hero-mobile_nao-usado.mp4` — recorte 9:16 (720x1280, 1,84 MB), não usado no site

## Processamento (ffmpeg 9.0.1)

```bash
# 1+2. ping-pong + normalização (por clipe)
ffmpeg -i clipeN.mp4 -filter_complex "[0:v]reverse[r];[0:v][r]concat=n=2:v=1:a=0,scale=1920:1080:flags=lanczos,setsar=1,fps=30,format=yuv420p[v]" -map "[v]" -an -c:v libx264 -crf 16 -preset medium -g 60 clipeN_loop.mp4
# 3. concat sem reencode
ffmpeg -f concat -safe 0 -i list.txt -c copy hero_full.mp4
# 4. web
ffmpeg -i raw/hero_full.mp4 -vf "scale=1920:-2,fps=30" -an -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart hero.mp4
ffmpeg -i raw/hero_full.mp4 -an -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 -pix_fmt yuv420p hero.webm
# 5. poster
ffmpeg -i raw/hero_full.mp4 -frames:v 1 -q:v 2 hero-poster.jpg
# 6. mobile 9:16
ffmpeg -i raw/hero_full.mp4 -vf "crop=608:1080:996:0,scale=720:1280:flags=lanczos,setsar=1,fps=30" -an -c:v libx264 -crf 32 -preset slow -pix_fmt yuv420p -movflags +faststart hero-mobile.mp4
```

## Prompts finais

**Sufixo usado nas fotos 2–4** (com a foto 1 como referência):
`Match the reference image exactly in background, lighting, camera angle and framing; replace only the appliance.` + prompt original.

### Foto 1 — geladeira
Studio product shot of a modern white two-door refrigerator, floating in mid-air, positioned slightly right of center, on a deep cobalt blue gradient background (from #0047BB to #000E25), soft cold rim light, subtle ice-gray reflections, clean and minimal, large empty space on the left, photorealistic, sharp detail, no text, no logos, no brand names, no watermark. Aspect ratio 16:9.

### Vídeo 1 — geladeira
The two-door refrigerator slowly separates into its components in a clean exploded-view: door, shelves, drawers, compressor, condenser coil and thermostat float apart with precise, even spacing, hovering in mid-air. A small warm orange glow (#FA4616) emanates from the core internal parts. Slow, smooth camera push-in, no cuts, the dark blue studio background stays unchanged, parts stay recognizable and symmetrical, no text, no logos. Duration 3-4 seconds, 16:9.

### Foto 2 — máquina de lavar
Match the reference image exactly in background, lighting, camera angle and framing; replace only the appliance. Studio product shot of a modern white front-load washing machine, floating in mid-air, positioned slightly right of center, on a deep cobalt blue gradient background (from #0047BB to #000E25), soft cold rim light, subtle ice-gray reflections, clean and minimal, large empty space on the left, photorealistic, sharp detail, no text, no logos, no brand names, no watermark. Aspect ratio 16:9.

### Vídeo 2 — máquina de lavar
The front-load washing machine slowly separates into its components in a clean exploded-view: door, drum, motor, control panel and hoses float apart with precise, even spacing, hovering in mid-air. A small warm orange glow (#FA4616) emanates from the core internal parts. Slow, smooth camera push-in, no cuts, the dark blue studio background stays unchanged, parts stay recognizable and symmetrical, no text, no logos. Duration 3-4 seconds, 16:9.

### Foto 3 — fogão
Match the reference image exactly in background, lighting, camera angle and framing; replace only the appliance. Studio product shot of a modern white four-burner freestanding gas stove with unlit burners, floating in mid-air, positioned slightly right of center, on a deep cobalt blue gradient background (from #0047BB to #000E25), soft cold rim light, subtle ice-gray reflections, clean and minimal, large empty space on the left, photorealistic, sharp detail, no flames, no text, no logos, no brand names, no watermark. Aspect ratio 16:9.

### Vídeo 3 — fogão (versão final, 2ª tentativa)
The four-burner gas stove slowly separates into its components in a clean exploded-view: cooktop grates, burner heads, gas valves and knobs, oven door and oven cavity float apart with precise, even spacing, hovering in mid-air. The stove is completely turned off: absolutely no fire, no flames, no blue gas flame on any burner, inside or outside. A small warm orange glow (#FA4616) emanates softly from the gas valve block as a light, not as fire. Slow, smooth camera push-in, no cuts, the dark blue studio background stays unchanged, parts stay recognizable and symmetrical, no text, no logos. Duration 3-4 seconds, 16:9.

### Foto 4 — expositor refrigerado
Match the reference image exactly in background, lighting, camera angle and framing; replace only the appliance. Studio product shot of a modern commercial refrigerated display case with glass doors, floating in mid-air, positioned slightly right of center, on a deep cobalt blue gradient background (from #0047BB to #000E25), soft cold rim light, subtle ice-gray reflections, clean and minimal, large empty space on the left, photorealistic, sharp detail, empty shelves, no products, no text, no logos, no brand names, no watermark. Aspect ratio 16:9.

### Vídeo 4 — expositor refrigerado
The commercial refrigerated display case slowly separates into its components in a clean exploded-view: glass door, shelves, evaporator, compressor unit and LED lights float apart with precise, even spacing, hovering in mid-air. A small warm orange glow (#FA4616) emanates from the core internal parts. Slow, smooth camera push-in, no cuts, the dark blue studio background stays unchanged, parts stay recognizable and symmetrical, no text, no logos. Duration 3-4 seconds, 16:9.
