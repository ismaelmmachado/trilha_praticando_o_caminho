const fs = require('fs');
const path = require('path');

const dados = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'dados', 'passos.json'), 'utf-8'));

const resumos = {
  2: "Agora damos o segundo passo. Vamos falar sobre formação. Pode ser que você nunca tenha pensado sobre isso, mas a verdade é que todos nós estamos sendo formados o tempo todo — pela cultura, pelo trabalho, pelas redes sociais, pelos hábitos. A pergunta não é se você está sendo formado. A pergunta é: por quem e para quê?",
  3: "A transformação acontece pela prática — não por esforço isolado, apenas estudo ou esperar um milagre. Jesus não nos deu apenas um destino. Ele nos deu um caminho. E esse caminho pode ser aprendido, praticado e vivido, um passo de cada vez.",
  4: "Quais são as práticas que nos formam? Ao longo da história, os seguidores de Jesus descobriram práticas que abrem espaço para Deus agir. Não são tarefas para cumprir, mas ritmos que nos ajudam a estar com Jesus, tornar-nos como Ele e fazer como Ele fez.",
  5: "Chegamos a um dos encontros mais delicados e transformadores da nossa jornada. Jesus foi claro: 'No mundo vocês terão aflições'. Ele não prometeu uma vida sem dor, mas prometeu que não estaríamos sozinhos nela. Este encontro não vai explicar por que coisas ruins acontecem, mas vai te convidar a encarar a dor de uma forma diferente.",
  6: "Vamos falar sobre algo que muitas vezes está na raiz da nossa dor: o pecado. Essa palavra pode soar pesada, mas a Bíblia a usa de um jeito diferente. Pecado não é só fazer algo errado — é viver desconectado de Deus. E, como toda doença, o pecado precisa de cura. Este encontro não é para te fazer sentir culpado, mas para te ajudar a encontrar liberdade.",
  7: "Chegamos ao passo final da Etapa 1 da nossa jornada. Você percorreu um caminho — desde o convite para ser aprendiz até enfrentar a dor e trazer o pecado à luz. Agora, vamos criar sua Regra de Vida. Não é um conjunto de regras, mas uma estrutura que sustenta sua caminhada com Jesus.",
  8: "Chegamos ao último passo da Etapa 1. E, de certa forma, ao mais importante. Você não foi feito para fazer isso sozinho. A fé cristã nunca foi uma jornada solitária. Desde o início, Jesus chamou um grupo de pessoas para caminharem juntas. Este encontro é sobre viver a fé em comunidade — o ambiente onde a transformação acontece.",
  9: "Você concluiu a Etapa 1 e agora começamos a Etapa 2 — o aprofundamento em cada uma das 9 práticas. E começamos com a prática que, para muitos, é a mais difícil de todas: o descanso. Vivemos em um mundo que valoriza a produtividade, mas Jesus nos convida a um ritmo que inclui pausa, silêncio, descanso.",
  10: "A oração é uma das práticas mais centrais e, ao mesmo tempo, mais desafiadoras. Pode ser que você ore há anos ou que nunca tenha conseguido manter uma rotina. A boa notícia é que oração não é sobre fazer do jeito certo. É sobre conversar. E conversa cabe em qualquer lugar.",
  11: "Chegamos a uma prática que, para muitos, é a mais desconhecida: o jejum. Jejuar não é sobre punir o corpo ou merecer algo de Deus. Jejum é criar espaço — abrir mão de um apetite legítimo para dizer que Deus é maior que nossa fome imediata.",
  12: "Em uma cultura barulhenta e hiperconectada, o silêncio é uma das práticas mais contraculturais. Vivemos cercados por estímulos e notificações. A prática do silêncio nos convida a recuperar um espaço sagrado diante de Deus — não apenas ficar sem som, mas criar um ambiente onde a alma pode respirar.",
  13: "Vivemos em um mundo que molda o coração a acreditar que a felicidade vem do que possuímos. Jesus confronta essa lógica ao afirmar que a verdadeira felicidade não está em adquirir, mas em entregar. 'Mais bem-aventurado é dar do que receber' — Atos 20.35.",
  14: "Em uma cultura de pressa e leitura superficial, a meditação cristã nos chama a um caminho diferente: não consumir a Palavra rapidamente, mas permanecer nela até que penetre o coração. Meditar não é esvaziar a mente, mas enchê-la da voz de Deus.",
  15: "A comunidade não é um complemento opcional da vida cristã — é essencial. Não é apenas sobre estar junto. É sobre ser parte de um corpo onde cada membro tem uma função, um lugar, um propósito. E onde a saúde de um afeta a saúde de todos.",
  16: "O serviço é a mais clara expressão do caráter de Jesus. O próprio Rei escolheu a toalha e a bacia. O Criador se inclinou para lavar os pés dos discípulos. O serviço não é um detalhe do Evangelho — é uma expressão visível do amor de Deus.",
  17: "Chegamos ao último encontro da nossa jornada. Você percorreu um longo caminho — começou com o convite para ser aprendiz e agora chega à última prática: o testemunho. Não é sobre ter respostas para tudo. É sobre viver de tal forma que a sua vida aponte para Jesus."
};

