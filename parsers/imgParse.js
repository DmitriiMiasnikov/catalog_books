const { spawn } = require('child_process');
const needle = require('needle');
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;

const counter = 5;
for (let i = 1; i <= counter; i++) {
  const URL = `http://www.world-art.ru/animation/animation_poster.php?id=${i}&number_img=1`;
  needle.get(URL, function (err, res) {
    if (err) throw err;
    const doc = new dom({
      locator: {},
      errorHandler: { warning: function (w) { }, 
      error: function (e) { }, 
      fatalError: function (e) { console.error(e) } }
  }).parseFromString(res.body);
    pathImg = ".//*[table//a[contains(text(),'все')]]/table[1]//img/@src";
    const tmpImg = xpath.select(pathImg, doc);
    const curl = spawn('curl', ['-o', `./img/anime_cover_${i}.jpg`, `http://www.world-art.ru/animation/${tmpImg[0].value}`]);
    curl.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
  })

};