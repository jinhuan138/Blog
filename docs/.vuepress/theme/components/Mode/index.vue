<template>
	<div v-click-outside="hideMenu" class="color-picker" v-if="$themeConfig.modePicker !== false" >
		<a class="color-button" @click.prevent="showMenu = !showMenu">
      <reco-icon icon="reco-color" />
		</a>
		<ModuleTransition :transform=" ['translate(-50%, 0)', 'translate(-50%, -10px)']">
			<div v-show="showMenu" class="color-picker-menu">
				<ModePicker />
			</div>
		</ModuleTransition>
	</div>
</template>

<script>
import { RecoIcon, ModuleTransition } from '@vuepress-reco/core/lib/components'
import ClickOutside from 'vue-click-outside'
import ModePicker from './ModePicker'
import applyMode from './applyMode'
import emitter from '../../../untils/eventbus'

export default {
  name: 'UserSettings',

  directives: {
    'click-outside': ClickOutside
  },

  components: {
    ModePicker,
    RecoIcon,
    ModuleTransition
  },

  data () {
    return {
      showMenu: false
    }
  },

  // 为了在保证 modePicker 在 SSR 中正确开关，并实现管理，Mode 组件将负责 modePicker 关闭的情况
  mounted () {
    // modePicker 关闭时默认使用主题设置的模式
    const themeMode = this.$themeConfig.mode || 'auto'
    emitter.emit("changeMode", themeMode)
    const { modePicker } = this.$themeConfig
    if (modePicker === false) {
      // 为 'auto' 模式设置监听器
      if (themeMode === 'auto') {
        window.matchMedia('(prefers-color-scheme: dark)').addListener(() => {
          applyMode(themeMode)
        })
        window.matchMedia('(prefers-color-scheme: light)').addListener(() => {
          applyMode(themeMode)
        })
      }
      applyMode(themeMode)
    }
  },

  methods: {
    hideMenu () {
      this.showMenu = false
    }
  }
}
</script>

<style lang="stylus">
.color-picker {
	position: relative;
	margin-right: 1em;
  cursor pointer;
	.color-button {
		align-items: center;
		height: 100%;
		.iconfont {
			font-size 1.4rem
			color: $accentColor
		}
	}

	.color-picker-menu {
		position: absolute;
		top: 40px;
		left: 50%;
		z-index: 150;

		ul {
			list-style-type: none;
			margin: 0;
			padding: 0;
		}
	}
}

@media (max-width: $MQMobile) {
	.color-picker {
		margin-right: 1rem;
		.color-picker-menu {
			left: calc(50% - 35px);
			&::before {
				left: calc(50% + 35px);
			}
		}
	}
}
</style>
