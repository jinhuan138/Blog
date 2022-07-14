<template>
  <div>
    <ReactReader
      class="container"
      :url="book_url"
      :title="book_name"
      :location="location"
      :locationChanged="onLocationChanged"
      :epubOptions="epubOptions"
      :showToc="true"
      :swipeable="true"
      :getRendition="getRendition"
      :style="styles"
    />
    <!-- <el-button @click="click">button</el-button> -->
  </div>
</template>
<script>
import { ReactReader } from "react-reader";
const storage = global.localStorage || null; //解决window is not defined
//文档：https://www.npmjs.com/package/react-reader
//https://github.com/gerhardsletten/react-reader/blob/master/src/App.js
//epubjs:http://epubjs.org/documentation/0.3/
export default {
  name: "Reader",
  data() {
    return {
      current: "",
      location: 1, //当前页
      epubOptions: {},
      styles: {
        
      },
    };
  },
  computed: {
    book_url() {
      const { url } = this.$route.params;
      if (url) {
        return this.$withBase("/books/" + url);
      } else {
        const currentBook = storage.getItem("currentBook");
        return this.$withBase("/books/" + currentBook);
      }
    },
    book_name() {
      const { url } = this.$route.params;
      if (url) {
        return url.replace(".epub", "");
      } else {
        const currentBook = storage.getItem("currentBook");
        return currentBook.replace(".epub", "");
      }
    },
  },
  components: { ReactReader },
  methods: {
    onLocationChanged(epubcifi) {
      //在用户阅读时接收当前位置的函数
      this.location = epubcifi;
      this.saveLocation(epubcifi);
    },
    initBook() {
      const booksLocation = storage.getItem("booksLocation");
      if (!booksLocation) {
        const map = new Map();
        localStorage.setItem(
          "booksLocation",
          JSON.stringify(Array.from(map.entries()))
        );
      }
      const { url } = this.$route.params;
      if (url) {
        //跳转
        storage.setItem("currentBook", url);
        this.current = url;
      } else {
        //刷新
        this.current = storage.getItem("currentBook");
      }
      //当前页
      this.location = this.getLocation(this.current);
    },
    //保存当前页
    saveLocation(location) {
      const booksLocation = new Map(
        JSON.parse(storage.getItem("booksLocation"))
      );
      booksLocation.set(this.current, location);
      storage.setItem(
        "booksLocation",
        JSON.stringify(Array.from(booksLocation.entries()))
      );
    },
    //获取当前页
    getLocation(url) {
      const booksLocation = new Map(
        JSON.parse(storage.getItem("booksLocation"))
      );
      return booksLocation.get(url) || 1;
    },
    //
    getRendition(rendition) {
      this.customThemes(rendition);
      console.log(rendition);
    },
    //自定义主题
    customThemes(rendition) {
      rendition.themes.register("custom", {
        // img: {
        //   border: "1px solid red",
        // },
        p: {
          // border: "1px solid green",
          fontSize: "500% !important",
        },
      });
      rendition.themes.select("custom");
    },
    click() {
      console.log("click");
      // this.epubOptions = {
      //   flow: "scrolled",
      //   manager: "continuous",
      // };
      this.$forceUpdate();
    },
  },
  created() {
    this.initBook();
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style scoped>
.container {
  position: absolute;
  top: 0px;
  left: 1rem;
  right: 0rem;
  bottom: 0rem;
  transition: all 0.6s ease;
}
</style>