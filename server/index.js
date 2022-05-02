const express = require('express');
const path = require('path'); // NEW
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW

const domain = process.env.DOMAIN;
const clientId = process.env.CLIENTID;
const redirecturi = process.env.REDIRECTURI;

console.log(domain);
console.log(clientId);
console.log(redirecturi);

const mockResponse = {
  foo: 'bar',
  bar: 'foo'
};
app.use(express.static(DIST_DIR)); 
app.get('/api', (req, res) => {
  res.send(mockResponse);
});
app.get('/', (req, res) => {
  res.sendFile(HTML_FILE);
});
app.get('/api/getAuth0', (req, res, next) => {
  console.log(`Got a request to send auth0 details`)
  res.send({
    domain: domain,
    clientid: clientId,
    redirecturi: redirecturi
  })
})
app.listen(port, function () {
 console.log('App listening on port: ' + port);
});