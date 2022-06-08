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
   }
  },
  mounted () {
      this.addLogo()
  },
  methods:{
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
  }
}
</script>
