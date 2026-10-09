// Static server for ui-mockup labs. /tools/* comes from the ui-mockup skill.
const http = require('http'), fs = require('fs'), path = require('path');
const [, , root, port = '5178'] = process.argv;
const TOOLS = path.join(process.env.USERPROFILE || process.env.HOME, '.claude/skills/ui-mockup/tools');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json' };
http.createServer((q, r) => {
  const u = decodeURIComponent(q.url.split('?')[0]);
  const fp = u.startsWith('/tools/') ? path.join(TOOLS, u.slice(7)) : path.join(root, u === '/' ? 'index.html' : u);
  fs.readFile(fp, (e, d) => {
    if (e) { r.writeHead(404); return r.end(); }
    r.writeHead(200, { 'content-type': MIME[path.extname(fp)] || 'application/octet-stream', 'cache-control': 'no-store' }); r.end(d);
  });
}).listen(+port, '127.0.0.1', () => console.log('serving', root, 'on', port));
