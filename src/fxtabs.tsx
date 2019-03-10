import ReactDOMServer from 'react-dom/server'
import { TabContainer } from './modules/tab_container'
import List from './components/list'
import Template from './components/template'

import fs from 'fs'
import util from 'util'
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

async function main() {
  const inputPath = './recovery.json'
  const outputPath = `./fxtabs_${Date.now()}.html`
  try {
    const json = await readFile(inputPath, 'utf-8')
    const tabs = JSON.parse(json).windows[0].tabs
    const tabContainer = new TabContainer(tabs)
    const list = ReactDOMServer.renderToString(List(tabContainer))
    await writeFile(outputPath, Template(list))
  } catch (err) {
    console.error(err)
    return
  }
  console.log(`success: ${outputPath}`)
}

main()
