<template>
  <div class="home-blog">
    <iframe :src="$withBase('/backGround/rainy/index.html')" frameborder="0" class="backGround" ></iframe>
    <!-- <div class="hero" :style="{ ...bgImageStyle }">
      <div>
        <ModuleTransition delay="0.08">
          <p class="description" :style="descriptionStyle">
            {{ description }}
          </p>
        </ModuleTransition>
      </div>
    </div> -->
  </div>
</template>

<script>
import {
  defineComponent,
  toRefs,
  reactive,
  computed,
  onMounted,
  onBeforeMount,
  ref,
  nextTick,
} from "vue";
import Vibrant from "node-vibrant";
import { ModuleTransition, RecoIcon } from "@vuepress-reco/core/lib/components";
import { useInstance } from "@theme/helpers/composable";
import json from "/Note/package.json";
const bgArr = ["8.svg", "1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.jpg",];
export default defineComponent({
  components: {
    ModuleTransition,
  },
  setup(props, ctx) {
    const instance = useInstance();
    let description = ref("");
    let descriptionStyle = reactive({ color: "#6d6d6d" });
    const theme = ref('8.svg')
    const imgUrl = computed(() => {
      return instance.$withBase('/bgImage/' + theme.value)
    })
    const bgImageStyle = computed(() => {
      const initBgImageStyle = {
        textAlign: "center",
        overflow: "hidden",
        background: `url(${imgUrl.value}) center/cover no-repeat`,
      };
      const { bgImageStyle } = instance.$frontmatter;
      return bgImageStyle
        ? { ...initBgImageStyle, ...bgImageStyle }
        : initBgImageStyle;
    });

    onMounted(async () => {
      const instance = useInstance();
      instance.showVision();
    });
    onBeforeMount(() => {
      const instance = useInstance();
      instance.getDescription();
    });
    return {
      bgImageStyle,
      description,
      descriptionStyle,
      theme,
      imgUrl
    };
  },
  methods: {
    getPagesByTags(tagInfo) {
      this.$router.push({ path: tagInfo.path });
    },
    //主题
    getTheme() {
    },
    //获取随机标题
    async getDescription() {
      const instance = useInstance();
      const url = "https://v1.hitokoto.cn/?encode=json";
      const res = await instance.$http.get(url);
      if (res.status !== 200) return;
      const desText = res.data.hitokoto;
      instance.description = desText;
    },
    //标题颜色
    async changeDescriptionStyle() {
      const instance = useInstance();
      nextTick(async () => {
        console.log(instance)
        const palette = await Vibrant.from(instance.imgUrl).getPalette();
        instance.descriptionStyle.color = palette.DarkVibrant.hex;
      });
    },
    //显示版本
    showVision() {
      const { version, name } = json;
      console.log(
        `%c ${name} %c v`
          .concat(version, " "),
        "background: #35495e; padding: 1px; border-radius: 3px 0 0 3px; color: #fff",
        "background: skyblue; padding: 1px; border-radius: 0 3px 3px 0; color: #fff",
      );
    },
  },
});
</script>

<style lang="stylus">
.home-blog {
  padding: 0;
  margin: 0px auto;
  .backGround{
    width: 100%;
    height: 675px;
    margin-top: 60px;
  }
  .hero {
    margin: $navbarHeight auto 0;
    position: relative;
    box-sizing: border-box;
    padding: 0 20px;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .hero-img {
      max-width: 300px;
      margin: 0 auto 1.5rem;
    }

    h1 {
      display: block;
      margin: 0 auto 1.8rem;
      font-size: 2.5rem;
    }

    .description {
      margin: 1.8rem auto;
      font-size: 1.6rem;
      line-height: 1.3;
    }
  }

  .home-blog-wrapper {
    display: flex;
    align-items: flex-start;
    margin: 20px auto 0;
    padding: 0 20px;
    max-width: $homePageWidth;

    .blog-list {
      flex: auto;
      width: 0;

      .abstract-wrapper {
        .abstract-item:last-child {
          margin-bottom: 0px;
        }
      }
    }

    .info-wrapper {
      position: -webkit-sticky;
      position: sticky;
      top: 70px;
      overflow: hidden;
      transition: all 0.3s;
      margin-left: 15px;
      flex: 0 0 300px;
      height: auto;
      box-shadow: var(--box-shadow);
      border-radius: $borderRadius;
      box-sizing: border-box;
      padding: 0 15px;
      background: var(--background-color);

      &:hover {
        box-shadow: var(--box-shadow-hover);
      }

      h4 {
        color: var(--text-color);
      }

      .category-wrapper {
        list-style: none;
        padding-left: 0;

        .category-item {
          margin-bottom: 0.4rem;
          padding: 0.4rem 0.8rem;
          transition: all 0.5s;
          border-radius: $borderRadius;
          box-shadow: var(--box-shadow);
          background-color: var(--background-color);

          &:hover {
            transform: scale(1.04);

            a {
              color: $accentColor;
            }
          }

          a {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--text-color);

            .post-num {
              width: 1.6rem;
              height: 1.6rem;
              text-align: center;
              line-height: 1.6rem;
              border-radius: $borderRadius;
              background: #eee;
              font-size: 13px;
              color: #fff;
            }
          }
        }
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .home-blog {
    .hero {
      height: 450px;

      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        margin: 0 auto 1.8rem;
        font-size: 2rem;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .home-blog-wrapper {
      display: block !important;

      .blog-list {
        width: auto;
      }

      .info-wrapper {
        // display none!important
        margin-left: 0;

        .personal-info-wrapper {
          display: none;
        }
      }
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home-blog {
    .hero {
      height: 450px;

      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        margin: 0 auto 1.8rem;
        font-size: 2rem;
      }

      h1, .description, .action {
        // margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .home-blog-wrapper {
      display: block !important;

      .blog-list {
        width: auto;
      }

      .info-wrapper {
        // display none!important
        margin-left: 0;

        .personal-info-wrapper {
          display: none;
        }
      }
    }
  }
}
</style>
