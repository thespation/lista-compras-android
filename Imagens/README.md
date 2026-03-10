# 🛒 Lista de Compras

> **[🇺🇸 Read in English](README_EN.md)**

Aplicativo Android nativo para gerenciar listas de compras com histórico de preços, análise de gastos e múltiplas paletas de cores. Funciona **100% offline** — nenhum dado sai do celular.

---

## 📸 Screenshots

### 🛒 Tela Principal — Listas

| Visão geral das listas | Criando nova lista | Menu lateral |
|:---:|:---:|:---:|
| ![Listas](screenshots/13_home_listas.png) | ![Nova Lista](screenshots/12_home_nova_lista.png) | ![Menu Lateral](screenshots/14_menu_lateral.png) |
| Listas do mês agrupadas com resumo de itens, total e tags dos produtos | Formulário inline com seleção de mercado e opção de adicionar novo | Navegação entre Listas, Análise, Configurações e Sobre |

---

### 📦 Dentro da Lista

| Itens da lista | Menu de ordenação | Editar item |
|:---:|:---:|:---:|
| ![Itens](screenshots/10_lista_itens.png) | ![Ordenação](screenshots/09_lista_menu_ordenacao.png) | ![Editar](screenshots/11_editar_item.png) |
| Itens com checkbox, quantidade, preço unitário e total | 6 ordenações + filtros de variação de preço + ações em lote | Edição com comparação de preço em tempo real e subtotal |

---

### 📊 Análise de Gastos

| Análise anual | Análise mensal | Comparação de mercados |
|:---:|:---:|:---:|
| ![Anual](screenshots/08_analise_anual.png) | ![Mensal](screenshots/07_analise_mensal.png) | ![Mercados](screenshots/06_analise_mercados.png) |
| Gráfico de barras por mês com total anual | Gráfico por lista do mês com total e navegação entre meses | Ranking de mercados por preço médio por compra |

---

### ⚙️ Configurações

| Navegação | Aparência | Tamanho da fonte | Dados |
|:---:|:---:|:---:|:---:|
| ![Navegação](screenshots/05_configuracoes_navegacao.png) | ![Aparência](screenshots/04_configuracoes_aparencia.png) | ![Fonte](screenshots/03_configuracoes_fonte.png) | ![Dados](screenshots/02_configuracoes_dados.png) |
| Gesto de deslize e posição do botão ☰ | 7 paletas com modo escuro/claro | Slider de tamanho com preview ao vivo | Backup, restauração e limpeza de dados |

---

### ℹ️ Sobre

| Tela Sobre |
|:---:|
| ![Sobre](screenshots/01_sobre.png) |
| Versão, desenvolvedor e contato |

---

## 📱 Download e Instalação

