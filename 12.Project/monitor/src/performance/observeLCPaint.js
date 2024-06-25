import { getPageURL, isSupportPerformanceObserver } from '../utils/util'
import { lazyReportCache } from '../utils/report'



export default function observeLCP() {
    if (!isSupportPerformanceObserver()) {
        return
    }
    if(observer){
        observer.disconnect()
    }
    const entryHandler = (list) => {
        for (const entry of list.getEntries()) {
            const json = entry.toJSON()
            delete json.duration

            const reportData = {
                ...json,
                target: entry.element?.tagName,
                name: entry.entryType,
                subType: entry.entryType,
                type: 'performance',
                pageURL: getPageURL(),
            }
            
            lazyReportCache(reportData)
        }
    }

    const observer = new PerformanceObserver(entryHandler)
    observer.observe({ type: 'largest-contentful-paint', buffered: true })
}