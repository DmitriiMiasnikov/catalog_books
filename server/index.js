const iconv = require("iconv-lite");
var needle = require('needle');
const fs = require("fs");
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;
const URL = "http://www.world-art.ru/animation/animation.php?id=1";
// const xmlString = `
// <HTML>
// <head>
//   <title>Official game sheet</title>
//   <custom>Here we are</custom>
// <body class="sheet">
// </BODY>
// </HTML>`;
needle.get(URL, function(err, res){
  if (err) throw err;
  path = "//title//text()";
  const doc = new dom().parseFromString(res.body);
  const tmp = xpath.select(path, doc);
  fs.writeFile('json.json', `{
    "name": "${tmp}"
  }`, (err) => {
    if (err) throw err;
  })
});

// const { spawn } = require("child_process");
// const curl = spawn("curl", [URL]);
// let text = "";
// curl.stdout.on("data", (data) => {
//   text += data;
// });
// curl.stderr.on("data", (data) => {

// });
// curl.on('close', (code) => {
//   text = iconv.decode(text, "utf8");
//   path = "//title";
//   const doc = new dom().parseFromString(text);
//   const tmp = xpath.select(path, doc);
//   fs.writeFile('json.json', `{
//     "name": "${tmp}"
//   }`, (err) => {
//     if (err) throw err;
//   })
// });

// /html/body/center/table[7]/tbody/tr/td/table/tbody/tr/td[5]/table[2]/tbody/tr[2]/td[3]/table[2]/tbody/tr/td[3]
