# Otimização mobile baseada no PageSpeed

## Objetivo
Reduzir o peso inicial, eliminar a movimentação visível no carregamento e preservar a aparência e o rastreamento de vendas.

## Alterações
- Criar versões menores das imagens do topo e do carrossel e entregar o tamanho adequado a cada tela.
- Manter apenas a imagem principal em alta prioridade; carregar imagens secundárias somente quando próximas da visualização.
- Hospedar localmente as fontes usadas pela página, removendo as requisições externas que bloqueiam a primeira exibição.
- Reservar medidas estáveis no topo para evitar o deslocamento apontado pelo relatório.
- Adiar a inicialização do Pixel da Meta até o navegador estar livre, sem remover PageView, ViewContent ou eventos de compra/clique existentes.
- Remover conteúdo e código não utilizados no arquivo principal e reduzir o trabalho inicial do carrossel.

## Validação
- Conferir a página em celular e desktop, incluindo topo, carrossel, planos e perguntas frequentes.
- Verificar ausência de erros, dimensões estáveis e carregamento seletivo das imagens.
- Comparar peso e requisições locais com os achados do relatório: 575 KiB em imagens, 200 ms em recursos bloqueantes e 133 KiB de JavaScript não utilizado.

## Observação técnica
O relatório compartilhado mediu FCP de 0,7 s, LCP de 0,8 s, TBT de 120 ms, CLS de 0,25 e Speed Index de 1,7 s. A prioridade será o CLS e os desperdícios identificados, pois os tempos de pintura já estão bons nessa execução.
