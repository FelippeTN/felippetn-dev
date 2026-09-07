/**
 * TCC — MBA USP/Esalq, Engenharia de Software.
 *
 * Todos os números desta seção vêm da análise do próprio experimento:
 * `results/raw_results.csv` (5.760 execuções válidas, SHA-256 registrado em
 * `docs/data/audit.json`) agregado em `docs/data/*.csv`. Nada aqui é estimado
 * ou arredondado "para ficar bonito" — o que aparece no gráfico é o que está
 * no CSV, com uma casa decimal.
 *
 * Regra da casa para esta seção: se um número não sobreviver à conferência
 * contra o CSV, ele sai do site. Um portfólio que exibe resultado de pesquisa
 * carrega a mesma obrigação de rastreabilidade que a dissertação.
 */

export type Serie = {
  deepseek: number
  gemma: number
}

export type Eixo = 'Exposição' | 'Recuperação' | 'Invocação'

export type Condicao = {
  id: string
  eixo: Eixo
  label: string
  nota: string
  baseline: boolean
  /** Acurácia de seleção de ferramenta, 0–1. Fonte: summary_by_condition.csv */
  acuracia: Serie
  /** Média de tokens de entrada por chamada ao LLM. */
  tokens: Serie
  /** Latência média da chamada HTTP de chat, em segundos. */
  latencia: Serie
  /** Disponibilidade do gabarito após a recuperação, nas consultas que exigem
   *  ferramenta. Fonte: retrieval_with_tool.csv */
  disponibilidade: Serie
}

export type Contraste = {
  id: string
  eixo: Eixo
  label: string
  /** Diferença em pontos percentuais contra o baseline do próprio modelo. */
  delta: Serie
  /** p ajustado por Holm-Bonferroni na família de 16 comparações. */
  pHolm: Serie
  significativo: { deepseek: boolean; gemma: boolean }
}

export const tccModelos = {
  deepseek: { label: 'DeepSeek-V4-Flash', detalhe: 'DeepSeek-V4-Flash-0731' },
  gemma: { label: 'Gemma-4-E4B', detalhe: 'gemma-4-E4B-it' },
} as const

export const tccMeta = {
  titulo: 'TCC',
  contador: '/ 06',
  programa: 'MBA USP/Esalq — Engenharia de Software',
  status: 'Em andamento · coleta concluída, redação em curso',
  tituloProvisorio:
    'A forma de expor ferramentas condiciona acurácia, alucinação e custo em agentes LLM',
  pergunta:
    'Como o tamanho do toolset exposto, a estratégia de recuperação de ferramentas e o mecanismo de invocação afetam a acurácia de seleção, a taxa de alucinação e o custo de operação de agentes baseados em LLM?',
  resumo:
    'Experimento controlado sobre agentes LLM: 18 condições em dois modelos self-hosted, com corpus de 52 ferramentas sintéticas e 64 consultas em português com gabarito. O desenho é OFAT em torno de um baseline, a unidade de análise é a consulta e cada comparação passa por teste de permutação pareada com correção de Holm-Bonferroni. O que segue são os resultados medidos, não a expectativa do autor.',
  fonte: 'Elaboração própria com base nos dados do experimento (2026).',
}

export const tccNumeros = [
  { valor: '5.760', label: 'execuções válidas', nota: '0 erros, 0 duplicatas' },
  { valor: '18', label: 'condições', nota: '9 por modelo' },
  { valor: '64', label: 'consultas pt-BR', nota: '5 repetições cada' },
  { valor: '2', label: 'modelos self-hosted', nota: 'endpoints OpenAI-compatíveis' },
]

