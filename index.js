#!/usr/bin/env node
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  
    ///*
    const browser = await chromium.launch({
        //ignoreDefaultArgs: true,
        headless: false,
        devtools: false,
        args: [
            '--app=http://localhost:8081',
            '--window-size=640,480',
            '--silent',
            //'--ignore-certificate-errors'
        ]
    });
    //*/
   
  
    /*
    const browser = await webkit.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewportSize({
        width: 640,
        height: 480,
    });
    await page.goto('http://localhost:8081/');
    browser.on('close', (e) => {
        console.log(`Closed ${JSON.stringify(e)}`);
    });
    browser.on('disconnected', (e) => {
        console.log(`Disconnected ${JSON.stringify(e)}`);
    });
   */

  //console.log(__dirname);
  //console.log(process.cwd());
  //await page.goto(`file:${path.join(__dirname, '/www/index.html')}`);
  //await page.goto(`file:${path.join(process.cwd(), '/www/index.html')}`);
  //await page.screenshot({ path: `example.png` });
  //await browser.close();

})();

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
  console.log(`T10-Lite listening at http://localhost:${port}`);
});