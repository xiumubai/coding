import observePaint from './observePaint'
import observeEntries from './observeEntries'
import observeFCPaint from './observeFCPaint'
import observeLoad from './observeLoad'
import observeLCPaint from './observeLCPaint'
import xhr from './xhr'
export default function performance() {
    observePaint()
    observeEntries()
    observeFCPaint()
    observeLoad()
    observeLCPaint()
    xhr()
}