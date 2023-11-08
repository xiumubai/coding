import { getPageURL, isSupportPerformanceObserver } from '../utils/util'
import { lazyReportCache } from '../utils/report'


export default function observeFCPaint() {
    if (!isSupportPerformanceObserver()) return
    
    const entryHandler = (list) => {        
        for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
                observer.disconnect()
            }
    
            const json = entry.toJSON()
            delete json.duration
    
            const reportData = {
                ...json,
                subType: entry.name,
                type: 'performance',
                pageURL: getPageURL(),
            }

            lazyReportCache(reportData)
        }
    }
    
    const observer = new PerformanceObserver(entryHandler)
    // buffered 属性表示是否观察缓存数据，也就是说观察代码添加时机比事情触发时机晚也没关系。

    observer.observe({ type: 'paint', buffered: true })

}