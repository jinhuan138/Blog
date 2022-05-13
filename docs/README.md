---
home: true
# heroImage: /logo/3.png
heroText: null
bgImage: /bgImage/2.png
actionText: 开始 →
actionLink: /FontEnd/
---
::: slot footer
[jinhuan138](https://github.com/jinhuan138/jinhuan138) 2022
:::

<script>
import ColorThief from 'ColorThief'
export default {
  data(){
   return{
     currentBgImage:''
   }
  },
  mounted () {
      this.changeBgImage()
      this.changeHeroColor()
  },
  methods:{
    //随机背景
    changeBgImage(){
      const logoArr = ['1.jpg', '2.png', '3.png', '4.png','5.png','6.jpg','7.jpg','8.svg']
      const bg = document.querySelector('.hero')
      const index = Math.round(Math.random() * 10) % logoArr.length
      const url='/page/bgImage/' +logoArr[index]
      this.currentBgImage=url
      if(bg) bg.style.background =`url("${url}") center center / cover no-repeat`
    },
    //标题颜色
    changeHeroColor(){
      const colorThief = new ColorThief();
      const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
      }).join('')
      const img =new Image();
      img.src = this.currentBgImage
      if(!img) return
      if (img.complete) {
        const h1 = document.querySelector('.description')
        h1.style.color= rgbToHex(...colorThief.getColor(img))
      } else {
        img.addEventListener('load', function() {
          const h1 = document.querySelector('h1');
          h1.style.color= rgbToHex(...colorThief.getColor(img))
        });
      }
    }
  }
}
</script>
