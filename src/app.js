const express = require('express');
const app = express();
const configFilePath = './config/config.json';
const fs = require('fs');
const config = JSON.parse(fs.readFileSync(configFilePath));
const port = config.port;
console.log(config);

app.get('/api', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
