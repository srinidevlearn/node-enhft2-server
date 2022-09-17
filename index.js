// run `node index.js` in the terminal

console.log(`Hello Node.js v${process.versions.node}!`);
const http = require('http');

const urlM = require('url');

function handleIncomingRequest(request, response) {
  let { url, headers } = request;
  // console.log(http.STATUS_CODE);
  // console.log(http.METHODS);
  // console.log(request.headers);
  let urlData = urlM.parse(url);
  let { href, search, query, pathname, protocol } = urlData;
  if (query) {
    let queryConstructor = query.split('&').map((queries) => {
      let [key, value] = queries.split('=');
      return { [key]: value };
    })
    query = queryConstructor;
  }
  console.log({ href, search, query, pathname, protocol });
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify({ href, search, query, pathname, protocol }));
  response.end();
}

const server = http.createServer(handleIncomingRequest);

server.listen(8080, console.log);
