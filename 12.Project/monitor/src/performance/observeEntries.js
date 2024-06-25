import { executeAfterLoad, isSupportPerformanceObserver} from '../utils/util'
import { lazyReportCache } from '../utils/report'


export default function observeEntries() {
    executeAfterLoad(() => {
        observeEvent('resource')
    })
}

export function observeEvent(entryType) {
    function entryHandler(list) {
        const data = list.getEntries()
        for (const entry of data) {
            if (observer) {
                observer.disconnect()
            }

            lazyReportCache({
                name: entry.name, // 资源名称
                subType: entryType,
                type: 'performance',
                sourceType: entry.initiatorType, // 资源类型
                duration: entry.duration, // 资源加载耗时
                dns: entry.domainLookupEnd - entry.domainLookupStart, // DNS 耗时
                tcp: entry.connectEnd - entry.connectStart, // 建立 tcp 连接耗时
                redirect: entry.redirectEnd - entry.redirectStart, // 重定向耗时
                ttfb: entry.responseStart, // 首字节时间
                protocol: entry.nextHopProtocol, // 请求协议
                responseBodySize: entry.encodedBodySize, // 响应内容大小
                responseHeaderSize: entry.transferSize - entry.encodedBodySize, // 响应头部大小
                resourceSize: entry.decodedBodySize, // 资源解压后的大小
                startTime: performance.now(),
            })
        }
    }

    let observer
    if (isSupportPerformanceObserver()) {
        observer = new PerformanceObserver(entryHandler)
        observer.observe({ type: entryType, buffered: true })
    }
}