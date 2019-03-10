import ReactDOMServer from 'react-dom/server'
import { TabContainer } from './modules/tab_container'
import List from './components/list'
import Template from './components/template'
import mozlz4a from 'mozlz4a'

import fs from 'fs'
import util from 'util'
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

async function main() {
  const inputPath = './recovery.jsonlz4'
  try {
    const compressed = await readFile(inputPath)
    const content = mozlz4a.decompress(compressed)
    const json = JSON.parse(content.toString('UTF-8'))
    const tabs = json.windows[0].tabs
    const tabContainer = new TabContainer(tabs)
    const list = ReactDOMServer.renderToString(List(tabContainer))
    const lastUpdate = json.session.lastUpdate || Date.now();
    const outputPath = `./fxtabs_${lastUpdate}.html`
    await writeFile(outputPath, Template(list))
    console.log(`success: ${outputPath}`)
  } catch (err) {
    console.error(err)
    return
  }
}

main()
