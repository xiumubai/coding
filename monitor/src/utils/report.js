import { addCache, getCache, clearCache } from './cache'
import config from '../config'
import {isSupportSendBeacon, generateUniqueID} from './util'

const sendBeacon = (function(){
    if(isSupportSendBeacon()){
      return window.navigator.sendBeacon.bind(window.navigator)
    }
    const reportImageBeacon = function(url, data){
        reportImage(url, data)
    }
    return reportImageBeacon
})()

const sessionID = generateUniqueID()
export function report(data, isImmediate = false) {
    if (!config.reportUrl) {
        console.error('请设置上传 url 地址')
    }

    const reportData = JSON.stringify({
        id: sessionID,
        appID: config.appID,
        userID: config.userID,
        data,
    })

    if (isImmediate) {
        sendBeacon(config.reportUrl, reportData)
        return
    }

    if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
            sendBeacon(config.reportUrl, reportData)
        }, { timeout: 3000 })
    } else {
        setTimeout(() => {
            sendBeacon(config.reportUrl, reportData)
        })
    }
}

let timer = null
export function lazyReportCache(data, timeout = 3000) {
    addCache(data)

    clearTimeout(timer)
    timer = setTimeout(() => {
        const data = getCache()
        if (data.length) {
            report(data)
            clearCache()
        }
    }, timeout)
}

export function reportWithXHR(data) {
    // 1. 创建 xhr 对象
    let xhr = new XMLHttpRequest()
    // 2. 调用 open 函数
    xhr.open('POST', config.reportUrl)
    // 3. 设置 Content-Type 属性(固定写法)
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    // 4. 调用 send 函数
    xhr.send(JSON.stringify(data))
    // 5. 监听事件
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4 && xhr.status === 200) {
    //         console.log(xhr.responseText)
    //     }
    // }
}

export function reportImage(url, data) {

    // 如果浏览器不支持 sendBeacon，就使用图片打点
    const img = new Image();
    img.src = url + '?reportData=' + encodeURIComponent(JSON.stringify(data));
}