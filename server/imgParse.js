const fs = require("fs");

const counter = 1;
for (let i = 1; i <= counter; i++) {
  const URL = `http://www.world-art.ru/animation/animation.php?id=${i}`;
  const res = fetch(URL);
  fs.appendFileSync(`animation_cover_${i}.jpg`)
};