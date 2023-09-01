const cheerio = require('cheerio')
const https = require('https')
const fs = require('fs')


const url = 'https://wiki.ubuntu.com/Releases'
const template = './utils/thirdparty/GrabUbuntuRelease/_index.template.ubuntu.md'
const target = './content/wiki/mirror-wiki/ubuntu-releases/_index.md'


let reqBody = ''

async function queryUbuntuRelease (uri) {
  await https.get(url, res => {
    let data = '';
    res.on('data', chunk => {
      reqBody += chunk;
    });
    res.on('end', () => {
      // console.log(reqBody)
      parseTable(reqBody)
    })
  }).on('error', err => {
    console.log(err.message);
  })
}

function parseURL(uri) {
  // console.log(uri)
  if (uri && uri.lastIndexOf('http') !== -1) {
    return uri
  } else if (uri) {
    let new_url = 'https://wiki.ubuntu.com'+uri
    return new_url.toString()
  }
}

function parseToMD(version,code,code_url,docs,docs_url,release,release_url,eos,eos_url,eol) {
  if (version) {
    let data = '| ' + version + ' | [' + code + '](' + code_url + ') | [' + docs + '](' + docs_url + ') | [' + release + '](' +
      release_url + ') | '
    if (eos_url) {
      data += '[' + eos + '](' + eos_url + ') | ' + eol + ' |\n'
    } else {
      data += eos + ' | ' + eol + ' |\n'
    }
    fs.appendFile(target, data, 'utf-8',
      function (err) {
        if (err) throw err;
      })
  }
}

function parseTable(reqBody) {
  const $ = cheerio.load(reqBody)

  const table = $('#content > div:nth-child(18) > table')['0'].children

  table[0].children.forEach((item, index) => {
    if (index !== 0) {
      const selected = $(item).toString()
        .replace('<tr> ','')
        .replace('</tr>','')
        .replace(/<\/td>/g,'')
        .replace(/<td.+?>/g,'')
        .replace(/<span.+?><\/span>/g,'')
      const reParseText = cheerio.load(selected)
      const p_selector = reParseText("p[class^='line']");
      const release_version = p_selector.eq(0).text()
      // console.log(release_version)
      const a_selector = reParseText("a")
      const release_code = a_selector.eq(0).text()
      // console.log(release_code)
      let release_code_url = a_selector.eq(0).attr("href") === undefined  ? '': a_selector.eq(0).attr("href")
      release_code_url = parseURL(release_code_url)
      // console.log(release_code_url)
      const release_docs = a_selector.eq(1).text()
      // console.log(release_docs)
      let release_docs_url = a_selector.eq(1).attr("href") === undefined  ? '': a_selector.eq(1).attr("href")
      release_docs_url = parseURL(release_docs_url)
      // console.log(release_docs_url)
      const release_date = a_selector.eq(2).text()
      // console.log(release_date)
      let release_date_url = a_selector.eq(2).attr("href") === undefined  ? '': a_selector.eq(2).attr("href")
      release_date_url = parseURL(release_date_url)
      // console.log(release_date_url)
      const eos_date = p_selector.eq(4).text()
      // console.log(eos_date)
      let eos_date_url = a_selector.eq(3).attr("href") === undefined  ? '': a_selector.eq(3).attr("href")
      eos_date_url = parseURL(eos_date_url)
      // console.log(eos_date_url)
      const eol_date = p_selector.eq(5).text()
      // console.log(eol_date)
      parseToMD(
        release_version,
        release_code,
        release_code_url,
        release_docs,
        release_docs_url,
        release_date,
        release_date_url,
        eos_date,
        eos_date_url,
        eol_date
      )
    }
  })
}

async function prepare() {
  let tmp
  fs.readFile(template,
    function (err,data) {
      if (err) throw err;
      tmp = data.toString('utf-8')
      fs.writeFile(target,tmp,
        function (err) {
          if (err) throw err;
        })
    })
}

prepare()
queryUbuntuRelease(url)

