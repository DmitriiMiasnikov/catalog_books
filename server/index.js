const iconv = require("iconv-lite");
const fs = require("fs");
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;
const URL = "http://www.world-art.ru/animation/animation.php?id=1";
const xmlString = `
<HTML>
<head>
  <title>Official game sheet</title>
  <custom>Here we are</custom>
<body class="sheet">
</BODY>
</HTML>`;


const { spawn } = require("child_process");
const curl = spawn("curl", [URL]);
let text = "";
curl.stdout.on("data", (data) => {
  text = iconv.decode(data, "win1251");
  path = "//title//text()";
  const doc = new dom().parseFromString(xmlString);
  const tmp = xpath.select(path, doc);
  fs.writeFile('json.json', `{ 
    "name": "${tmp.toString()}"
  }`, (err) => {
    if (err) throw err;
  })
});

// /html/body/center/table[7]/tbody/tr/td/table/tbody/tr/td[5]/table[2]/tbody/tr[2]/td[3]/table[2]/tbody/tr/td[3]
