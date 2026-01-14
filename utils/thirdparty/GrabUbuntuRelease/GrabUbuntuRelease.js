const cheerio = require('cheerio')
const https = require('https')
const fs = require('fs')

// 更新为新地址
const url = 'https://documentation.ubuntu.com/project/release-team/list-of-releases/'
const template = './utils/thirdparty/GrabUbuntuRelease/_index.template.ubuntu.md'
const target = './content/wiki/mirror-wiki/ubuntu-releases/_index.md'

let reqBody = ''

async function queryUbuntuRelease(uri) {
  https.get(url, res => {
    let data = '';
    res.on('data', chunk => {
      reqBody += chunk;
    });
    res.on('end', () => {
      parseTable(reqBody)
    })
  }).on('error', err => {
    console.log(err.message);
  })
}

function parseURL(uri) {
  if (!uri) return '';
  // 如果是绝对路径
  if (uri.startsWith('http')) {
    return uri;
  }
  // 处理相对路径，新站点基础路径不同
  if (uri.startsWith('/')) {
    return 'https://documentation.ubuntu.com' + uri;
  } else {
    return 'https://documentation.ubuntu.com/project/release-team/list-of-releases/' + uri;
  }
}

function parseToMD(version, code, code_url, docs, docs_url, release, release_url, eos, eos_url, eol) {
  if (version) {
    let data = `| ${version} | [${code}](${code_url}) | [${docs}](${docs_url}) | [${release}](${release_url}) | `;
    if (eos_url) {
      data += `[${eos}](${eos_url}) | ${eol} |\n`;
    } else {
      data += `${eos} | ${eol} |\n`;
    }
    fs.appendFile(target, data, 'utf-8', (err) => {
      if (err) throw err;
    });
  }
}

function parseTable(reqBody) {
  const $ = cheerio.load(reqBody)

  const targetTable = $('table').filter((i, el) => {
    return $(el).find('th').text().includes('Version');
  }).first();

  if (targetTable.length === 0) {
    console.error('Critical Error: Ubuntu release table not found. Page structure might have changed.');
    process.exit(1);
  }

  const rows = targetTable.find('tbody tr');

  rows.each((index, tr) => {
    const tds = $(tr).find('td');
    if (tds.length < 6) return; // 确保行数据完整

    // 提取文本和链接的辅助函数
    const getText = (cell) => $(cell).text().trim();
    const getLink = (cell) => {
      const a = $(cell).find('a').first();
      return {
        text: a.text().trim() || getText(cell),
        url: parseURL(a.attr('href'))
      };
    };

    // 根据新表格列顺序解析:
    // 0: Version, 1: Code name, 2: Docs, 3: Release date, 4: End of standard support, 5: End of life
    const version = getText(tds[0]);
    const codeInfo = getLink(tds[1]);
    const docsInfo = getLink(tds[2]);
    const releaseInfo = getLink(tds[3]);
    const eosInfo = getLink(tds[4]);
    const eol = getText(tds[5]);

    parseToMD(
      version,
      codeInfo.text,
      codeInfo.url,
      docsInfo.text,
      docsInfo.url,
      releaseInfo.text,
      releaseInfo.url,
      eosInfo.text,
      eosInfo.url,
      eol
    );
  });
}

async function prepare() {
  try {
    const data = fs.readFileSync(template);
    fs.writeFileSync(target, data.toString('utf-8'));
  } catch (err) {
    console.error("Prepare failed:", err);
    throw err;
  }
}

// 执行脚本
(async () => {
  await prepare();
  queryUbuntuRelease(url);
})();
