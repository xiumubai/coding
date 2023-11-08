import { lazyReportCache } from '../utils/report'
import { getPageURL } from '../utils/util'

export default function error() {

    // 捕获资源加载失败错误 js css img...
    window.addEventListener('error', e => {
        const target = e.target
        if (!target) return

        if (target.src || target.href) {
            const url = target.src || target.href
            lazyReportCache({
                url,
                type: 'error',
                subType: 'resource',
                startTime: e.timeStamp,
                html: target.outerHTML,
                resourceType: target.tagName,
                paths: e.path.map(item => item.tagName).filter(Boolean),
                pageURL: getPageURL(),
            })
        }
    }, true)

    // 监听 js 错误
    window.onerror = (msg, url, line, column, error) => {
        lazyReportCache({
            msg,
            line,
            column,
            error: error.stack,
            subType: 'js',
            pageURL: url,
            type: 'error',
            startTime: performance.now(),
        })
    }

    // 监听 promise 错误 缺点是获取不到列数据
    window.addEventListener('unhandledrejection', e => {
        lazyReportCache({
            reason: e.reason?.stack,
            subType: 'promise',
            type: 'error',
            startTime: e.timeStamp,
            pageURL: getPageURL(),
        })
    })

}