# Documentação

## Estrutura de pastas
  
### Src (arquivos de código)

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
### themes (arquivos de temas)
>Dentro desta pasta temos os arquivos de tema, que na prática são objetos que definem as variações de cores e fonte que são utilizadas no CSS através do windicss.
* `default`: arquivos do tema padrão
  * `index.ts`: arquivo que exporta todas as definições de tema (cores e tipografia)
  * `colors.ts`: arquivo que define as cores do tema
  * `typography.ts`: arquivo que define as fontes do tema


## Bibliotecas e frameworks utilizados

- [Vue 3](https://github.com/vuejs/vue-next), [Vite 2](https://github.com/vitejs/vite), [pnpm](https://pnpm.js.org/), [ESBuild](https://github.com/evanw/esbuild) - born with fastness

- [State Management via Pinia](https://pinia.esm.dev/)

-  [Windi CSS](https://github.com/windicss/windicss) - next generation utility-first CSS framework
-  Use the [new `<script setup>` syntax](https://github.com/vuejs/rfcs/pull/227)

-  [APIs auto importing](https://github.com/antfu/unplugin-auto-import) - use Composition API and others directly

-  Server-side generation (SSG) via [vite-ssg](https://github.com/antfu/vite-ssg)

- [Iconify](https://iconify.design) - use icons from any icon sets 
- [`unplugin-icons`](https://github.com/antfu/unplugin-icons) - icons as Vue components
- [Leaflet](https://leafletjs.com/) - Leaflet is the leading open-source JavaScript library for mobile-friendly interactive maps.

- [Mapbox](https://account.mapbox.com/) - Design a custom map style

### Coding Style

- Use Composition API with [`<script setup>` SFC syntax](https://github.com/vuejs/rfcs/pull/227)
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
  
### Como adicionar uma nova camada:

## FRONT-END

Para adicionar nova categoria de camada, deve-se abrir o arquivo index.vue na pasta visionSidebar. Dentro deste arquivo temos uma constante nomeada como layersCategories, que recebe um array de objetos com a seguinte estrutura:

```
const layersCategories = [
  {
    name: 'Categoria 1',
    layers: [
      {
        name: 'Camada 1 da Categoria 1',
      },
      {
        name: 'Camada 2 da Categoria 1',
      }
    ]
  },
  {
    name: 'Categoria 2',
    layers: [
      {
        name: 'Camada 1 da Categoria 2',
      },
      {
        name: 'Camada 2 da Categoria 2',
      }
    ]
  }
]
```

Após ser adicionada uma nova camada no array **layersCategories**, aparecerá uma nova categorias com collapse na sidebar, e cada camada terá uma checkbox correspondente.

Além disso, para que quando a checkbox for selecionada, a requisição para receber os dados da camada seja feita e os dados sejam mostrados no mapa, é necessário adicionar um novo caso (case) no switch correspondente à categoria que se deseja criar a camada dentro do arquivo **layer.vue**.

Finalmente, deve-se ir no arquivo **map.ts**, dentro da pasta store, e adicionar o caso (case) dentro da função **setLayerName**, onde será definida a cor que a camada terá dentro do sistema.
