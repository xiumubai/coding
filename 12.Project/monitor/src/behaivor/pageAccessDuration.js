import { report } from '../utils/report'
import { onBeforeunload, getPageURL } from '../utils/util'
import getUUID from './getUUID'

export default function pageAccessDuration() {
    onBeforeunload(() => {
        report({
            type: 'behavior',
            subType: 'page-access-duration',
            startTime: performance.now(),
            pageURL: getPageURL(),
            uuid: getUUID(),
        }, true)
    })
}