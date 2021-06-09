#!/usr/bin/env node
const path = require('path');

const express = require('express');
const app = express();
const port = 8081;

//app.use(express.static("www"));
app.use('/', express.static(__dirname + '/www'));

app.get('/', (req, res) => {
  //res.send('Hello World Again!');
  res.sendFile(path.join(__dirname, '/www/index.html'));
});

app.listen(port, () => {
  console.log(`T10-Lite server listening at http://localhost:${port}`);
});