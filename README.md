# The Internet Monitor

> **Plataforma de Análise e Visualização de Dados de Internet**

Esse repositório consiste em uma aplicação web moderna para análise abrangente de dados de velocidade de internet, construída com React, TypeScript, Tailwind CSS e Recharts.

## Visão Geral

O **Internet Monitor** é uma ferramenta de análise de dados que permite visualizar e compreender padrões de conectividade à internet através de dashboards interativos, gráficos dinâmicos e tabelas paginadas com sistema de filtros avançado. A aplicação consome um dataset CSV contendo informações detalhadas sobre velocidades de download e upload, tipo de localização, tecnologias utilizadas e dependências administrativas.

Exemplo de dados do dataset:
| ID | Download | Upload | Administração | Localização | Tecnologia |
|----|----------|--------|---------------|-------------|------------|
| 00083618 | 300.7 | 75 | Municipal | Rural | Cable Modem |

### Principais Funcionalidades

- **Dashboards Interativos**: Visualizações em com gráficos de pizza, barras e dispersão
- **Sistema de Filtros Avançado**: Filtros por tecnologia, localização e dependência administrativa
- **Tabela paginada**: Paginação com 50 registros/página e com ordenação por colunas
- **Análises Estatísticas**: Análises de médias e distribuições por tipo de tecnologia ou dependência
- **Exportação de Dados**: Download dos dados filtrados em formato CSV
- **Interface Responsiva**: Design moderno adaptável para desktop e mobile

## Tecnologias Utilizadas

### **Tecnologias principais**

- **React 19** - Biblioteca principal para interface de usuário
- **TypeScript** - Tipagem estática para maior robustez
- **Vite** - Build tool ultra-rápido para desenvolvimento

### **UI**

- **Tailwind CSS 4** - Framework de CSS utilitário
- **Bootstrap Icons** - Biblioteca de ícones profissionais
<!-- - **CSS Modules** - Estilização modular e encapsulada -->

### **Visualização de Dados**

- **Recharts** - Biblioteca de gráficos responsivos e interativos
<!-- - **Componentes Customizados** - Gráficos reutilizáveis (Pie, Bar, Scatter) -->

### **Processamento de Dados**

- **PapaParse** - Parser robusto para arquivos CSV
<!-- - **Custom Hooks** - Lógica de dados reutilizável e otimizada -->

## 📦 Instalação e Execução

### **Pré-requisitos**

- **Node.js** (versão 18+ recomendada)
- **npm** ou **pnpm** como gerenciador de pacotes

### **Passos para Instalação**

1. **Clone o repositório**

   ```bash
   git clone https://github.com/isabellacpmelo/the-internet-monitor.git
   cd the-internet-monitor
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   pnpm install
   ```

3. **Execute o projeto em desenvolvimento**

   ```bash
   npm run dev
   # ou
   pnpm run dev
   ```

4. **Acesse a aplicação**
   ```
   http://localhost:5173
   ```

### **Scripts Disponíveis**

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview da build de produção
npm run lint     # Verificação de código com ESLint
```

## Arquitetura do Projeto

### **Estrutura de Pastas**

```
src/
├── components/           # Componentes React reutilizáveis
│   ├── AppButton/       # Botão customizado com variantes
│   ├── DatasetCharts/   # Dashboard principal de gráficos
│   ├── DatasetSummary/  # Resumo estatístico dos dados
│   ├── DatasetTable/    # Tabela paginada com ordenação
│   ├── FilterDrawer/    # Drawer lateral de filtros
│   ├── Filters/         # Sistema de filtros avançado
│   ├── CustomPieChart/  # Componente reutilizável de pizza
│   ├── CustomBarChart/ # Componente reutilizável de barras
│   ├── CustomScatterChart/ # Componente reutilizável de dispersão
│   └── TableHeadButton/ # Botão de ordenação de colunas
├── contexts/            # Contextos React para estado global
│   └── FiltersContext.tsx # Gerenciamento de estado dos filtros
├── hooks/              # Custom hooks reutilizáveis
│   ├── DatasetStats.ts     # Hook para estatísticas dos dados
│   ├── useDatasetCsv.ts   # Hook para carregamento de CSV
│   └── useFilterDrawer.ts # Hook para controle do drawer
├── templates/          # Templates de layout
│   └── MainTemplate/   # Layout principal da aplicação
├── types/             # Definições TypeScript
│   └── filters.ts     # Tipos para filtros e dados
└── public/assets/csv/ # Dataset CSV principal
```

### **Padrões de Design Implementados**

#### **Design System Consistente**

- **Paleta de Cores**: Tons profissionais de azul, cinza e accent colors
- **Tipografia**: Hierarquia clara com pesos e tamanhos consistentes
- **Espaçamento**: Sistema baseado em múltiplos de 4px (Tailwind)

#### **Visualizações Inteligentes**

- **Gráficos de Pizza**: Distribuições percentuais com labels internos
- **Gráficos de Barras**: Comparações de download/upload por categoria
- **Gráfico de Dispersão**: Correlação com regressão linear automática
- **Classificação de Qualidade**: Sistema automático (Excelente/Boa/Regular/Baixa)

#### **Arquitetura Modular**

- **Componentes Reutilizáveis**: Gráficos configuráveis via props
- **Custom Hooks**: Lógica de negócio separada da apresentação
- **Context API**: Estado global eficiente para filtros
- **TypeScript**: Tipagem forte em todos os componentes

## Funcionalidades Detalhadas

### **1. Sistema de Filtros Avançado**

- **Filtros Múltiplos**: Tecnologia, Localização, Dependência Administrativa
- **Interface Drawer**: Painel lateral elegante e intuitivo
- **Aplicação Dinâmica**: Filtragem em tempo real dos dados
- **Estado Persistente**: Mantém filtros durante navegação

### **2. Tabela**

- **Paginação Inteligente**: 50 registros por página com navegação completa
- **Ordenação por Colunas**: Os cabeçalhos possuem botões para ordenar asc/desc
- **Design Responsivo**: Adaptável para diferentes tamanhos de tela
- **Exportação CSV**: Download dos dados filtrados com timestamp

### **3. Dashboard de Análises**

- **Gráficos Interativos**: Tooltips informativos
- **Análises de dados**: Médias, percentuais e correlações
- **Regressão Linear**: Tendência automática no gráfico de dispersão
- **Classificação de Qualidade**: O scatter plot possue tooltips que indicam a qualidade da internet para aquele ponto do gráfico

### **4. Experiência do Usuário**

- **Loading States**: Indicadores visuais durante carregamento
- **Micro-interações**: Hover effects e transições suaves
- **Responsividade**: Layout adaptável para mobile e desktop
- **Acessibilidade**: Cuidado com contraste e navegação por teclado, além de labels descritivos em itens interativos ou que não possuem textos

## Decisões de Design e Arquitetura
