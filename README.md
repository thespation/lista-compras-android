# 🛒 Lista de Compras

> **[🇺🇸 Read in English](README_EN.md)**

Aplicativo Android nativo para gerenciar listas de compras com histórico de preços, análise de gastos e múltiplas paletas de cores. Funciona **100% offline** — nenhum dado sai do celular.

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
- **Seta de variação** persiste no item após adicionar (não some)
- **Marcar/desmarcar** itens comprados com checkbox
- **Editar item** — toque no ✏️ para corrigir nome, quantidade ou preço; a comparação de preço é recalculada ao salvar
- **Ordenação** por 6 critérios:
  - Ordem de inserção
  - Alfabética (A→Z)
  - Alfabética + marcados abaixo
  - Inserção + marcados abaixo
  - Marcados primeiro
  - Menor preço total primeiro
- **Filtro de variação** — exibir só os itens que ficaram mais baratos ou mais caros
- **Total da lista** exibido em tempo real
- **Marcar todos / Desmarcar todos** de uma vez

### 📊 Análise de Gastos

- **Gastos por mês** — gráfico de barras com total mensal
- **Comparação entre mercados** — total e média por estabelecimento
- **Evolução de preço por produto** — gráfico de linha mostrando a variação histórica de qualquer item
- **Tabela de histórico** por produto com data, mercado e preço
- **Últimas listas** com resumo rápido e acesso direto
- Navega entre meses para comparar períodos

### ⚙️ Configurações

#### Navegação
- Ativar/desativar gesto de deslize para abrir o menu lateral
- Posição do botão de menu (canto superior esquerdo, direito ou inferior)

#### Aparência
- **7 paletas de cores**, cada uma com modo escuro e claro:
  - 🟡 **Dourado** — clássica e elegante
  - 🔵 **Nórdica** — ártico e limpa (Nord)
  - 🟤 **Gruvbox** — retrô e quente
  - 🌸 **Rosé Pine** — suave e floral
  - 🟣 **Catppuccin** — pastel techno
  - ⚫ **Meia-Noite** — OLED, preto absoluto `#000000`
  - 📄 **Papel** — tinta sobre papel, branco puro `#ffffff`
- Alternância rápida entre **modo escuro** e **modo claro**

#### Fonte
- Controle de tamanho da fonte (11px a 22px) com slider e botões +/−
- Preview em tempo real

#### Mercados
- Adicionar, editar e remover mercados personalizados
- Lista usada na criação e edição de listas

#### Dados
- **💾 Salvar backup agora** — salva um snapshot no armazenamento interno do app com data e hora
- **📂 Ver e restaurar backups** — lista todos os backups salvos com nome, quantidade de listas e tamanho; permite restaurar (com confirmação de sobrescrita) ou excluir cada backup individualmente
- **🗑 Apagar todos os dados** — modal de confirmação antes de apagar

### ℹ️ Sobre
Acessível pelo menu lateral → botão "Sobre o app":
- Versão do aplicativo
- Nome do desenvolvedor
- E-mail de contato

---

## 🗂️ Estrutura do Projeto

```
lista-compras-android/
├── android/                          # Projeto Android Studio
│   ├── app/
│   │   ├── build.gradle              # Config do módulo (AGP 8.3.2, compileSdk 34)
│   │   ├── proguard-rules.pro
│   │   └── src/main/
│   │       ├── AndroidManifest.xml   # Permissões e configuração da Activity
│   │       ├── assets/public/
│   │       │   ├── index.html        # App completo (bundle embutido, ~256KB)
│   │       │   └── bundle.js         # Bundle React minificado
│   │       ├── java/com/listacompras/app/
│   │       │   └── MainActivity.java # WebView + back button handler + dark mode
│   │       └── res/
│   │           ├── mipmap-*/         # Ícones em todas as densidades (mdpi→xxxhdpi)
│   │           └── values/
│   │               ├── strings.xml
│   │               └── themes.xml    # Theme.Material.Light.NoActionBar
│   ├── build.gradle                  # Root build (plugins)
│   ├── settings.gradle               # Repositórios e módulos
│   ├── gradle.properties
│   └── gradle/wrapper/
│       └── gradle-wrapper.properties # Gradle 8.5
├── dist/
│   ├── index.html                    # Mesma que android/assets/public/
│   └── bundle.js
├── src/
│   ├── App.jsx                       # Código-fonte React (~2100 linhas)
│   ├── main.jsx                      # Entry point
│   └── main-bundle.jsx               # Entry para build com esbuild
├── capacitor.config.json
├── package.json
├── vite.config.js
├── LEIA-ME.md
├── README.md                         # Este arquivo
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
| **CSS-in-JS** | — | Estilização via objetos de estilo inline |

> Sem frameworks externos, sem banco de dados, sem servidor, sem internet.

---

## 🏗️ Arquitetura

O app é uma **Single Page Application (SPA)** React compilada com esbuild em um único arquivo `index.html` de ~256KB. Esse arquivo é carregado por uma `WebView` Android nativa.

### Fluxo de dados
```
Usuario interage → React state → localStorage (persistência automática)
```

### Bridge Java ↔ JavaScript

A `MainActivity.java` injeta variáveis globais no JavaScript:

```javascript
window.__androidDarkMode   // boolean — tema do sistema Android
window.__androidBack       // function — handler do botão voltar
window.__drawerOpen        // boolean — estado do menu lateral
```

### Persistência

Todos os dados ficam no `localStorage` do WebView:

| Chave | Conteúdo |
|---|---|
| `lista-compras-v2` | Listas, itens e histórico de preços |
| `lista-compras-settings` | Configurações do usuário |
| `lista-compras-backups` | Índice dos backups |
| `lista-compras-backup-{timestamp}` | Dados de cada backup individual |

---

## 📲 Como Gerar o APK

### Pré-requisitos
- [Android Studio](https://developer.android.com/studio) (Hedgehog ou mais recente)
- JDK 17 ou 21

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/thespation/lista-compras-android.git

# 2. Abra o Android Studio
# File → Open → selecione a pasta android/

# 3. Aguarde o Gradle sincronizar (primeira vez pode demorar ~5 min)

# 4. Gere o APK
# Build → Build Bundle(s) / APK(s) → Build APK(s)

# 5. O APK estará em:
# android/app/build/outputs/apk/debug/app-debug.apk
```

### Reconstruir o bundle (se modificar o App.jsx)

```bash
# Instale o esbuild globalmente
npm install -g esbuild

# Compile o JSX
esbuild src/main-bundle.jsx \
  --bundle --minify --jsx=automatic \
  --platform=browser --target=es2017 \
  --outfile=dist/bundle.js

# Copie para os assets Android
cp dist/bundle.js android/app/src/main/assets/public/bundle.js

# Reconstrua o index.html embutindo o bundle
# (veja o script build no projeto)
```

---

## 🎮 Navegação no App

### Menu Lateral (Drawer)
Aberto pelo botão ☰ ou deslizando da borda esquerda:
- 🛒 **Listas** — tela principal
- 📊 **Análise** — gráficos e histórico
- ⚙️ **Configurações** — preferências
- ℹ️ **Sobre o app** — versão e contato

### Botão Voltar (Android)
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
