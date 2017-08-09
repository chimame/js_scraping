var client = require('cheerio-httpcli')

exports.handler = function(ev, ctx, callback) {
  const result = {}
  // Googleでセーフサーチをオンにして該当サイトを検索する。
  // 検索結果が取れない場合はアダルトサイトとなる。
  ev.sites.forEach(function(site) {
    let response = client.fetchSync('http://www.google.co.jp/search', { q: 'site:'+site, safe: 'high' })
    if(response.$('body').html().indexOf('一致する情報は見つかりませんでした') > -1) {
      result[site] = 'adult'
    } else {
      result[site] = 'normal'
    }
  })

  callback(null, result)
}