1. Acesse a página de [Releases](https://github.com/thespation/lista-compras-android/releases)
2. Baixe o arquivo `app-release.apk`
3. No Android: **Configurações → Segurança → Instalar apps desconhecidos** → ative para o gerenciador de arquivos
4. Abra o APK e toque em **Instalar**

> **Requisito mínimo:** Android 5.1 (API 22)

---

## ✨ Funcionalidades

### 🛒 Listas de Compras

- **Criar listas** com nome, data automática e mercado selecionável
- **Organização por mês** — o mês atual aparece expandido; meses anteriores ficam atrás do botão "Ver histórico"
- **Duplicar lista** — copia todos os itens para uma nova lista, com opção de zerar os valores e trocar o mercado
- **Busca global** — filtra listas por nome, mercado ou itens
- **Editar nome e mercado** — toque no cabeçalho da lista para editar inline
- **Remover lista** diretamente da tela principal

### 📦 Itens da Lista

- **Adicionar itens** com nome, quantidade e preço
- **Autocompletar** — sugere nomes de itens já usados anteriormente
- **Comparação de preço automática** — ao digitar o preço, mostra se está ▼ mais barato ou ▲ mais caro em relação à última compra
- **Seta de variação permanente** — persiste no item mesmo após marcá-lo como comprado
- **Marcar/desmarcar** itens comprados com checkbox
- **Editar item** — toque no ✏️ para corrigir nome, quantidade ou preço
- **Ordenação** por 6 critérios: inserção, alfabética, preço, marcados primeiro/último
- **Filtro de variação** — exibir só os itens que ficaram mais baratos ou mais caros
- **Total da lista** exibido em tempo real
- **Marcar todos / Desmarcar todos** de uma vez

### 📊 Análise de Gastos

- **Gastos por ano** — gráfico horizontal e tabela de números por mês
- **Gastos por mês** — gráfico de barras por lista com total mensal
- **Comparação entre mercados** — total e média por estabelecimento
- **Evolução de preço por produto** — gráfico de linha com histórico completo
- Navega entre meses para comparar períodos

### ⚙️ Configurações

#### Navegação
- Ativar/desativar gesto de deslize para abrir o menu lateral
- Posição do botão de menu (6 posições possíveis)

#### Aparência
- **7 paletas de cores**, cada uma com modo escuro e claro:
  - 🟡 **Dourado** — clássica e elegante
  - 🔵 **Nórdica** — ártico e limpa (Nord)
  - 🟤 **Gruvbox** — retrô e quente
  - 🌸 **Rosé Pine** — suave e floral
  - 🟣 **Catppuccin** — pastel techno
  - ⚫ **Meia-Noite** — OLED, preto absoluto `#000000`
  - 📄 **Papel** — tinta sobre papel, branco puro `#ffffff`

#### Fonte
- Controle de tamanho (11px a 22px) com slider e botões +/−

#### Dados
- **💾 Salvar backup agora** — snapshot com data e hora no armazenamento interno
- **📂 Ver e restaurar backups** — lista, restaura ou exclui backups individuais
- **🗑 Apagar todos os dados** — com confirmação

---

## 🗂️ Estrutura do Projeto

```
lista-compras-android/
├── android/                          # Projeto Android Studio
│   ├── app/
│   │   ├── build.gradle              # Config do módulo (AGP 8.3.2, compileSdk 34)
│   │   └── src/main/
│   │       ├── AndroidManifest.xml   # Sem permissões de internet — 100% offline
│   │       ├── assets/public/
│   │       │   ├── index.html        # App completo embutido (~263KB)
│   │       │   └── bundle.js         # Bundle React minificado
│   │       ├── java/com/listacompras/app/
│   │       │   └── MainActivity.java # WebView + back button + dark mode bridge
│   │       └── res/
│   │           ├── mipmap-*/         # Ícones em todas as densidades
│   │           └── values/themes.xml # Theme.Material.Light.NoActionBar
│   └── gradle/wrapper/
│       └── gradle-wrapper.properties # Gradle 8.5
├── src/
│   └── App.jsx                       # Código-fonte React (~2200 linhas)
├── screenshots/                      # Screenshots do app
├── README.md                         # Este arquivo (pt-BR)
└── README_EN.md                      # Versão em inglês
```

---

## 🔧 Tecnologias Utilizadas

| Tecnologia | Versão | Função |
|---|---|---|
| **React** | 18.x | Interface de usuário |
| **JavaScript (JSX)** | ES2017+ | Lógica da aplicação |
| **esbuild** | latest | Bundler — compila e minifica o JSX |
| **Android WebView** | — | Container nativo para o app web |
| **Java** | 17 | MainActivity, back button, dark mode bridge |
| **Gradle** | 8.5 | Build system Android |
| **Android Gradle Plugin** | 8.3.2 | Plugin de build Android |
| **localStorage** | Web API | Persistência de dados e backups |

> Sem frameworks externos, sem banco de dados, sem servidor, sem internet.

---

## 🏗️ Arquitetura

O app é uma **Single Page Application (SPA)** React compilada com esbuild em um único arquivo `index.html` de ~263KB. Esse arquivo é carregado por uma `WebView` Android nativa.

### Bridge Java ↔ JavaScript

```javascript
window.__androidDarkMode   // boolean — tema do sistema Android
window.__androidBack       // function — handler do botão voltar
window.__drawerOpen        // boolean — estado do menu lateral
```

### Persistência (localStorage)

| Chave | Conteúdo |
|---|---|
| `lista-compras-v2` | Listas, itens e histórico de preços |
| `lista-compras-settings` | Configurações do usuário |
| `lista-compras-backups` | Índice dos backups |
| `lista-compras-backup-{timestamp}` | Dados de cada backup individual |

---

## 📲 Como Gerar o APK

```bash
# 1. Clone o repositório
git clone https://github.com/thespation/lista-compras-android.git

# 2. Abra o Android Studio
# File → Open → selecione a pasta android/

# 3. Se aparecer "Invalid Gradle JDK": clique em "Use Embedded JDK"

# 4. Aguarde o Gradle sincronizar

# 5. Build → Build Bundle(s) / APK(s) → Build APK(s)
# APK em: android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🎮 Navegação — Botão Voltar (Android)

Comportamento em cascata:
1. Fecha qualquer modal aberto
2. Fecha o menu lateral se estiver aberto
3. Dentro de uma lista → volta para a tela de listas
4. Na tela Sobre → volta para Listas
5. Em Listas/Análise/Configurações → abre o menu lateral
6. Com menu lateral aberto → minimiza o app

---

## 👨‍💻 Desenvolvedor

**William Santos**
- GitHub: [@thespation](https://github.com/thespation)
- E-mail: thespation@gmail.com

---

## 📄 Licença

Este projeto é de uso pessoal. Sinta-se livre para usar como referência ou base para projetos próprios.
