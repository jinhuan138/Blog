<template>
  <div class="vww__widget" v-if="currently">
    <div class="vww__currently">
      <div>
        <!-- 图标 -->
        <skycon :condition="currently.icon" size="24" :color="iconColor" />
        <!-- 温度 -->
        <div class="vww__temp">
          {{ Math.round(currently.temperature) }}&deg;
          <div v-if="isDownward">
            <!-- <svg viewBox="0 0 306 306" width="24" height="24">
                  <polygon
                    points="270.3,58.65 153,175.95 35.7,58.65 0,94.35 153,247.35 306,94.35"
                  />
                </svg> -->
          </div>
        </div>
      </div>
      <!-- 描述 -->
      <div class="vww__title">{{ currently.description }}</div>
      <!-- 风速 -->
      <!-- <div class="vww__wind">
        Wind: {{ Math.round(currently.windSpeed) }} mph ({{ windBearing }})
      </div> -->
    </div>
  </div>
</template>
<script>
//天气api文档https://api.openweathermap.org
//图标文档https://www.npmjs.com/package/vue-skycons
import emitter from "../untils/eventbus";
const Skycon = require("vue-skycons").default;
const ICON_MAPPINGS = {
  "clear-day": ["01d"],
  "clear-night": ["01n"],
  cloudy: ["03d", "03n"],
  fog: ["50d", "50n"],
  "partly-cloudy-day": ["02d", "04d"],
  "partly-cloudy-night": ["02n", "04n"],
  rain: ["09d", "09n", "10d", "10n", "11d", "11n"],
  sleet: ["13d", "13n"],
  snow: ["13d", "13n"],
  wind: ["50d", "50n"],
};
const apiOption = {
  appid: "16e915fcec1efefcbcf906c15c8daaf3",
  lang: "zh_cn",
  units: "metric",
};
const storage = global.localStorage || null;
export default {
  name: "Weather",
  components: {
    Skycon,
  },
  data() {
    return {
      weather: {
        currently: null,
      },
      mode: '',
    };
  },
  computed: {
    currently() {
      return this.weather.currently;
    },
    isDownward() {
      return true;
    },
    windBearing() {
      if (this.currently) {
        const t = Math.round(this.currently.windBearing / 45);
        return ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"][t];
      }
    },
    iconColor() {
      if (this.mode === "light") {
        return "black";
      } else if (this.mode === "dark") {
        return "rgba(255, 255, 255, 0.8)";
      } else {
        const hour = new Date().getHours();
        return hour < 6 || hour >= 18 ? "rgba(255, 255, 255, 0.8) " : "black";
      }
    },
  },
  mounted(){
    this.mode=storage.getItem('mode') || this.$themeConfig.mode || 'auto'
  },
  beforeMount() {
    emitter.on("changeMode", this.changeMode);
    this.getWeather();
  },
  beforeDestroy() {
    emitter.off("changeMode", this.changeMode);
  },
  methods: {
    mapIcon: (code) => {
      return Object.keys(ICON_MAPPINGS).find((key) => {
        return ICON_MAPPINGS[key].includes(code);
      });
    },
    async getWeather() {
      const base = "https://api.openweathermap.org/data/2.5/weather";
      let position, url;
      const { appid, lang, units } = apiOption;
      navigator.geolocation.getCurrentPosition((p) => (position = p));
      if (position) {
        const { latitude, longitude } = position.coords;
        url = `${base}?lat=${latitude}&lon=${longitude}&appid=${appid}&lang=${lang}&units=${units}`;
      } else {
        const city = "Beijing";
        url = `${base}?q=${city}&appid=${appid}&lang=${lang}&units=${units}`;
      }
      const res = await this.$http.get(url);
      if (res.status !== 200) return;
      const { main, weather, wind } = res.data;
      const { description, icon } = weather[0];
      const { speed, deg } = wind;
      const that = this;
      const mapData = {
        currently: {
          icon: that.mapIcon(icon),
          temperature: main.temp,
          description,
          windSpeed: speed,
          windBearing: deg,
        },
      };
      this.$set(this, "weather", mapData);
    },
    changeMode(mode) {
      this.mode = mode;
    },
  },
};
</script>

<style scoped>
.vww__widget {
  /* width: 150px; */
  height: 1.5rem;
  display: inline-block;
  margin-left: 8px;
  margin-top: -7px;
}
.vww__currently > div {
  display: flex;
  align-items: center;
}
.vww__currently .vww__title {
  margin-top: 2px;
}
.vww__temp {
  padding: 0 1px;
  font-size: 1.2em;
  font-weight: bold;
  line-height: 1.2em;
}
.vww__temp > div {
  display: block;
  text-align: center;
  padding-right: 5px;
}
.vww__title {
  font-size: 0.8em;
  font-weight: bold;
  text-transform: capitalize;
  line-height: 0.8em;
}
.vww__wind {
  font-size: 0.6em;
  line-height: 0.6em;
}
</style>
