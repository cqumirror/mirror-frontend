const cheerio = require('cheerio');
const https = require('https');
const fs = require('fs');

const url = 'https://documentation.ubuntu.com/project/release-team/list-of-releases/';
const template = './utils/thirdparty/GrabUbuntuRelease/_index.template.ubuntu.md';
const target = './content/wiki/mirror-wiki/ubuntu-releases/_index.md';

// 封装 HTTPS 请求为 Promise
function fetchData(uri) {
  return new Promise((resolve, reject) => {
    https.get(uri, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', err => reject(err));
  });
}

function parseURL(uri) {
  if (!uri) return '';
  if (uri.startsWith('http')) return uri;
  // 适配新站点的相对路径
  return 'https://documentation.ubuntu.com' + (uri.startsWith('/') ? uri : '/' + uri);
}

function parseTable(html) {
  const $ = cheerio.load(html);

  // 策略：寻找包含 "Version" 和 "End of life" 文字的表格
  const targetTable = $('table').filter((i, el) => {
    const text = $(el).text();
    return text.includes('Version') && text.includes('End of life');
  }).first();

  if (!targetTable.length) {
    throw new Error('Critical Error: Ubuntu release table not found using content filter.');
  }

  const rows = targetTable.find('tbody tr');
  let mdContent = fs.readFileSync(template, 'utf-8');

  rows.each((i, tr) => {
    const tds = $(tr).find('td');
    if (tds.length < 6) return;

    const version = $(tds[0]).text().trim();
    const code = $(tds[1]).text().trim();
    const code_url = parseURL($(tds[1]).find('a').attr('href'));
    const docs = $(tds[2]).text().trim() || 'Docs';
    const docs_url = parseURL($(tds[2]).find('a').attr('href'));
    const release = $(tds[3]).text().trim();
    const release_url = parseURL($(tds[3]).find('a').attr('href'));
    const eos = $(tds[4]).text().trim();
    const eos_url = parseURL($(tds[4]).find('a').attr('href'));
    const eol = $(tds[5]).text().trim();

    if (version) {
      mdContent += `| ${version} | [${code}](${code_url}) | [${docs}](${docs_url}) | [${release}](${release_url}) | ${eos_url ? `[${eos}](${eos_url})` : eos} | ${eol} |\n`;
    }
  });

  fs.writeFileSync(target, mdContent, 'utf-8');
  console.log('Successfully updated Ubuntu releases.');
}

async function run() {
  try {
    console.log('Fetching Ubuntu releases from new docs...');
    const html = await fetchData(url);
    parseTable(html);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

run();
