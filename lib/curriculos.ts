export interface Curriculo {
  id: string;
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  cpf: string;
  resumo: string;
  experiencia: Array<{ empresa: string; cargo: string; periodo: string; detalhes: string }>;
  formacao: Array<{ instituicao: string; curso: string; periodo: string }>;
  habilidades: string[];
  imageUrl: string;
}

const mockCurriculos: Curriculo[] = [
  {
    id: '1',
    nome: 'Isabela Duarte',
    cargo: 'Analista de Marketing',
    email: 'isabela.duarte@example.com',
    telefone: '(11) 98765-4321',
    cpf: '123.456.789-00',
    resumo: 'Profissional com experiência em marketing digital, planejamento de campanhas e análise de resultados.',
    experiencia: [
      {
        empresa: 'Agência Blue',
        cargo: 'Analista de Marketing Digital',
        periodo: '2022 - Atual',
        detalhes: 'Gestão de campanhas, redes sociais e análise de indicadores de performance.'
      }
    ],
    formacao: [
      {
        instituicao: 'Universidade São Paulo',
        curso: 'Publicidade e Propaganda',
        periodo: '2018 - 2021'
      }
    ],
    habilidades: ['Marketing', 'SEO', 'Google Ads', 'Comunicação'],
    imageUrl: '/avatar-placeholder.svg'
  },
  {
    id: '2',
    nome: 'Lucas Almeida',
    cargo: 'Desenvolvedor Front-end',
    email: 'lucas.almeida@example.com',
    telefone: '(21) 99876-5432',
    cpf: '987.654.321-00',
    resumo: 'Desenvolvedor front-end com foco em aplicações React, desempenho e experiência do usuário.',
    experiencia: [
      {
        empresa: 'Startup Nova',
        cargo: 'Front-end Developer',
        periodo: '2021 - Atual',
        detalhes: 'Implementação de interfaces responsivas e componentes reutilizáveis.'
      }
    ],
    formacao: [
      {
        instituicao: 'Universidade Federal do Rio de Janeiro',
        curso: 'Ciência da Computação',
        periodo: '2016 - 2020'
      }
    ],
    habilidades: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    imageUrl: '/avatar-placeholder.svg'
  }
];

export function getInitialCurriculos(): Curriculo[] {
  if (typeof window === 'undefined') {
    return mockCurriculos;
  }

  const stored = window.localStorage.getItem('curriculos');
  if (!stored) {
    window.localStorage.setItem('curriculos', JSON.stringify(mockCurriculos));
    return mockCurriculos;
  }

  try {
    return JSON.parse(stored) as Curriculo[];
  } catch (error) {
    window.localStorage.setItem('curriculos', JSON.stringify(mockCurriculos));
    return mockCurriculos;
  }
}

export function saveCurriculos(curriculos: Curriculo[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('curriculos', JSON.stringify(curriculos));
}

export function getCurriculoById(id: string): Curriculo | undefined {
  return getInitialCurriculos().find((item) => item.id === id);
}

export function addCurriculo(curriculo: Curriculo) {
  const current = getInitialCurriculos();
  const updated = [curriculo, ...current];
  saveCurriculos(updated);
  return updated;
}
