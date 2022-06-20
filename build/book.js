//https://www.npmjs.com/package/epub
const EPub = require("epub");
const { join } = require('path')
const fs = require('fs')
const Vibrant = require('node-vibrant')
const libraryPath = join(__dirname, '../docs/.vuepress/public/books')
const booksJson = []
const parseBook = (name) => {
    return new Promise((resolve, reject) => {
        const filePath = join(libraryPath, name)
        const book = new EPub(filePath);
        book.on("end", async () => {
            // epub is now usable
            const { title, cover } = book.metadata
            await book.getImage(cover, async function (error, img, mimeType) {
                if (error) return console.log(error)
                if (mimeType.includes('image')) {
                    const coverPath = join(libraryPath, 'cover', `./${name.replace(".epub", "")}.jpg`)
                    fs.writeFileSync(coverPath, img)//生成封面
                    const palette = await Vibrant.from(coverPath).getPalette() //获取图书封面主题颜色
                    booksJson.push({ ...book.metadata, url: name, bgColorFromCover: palette.DarkVibrant.hex })
                }
            });
            console.log(name + ' 解析完成')
            resolve(title)
        });
        book.parse();
    })
}
const saveBookInfo = async () => {
    const books = fs.readdirSync(libraryPath)
    const promise = books.map(name => {
        if (name.endsWith('epub'))
            return parseBook(name)
    })
    p = promise.filter(i => i)
    await Promise.all(p)
    const jsonPath = join(libraryPath, './books.json')//生成books.json
    setTimeout(() => {
        fs.writeFileSync(jsonPath, JSON.stringify(booksJson))
    }, books.length * 1000);
}
saveBookInfo()