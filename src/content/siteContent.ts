/**
 * Conteúdo textual do site oficial (felippetn.com.br), extraído em 11/06/2026.
 * Organizado por seção e idioma (pt/en), pronto para ser consumido pelos componentes.
 */

export const pt = {
  navbar: {
    /* Os href precisam bater com os id reais das seções em App/componentes.
       Estavam em inglês (#about, #experience…) e não existiam em lugar nenhum. */
    items: [
      { label: 'Sobre', href: '#sobre' },
      { label: 'Habilidades', href: '#skills' },
      { label: 'Experiência', href: '#experiencia' },
      { label: 'Formação', href: '#formacao' },
      { label: 'Projetos', href: '#projetos' },
      { label: 'Contato', href: '#contato' },
    ],
    langToggle: 'EN',
  },

  hero: {
    locationBadge: 'Rio de Janeiro, Brasil',
    roleBadge: 'Software Engineer',
    subtitle: 'Engenheiro de Software | Liderança Técnica em Backend & IA',
    description:
      'Engenheiro de Software na PGE-RJ com atuação em liderança técnica de projetos, arquitetura de soluções escaláveis e entregas end-to-end. Especialista em backend de alta performance, IA aplicada, observabilidade e confiabilidade em ambientes de produção.',
    highlights: [
      'Engenharia de backend para produção real',
      'Operacionalização de IA com foco em escala',
      'Arquiteturas robustas com Go, Python e TypeScript',
      'Especialista em sistemas backend de alta performance',
      'Arquitetura de software orientada a domínio (DDD)',
      'Observabilidade, testes automatizados e confiabilidade',
    ],
    stats: [
      { value: '3+', label: 'Anos de Experiência' },
      { value: '24/7', label: 'Foco em Performance' },
      { value: 'Brasil', label: 'Rio de Janeiro' },
    ],
    available: 'Disponível para oportunidades',
    btnProjects: 'Ver GitHub',
    btnContact: 'Fale comigo',
  },

  about: {
    title: 'Sobre Mim',
    description:
      'Engenheiro de Software com perfil de liderança técnica, focado em backend de alta performance e produtos com IA. Na PGE-RJ, lidero iniciativas do desenho da arquitetura ao go-live, alinhando stakeholders, acelerando entregas e garantindo qualidade, escalabilidade e impacto real no negócio.',
    /* O rótulo já diz "Curiosidade"; o texto não precisa repetir a palavra. */
    funFact:
      'Já conheci pessoalmente o Tiangolo — o criador do FastAPI. Sim, aquele cara que fez a biblioteca que provavelmente está rodando em produção agora mesmo em algum lugar do planeta.',
    funFactLabel: 'Curiosidade',
    features: [
      {
        title: 'Backend & Engenharia de Software',
        description:
          'Arquitetura de sistemas backend robustos e escaláveis com Go, Python e Node.js, com foco em mantenabilidade, observabilidade e alta qualidade de engenharia.',
      },
      {
        title: 'Operações de IA',
        description:
          'Especialista em operacionalizar Inteligência Artificial — transformando modelos experimentais em produtos de software confiáveis e prontos para produção.',
      },
      {
        title: 'Performance & Escalabilidade',
        description:
          'Implementação de serviços de alta performance com Go, Python e Node.js, garantindo eficiência sob carga real.',
      },
      {
        title: 'Impacto no Negócio',
        description:
          'Comprometido com a entrega de soluções que geram valor real, com foco em resultados mensurados e alinhamento estratégico.',
      },
      {
        title: 'Colaboração & Liderança Técnica',
        description:
          'Experiência em equipes multidisciplinares, mentoria técnica, revisão de código e disseminação de boas práticas de engenharia.',
      },
      {
        title: 'Aprendizado Contínuo',
        description:
          'Estudante na USP (Engenharia de Software) e certificado pela University of Michigan, sempre evoluindo com as melhores práticas do mercado.',
      },
    ],
  },

  skills: {
    title: 'Habilidades & Tecnologias',
    description: 'Stack técnico orientado a sistemas de backend, IA e infraestrutura em nuvem',
    categories: [
      {
        title: 'Backend & Sistemas',
        skills: [
          'Go (Golang)',
          'Python',
          'Node.js',
          'TypeScript',
          'JavaScript',
          'REST APIs',
          'GraphQL',
          'gRPC',
          'WebSockets',
          'Arquitetura de Microsserviços',
          'Arquitetura Orientada a Eventos',
          'Domain-Driven Design (DDD)',
          'Clean Architecture',
          'SOLID',
          'Express.js',
          'FastAPI',
          'Django',
          'Testes Automatizados',
        ],
      },
      {
        title: 'Frontend',
        skills: [
          'React',
          'Next.js',
          'Tailwind CSS',
          'HTML5/CSS3',
          'Framer Motion',
          'Three.js',
          'Responsive Design',
          'Bootstrap CSS',
          'Acessibilidade (a11y)',
          'Design de Sistemas de UI',
        ],
      },
      {
        title: 'IA & Dados',
        skills: [
          'MCP (Model Context Protocol)',
          'RAG (Retrieval-Augmented Generation)',
          'LangChain',
          'LlamaIndex',
          'OpenAI API',
          'Hugging Face Transformers',
          'vLLM',
          'Engenharia de Prompt',
          'Agentes de IA',
          'Embeddings',
          'LLM Evals',
          'TensorFlow',
          'Pandas',
          'Operações de IA',
          'Machine Learning',
          'Pipelines de Dados',
          'Análise de Dados',
        ],
      },
      {
        title: 'DevOps & Infraestrutura',
        skills: [
          'Docker',
          'Linux',
          'AWS',
          'GCP',
          'Kubernetes',
          'Terraform',
          'CI/CD',
          'GitHub Actions',
          'Observabilidade',
          'Git',
          'GitHub',
          'Postman',
        ],
      },
      {
        title: 'Banco de Dados',
        skills: [
          'PostgreSQL',
          'MySQL',
          'MongoDB',
          'Redis',
          'Elasticsearch',
          'pgvector',
          'Milvus',
          'Typesense',
          'Qdrant',
          'Weaviate',
          'Pinecone',
        ],
      },
      {
        title: 'Soft Skills',
        skills: [
          'Liderança Técnica',
          'Comunicação',
          'Resolução de Problemas',
          'Pensamento Crítico',
          'Trabalho em Equipe',
          'Gestão de Projetos',
          'Product Thinking',
          'Ownership',
        ],
      },
    ],
  },

  experience: {
    title: 'Experiência Profissional',
    description: 'Do setor público à indústria de tecnologia, construindo sistemas reais',
    items: [
      {
        title: 'Engenheiro de Software',
        company: 'PGE-RJ — Procuradoria-Geral do Estado do Rio de Janeiro',
        period: '2024 — Presente',
        description:
          'Atuação na ponte entre Engenharia de Software tradicional e Inteligência Artificial moderna. Responsável por operacionalizar modelos de IA, transformando soluções experimentais em sistemas de produção confiáveis, escaláveis e de alta performance.',
        achievements: [
          'Operacionalização de modelos de IA em ambiente de produção estatal',
          'Desenvolvimento de serviços backend de alta performance com Go e Python',
          'Implementação de pipelines de dados e integração com infraestrutura cloud (AWS/GCP)',
          'Containerização e orquestração de serviços com Docker e Linux',
          'Arquitetura de sistemas escaláveis orientados a domínio',
        ],
      },
      {
        title: 'Engenheiro de Software',
        company: 'LogicAI Solutions',
        period: '2024 — 2025',
        description:
          'Desenvolvimento de produtos de software completos, desde sistemas de gerenciamento educacional até plataformas web institucionais. Liderança técnica em projetos de ponta a ponta com TypeScript, React e Node.js.',
        achievements: [
          'Desenvolvimento do TeacherApp — plataforma de gerenciamento de estudantes',
          'Criação do site institucional da LogicAI Solutions com TypeScript',
          'Implementação de arquiteturas REST e integração com banco de dados relacional',
          'Contribuição com mais de 93% dos commits no repositório principal do produto',
          'Aplicação de metodologias ágeis com Scrum e Kanban',
        ],
      },
      {
        title: 'Estagiário de Desenvolvimento',
        company: 'PGE-RJ — Procuradoria-Geral do Estado do Rio de Janeiro · Estágio · Híbrido',
        period: 'jan de 2024 - jul de 2024 · 7 meses',
        description:
          'Atuação no desenvolvimento e implementação de projetos de inovação tecnológica com foco em Inteligência Artificial, participando de todo o ciclo de vida de soluções inteligentes, da concepção à execução técnica.',
        achievements: [
          'Suporte ativo na pesquisa, prototipação e implementação de modelos e algoritmos de IA',
          'Auxílio no desenvolvimento e manutenção de softwares e APIs com Python, Django e Node.js',
          'Colaboração com equipes multidisciplinares para garantir entrega e funcionalidade das soluções',
          'Trabalho em equipe, comunicação e desenvolvimento de competências técnicas e comportamentais',
        ],
      },
      {
        title: 'Estagiário de Suporte de TI',
        company: 'PGE-RJ — Procuradoria-Geral do Estado do Rio de Janeiro · Estágio · Presencial',
        period: 'jun de 2023 - jul de 2024 · 1 ano 2 meses',
        description:
          'Atuação de suporte em sistemas legados e rotinas de evolução de software, com participação em testes, documentação, relatórios e atividades de front-end e back-end.',
        achievements: [
          'Auxílio nas atividades de manutenção dos sistemas legados',
          'Auxílio nos testes de novas versões',
          'Auxílio na confecção de relatórios',
          'Auxílio nas atividades de elaboração de front-end e back-end',
          'Auxílio na documentação',
        ],
      },
      {
        title: 'Engenheiro de Software Autônomo',
        company: 'Autônomo - Freelance',
        period: '2022 - Presente',
        description:
          'Atuacao como autonomo no desenvolvimento de software sob medida para empresas, startups e empreendedores, com foco em solucoes web, automacao inteligente, APIs e aplicacoes com IA.',
        achievements: [
          'Desenvolvimento web full-stack com Python, Django, Node.js e TypeScript',
          'Criacao de chatbots, fluxos com LLMs e ferramentas de NLP',
          'Construcao de APIs REST seguras e escalaveis para integracoes',
          'Automacao de processos para ganho operacional e reducao de custo',
          'Consultoria tecnica em arquitetura, stack e boas praticas de desenvolvimento',
        ],
      },
    ],
  },

  education: {
    title: 'Formação & Certificações',
    description: 'Formação acadêmica sólida e certificações internacionais',
    certificationsLabel: 'Certificações',
    issuedLabel: 'Emitida em',
    credentialIdLabel: 'Código da credencial',
    skillsLabel: 'Competências',
    viewCredentialLabel: 'Exibir credencial',
    items: [
      {
        degree: 'Pós-graduação Lato Sensu - MBA em Engenharia de Software',
        institution: 'MBA USP/Esalq',
        period: 'out de 2025 — Em andamento',
        description:
          'MBA com foco em engenharia de software aplicada a escala, arquitetura corporativa, liderança técnica e gestão estratégica de produtos e times de tecnologia.',
        highlights: [
          'Arquitetura de Software em Contextos Corporativos',
          'Liderança Técnica e Gestão de Times',
          'Engenharia de Produto e Escalabilidade',
          'Boas Práticas de Qualidade de Software',
          'Estratégia, Inovação e Transformação Digital',
        ],
      },
      {
        degree: 'Pós-graduação Lato Sensu - Especialização em Engenharia de Software',
        institution: 'Faculdade Líbano',
        period: 'jun de 2025 — nov de 2025',
        description:
          'Especialização voltada para fundamentos e práticas avançadas de engenharia de software, cobrindo ciclo completo de desenvolvimento, arquitetura e qualidade.',
        highlights: [
          'Ciclo de Vida de Desenvolvimento de Software',
          'Padrões Arquiteturais e Design de Sistemas',
          'Modelagem, Requisitos e Documentação Técnica',
          'Qualidade, Testes e Melhoria Contínua',
          'Boas Práticas de Engenharia para Produção',
        ],
      },
      {
        degree:
          'Pós-graduação Lato Sensu - Especialização em Ciência de Dados e Inteligência Artificial',
        institution: 'Faculdade Líbano',
        period: 'fev de 2025 — out de 2025',
        description:
          'Especialização em ciência de dados e IA, com foco em análise estatística, machine learning e aplicação prática de modelos inteligentes em cenários reais.',
        highlights: [
          'Estatística Aplicada e Análise de Dados',
          'Machine Learning e Modelagem Preditiva',
          'Fluxos de Dados e Preparação de Features',
          'Aplicações Práticas de Inteligência Artificial',
          'Certificado de Conclusão: Ciência de Dados e IA',
        ],
      },
      {
        degree: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
        institution: 'Estácio',
        period: 'jan de 2022 — dez de 2024',
        description:
          'Formação tecnológica com base sólida em desenvolvimento de sistemas, banco de dados, programação e construção de aplicações para ambientes corporativos.',
        highlights: [
          'Fundamentos de Programação e Estruturas de Dados',
          'Desenvolvimento Web e Aplicações Corporativas',
          'Banco de Dados Relacionais e SQL',
          'Análise de Sistemas e Engenharia de Requisitos',
          'Certificado de Conclusão de Curso',
        ],
      },
    ],
    certifications: [
      {
        title: 'Generative AI for Data Science',
        institution: 'Microsoft',
        year: 'abr de 2025',
        issued: 'abr de 2025',
        credentialId: '0YGWX2B0KD0E',
      },
      {
        title: 'Applied Data Science with Python',
        institution: 'University of Michigan',
        year: 'abr de 2025',
        issued: 'abr de 2025',
        credentialId: '74DA9FWZFD6G',
      },
      {
        title: 'Applied Social Network Analysis in Python',
        institution: 'University of Michigan',
        year: 'mar de 2025',
        issued: 'mar de 2025',
        credentialId: 'PNO6SQ5UQKZ2',
      },
      {
        title: 'Applied Text Mining in Python',
        institution: 'University of Michigan',
        year: 'mar de 2025',
        issued: 'mar de 2025',
        skills: ['text mining', 'Mineração de textos', '+1 competência'],
      },
      {
        title: 'Applied Plotting, Charting & Data Representation in Python',
        institution: 'University of Michigan',
        year: 'mar de 2025',
        issued: 'mar de 2025',
        skills: ['data visualization', 'data virtualization', '+1 competência'],
      },
      {
        title: 'Introduction to Data Science in Python',
        institution: 'University of Michigan',
        year: 'mar de 2025',
        issued: 'mar de 2025',
        credentialId: 'VXVIKTIUKQ65',
        skills: ['NumPy', 'pandas'],
      },
      {
        title: 'Applied Machine Learning in Python',
        institution: 'University of Michigan',
        year: 'abr de 2025',
        issued: 'abr de 2025',
        skills: ['Algoritmos de aprendizado de máquina', 'Scikit-Learn'],
      },
    ],
  },

  projects: {
    title: 'Projetos em Destaque',
    description: 'Produtos reais em produção que desenvolvo e mantenho',
    items: [
      {
        title: 'Romaneio Rápido',
        url: 'romaneiorapido.com.br',
        description:
          'Plataforma para emissão e gestão de romaneios de forma rápida e descomplicada, voltada a operações de logística e expedição que precisam de agilidade no dia a dia.',
        tags: ['SaaS', 'Logística', 'Web App'],
      },
      {
        title: 'Vitrine Rápida',
        url: 'vitrinerapida.com.br',
        description:
          'Ferramenta para criar vitrines e catálogos digitais em minutos, permitindo que negócios exponham seus produtos online e compartilhem com clientes sem complicação.',
        tags: ['E-commerce', 'Catálogo Digital', 'Web App'],
      },
      {
        title: 'LogicAI Solutions',
        url: 'logicaisolutions.com.br',
        description:
          'Software house focada em soluções inteligentes de TI — do desenvolvimento de produtos sob medida à aplicação de Inteligência Artificial em processos de negócio.',
        tags: ['Software House', 'IA', 'Consultoria'],
      },
    ],
  },

  contact: {
    title: 'Vamos Conversar?',
    description:
      'Estou sempre aberto a novas oportunidades e colaborações. Se você tem um projeto desafiador ou uma posição que faça sentido, entre em contato.',
    btnWhatsapp: 'Chamar no WhatsApp',
  },
}

