const express = require('express');
const app = express();
const configFilePath = './config/config.json';
const fs = require('fs');
const config = JSON.parse(fs.readFileSync(configFilePath));
const port = config.port;
const url = require('url');
// console.log(config);

let VMIXip = config.mainVmix.ip;
let VMIXport = config.mainVmix.port;

app.get('/api', (req, res) => {
  const urlObject = {
    protocol: 'http',
    hostname: VMIXip,
    port: VMIXport,
    pathname: '/api',
    query: req.query,
  };

  res.redirect(url.format(urlObject));
});

app.get('/set', (req, res) => {
  let vmixSettings = config.mainVmix;

  if (req.query.backup != undefined) {
    if (req.query.backup == true) {
      vmixSettings = config.backupVmix;
    }
  }
  if (req.query.ip != undefined) {
    if (req.query.port != undefined) {
      vmixSettings.ip = req.query.ip;
      vmixSettings.port = req.query.port;
    }
  } else {
    VMIXip = vmixSettings.ip;
    VMIXport = vmixSettings.port;
  }
  if (req.query.backup != undefined) {
    if (req.query.backup == true) {
      config.backupVmix = vmixSettings;
    }
  } else {
    config.mainVmix = vmixSettings;
  }
  fs.writeFileSync(configFilePath, JSON.stringify(config));
  res.send({ config, status: 'Saved' });
});

app.get('/switch', (req, res) => {
  let vmixSettings = config.mainVmix;
  let status = 'Wrong Parameters';

  if (req.query.to != undefined) {
    if (req.query.to.toLowerCase() == 'backup') {
      vmixSettings = config.backupVmix;
      status = 'Switched to backup';
    } else if (req.query.to.toLowerCase() == 'main') {
      vmixSettings = config.mainVmix;
      status = 'Switched to main';
    }
  }
  VMIXip = vmixSettings.ip;
  VMIXport = vmixSettings.port;
  res.send({ status: status });
});

app.get('/getStatus', (req, res) => {
  let status = 'Something went wrong';
  if (VMIXip == config.mainVmix.ip && VMIXport == config.mainVmix.port) {
    status = 'Main';
  } else if (
    VMIXip == config.backupVmix.ip &&
    VMIXport == config.backupVmix.port
  ) {
    status = 'Backup';
  }
  res.send({ status: status });
});

app.get('/getConfig', (req, res) => {
  res.send(config);
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
