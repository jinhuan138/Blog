//WebP 是一种现代图像格式，可为 Web 上的图像提供卓越的无损和有损压缩。
//文档 https://sharp.pixelplumbing.com/api-output#webp
const sharp = require('sharp')
const fs = require('fs')
const { resolve } = require('path')
const image_path = resolve(__dirname, '../docs/.vuepress/public/bgImage')
const images = fs.readdirSync(image_path)
console.log(images)
images.forEach(async name => {//背景图片转webp格式
    if (name.endsWith('.svg')) return
    const type = name.slice(-3)
    const data = await sharp(resolve(image_path, name))
        .webp({ lossless: true })
        .toFile(resolve(image_path, name.replace(type, 'webp')))
})