export const tccDesenho = [
  {
    titulo: 'Baseline',
    texto: '50 ferramentas expostas integralmente, invocação nativa. Todo contraste é medido contra ele, dentro do próprio modelo.',
  },
  {
    titulo: 'Três eixos, um fator por vez',
    texto: 'Exposição (10 / 30 / 50), recuperação (full, random, embedding, hybrid, two_stage, k=5) e invocação (native, json_prompt, code_action).',
  },
  {
    titulo: 'Unidade de análise',
    texto: 'A consulta, não a execução. As 5 repetições viram média por consulta antes do teste — 64 pares por contraste, não 320 observações independentes.',
  },
  {
    titulo: 'Decisão estatística',
    texto: 'Permutação pareada por troca de sinal (10.000 permutações, semente 20260830), Holm-Bonferroni a 5% e limiar de relevância prática de 5 pontos percentuais.',
  },
  {
    titulo: 'Piso aleatório',
    texto: 'O braço random expõe 5 ferramentas sorteadas. Sem esse piso, o ganho de embedding/hybrid seria ambíguo entre "menos ruído" e "mais relevância".',
  },
  {
    titulo: 'Separação de culpas',
    texto: 'retrieval_hit é calculado em toda linha: distingue a falha de recuperação (o gabarito não sobreviveu) da falha de decisão (sobreviveu e o modelo errou).',
  },
]

/** Fonte: docs/data/summary_by_condition.csv + docs/data/retrieval_with_tool.csv */
export const tccCondicoes: Condicao[] = [
  {
    id: 'toolset-10',
    eixo: 'Exposição',
    label: '10 ferramentas',
    nota: 'full · native',
    baseline: false,
    acuracia: { deepseek: 0.8594, gemma: 0.7031 },
    tokens: { deepseek: 898.2, gemma: 636.9 },
    latencia: { deepseek: 0.9296, gemma: 0.9224 },
    disponibilidade: { deepseek: 1, gemma: 1 },
  },
  {
    id: 'toolset-30',
    eixo: 'Exposição',
    label: '30 ferramentas',
    nota: 'full · native',
    baseline: false,
    acuracia: { deepseek: 0.7812, gemma: 0.7031 },
    tokens: { deepseek: 2115.2, gemma: 1768.0 },
    latencia: { deepseek: 0.958, gemma: 0.7759 },
    disponibilidade: { deepseek: 1, gemma: 1 },
  },
  {
    id: 'toolset-50',
    eixo: 'Exposição',
    label: '50 ferramentas',
    nota: 'full · native',
    baseline: true,
    acuracia: { deepseek: 0.775, gemma: 0.7156 },
    tokens: { deepseek: 3333.3, gemma: 2898.2 },
    latencia: { deepseek: 1.0003, gemma: 0.7756 },
    disponibilidade: { deepseek: 1, gemma: 1 },
  },
  {
    id: 'random',
    eixo: 'Recuperação',
    label: 'random',
    nota: 'k=5 · piso aleatório',
    baseline: false,
    acuracia: { deepseek: 0.3031, gemma: 0.2812 },
    tokens: { deepseek: 594.9, gemma: 354.5 },
    latencia: { deepseek: 0.9615, gemma: 0.5065 },
    disponibilidade: { deepseek: 0.1042, gemma: 0.1042 },
  },
  {
    id: 'embedding',
    eixo: 'Recuperação',
    label: 'embedding',
    nota: 'k=5 · qwen3-embedding-8B',
    baseline: false,
    acuracia: { deepseek: 0.8688, gemma: 0.7656 },
    tokens: { deepseek: 598.6, gemma: 358.2 },
    latencia: { deepseek: 0.9051, gemma: 0.5009 },
    disponibilidade: { deepseek: 1, gemma: 1 },
  },
  {
    id: 'hybrid',
    eixo: 'Recuperação',
    label: 'hybrid',
    nota: 'k=5 · denso + léxico',
    baseline: false,
    acuracia: { deepseek: 0.8812, gemma: 0.7812 },
    tokens: { deepseek: 592.8, gemma: 352.6 },
    latencia: { deepseek: 0.8507, gemma: 0.5001 },
    disponibilidade: { deepseek: 0.9583, gemma: 0.9583 },
  },
  {
    id: 'two-stage',
    eixo: 'Recuperação',
    label: 'two_stage',
    nota: 'k=5 · domínio e depois ferramenta',
    baseline: false,
    acuracia: { deepseek: 0.7781, gemma: 0.5781 },
    tokens: { deepseek: 1113.9, gemma: 1576.7 },
    latencia: { deepseek: 1.0298, gemma: 0.8627 },
    disponibilidade: { deepseek: 0.9292, gemma: 0.75 },
  },
  {
    id: 'json-prompt',
    eixo: 'Invocação',
    label: 'json_prompt',
    nota: 'full · 50 ferramentas',
    baseline: false,
    acuracia: { deepseek: 0.95, gemma: 0.7219 },
    tokens: { deepseek: 1316.3, gemma: 1351.2 },
    latencia: { deepseek: 0.4765, gemma: 0.5681 },
    disponibilidade: { deepseek: 1, gemma: 1 },
  },
  {
    id: 'code-action',
    eixo: 'Invocação',
    label: 'code_action',
    nota: 'full · 50 ferramentas',
    baseline: false,
    acuracia: { deepseek: 0.9844, gemma: 0.8219 },
    tokens: { deepseek: 1296.3, gemma: 1331.2 },
    latencia: { deepseek: 0.2105, gemma: 1.0223 },
    disponibilidade: { deepseek: 1, gemma: 1 },
  },
]

