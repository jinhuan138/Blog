//文档 https://neteasecloudmusicapi.vercel.app/#/
const { login_cellphone, likelist, song_url, lyric, playlist_tracks } = require('NeteaseCloudMusicApi')

async function getLikeMusicList() {
    //登录获取cookie
    const result = await login_cellphone({
        phone: '18350179035',
        password: 'ldc1998',
    })
    const { cookie } = result.body
    //获取喜欢音乐列表
    const list = await likelist({
        uid: '559094909',
        cookie
    })
    const { ids } = list.body
    // console.log(ids)
    //添加到note歌单 https://music.163.com/playlist?id=7372431097&userid=559094909
    await playlist_tracks({
        op: 'add',
        pid: 7372431097,
        tracks: ids.toString(),
        cookie
    })
}
getLikeMusicList()