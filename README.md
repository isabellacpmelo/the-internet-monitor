# The Internet Monitor

> **Plataforma de Análise e Visualização de Dados de Internet**

Esse repositório consiste em uma aplicação web moderna para análise abrangente de dados de velocidade de internet, construída com React, TypeScript, Tailwind CSS e Recharts.

<div align="center">
<a href="https://internet-monitor.netlify.app/"><img height="355em" alt="The internet monitor" src="https://i.imgur.com/hSXyftf.gif" /></a>
</br>
</br>
<a href="https://internet-monitor.netlify.app/">Click here to access the website</a>
</div>

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
- **Bootstrap Icons** - Biblioteca de ícones

### **Visualização de Dados**

- **Recharts** - Biblioteca de gráficos responsivos e interativos

### **Processamento de Dados**

- **PapaParse** - Parser robusto para arquivos CSV

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

- **Paleta de Cores**: Tons vibrantes para destaque, permitindo fácil identificação do tipo de informação que está sendo exibida
- **Tipografia**: Hierarquia clara com pesos e tamanhos consistentes
- **Dimensionamento**: Sistema baseado em múltiplos de 4px (Tailwind)
- **CSS Modules**: Estilização modular e encapsulada
- **Componetes**: Criação de componentes reutilizáveis e configuráveis para garantir um código limpo e de fácil manutenção.

#### **Visualizações Inteligentes**

- **Gráficos de Pizza**: Distribuições percentuais com labels internos
- **Gráficos de Barras**: Comparações de download/upload por categoria
- **Gráfico de Dispersão**: Correlação com regressão linear automática
- **Classificação de Qualidade**: Sistema automático (Excelente/Boa/Regular/Baixa)

#### **Arquitetura Modular**

- **Componentes Reutilizáveis**: Componentes isolados e configuráveis, facilitando manutenção de código, incluindo gráficos customizados, botões e tabela.
- **Custom Hooks**: Lógica de dados reutilizável e otimizada, encapsulando funcionalidades específicas
- **Context API**: Estado global eficiente para filtros, de forma que qualquer componente pode acessar e modificar os filtros aplicados
- **TypeScript**: Tipagem forte em todos os componentes, permitindo maior segurança e autocompletar durante o desenvolvimento

## Funcionalidades Detalhadas

### **1. Sistema de Filtros Avançado**

- **Filtros Múltiplos**: Tecnologia, Localização, Dependência Administrativa
- **Interface Drawer**: Painel lateral elegante e intuitivo
- **Aplicação Dinâmica**: Filtragem em tempo real dos dados
- **Estado Persistente**: Mantém filtros durante navegação

### **2. Tabela**

- **Paginação Inteligente**: 50 registros por página com navegação completa
- **Ordenação por Colunas**: Os cabeçalhos possuem botões para ordenar asc/desc
- **Reset de Ordenação**: Botão para resetar a ordenação para o estado inicial
- **Design Responsivo**: Adaptável para diferentes tamanhos de tela
- **Exportação CSV**: Download dos dados filtrados com timestamp

### **3. Dashboard de Análises**

- **Gráficos Interativos**: Tooltips informativos
- **Análises de dados**: Médias, percentuais e correlações
- **Regressão Linear**: Gráfico de dispersão (scatter plot) com linha de tendência para download vs upload
- **Classificação de Qualidade**: Tooltips no gráfico que indicam a qualidade da internet para aquele ponto do gráfico

### **4. Experiência do Usuário**

- **Loading States**: Tela de carregamento para que o usuário saiba que os dados estão sendo processados
- **Micro-interações**: Hover effects e transições suaves com animações sutis
- **Responsividade**: Layout adaptável para mobile e desktop
- **Acessibilidade**: Cuidado com contraste e navegação por teclado, além de labels descritivos em itens interativos ou que não possuem textos
- **Meta Tags**: Otimização para SEO com meta tags relevantes.

## Decisões de Design e Arquitetura

O projeto foi estruturado com foco em modularidade, reutilização de código e uma experiência de usuário fluida.

A ideia central foi criar componentes altamente configuráveis, como gráficos customizados e botões, que pudessem ser reutilizados em diferentes partes da aplicação. Isso não só reduz a duplicação de código, mas também

Outro ponto, é a divisão entre as seções exibidas para o usuário que seguiram o fluxo de mostrar os dados de acordo com o tipo de distribuição, começando com gráficos de pizza para uma visão geral, seguido por gráficos de barras para comparações mais detalhadas, e finalizando com o gráfico de dispersão para análises de correlação.

## Deploy e Hospedagem

O **Internet Monitor** está hospedado no [Netlify](https://www.netlify.com/), proporcionando alta performance, disponibilidade e integração contínua com o GitHub.

### **Informações do Deploy:**

- **URL de Produção**: [https://internet-monitor.netlify.app/](https://internet-monitor.netlify.app/)
- **Status do Deploy**: [![Netlify Status](https://api.netlify.com/api/v1/badges/99125905-76db-46c6-a6e6-2af80ee42b96/deploy-status)](https://app.netlify.com/projects/internet-monitor/deploys)
- **Deploy Automático**: Configurado para deploy automático a partir da branch `main`
- **HTTPS**: Automaticamente provisionado com certificado SSL gratuito disponibilizado pelo Netlify

O Netlify foi escolhido pela sua facilidade de integração, performance excepcional e recursos robustos para aplicações React/Vite.

## Screenshots

### Desktop

<div align="center">
<img height="1500em" alt="Desktop Print Screen" src="https://i.imgur.com/uA2h6xc.png" />
</div>

### Mobile

<div align="center">
<img height="2000em" alt="Mobile Print Screen" src="https://i.imgur.com/dVwBUuA.png" />

</div>
