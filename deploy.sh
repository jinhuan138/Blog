#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 需要修改图片路径 /img-> /<REPO>/img

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add .
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:jinhuan138/page.git master:master


cd -