import ajax from './requset'
// 请求数据

export function GetHomedata(data) {
    console.log(data);
    let formData = new FormData();
    formData.append('code', data.code)
    return ajax({
        url: 'api/api2/quechao/initLogin',
        method: 'post',
        data: formData
    })
}
// 上传游戏获取oss配置信息
export function GetGameupdata(url, data) {
    return ajax({
        method: 'post',
        url: url,
        headers: {
            Accept: '*/*',
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}

export function getAliOSSConfig() {
    return ajax({
        url: 'api/api2/quechao/ossConfig',
        method: 'get'
    })
}
//活动二获取咖啡豆
export function getCoffData() {
    return ajax({
        url: 'api/api2/quechao/act2/info',
        method: 'get'
    })
}
// 
export function getCoffeeSynthesis() {
    return ajax({
        url: 'api/api2/quechao/act2/merge',
        method: 'post'
    })
}

//上传游戏图片
// export const GetGameData = (data) =>

//     let formData = new FormData();
// formData.append('code', data.code)

// return ajax(


//     {
//         url: '/api2/quechao/act5/done',
//         method: 'post',
//         data
//     }
// )
export function GetGameData(data) {
    console.log(data);
    // let formData = new FormData();
    // formData.append('game_id', data.game_id)
    // formData.append('game_level', data.game_level)
    // formData.append('recognize_id', data.recognize_id)
    // formData.append('recognize_level', data.recognize_level)
    // formData.append('img_uri', data.img_uri)
    return ajax({
        url: 'api/api2/quechao/act5/done',
        method: 'post',
        data: data
    })
}
// 周四获取数据
export function GetFourData() {
    return ajax({
        url: 'api/api2/quechao/act4/info',
        method: 'get'
    })
}
// 周四上传图片成功
export function GetFourUpdata(data) {
    return ajax({
        url: 'api/api2/quechao/act4/done',
        method: 'post',
        data
    })
}
// 排行榜
export function GetFourRanking() {
    return ajax({
        url: 'api/api2/quechao/act4/topList',
        method: 'get'
    })
}
// 活动二 上报咖啡豆
export function GetCoffeeData() {
    return ajax({
        url: 'api/api2/quechao/act2/done',
        method: 'post',
        
    })
}