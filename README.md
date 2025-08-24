# DSList Frontend 🎮

Uma aplicação web moderna para explorar e organizar listas de jogos, desenvolvida com Next.js e design Neumorphism.

## 🚀 Funcionalidades

- **Catálogo de Jogos**: Navegue por uma extensa coleção de jogos com detalhes completos
- **Listas por Gênero**: Explore jogos organizados por categorias e gêneros
- **Drag & Drop**: Reorganize a ordem dos jogos nas listas de forma intuitiva
- **Páginas Detalhadas**: Visualize informações completas de cada jogo
- **Modo Escuro**: Alterne entre temas claro e escuro
- **Design Responsivo**: Interface adaptável para desktop e mobile
- **Neumorphism UI**: Design moderno com efeitos de profundidade

## 🛠️ Tecnologias

- **Framework**: Next.js 15.5.0 com Turbopack
- **Frontend**: React 19.1.0 + TypeScript
- **Estilização**: Tailwind CSS 3.4.0 com design Neumorphism
- **Componentes**: Shadcn/ui + Lucide React (ícones)
- **Drag & Drop**: @dnd-kit para reordenação de listas
- **API**: Integração com backend Railway

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Pages e layouts do Next.js
│   ├── games/             # Listagem e detalhes dos jogos
│   ├── lists/             # Listas por gênero
│   └── layout.tsx         # Layout principal
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes base (shadcn/ui)
│   ├── Header.tsx        # Cabeçalho com navegação
│   └── Breadcrumb.tsx    # Navegação breadcrumb
├── contexts/             # Context API do React
│   └── ThemeContext.tsx  # Gerenciamento de tema
└── types/               # Definições TypeScript
    └── game.ts          # Interfaces dos dados
```

## 🎯 Páginas Principais

### 🏠 Homepage (`/`)
- Página inicial com apresentação do projeto
- Links para explorar jogos e listas
- Design Neumorphism com hero section

### 🎮 Lista de Jogos (`/games`)
- Catálogo completo de jogos
- Cards com informações resumidas
- Links para páginas detalhadas

### 📖 Detalhes do Jogo (`/games/[id]`)
- Informações completas do jogo
- Gênero, plataformas, pontuação
- Descrições curta e longa

### 📚 Listas por Gênero (`/lists`)
- Categorias de jogos organizadas por gênero
- Ícones dinâmicos para cada categoria
- Navegação para listas específicas

### 🎯 Jogos da Lista (`/lists/[id]/games`)
- Jogos de uma categoria específica
- Funcionalidade drag & drop para reordenação
- Salvamento da nova ordem via API

## 🎨 Design System

### Neumorphism
O projeto utiliza um sistema de design Neumorphism com classes personalizadas:
- `neu-raised`: Efeito elevado
- `neu-inset`: Efeito rebaixado
- `neu-pressed`: Efeito pressionado
- `neu-flat`: Efeito plano

### Temas
- **Claro**: Tons suaves com sombras sutis
- **Escuro**: Fundo escuro com contrastes equilibrados
- **Alternância**: Botão no header para trocar temas
- **Persistência**: Tema salvo no localStorage

## 🔌 API Integration

A aplicação consome uma API REST hospedada no Railway:
- **Base URL**: `https://dslist-production-330e.up.railway.app`
- **Endpoints**:
  - `GET /games` - Lista todos os jogos
  - `GET /games/{id}` - Detalhes de um jogo específico
  - `GET /lists` - Lista de categorias por gênero
  - `GET /lists/{id}/games` - Jogos de uma categoria
  - `POST /lists/{id}/replacement` - Reordenação de jogos

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev      # Servidor de desenvolvimento (Turbopack)
npm run build    # Build para produção (Turbopack)
npm run start    # Servidor de produção
npm run lint     # Verificação de código
```

## 📱 Responsividade

A aplicação é totalmente responsiva com breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## ♿ Acessibilidade

- Textos alternativos em imagens
- Hierarquia semântica de cabeçalhos
- Navegação por teclado
- Contraste adequado entre temas
- Aria-labels em componentes interativos

## 🔍 SEO

- Meta tags dinâmicas
- Open Graph tags
- Structured data (JSON-LD)
- URLs semânticas
- Sitemap automático

## 🌟 Próximas Funcionalidades

- [ ] Sistema de favoritos
- [ ] Busca e filtros avançados
- [ ] Avaliações de usuários
- [ ] Compartilhamento de listas
- [ ] PWA (Progressive Web App)

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests
- Melhorar a documentação

## 📧 Contato

Para dúvidas ou sugestões, entre em contato através dos issues do GitHub.

---

Desenvolvido com ❤️ usando Next.js e design Neumorphism