export type SiteContent = typeof pt

export const en: SiteContent = {
  navbar: {
    items: [
      { label: 'About', href: '#about' },
      { label: 'Skills', href: '#skills' },
      { label: 'Experience', href: '#experience' },
      { label: 'Education', href: '#education' },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '#contact' },
    ],
    langToggle: 'PT',
  },

  hero: {
    locationBadge: 'Rio de Janeiro, Brazil',
    roleBadge: 'Software Engineer',
    subtitle: 'Software Engineer | Technical Leadership in Backend & AI',
    description:
      'Software Engineer at PGE-RJ driving technical leadership across projects, scalable solution architecture, and end-to-end delivery. Specialized in high-performance backend, applied AI, observability, and reliability in production environments.',
    highlights: [
      'Backend engineering for real-world production',
      'AI operationalization focused on scale',
      'Robust architectures with Go, Python & TypeScript',
      'Specialist in high-performance backend systems',
      'Domain-driven software architecture (DDD)',
      'Observability, automated testing and reliability',
    ],
    stats: [
      { value: '3+', label: 'Years of Experience' },
      { value: '24/7', label: 'Performance Focus' },
      { value: 'BR', label: 'Rio de Janeiro' },
    ],
    available: 'Available for opportunities',
    btnProjects: 'View GitHub',
    btnContact: 'Get in Touch',
  },

  about: {
    title: 'About Me',
    description:
      'Software Engineer with a technical leadership profile, focused on high-performance backend and AI-powered products. At PGE-RJ, I lead initiatives from architecture design to go-live, align stakeholders, accelerate delivery, and ensure quality, scalability, and measurable business impact.',
    funFact:
      "🎉 Fun fact: I've met Tiangolo in person — the creator of FastAPI. Yeah, the guy who built the library probably running in production somewhere on the planet right now.",
    funFactLabel: 'Fun fact',
    features: [
      {
        title: 'Backend & Software Engineering',
        description:
          'Architecture of robust and scalable backend production systems with Go, Python and Node.js, focusing on maintainability, observability and high-quality engineering.',
      },
      {
        title: 'AI Operations',
        description:
          'Specialist in operationalizing AI — turning experimental models into reliable, production-ready software products.',
      },
      {
        title: 'Performance & Scalability',
        description:
          'High-performance services with Go, Python and Node.js, ensuring efficiency under real-world load.',
      },
      {
        title: 'Business Impact',
        description:
          'Committed to delivering solutions that generate real value, with measured results and strategic alignment.',
      },
      {
        title: 'Collaboration & Technical Leadership',
        description:
          'Experience in multidisciplinary teams, technical mentorship, code review and dissemination of engineering best practices.',
      },
      {
        title: 'Continuous Learning',
        description:
          'Computer Science student at USP and certified by the University of Michigan, always evolving with the best market practices.',
      },
    ],
  },

  skills: {
    title: 'Skills & Technologies',
    description: 'Technical stack focused on backend systems, AI and cloud infrastructure',
    categories: [
      {
        title: 'Backend & Systems',
        skills: [
          'Go (Golang)',
          'Python',
          'Node.js',
          'TypeScript',
          'JavaScript',
          'REST APIs',
          'GraphQL',
          'gRPC',
          'WebSockets',
          'Microservices Architecture',
          'Event-Driven Architecture',
          'Domain-Driven Design (DDD)',
          'Clean Architecture',
          'SOLID',
          'Express.js',
          'FastAPI',
          'Django',
          'Automated Testing',
        ],
      },
      {
        title: 'Frontend',
        skills: [
          'React',
          'Next.js',
          'Tailwind CSS',
          'HTML5/CSS3',
          'Framer Motion',
          'Three.js',
          'Responsive Design',
          'Bootstrap CSS',
          'Accessibility (a11y)',
          'UI System Design',
        ],
      },
      {
        title: 'AI & Data',
        skills: [
          'MCP (Model Context Protocol)',
          'RAG (Retrieval-Augmented Generation)',
          'LangChain',
          'LlamaIndex',
          'OpenAI API',
          'Hugging Face Transformers',
          'vLLM',
          'Prompt Engineering',
          'AI Agents',
          'Embeddings',
          'LLM Evals',
          'TensorFlow',
          'Pandas',
          'AI Operations',
          'Machine Learning',
          'Data Pipelines',
          'Data Analysis',
        ],
      },
      {
        title: 'DevOps & Infrastructure',
        skills: [
          'Docker',
          'Linux',
          'AWS',
          'GCP',
          'Kubernetes',
          'Terraform',
          'CI/CD',
          'GitHub Actions',
          'Observability',
          'Git',
          'GitHub',
          'Postman',
        ],
      },
      {
        title: 'Databases',
        skills: [
          'PostgreSQL',
          'MySQL',
          'MongoDB',
          'Redis',
          'Elasticsearch',
          'pgvector',
          'Milvus',
          'Typesense',
          'Qdrant',
          'Weaviate',
          'Pinecone',
        ],
      },
      {
        title: 'Soft Skills',
        skills: [
          'Technical Leadership',
          'Communication',
          'Problem Solving',
          'Critical Thinking',
          'Teamwork',
          'Project Management',
          'Product Thinking',
          'Ownership',
        ],
      },
    ],
  },

  experience: {
    title: 'Professional Experience',
    description: 'From the public sector to the tech industry, building real systems',
    items: [
      {
        title: 'Software Engineer',
        company: 'PGE-RJ — Attorney General of the State of Rio de Janeiro',
        period: '2024 — Present',
        description:
          'Acting at the intersection of traditional Software Engineering and modern Artificial Intelligence. Responsible for operationalizing AI models, turning experimental solutions into reliable, scalable and high-performance production systems.',
        achievements: [
          'Operationalization of AI models in a state production environment',
          'Development of high-performance backend services with Go and Python',
          'Data pipeline implementation and integration with cloud infrastructure (AWS/GCP)',
          'Containerization and service orchestration with Docker and Linux',
          'Architecture of scalable domain-driven systems',
        ],
      },
      {
        title: 'Software Engineer',
        company: 'LogicAI Solutions',
        period: '2024 — 2025',
        description:
          'Full-stack software product development, from educational management systems to institutional web platforms. Technical leadership in end-to-end projects using TypeScript, React and Node.js.',
        achievements: [
          'Development of TeacherApp — student management platform',
          'Creation of the LogicAI Solutions institutional website with TypeScript',
          'Implementation of REST architectures and relational database integration',
          'Contributed more than 93% of commits to the main product repository',
          'Application of agile methodologies with Scrum and Kanban',
        ],
      },
      {
        title: 'Software Development Intern',
        company: 'PGE-RJ — Attorney General of the State of Rio de Janeiro · Internship · Hybrid',
        period: 'Jan 2024 - Jul 2024 · 7 months',
        description:
          'Worked on the development and implementation of technology innovation projects focused on Artificial Intelligence, supporting the full lifecycle of intelligent solutions from concept to technical execution.',
        achievements: [
          'Active support in research, prototyping, and implementation of AI models and algorithms',
          'Assisted with software and API development and maintenance using Python, Django, and Node.js',
          'Collaborated with multidisciplinary teams to ensure delivery and functionality of innovative solutions',
          'Teamwork, communication, and growth in technical and behavioral skills',
        ],
      },
      {
        title: 'IT Support Intern',
        company: 'PGE-RJ — Attorney General of the State of Rio de Janeiro · Internship · On-site',
        period: 'Jun 2023 - Jul 2024 · 1 year 2 months',
        description:
          'Supported legacy system routines and software evolution tasks, including testing, documentation, reporting, and front-end/back-end activities.',
        achievements: [
          'Assisted with legacy systems maintenance activities',
          'Assisted in testing new software versions',
          'Assisted in report creation',
          'Assisted in front-end and back-end development activities',
          'Assisted in documentation tasks',
        ],
      },
      {
        title: 'Freelance Software Engineer',
        company: 'Self-employed - Freelance',
        period: '2022 - Present',
        description:
          'Self-employed software engineer building custom solutions for companies, startups, and entrepreneurs, with focus on web applications, intelligent automation, APIs, and AI-powered systems.',
        achievements: [
          'Full-stack web development with Python, Django, Node.js, and TypeScript',
          'Chatbots, LLM workflows, and NLP tooling for real business use cases',
          'Secure and scalable REST APIs for integrations and product backends',
          'Process automation to reduce manual work and improve efficiency',
          'Technical consulting on architecture, stack decisions, and engineering practices',
        ],
      },
    ],
  },

  education: {
    title: 'Education & Certifications',
    description: 'Solid academic background and international certifications',
    certificationsLabel: 'Certifications',
    issuedLabel: 'Issued',
    credentialIdLabel: 'Credential ID',
    skillsLabel: 'Skills',
    viewCredentialLabel: 'View credential',
    items: [
      {
        degree: 'Lato Sensu Graduate Program - MBA in Software Engineering',
        institution: 'MBA USP/Esalq',
        period: 'Oct 2025 — In progress',
        description:
          'MBA focused on software engineering at scale, enterprise architecture, technical leadership, and strategic management of products and technology teams.',
        highlights: [
          'Software Architecture in Enterprise Contexts',
          'Technical Leadership and Team Management',
          'Product Engineering and Scalability',
          'Software Quality Best Practices',
          'Strategy, Innovation, and Digital Transformation',
        ],
      },
      {
        degree: 'Lato Sensu Graduate Program - Specialization in Software Engineering',
        institution: 'Faculdade Libano',
        period: 'Jun 2025 — Nov 2025',
        description:
          'Specialization focused on advanced software engineering foundations and practices, covering the full development lifecycle, architecture, and quality.',
        highlights: [
          'Software Development Lifecycle',
          'Architectural Patterns and System Design',
          'Modeling, Requirements, and Technical Documentation',
          'Quality, Testing, and Continuous Improvement',
          'Production-Oriented Engineering Practices',
        ],
      },
      {
        degree:
          'Lato Sensu Graduate Program - Specialization in Data Science and Artificial Intelligence',
        institution: 'Faculdade Libano',
        period: 'Feb 2025 — Oct 2025',
        description:
          'Specialization in data science and AI, focused on statistical analysis, machine learning, and practical application of intelligent models in real-world scenarios.',
        highlights: [
          'Applied Statistics and Data Analysis',
          'Machine Learning and Predictive Modeling',
          'Data Pipelines and Feature Preparation',
          'Practical Artificial Intelligence Applications',
          'Completion Certificate: Data Science and AI',
        ],
      },
      {
        degree: 'Technology Degree in Systems Analysis and Development',
        institution: 'Estacio',
        period: 'Jan 2022 — Dec 2024',
        description:
          'Technology degree with a strong foundation in systems development, databases, programming, and application building for enterprise environments.',
        highlights: [
          'Programming Fundamentals and Data Structures',
          'Web Development and Enterprise Applications',
          'Relational Databases and SQL',
          'Systems Analysis and Requirements Engineering',
          'Course Completion Certificate',
        ],
      },
    ],
    certifications: [
      {
        title: 'Generative AI for Data Science',
        institution: 'Microsoft',
        year: 'Apr 2025',
        issued: 'Apr 2025',
        credentialId: '0YGWX2B0KD0E',
      },
      {
        title: 'Applied Data Science with Python',
        institution: 'University of Michigan',
        year: 'Apr 2025',
        issued: 'Apr 2025',
        credentialId: '74DA9FWZFD6G',
      },
      {
        title: 'Applied Social Network Analysis in Python',
        institution: 'University of Michigan',
        year: 'Mar 2025',
        issued: 'Mar 2025',
        credentialId: 'PNO6SQ5UQKZ2',
      },
      {
        title: 'Applied Text Mining in Python',
        institution: 'University of Michigan',
        year: 'Mar 2025',
        issued: 'Mar 2025',
        skills: ['Text mining', 'Text mining', '+1 skill'],
      },
      {
        title: 'Applied Plotting, Charting & Data Representation in Python',
        institution: 'University of Michigan',
        year: 'Mar 2025',
        issued: 'Mar 2025',
        skills: ['Data visualization', 'Data virtualization', '+1 skill'],
      },
      {
        title: 'Introduction to Data Science in Python',
        institution: 'University of Michigan',
        year: 'Mar 2025',
        issued: 'Mar 2025',
        credentialId: 'VXVIKTIUKQ65',
        skills: ['NumPy', 'pandas'],
      },
      {
        title: 'Applied Machine Learning in Python',
        institution: 'University of Michigan',
        year: 'Apr 2025',
        issued: 'Apr 2025',
        skills: ['Machine learning algorithms', 'Scikit-Learn'],
      },
    ],
  },

  projects: {
    title: 'Featured Projects',
    description: 'Real products in production that I build and maintain',
    items: [
      {
        title: 'Romaneio Rápido',
        url: 'romaneiorapido.com.br',
        description:
          'A platform to issue and manage packing lists (romaneios) quickly and effortlessly, built for logistics and shipping operations that need agility in their daily routine.',
        tags: ['SaaS', 'Logistics', 'Web App'],
      },
      {
        title: 'Vitrine Rápida',
        url: 'vitrinerapida.com.br',
        description:
          'A tool to create digital storefronts and catalogs in minutes, letting businesses showcase their products online and share them with customers hassle-free.',
        tags: ['E-commerce', 'Digital Catalog', 'Web App'],
      },
      {
        title: 'LogicAI Solutions',
        url: 'logicaisolutions.com.br',
        description:
          'Software house focused on intelligent IT solutions — from custom product development to applying Artificial Intelligence across business processes.',
        tags: ['Software House', 'AI', 'Consulting'],
      },
    ],
  },

  contact: {
    title: "Let's Talk?",
    description:
      "I'm always open to new opportunities and collaborations. If you have a challenging project or a role that makes sense, reach out.",
    btnWhatsapp: 'Chat on WhatsApp',
  },
}
