import { lazyReportCache } from '../utils/report'

export default function observeLoad() {
    ['load', 'DOMContentLoaded'].forEach(type => onEvent(type))
}

function onEvent(type) {
    function callback() {
        lazyReportCache({
            type: 'performance',
            subType: type.toLocaleLowerCase(),
            startTime: performance.now(),
        })

        window.removeEventListener(type, callback, true)
    }

    window.addEventListener(type, callback, true)
}