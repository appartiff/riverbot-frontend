
export default {
  target: 'static',
  ssr: false,
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { hid: 'canvasjs', src: 'https://canvasjs.com/assets/script/canvasjs.stock.min.js', defer: true }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  components: [{ path: '~/components', extensions: ['vue'], pathPrefix: false }],
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~assets/css/Style.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src:"@/plugins/plugins.js", ssr: false},
    {src:'@/plugins/repositories.js', ssr: false},

  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/google-fonts',
  ],
  googleFonts: {
    families: {
      Roboto: true,
      'Montserrat': [400, 500, 600, 700],
    },
  },
  styleResources: {
    // your settings here
    sass: [],
    scss: ['./assets/css/_Mixins.scss'],
    less: [],
    stylus: []
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['nuxt-fontawesome', {
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
        },
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['fab']
        },
      ]
    }],
    [
      'nuxt-buefy',
      {
        css: false,
        materialDesignIcons: false,
        defaultIconPack: 'fas',
        defaultIconComponent: 'font-awesome-icon',
      },
    ],
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL:"http://localhost:4000",
    proxy:false,
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