/** Fonte: docs/data/ofat_tests_correct.csv */
export const tccContrastes: Contraste[] = [
  {
    id: 'toolset-10',
    eixo: 'Exposição',
    label: '10 ferramentas',
    delta: { deepseek: 8.44, gemma: -1.25 },
    pHolm: { deepseek: 0.123, gemma: 1.0 },
    significativo: { deepseek: false, gemma: false },
  },
  {
    id: 'toolset-30',
    eixo: 'Exposição',
    label: '30 ferramentas',
    delta: { deepseek: 0.63, gemma: -1.25 },
    pHolm: { deepseek: 1.0, gemma: 1.0 },
    significativo: { deepseek: false, gemma: false },
  },
  {
    id: 'random',
    eixo: 'Recuperação',
    label: 'random',
    delta: { deepseek: -47.19, gemma: -43.44 },
    pHolm: { deepseek: 0.0016, gemma: 0.0016 },
    significativo: { deepseek: true, gemma: true },
  },
  {
    id: 'embedding',
    eixo: 'Recuperação',
    label: 'embedding',
    delta: { deepseek: 9.38, gemma: 5.0 },
    pHolm: { deepseek: 0.123, gemma: 0.779 },
    significativo: { deepseek: false, gemma: false },
  },
  {
    id: 'hybrid',
    eixo: 'Recuperação',
    label: 'hybrid',
    delta: { deepseek: 10.63, gemma: 6.56 },
    pHolm: { deepseek: 0.123, gemma: 0.425 },
    significativo: { deepseek: false, gemma: false },
  },
  {
    id: 'two-stage',
    eixo: 'Recuperação',
    label: 'two_stage',
    delta: { deepseek: 0.31, gemma: -13.75 },
    pHolm: { deepseek: 1.0, gemma: 0.0451 },
    significativo: { deepseek: false, gemma: true },
  },
  {
    id: 'json-prompt',
    eixo: 'Invocação',
    label: 'json_prompt',
    delta: { deepseek: 17.5, gemma: 0.63 },
    pHolm: { deepseek: 0.0039, gemma: 1.0 },
    significativo: { deepseek: true, gemma: false },
  },
  {
    id: 'code-action',
    eixo: 'Invocação',
    label: 'code_action',
    delta: { deepseek: 20.94, gemma: 10.63 },
    pHolm: { deepseek: 0.0016, gemma: 0.0228 },
    significativo: { deepseek: true, gemma: true },
  },
]

/** Fonte: docs/data/sensitivity_summary.csv e sensitivity_tests.csv (Gemma).
 *  No DeepSeek não houve falha de parsing: os resultados ficam idênticos. */
