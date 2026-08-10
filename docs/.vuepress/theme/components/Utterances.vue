<template>
  <section v-if="isShowComments" class="comments-wrapper utterances-comments" aria-label="文章评论">
    <header class="comments-header">
      <h2>评论</h2>
      <p>评论由 GitHub Issues 提供，需要登录 GitHub 后参与讨论。</p>
    </header>
    <div ref="container" />
  </section>
</template>

<script>
import emitter from '../../untils/eventbus'

export default {
  name: 'Utterances',

  props: {
    isShowComments: {
      type: Boolean,
      default: true
    }
  },

  mounted () {
    emitter.on('changeMode', this.updateTheme)
    this.renderComments()
  },

  beforeDestroy () {
    emitter.off('changeMode', this.updateTheme)
  },

  methods: {
    getConfig () {
      return {
        repo: '',
        issueTerm: 'pathname',
        label: '',
        lightTheme: 'github-light',
        darkTheme: 'github-dark',
        ...this.$themeConfig.utterances
      }
    },

    isDarkMode (mode) {
      if (mode === 'dark') return true
      if (mode === 'light') return false
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    },

    getTheme (mode) {
      const config = this.getConfig()
      return this.isDarkMode(mode) ? config.darkTheme : config.lightTheme
    },

    renderComments () {
      const config = this.getConfig()
      const container = this.$refs.container

      if (!container || !config.repo) return

      container.innerHTML = ''

      const script = document.createElement('script')
      script.src = 'https://utteranc.es/client.js'
      script.async = true
      script.crossOrigin = 'anonymous'
      script.setAttribute('repo', config.repo)
      script.setAttribute('issue-term', config.issueTerm)
      script.setAttribute('theme', this.getTheme(localStorage.getItem('mode') || this.$themeConfig.mode || 'auto'))

      if (config.label) script.setAttribute('label', config.label)

      container.appendChild(script)
    },

    updateTheme (mode) {
      const iframe = this.$el && this.$el.querySelector('.utterances-frame')
      if (!iframe || !iframe.contentWindow) return

      iframe.contentWindow.postMessage({
        type: 'set-theme',
        theme: this.getTheme(mode)
      }, 'https://utteranc.es')
    }
  }
}
</script>

<style lang="stylus">
.utterances-comments
  margin-top 2rem
  .comments-header
    border-top 1px solid var(--border-color)
    padding-top 1.5rem
    h2
      margin 0
      color var(--text-color)
      font-size 1.35rem
    p
      margin .5rem 0 1rem
      color var(--text-color)
      font-size .9rem
      opacity .72
  .utterances
    max-width none

@media (max-width: $MQMobile)
  .utterances-comments
    .comments-header
      padding-top 1rem
</style>
