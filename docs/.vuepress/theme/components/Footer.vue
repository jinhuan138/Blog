<template>
  <div class="footer-wrapper">
    <span>
      <reco-icon icon="reco-theme" />
      <a target="blank" href="https://vuepress-theme-reco.recoluan.com">{{`vuepress-theme-reco@${version}`}}</a>
    </span>
    <span v-if="$themeConfig.record">
      <reco-icon icon="reco-beian" />
      <a :href="$themeConfig.recordLink || '#'">{{ $themeConfig.record }}</a>
    </span>
    <span>
      <reco-icon icon="reco-copyright" />
      <a>
        <span v-if="$themeConfig.author">{{ $themeConfig.author }}</span>
        &nbsp;&nbsp;
        <span v-if="$themeConfig.startYear && $themeConfig.startYear != (new Date().getFullYear())">{{ $themeConfig.startYear }} - </span>
        {{ new Date().getFullYear() }}
        <Tag></Tag>
      </a>
    </span>
    <span v-show="showAccessNumber">
      <reco-icon icon="reco-eye" />
      <AccessNumber idVal="/" />
    </span>
    <p class="cyber-security" v-if="$themeConfig.cyberSecurityRecord">
      <img src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png" alt="">
      <a :href="$themeConfig.cyberSecurityLink || '#'">{{ $themeConfig.cyberSecurityRecord }}</a>
    </p>
    <Comments :isShowComments="false"/>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { RecoIcon } from '@vuepress-reco/core/lib/components'
import Tag from './Mytag.vue'
import { version } from '../package.json'
import { useInstance } from '@theme/helpers/composable'

export default defineComponent({
  components: { RecoIcon,Tag },
  setup (props, ctx) {
    const instance = useInstance()
    const showAccessNumber = computed(() => {
      const valineConfig = instance?.$themeConfig?.valineConfig
      const valineLocalConfig = instance?.$themeLocaleConfig?.valineConfig

      const vc = valineLocalConfig || valineConfig

      return vc && vc.visitor != false
    })
    return { version, showAccessNumber }
  }
})
</script>

<style lang="stylus" scoped>
  .footer-wrapper {
    padding: 1.5rem 2.5rem;
    border-top: 1px solid var(--border-color);
    text-align: center;
    color: lighten($textColor, 25%);
    a {
      font-size 14px
    }
    > span {
      margin-left 1rem
      > i {
        margin-right .5rem
      }
    }
    .cyber-security {
      img {
        margin-right .5rem
        width 20px
        height 20px
        vertical-align middle
      }
      a {
        vertical-align middle
      }
    }
  }

@media (max-width: $MQMobile) {
  .footer {
    text-align: left!important;
    > span {
      display block
      margin-left 0
      line-height 2rem
    }
  }
}
</style>
