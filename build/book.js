//https://www.npmjs.com/package/epub
const EPub = require("epub")
const sharp = require("sharp")
const { join } = require('path')
const fs = require('fs')
const { Vibrant } = require('node-vibrant/node')
const libraryPath = join(__dirname, '../docs/.vuepress/public/books')
//DarkVibrant色块会把不同色调的封面都压成棕色,改用Vibrant按比例压暗,保留原色相且保证白色标题的对比度
const darken = (hex, ratio) => '#' + hex.slice(1).match(/../g)
    .map(c => Math.round(parseInt(c, 16) * ratio).toString(16).padStart(2, '0')).join('')
const parseBook = (name) => {
    return new Promise((resolve, reject) => {
        const filePath = join(libraryPath, name)
        const book = new EPub(filePath);
        book.on("error", reject)
        book.on("end", () => {
            // epub is now usable
            const { cover } = book.metadata
            book.getImage(cover, async function (error, img, mimeType) {
                if (error) return reject(error)
                if (!mimeType.includes('image')) return resolve(null)
                const coverPath = join(libraryPath, 'cover', `./${name.replace(".epub", "")}.webp`)
                const data = await sharp(img)//转换成webp生成封面,书架最大只显示170px,按二倍屏压到340宽即可
                    .resize({ width: 340, withoutEnlargement: true })
                    .webp({ quality: 80 })
                    .toBuffer()

                fs.writeFileSync(coverPath, data)
                // 获取图书封面主题颜色,node-vibrant不支持webp直接使用buffer
                const palette = await Vibrant.from(img).getPalette()
                console.log(name + ' 解析完成')
                resolve({ ...book.metadata, url: name, bgColorFromCover: darken(palette.Vibrant.hex, 0.55) })
            });
        });
        book.parse();
    })
}
const saveBookInfo = async () => {
    //不存在cover文件夹创建
    const coverPath = join(libraryPath, 'cover')
    if (!fs.existsSync(coverPath))
        fs.mkdirSync(coverPath)
    const books = fs.readdirSync(libraryPath).filter(name => name.endsWith('epub'))
    const booksJson = (await Promise.all(books.map(parseBook))).filter(Boolean)
    const jsonPath = join(libraryPath, './books.json')//生成books.json
    fs.writeFileSync(jsonPath, JSON.stringify(booksJson, null, 2))
}
saveBookInfo()