const experimentos = {
  2: "Se você puder fazer uma coisa esta semana, que tal escolher UMA das seis forças que nos formam (hábitos, relacionamentos, histórias, ambiente, tempo, experiências) e observar como ela está te moldando? Só observe. Não precisa mudar nada ainda.",
  3: "Se você puder fazer uma coisa esta semana, que tal repetir um pequeno gesto todos os dias? Pode ser sorrir para alguém, respirar fundo antes de responder, ou agradecer uma vez por dia. Uma prática simples, sem meta.",
  4: "Escolha UMA das nove práticas para experimentar esta semana. Pode ser 5 minutos de silêncio, uma refeição sem celular, ou agradecer antes de dormir. Só uma prática. Sem pressão. Sem meta.",
  5: "Esta semana, reserve um momento para parar e perguntar a si mesmo: 'O que estou sentindo agora?' Depois, ofereça esse sentimento a Deus. Pode ser só: 'Senhor, isso aqui.' Não precisa de palavras bonitas.",
  6: "Escolha uma coisa pequena que você tem carregado e fale sobre ela com Deus. Se sentir segurança e tiver uma pessoa de confiança, compartilhe com ela também. Não precisa ser grande. Apenas traga à luz.",
  7: "Pegue um papel e escreva de 2 a 3 práticas que você quer manter na sua rotina. Só um esboço. Coloque num lugar onde você veja todos os dias.",
  8: "Identifique uma pessoa com quem você pode ser mais aberto esta semana. Convide para um café, uma caminhada, uma conversa. Não precisa ser sobre algo profundo. Apenas comece.",
  9: "Reserve um período — algumas horas ou meio dia — para descansar de verdade. Desligue notificações. Pare de trabalhar. Não faça lista de tarefas. Apenas esteja.",
  10: "Escolha UM momento do dia — ao acordar, no almoço ou antes de dormir — e ore com uma frase curta: 'Senhor, obrigado por este dia' ou 'Jesus, ajuda-me hoje.' Só isso. Um minuto. Sem culpa.",
  11: "Escolha pular uma refeição esta semana e use aquele tempo para orar. Ou, se preferir, fique um dia sem redes sociais. Não é sobre sofrer — é sobre perceber o espaço que Deus quer ocupar.",
  12: "Reserve 5 minutos por dia para ficar em silêncio. Sente-se. Respire. Não ore com palavras. Apenas esteja na presença de Deus. Quando sua mente vagar, volte. Gentilmente.",
  13: "Escolha um gesto de generosidade esta semana e faça sem contar para ninguém. Pode ser doar algo, preparar um café, ou oferecer seu tempo para ouvir alguém.",
  14: "Escolha um versículo curto — como Salmo 23.1 ou João 15.5 — e leia bem devagar. Depois, leia de novo. Fique com ele. Repita em silêncio. Deixe a palavra penetrar.",
  15: "Entre em contato com alguém da sua igreja ou círculo de fé. Pergunte como a pessoa está. E ouça de verdade — sem pressa, sem agenda.",
  16: "Faça uma tarefa simples para alguém sem contar que foi você. Pode ser lavar a louça, preparar o café, arrumar algo que outra pessoa normalmente cuida. Só você e Deus sabem.",
  17: "Compartilhe com alguém, de forma simples e sincera, o que Deus tem feito na sua vida. Pode ser uma frase, uma história, um convite para vir à igreja. Nada grandioso. Apenas autêntico."
};

