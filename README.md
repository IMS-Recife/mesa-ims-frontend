# Documentação:

## Estrutura de pastas:
  
### Src (arquivos de código):

#### assets:
> Arquivos estáticos de imagens, icones, etc.

#### @types: arquivos de tipos
>Dentro desta pasta ficam os arquivos de tipos. No momento só temos um arquivo **index.ts** que exporta todos os tipos e interfaces criados. Idealmente deveriam ser divididos em subarquivos para cada contexto. Ex: map.d.ts, types.d.ts, etc.
#### components: arquivos de componentes
>Neste projeto foi optado por utilizar o padrão de design atômico para os componentes. Dessa forma, os componentes nas seguintes pastas:

  * `atoms`: Os componentes que representam elementos simples, como botões, inputs, etc.
    * `texts`: componentes que representam textos, como labels, etc. Esses componentes devem ser usados sempre que um novo texto vá ser adicionado no projeto, já que todo o CSS e as tags HTML já estão definidas neles de acordo com o styleguide definido pela equipe de design.
  * `molecules`: Os componentes que representam um conjunto de elementos simples como modais, campos de formulário, etc.
  * `organisms`: Os componentes que representam um conjunto de elementos mais complexos e que envolvem mais lógica e informações, como o componente de mapa, modais específicos, formulários etc.

  



#### layouts
> Arquivos de layout, que serão utilizados para criar telas da aplicação.

#### pages: arquivos de páginas
> Arquivos de páginas, que utilizarão dos layouts criados anteriormente como base.

#### services: arquivos de serviços
> Arquivos de serviços, que serão utilizados para acessar os dados do backend e realizar as operações necessárias para a aplicação.

#### stores: arquivos de gerenciamento de estados
> Arquivos de gerenciamento de estados, que serão utilizados para gerenciar os estados da aplicação.

* `auth`: estados utilizados na autenticaçõação do usuário.
* `map`: estados utilizados no mapa.
* `projects`: estados utilizados nos projetos.
* `ui`: estados utilizados na interface do usuário.
### themes (arquivos de temas):
>Dentro desta pasta temos os arquivos de tema, que na prática são objetos que definem as variações de cores e fonte que são utilizadas no CSS através do windicss.
* `default`: arquivos do tema padrão
  * `index.ts`: arquivo que exporta todas as definições de tema (cores e tipografia)
  * `colors.ts`: arquivo que define as cores do tema
  * `typography.ts`: arquivo que define as fontes do tema










## Deploy
[![Netlify Status](https://api.netlify.com/api/v1/badges/bc4c5d28-debd-4bc3-84c6-f585dd843259/deploy-status)](https://app.netlify.com/sites/ims-web-qa/deploys)

- [Workflow Git](https://github.com/mesainc/ims-web/tree/main/.github/workflows)

## scripts
command pnpm
- "dev": "vite --port 3333 --host",
- "build": "cross-env NODE_ENV=production vite-ssg build",
- "preview": "vite preview" - [only works on http]
- "typecheck": "vue-tsc --noEmit"

## Features

- ⚡️ [Vue 3](https://github.com/vuejs/vue-next), [Vite 2](https://github.com/vitejs/vite), [pnpm](https://pnpm.js.org/), [ESBuild](https://github.com/evanw/esbuild) - born with fastness

- 🗂 [File based routing](./src/pages)

- 📦 [Components auto importing](./src/components)

- 🍍 [State Management via Pinia](https://pinia.esm.dev/)

- 📑 [Layout system](./src/layouts)

- 🎨 [Windi CSS](https://github.com/windicss/windicss) - next generation utility-first CSS framework

- 😃 [Use icons from any icon sets, with no compromise](https://github.com/antfu/unplugin-icons)

- 🌍 [I18n ready](./locales)

- 🔥 Use the [new `<script setup>` syntax](https://github.com/vuejs/rfcs/pull/227)

- 📥 [APIs auto importing](https://github.com/antfu/unplugin-auto-import) - use Composition API and others directly

- 🖨 Server-side generation (SSG) via [vite-ssg](https://github.com/antfu/vite-ssg)

- 🦔 Critical CSS via [critters](https://github.com/GoogleChromeLabs/critters)

- 🦾 TypeScript, of course


<br>

## Pre-packed

### UI Frameworks

- [Windi CSS](https://github.com/windicss/windicss) (On-demand [TailwindCSS](https://tailwindcss.com/)) - lighter and faster, with a bunch of additional features!
  - [Windi CSS Typography](https://windicss.org/plugins/official/typography.html)

### Icons

- [Iconify](https://iconify.design) - use icons from any icon sets [🔍Icônes](https://icones.netlify.app/)
- [`unplugin-icons`](https://github.com/antfu/unplugin-icons) - icons as Vue components

### Plugins

- [Vue Router](https://github.com/vuejs/vue-router)
  - [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages) - file system based routing
  - [`vite-plugin-vue-layouts`](https://github.com/JohnCampionJr/vite-plugin-vue-layouts) - layouts for pages

- [Pinia](https://pinia.esm.dev) - Intuitive, type safe, light and flexible Store for Vue using the composition api

- [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components) - components auto import

- [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) - Directly use Vue Composition API and others without importing

- [`vite-plugin-pwa`](https://github.com/antfu/vite-plugin-pwa) - PWA

- [`vite-plugin-windicss`](https://github.com/antfu/vite-plugin-windicss) - Windi CSS Integration

- [Vue I18n](https://github.com/intlify/vue-i18n-next) - Internationalization
  - [`vite-plugin-vue-i18n`](https://github.com/intlify/vite-plugin-vue-i18n) - Vite plugin for Vue I18n

- [VueUse](https://github.com/antfu/vueuse) - collection of useful composition APIs

- [`@vueuse/head`](https://github.com/vueuse/head) - manipulate document head reactively

- [Leaflet](https://leafletjs.com/) - Leaflet is the leading open-source JavaScript library for mobile-friendly interactive maps.

- [Mapbox](https://account.mapbox.com/) - Design a custom map style

- [TurfJS](https://turfjs.org/) - Advanced geospatial analysis for browsers and Node.js


### Coding Style

- Use Composition API with [`<script setup>` SFC syntax](https://github.com/vuejs/rfcs/pull/227)
- [ESLint](https://eslint.org/) with [@antfu/eslint-config](https://github.com/antfu/eslint-config), single quotes, no semi.

### Dev tools

- [TypeScript](https://www.typescriptlang.org/)

- [pnpm](https://pnpm.js.org/) - fast, disk space efficient package manager

- [`vite-ssg`](https://github.com/antfu/vite-ssg) - Server-side generation
  - [critters](https://github.com/GoogleChromeLabs/critters) - Critical CSS
 
- [VS Code Extensions](./.vscode/extensions.json)
  - [Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite) - Fire up Vite server automatically
  - [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) - Vue 3 `<script setup>` IDE support
  - [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - Icon inline display and autocomplete
  - [Windi CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=voorjaar.windicss-intellisense) - IDE support for Windi CSS
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
