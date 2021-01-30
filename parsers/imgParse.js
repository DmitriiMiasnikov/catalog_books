const { spawn } = require('child_process');
const needle = require('needle');
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;

const counter = 10750;
const arr = [];
for (let i = 5001; i <= counter; i++) {
  arr.push(i);
}
function delay() {
  return new Promise(resolve => setTimeout(resolve, 1000));
}
async function delayedLog(item) {
  await delay();
  const URL = `http://www.world-art.ru/animation/animation_poster.php?id=${item}&number_img=1`;
  needle.get(URL, function (err, res) {
    if (err) throw err;
    const doc = new dom({
      locator: {},
      errorHandler: {
        warning: function (w) { },
        error: function (e) { },
        fatalError: function (e) { console.error(e) }
      }
    }).parseFromString(res.body);
    pathImg = ".//*[table//a[contains(text(),'все')]]/table[1]//img/@src";
    console.log(item, doc.toString().length);
    if (doc.toString().length > 1000) {
      const tmpImg = xpath.select(pathImg, doc);
      if (tmpImg.length) {
        const curl = spawn('curl', ['-o', `./img/animation_cover_${item}.jpg`, `http://www.world-art.ru/animation/${tmpImg[0].value}`]);
        curl.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });
      }
    }
  })
}
processArray(arr);
async function processArray(arr) {
  for (const item of arr) {
    await delayedLog(item);
  }
}