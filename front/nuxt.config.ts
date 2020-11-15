import colors from 'vuetify/es5/util/colors'
const environment = process.env.NODE_ENV || 'local'
const env = require(`./env/${environment}.ts`)

const gtmID = 'GTM-TKRT9JJ'
const gtmHeadTag = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmID}');`
const gtmBodyTag = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`

export default {
  mode: 'universal',
  srcDir: 'src',

  router: {
    base: env.BASE_URL,
  },

  env: env,

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - CPX',
    title: 'CPX',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'ロキソニンとカフェインからこれらの記事は錬成されています' },
      { hid: 'og:description', property: 'og:description', content: 'ロキソニンとカフェインからこれらの記事は錬成されています' },
      { hid: 'og:url', property: 'og:type', content: 'https://cpx.business/' },
      { hid: 'og:image', property: 'og:image', content: 'https://cpx.business/img/ogp.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `${env.BASE_URL}img/favicon.ico` }
    ],
    script: [
      {
        hid: 'gtmHead',
        innerHTML: gtmHeadTag
      }
    ],
    noscript: [
      {
        hid: 'gtmBody',
        innerHTML: gtmBodyTag,
        pbody: true
      }
    ],
    __dangerouslyDisableSanitizersByTagID: {
      'gtmHead': ['innerHTML'],
      'gtmBody': ['innerHTML']
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  '~plugins/vue-scrollto'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxt/content'
  ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.green.lighten1,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config: any, ctx: any) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|ts|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  },

  generate: {
    async routes () {
      const { $content } = require('@nuxt/content')
      const files = await $content('articles').only(['path']).where({ isDraft: { $eq: false } }).fetch()

      return files.map(file => file.path === '/index' ? '/' : file.path)
    }
  }

}
