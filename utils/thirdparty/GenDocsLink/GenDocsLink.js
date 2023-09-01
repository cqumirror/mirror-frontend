const fs = require('fs')
const readline = require('readline')

const target = 'content/wiki/mirror-wiki/'
const output = 'components/Api/Api_doclist.js'

let fileList

async function readTarget(dir) {
  try {
    fileList = await fs.promises.readdir(dir)
  } catch (err) {
    console.error(err)
    process.exit(255)
  }
}

function writeToOutput(file) {
  let path = file.toString().replace(/filepath:\s+'\s?/g, '')
    .replace(/_index\s?'\s?/g, '')
    .replace(/\/wiki\/mirror-wiki\//g, '')
    .replace('/', '')
  path = '\t\t\t\'' + path + '\':' + ' prefix + \'#/wiki/mirror-wiki/' + path + '\',\n'

  fs.appendFile(output, path, function (err) {
    if (err) {
      throw err
    }
  })

}

async function prepare() {
  fs.writeFile(
    output,
    'const prefix = process.env.baseURL\n' +
    '\n' +
    'export default {\n' +
    '\tgetDocLink: params => {\n' +
    '\t\tconst list = {\n',
    function (err) {
      if (err) throw err;
    })
}

async function generate() {
  const writePromises = [] // 用于存储所有的写入操作 Promise

  for (const file of fileList) {
    if (file.lastIndexOf('_index.md') === -1) {
      const fileStream = fs.createReadStream(target + file + '/_index.md')

      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      })

      let lineCount = 0

      const promise = new Promise((resolve, reject) => {
        rl.on('line', (line) => {
          lineCount++
          if (lineCount === 5 && line.lastIndexOf('filepath') !== -1) {
            if (line.lastIndexOf('filepath') !== -1) {
              writeToOutput(line)
              rl.close()
              resolve()
            } else {
              console.error(`Please checkout document ${file} on line 5`)
              console.error("It must have `filepath` to generate links")
              process.exit(255)
            }
          }
        })
      })

      writePromises.push(promise)
    }
  }

  // 使用 Promise.all 等待所有写入操作完成
  await Promise.all(writePromises)

  // 执行最终写入操作
  fs.appendFile(output, '\t\t}\n\t\treturn list\n\t}\n}\n', function (err) {
    if (err) throw err
  })
}

async function main() {
  await prepare()
  await readTarget(target)
  await generate()
}

main()