export const tccSensibilidade = {
  modelo: tccModelos.gemma.label,
  baseline: 0.7156,
  falhasParsing: 117,
  falhasContadasComoAcerto: 60,
  linhas: [
    {
      id: 'code-action',
      label: 'code_action',
      original: 0.8219,
      ajustada: 0.7156,
      erroParsing: 0.1875,
      deltaOriginal: 10.63,
      deltaAjustado: 0.0,
      significativoOriginal: true,
      significativoAjustado: false,
    },
    {
      id: 'json-prompt',
      label: 'json_prompt',
      original: 0.7219,
      ajustada: 0.6406,
      erroParsing: 0.1781,
      deltaOriginal: 0.63,
      deltaAjustado: -7.5,
      significativoOriginal: false,
      significativoAjustado: false,
    },
    {
      id: 'native',
      label: 'native (baseline)',
      original: 0.7156,
      ajustada: 0.7156,
      erroParsing: 0,
      deltaOriginal: 0,
      deltaAjustado: 0,
      significativoOriginal: false,
      significativoAjustado: false,
    },
  ],
}

export const tccAchados = [
  {
    titulo: 'A invocação move mais a agulha do que a exposição',
    texto:
      'No DeepSeek, trocar a invocação nativa por json_prompt rende +17,5 p.p. e por code_action +20,9 p.p. sobre o baseline — significativos após Holm e acima do limiar de 5 p.p. Nenhuma variação de tamanho de toolset chegou perto disso.',
  },
  {
    titulo: 'O ganho não é universal entre modelos',
    texto:
      'O mesmo code_action rende +10,6 p.p. no Gemma pela métrica original, mas o ganho desaparece quando o acerto passa a exigir também uma resposta sem falha de parsing. Avaliação de agente precisa declarar como trata falha de formato.',
  },
  {
    titulo: 'Recuperação relevante não provou ganho de acurácia — provou economia',
    texto:
      'embedding e hybrid ficaram acima do baseline em termos descritivos (+9,4 e +10,6 p.p. no DeepSeek), mas não sobreviveram à correção de múltiplas comparações. O que sobreviveu foi a redução de 82% a 88% nos tokens de entrada.',
  },
  {
    titulo: 'O piso aleatório separa "menos ruído" de "mais relevância"',
    texto:
      'Expondo 5 ferramentas sorteadas, a acurácia cai para 30,3% e 28,1%. embedding e hybrid superam esse piso por 48 a 58 p.p. com o mesmo tamanho de prompt — o ganho vem da relevância, não do encurtamento.',
  },
  {
    titulo: 'Disponibilidade do gabarito não é o mesmo que decisão correta',
    texto:
      'Com embedding, a ferramenta correta sobreviveu à recuperação em 100% das execuções que exigiam ferramenta — e ainda assim a acurácia parou em 86,9% e 76,6%. O erro restante é de decisão do modelo, não de busca.',
  },
  {
    titulo: 'Recuperação em duas etapas cobra caro no modelo menor',
    texto:
      'two_stage derruba o Gemma em 13,8 p.p., o único contraste negativo significativo fora do piso aleatório. A disponibilidade do gabarito cai a 75%, compatível com perda de alternativa correta já na escolha do domínio.',
  },
  {
    titulo: 'O gargalo está na ambiguidade, não na consulta direta',
    texto:
      'No baseline do DeepSeek, consultas diretas acertam 87,5% e ambíguas apenas 47,5%. Discriminar ferramentas semanticamente próximas é o problema difícil deste corpus — e é exatamente onde os pares confusáveis foram plantados.',
  },
  {
    titulo: 'Reprodutibilidade tratada como requisito, não como promessa',
    texto:
      'Dado primário versionado com SHA-256, hash de cada script no audit.json, semente de permutação fixa, execução retomável e suíte de testes de integridade sobre o CSV. A análise reroda do zero e reproduz cada número desta página.',
  },
]

