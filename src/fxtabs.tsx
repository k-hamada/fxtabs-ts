import ReactDOMServer from 'react-dom/server'
import { TabContainer } from './modules/tab_container'
import List from './components/list'
import Template from './components/template'
import mozlz4a from 'mozlz4a'

import fs from 'fs'
import util from 'util'
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const realpath = util.promisify(fs.realpath)

async function main(pathname: string) {
  try {
    const inputPath = await realpath(pathname)

    console.log(`read: ${inputPath}`)
    const compressed = await readFile(inputPath)

    console.log(`decompress`)
    const content = mozlz4a.decompress(compressed)

    console.log(`parse json`)
    const json = JSON.parse(content.toString('UTF-8'))
    const tabs = json.windows[0].tabs

    console.log(`parse tree`)
    const tabContainer = new TabContainer(tabs)

    console.log(`output`)
    const list = ReactDOMServer.renderToString(List(tabContainer))
    const lastUpdate = json.session.lastUpdate || Date.now()
    const outputPath = `./fxtabs_${lastUpdate}.html`

    console.log(`write: ${outputPath}`)
    await writeFile(outputPath, Template(list))

    console.log(`success`)
  } catch (err) {
    console.error(err)
  }
}

const pathname = process.argv[2]
if (pathname) {
  main(pathname)
} else {
  console.error(`Error: pathname=${pathname}`)
}
