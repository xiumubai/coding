import { lazyReportCache } from '../utils/report'
import { getPageURL } from '../utils/util'
import getUUID from './getUUID'

export default function pv() {
    lazyReportCache({
        type: 'behavior',
        subType: 'pv',
        startTime: performance.now(),
        pageURL: getPageURL(),
        referrer: document.referrer,
        uuid: getUUID(),
    })
}