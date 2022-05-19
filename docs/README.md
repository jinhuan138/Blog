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
export default {
  data(){
   return{
     currentBgImage:''
   }
  },
  mounted () {
      // this.changeBgImage()
      // this.changeDes()
      // this.changeDescColor()
      this.addLogo()
  },
  methods:{
    //随机背景
    changeBgImage(){
      const bgArr = ['1.jpg', '2.png', '3.png', '4.png','5.png','6.jpg','7.jpg','8.svg']
      const bg = document.querySelector('.hero')
      const index = Math.round(Math.random() * 10) % bgArr.length
      const url='/page/bgImage/' +bgArr[index]
      this.currentBgImage=url
      if(bg) bg.style.background =`url("${url}") center center / cover no-repeat`
    },
    //标题颜色
    changeDescColor(){
      const desc = document.querySelector('.description')
      const colorThief = new ColorThief();
      const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
      }).join('')
      console.log(colorThief.getColorFromUrl(this.currentBgImage))
      // desc.style.color= rgbToHex(...colorThief.getColorFromUrl(this.currentBgImage))
    },
    //添加logo
    addLogo(){
      const navLogo = document.querySelector('.navbar .logo')
      if(navLogo) return
      const logoArr = ['1.jpg', '2.jpg', '3.png', '4.jpg']
      const index = Math.round(Math.random() * 10) % logoArr.length
      const homeLink = document.querySelector('.home-link')
      const siteName = document.querySelector('.site-name')
      const logo= document.createElement('img')
      logo.alt= 'home'
      logo.className= 'logo'
      logo.src= '/page/logo/' +logoArr[index]
      homeLink.insertBefore(logo,siteName)
    },
    async changeDes(){
      const url = 'https://v1.hitokoto.cn/?encode=json'
      const res = await this.$http.get(url)
      if(res.status!==200) return
      const desText = res.data.hitokoto
      const descDom = document.querySelector('.description')
      descDom.style.color='red'
      // descDom.parentNode.removeChild(descDom)
      // descDom.innerHTML = desText
      // this.$description='asdasd'
    }
  }
}
</script>