const perguntas = {
  2: "Quem está te formando? — A pergunta não é se você está sendo formado, mas por quem e para quê.",
  3: "Você está esperando um atalho ou disposto a caminhar? — A transformação não é um evento, é um processo.",
  4: "Qual prática poderia abrir espaço para Deus na sua rotina esta semana?",
  5: "O que você tem escondido de Deus que Ele já conhece?",
  6: "O que você precisa trazer à luz para ser curado?",
  7: "Se a sua rotina atual continuar por mais um ano, onde você vai estar?",
  8: "Quem te conhece de verdade além de Deus?",
  9: "O que você perderia se desacelerasse por um dia?",
  10: "Como seria sua vida se orar fosse tão natural quanto respirar?",
  11: "O que está ocupando o espaço que poderia ser de Deus na sua vida?",
  12: "O que você evita ouvir quando fica em silêncio?",
  13: "Suas mãos estão abertas ou fechadas?",
  14: "Você tem lido a Bíblia para saber mais ou para se encontrar com Deus?",
  15: "Você tem caminhado sozinho ou deixado outros caminharem com você?",
  16: "O que muda em você quando serve sem esperar reconhecimento?",
  17: "Se sua vida fosse uma carta, o que ela estaria comunicando sobre Deus?"
};

dados.passos.forEach(passo => {
  if (passo.id === 1) return;

  const id = passo.id;

  // 1. para_comecar
  passo.para_comecar = {
    resumo: resumos[id],
    apostila_pdf: `/apostilas/passo-${id}.pdf`
  };

  // 2. ouca
  passo.ouca = {
    titulo: passo.titulo,
    spotify_url: ""
  };

  // 3. aprofunde: array → object { livro, musica }
  if (Array.isArray(passo.aprofunde)) {
    const livroItem = passo.aprofunde.find(a => a.tipo === 'livro') || {};
    const musicaItem = passo.aprofunde.find(a => a.tipo === 'musica') || {};
    passo.aprofunde = {
      livro: { titulo: livroItem.titulo || '', autor: livroItem.autor || '', url: livroItem.url || '' },
      musica: { titulo: musicaItem.titulo || '', artista: musicaItem.artista || '', url: musicaItem.url || '' }
    };
  }

  // 4. pratique: add experimento + pergunta
  passo.pratique.experimento = experimentos[id];
  passo.pratique.pergunta = perguntas[id];

  // 5. organizese: single day → 7-day grid
  const hasDayGrid = passo.organizese.dias.some(d =>
    d.dia.includes('feira') || d.dia === 'Sábado' || d.dia === 'Domingo'
  );
  if (!hasDayGrid) {
    passo.organizese.dias = [
      { dia: "Segunda-feira", tema: "", leitura: "" },
      { dia: "Terça-feira", tema: "", leitura: "" },
      { dia: "Quarta-feira", tema: "", leitura: "" },
      { dia: "Quinta-feira", tema: "", leitura: "" },
      { dia: "Sexta-feira", tema: "", leitura: "" },
      { dia: "Sábado", tema: "", leitura: "" },
      { dia: "Domingo", tema: "", leitura: "" }
    ];
  }
});

fs.writeFileSync(
  path.join(__dirname, '..', 'dados', 'passos.json'),
  JSON.stringify(dados, null, 2),
  'utf-8'
);

console.log('Todos os 16 passos (2-17) foram migrados para o novo formato!');