export const tccNaoSustenta = [
  {
    afirmacao: '"code_action é melhor para qualquer LLM"',
    correcao: 'O ganho robusto apareceu no DeepSeek. No Gemma, depende do critério de acerto.',
  },
  {
    afirmacao: '"A recuperação não faz diferença"',
    correcao:
      'Não houve ganho significativo de acurácia contra a exposição integral; houve queda de tokens e vantagem clara sobre o piso aleatório.',
  },
  {
    afirmacao: '"Reduzir tokens reduz o custo de GPU em 88%"',
    correcao: 'A redução medida é de tokens de entrada. Uso de GPU e custo financeiro não foram medidos.',
  },
  {
    afirmacao: '"São 5.760 amostras independentes"',
    correcao: 'São 5.760 execuções sobre 64 consultas pareadas por contraste.',
  },
]

export type ValidacaoStatus = 'orientador' | 'metodo' | 'redacao'

export const tccValidacao: Array<{
  status: ValidacaoStatus
  titulo: string
  texto: string
}> = [
  {
    status: 'orientador',
    titulo: 'Inclusão dos dois modelos como dimensão comparativa',
    texto:
      'O escopo original previa um modelo só. A comparação entre modelos entrou depois que o custo marginal de rodar localmente se mostrou desprezível — falta o aval formal do orientador.',
  },
  {
    status: 'orientador',
    titulo: 'Definição de acerto nas consultas no_tool',
    texto:
      'Hoje a ausência de chamada conta como acerto mesmo quando decorre de falha de parsing. A análise de sensibilidade já mede o impacto disso; a escolha da métrica primária precisa ser decidida com o orientador, sem troca seletiva de resultado.',
  },
  {
    status: 'metodo',
    titulo: 'Segunda revisão independente do gabarito',
    texto:
      'O campo reviewed_by do dataset de consultas segue vazio. Um único avaliador definiu o gabarito das 64 consultas; uma revisão independente é o que dá credibilidade ao instrumento.',
  },
  {
    status: 'metodo',
    titulo: 'Intervalos de confiança pareados',
    texto:
      'Os gráficos atuais mostram médias e decisões de teste, sem IC. Incluir intervalos pareados e replicar em consultas novas é o complemento natural antes de fechar.',
  },
  {
    status: 'metodo',
    titulo: 'Registro de ambiente e proveniência de execução',
    texto:
      'Revisão de código e pesos, configuração do servidor e hardware precisam ser registrados a partir dos logs, não inferidos do nome do endpoint. O CSV não carrega o campo de backend.',
  },
  {
    status: 'metodo',
    titulo: 'Ordem de coleta declarada com honestidade',
    texto:
      'As condições não foram intercaladas aleatoriamente, o braço random foi coletado depois e o sorteio é fixo por consulta. Isso limita a leitura causal e precisa estar explícito no texto, não só no repositório.',
  },
  {
    status: 'redacao',
    titulo: 'Título definitivo',
    texto:
      'Há um título neutro e um alternativo que compromete com o achado de invocação. A escolha só se fecha depois da leitura final dos resultados.',
  },
  {
    status: 'redacao',
    titulo: 'Pré-registro: decisão documentada, não registro público',
    texto:
      'O plano estatístico está documentado no projeto. Afirmar registro público anterior à coleta exige comprovação datada — sem ela, o texto diz apenas o que é verdade.',
  },
  {
    status: 'redacao',
    titulo: 'Revisão de literatura e norma do curso',
    texto:
      'Referências acadêmicas verificadas ainda serão integradas à discussão, e a formatação final segue o manual do MBA USP/Esalq.',
  },
]

export const tccLimites = [
  'Corpus sintético: 52 ferramentas e 64 consultas não representam APIs de produção.',
  'OFAT não estima interações — o efeito de cada fator é conhecido apenas em torno do baseline.',
  'Dois modelos self-hosted de porte semelhante; nada aqui se estende a modelos de fronteira.',
  'Mede-se a seleção da ferramenta, não o preenchimento dos argumentos nem a execução.',
  'k fixo em 5 e busca léxica do hybrid por sobreposição de tokens, não BM25.',
]
