const { src, dest, series, task } = require('gulp');
const clean = require('gulp-clean');
const replace = require('gulp-replace');
const { join } = require("path")
const fs = require("fs");
const header = require('gulp-header');
const gulpif = require('gulp-if');
const rename = require("gulp-rename"); \
const nav = fs.readFileSync('E:\\agree\\aui-web\\examples\\router\\page-nav.json', 'utf-8')
const whiteList = ['/changelog', '/icon', '/search',]//白名单

//clean
function cleanDocs() {
  const path = join(__dirname, './docs/Aui/')
  return src(path, { read: false })
    .pipe(clean())
    .pipe(dest(path))
}

//markdown
const auiNav = eval(nav).map(i => {
  if (whiteList.indexOf(i.path) === -1) {
    if (i.path === '/guide') return ('')
    else return ('/Aui' + i.path)  //'/button'==>'/Aui/button'
  }
})
function copy(path, name) {
  return src(join(`E:\\agree\\aui-web\\docs/${path}.md`))
    .pipe(gulpif(path === '/guide', rename(path => ({ dirname: path.dirname, basename: 'README', extname: ".md" }))))//guide=>README
    .pipe(replace('#####', '##'))
    .pipe(header(`## ${name}\n`, { name }))//添加标题
    .pipe(replace(new RegExp(`## ${name}\n## ${name}\n`, 'i'), `## ${name}\n`))//删除添重复标题
    .pipe(dest(join(__dirname, './docs/Aui/')))
}
function copyDocs(done) {
  eval(nav).forEach(i => {
    if (whiteList.indexOf(i.path) === -1) {
      copy(i.path, i.name)
    }
  });
  SideBar()
  done()
}

//SideBar
function SideBar() {
  const nav = JSON.stringify(auiNav.filter(i => i))//map后白名单的为undefined
  const navTemplate = `module.exports = [
    {
      title:'Aui',
      collapsable: true,
      children:${nav}
    },
  ]`
  fs.writeFile(join(__dirname, '/docs/Aui/sidebar.js'), navTemplate, e => { e && console.log(e) })
}

task('prepare', series(cleanDocs, copyDocs))
task('clean', series(cleanDocs))
