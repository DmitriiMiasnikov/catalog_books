const needle = require('needle');
const fs = require("fs");
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;

const counter = 3;
for (let i = 1; i <= counter; i++) {
  const URL = `http://www.world-art.ru/animation/animation.php?id=${i}`;
  needle.get(URL, function (err, res) {
    if (err) throw err;
    const doc = new dom().parseFromString(res.body);
    pathNameRu = ".//*[table/tr/td/b[contains(text(),'Название (ромадзи)')]]/table[1]//text()";
    pathNameEng = ".//*[td/b[contains(text(),'Название (англ.)')]]/td[3]//text()";
    pathNameRom = ".//*[td/b[contains(text(),'Название (ромадзи)')]]/td[3]//text()";
    pathAuthor = ".//*[td/b[contains(text(),'Режиссёр')]]/td[3]/a//text()";
    pathDate = ".//*[td/b[contains(text(),'Премьера')]]/td[3]/a//text()";
    pathGenre = ".//*[td/b[contains(text(),'Жанр')]]/td[3]/a//text()";
    pathType = ".//*[td/b[contains(text(),'Тип')]]/td[3]//text()";
    pathAuditory = ".//*[td/b[contains(text(),'Целевая аудитория')]]/td[3]//text()";
    pathSubscription = ".//*[table//font[contains(text(),'Краткое содержание')]]/table[6]//text()";
    const tmpNameRu = xpath.select(pathNameRu, doc);
    const tmpNameEng = xpath.select(pathNameEng, doc);
    const tmpNameRom = xpath.select(pathNameRom, doc);
    const tmpAuthor = xpath.select(pathAuthor, doc);
    let tmpDate = xpath.select(pathDate, doc);
    const tmpGenre = xpath.select(pathGenre, doc);
    const tmpType = xpath.select(pathType, doc);
    const tmpAuditory = xpath.select(pathAuditory, doc);
    const tmpSubscription = xpath.select(pathSubscription, doc);
    if (!tmpDate.length) {
      pathDate1 = ".//*[td/b[contains(text(),'Выпуск')]]/td[3]/a[position() <= 3]//text()";
      pathDate2 = ".//*[td/b[contains(text(),'Выпуск')]]/td[3]/a[position() > 3]//text()";
      tmpDate = `${xpath.select(pathDate1, doc)} - ${xpath.select(pathDate1, doc)}`;
    }
    fs.appendFileSync('data.json',
      `{
            "animeId": "${i}",
            "nameRu": "${tmpNameRu}",
            "nameEng": "${tmpNameEng}",
            "nameRom": "${tmpNameRom}",
            "author": "${tmpAuthor}",
            "date": "${tmpDate}",
            "genre": "${tmpGenre}",
            "type": "${tmpType}",
            "auditory": "${tmpAuditory}",
            "description": "${tmpSubscription}"
          }${i === counter ? '' : ', '}`, (err) => {
      if (err) throw err;
    })
  });
}