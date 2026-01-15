const cheerio = require('cheerio');
const https = require('https');
const fs = require('fs');

const url = 'https://documentation.ubuntu.com/project/release-team/list-of-releases/';
const template = './utils/thirdparty/GrabUbuntuRelease/_index.template.ubuntu.md';
const target = './content/wiki/mirror-wiki/ubuntu-releases/_index.md';

function parseURL(uri) {
  if (!uri) return '';
  if (uri.startsWith('http')) return uri;
  if (uri.startsWith('/')) return 'https://documentation.ubuntu.com' + uri;
  // 处理 Sphinx 的相对路径，去除 ../ 等
  const cleanUri = uri.replace(/^(\.\.\/)+/, '');
  return 'https://documentation.ubuntu.com/project/release-team/list-of-releases/' + cleanUri;
}

function parseTable(html) {
  const $ = cheerio.load(html);

  // 1. 根据新版官网类名定位表格
  let targetTable = $('table.docutils.align-default').first();

  // 2. 如果类名匹配失败，回退到查找包含特定关键信息的表格
  if (!targetTable.length) {
    targetTable = $('table').filter((i, el) => $(el).text().includes('End of life'));
  }

  if (!targetTable.length) {
    throw new Error('Critical Error: Could not locate the release table using class or content filters.');
  }

  const rows = targetTable.find('tbody tr');

  // 【关键修改点 1】：读取模板，清理末尾多余空格
  // 并由脚本统一写入表格头，确保表格语法连贯无断行
  let mdContent = fs.readFileSync(template, 'utf-8').trim() + '\n\n';
  mdContent += '| 版本 | 代号 | 发行注记 | 发行时间 | 停止支持 | 生命周期结束 |\n';
  mdContent += '|:--|:-:|:-:|:--|--:|--:|\n';

  rows.each((i, tr) => {
    const tds = $(tr).find('td');
    // 确保有足够的列
    if (tds.length < 6) return;

    // 清洗函数：合并空白符、去除新文档中特有的箭头符号 (↗)
    const cleanText = (el) => $(el).text().replace(/\s+/g, ' ').replace(/↗/g, '').trim();

    const getLink = (el) => {
      const a = $(el).find('a').first();
      return a.attr('href') ? parseURL(a.attr('href')) : '';
    };

    // 映射列索引
    const version     = cleanText(tds[0]);
    const codeText    = cleanText(tds[1]);
    const codeLink    = getLink(tds[1]);
    const docsText    = cleanText(tds[2]);
    const docsLink    = getLink(tds[2]);
    const releaseText = cleanText(tds[3]);
    const releaseLink = getLink(tds[3]);
    const eosText     = cleanText(tds[4]);
    const eosLink     = getLink(tds[4]);
    const eolText     = cleanText(tds[5]);

    // 【关键修改点 2】：过滤掉表头行，只处理数据行
    if (version && !version.toLowerCase().includes('version')) {
      // 组装行，末尾只保留一个 \n，确保表格行之间紧密连接
      const row = `| ${version} | [${codeText}](${codeLink}) | [${docsText}](${docsLink}) | [${releaseText}](${releaseLink}) | ${eosLink ? `[${eosText}](${eosLink})` : eosText} | ${eolText} |\n`;
      mdContent += row;
    }
  });

  fs.writeFileSync(target, mdContent, 'utf-8');
  console.log(`Update completed successfully. Target: ${target}`);
}

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
};

https.get(url, options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    try {
      parseTable(body);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  });
}).on('error', err => {
  console.error('Fetch error:', err.message);
  process.exit(1);
});
