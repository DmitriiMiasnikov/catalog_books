const needle = require('needle');
const fs = require("fs");
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;
const anime = [];

const counter = 20;
const arr = [];
for (let i = 1; i <= counter; i++) {
  arr.push(i);
}
function delay() {
  return new Promise(resolve => setTimeout(resolve, 500));
}
async function delayedLog(item) {
  await delay();
  const obj = new Object();
  const URL = `http://www.world-art.ru/animation/animation.php?id=${item}`;
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
    console.log(item, doc.toString().length);
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
      pathDate1 = ".//*[td/b[contains(text(),'Выпуск')]]/td[3]/a//text()";
      tmpDate = xpath.select(pathDate1, doc);
    }
    obj['animeId'] = item;
    tmpNameRu.length ? obj['nameRu'] = tmpNameRu[0].data : null;
    tmpNameEng.length ? obj['nameEng'] = tmpNameEng[0].data : null;
    tmpNameRom.length ? obj['nameRom'] = tmpNameRom[0].data : null;
    tmpAuthor.length ? obj['author'] = tmpAuthor[0].data : null;
    tmpDate.length ? obj['date'] = tmpDate.map(el => el.data) : null;
    tmpGenre.length ? obj['genre'] = tmpGenre.map(el => el.data) : null;
    tmpType.length ? obj['type'] = tmpType[0].data : null;
    tmpAuditory.length ? obj['auditory'] = tmpAuditory[0].data : null;
    tmpSubscription.length ? obj['description'] = tmpSubscription[0].data.replace(/<\/?[^>]+(>|$)/g, "") : null;
    anime.push(obj);
    if (!err && res.statusCode == 200 && anime.length === counter) {
      fs.appendFileSync('data.json',
        JSON.stringify(anime), (err) => {
          if (err) throw err;
        })
    }
  });
}
processArray(arr);
async function processArray(arr) {
  for (const item of arr) {
    await delayedLog(item);
  }
}

// const counter = 3;
// for (let i = 1; i <= counter; i++) {
//   const obj = new Object();
//   const URL = `http://www.world-art.ru/animation/animation.php?id=${i}`;
//   needle.get(URL, function (err, res) {
//     if (err) throw err;
//     const doc = new dom({
//       locator: {},
//       errorHandler: {
//         warning: function (w) { },
//         error: function (e) { },
//         fatalError: function (e) { console.error(e) }
//       }
//     }).parseFromString(res.body);
//     pathNameRu = ".//*[table/tr/td/b[contains(text(),'Название (ромадзи)')]]/table[1]//text()";
//     pathNameEng = ".//*[td/b[contains(text(),'Название (англ.)')]]/td[3]//text()";
//     pathNameRom = ".//*[td/b[contains(text(),'Название (ромадзи)')]]/td[3]//text()";
//     pathAuthor = ".//*[td/b[contains(text(),'Режиссёр')]]/td[3]/a//text()";
//     pathDate = ".//*[td/b[contains(text(),'Премьера')]]/td[3]/a//text()";
//     pathGenre = ".//*[td/b[contains(text(),'Жанр')]]/td[3]/a//text()";
//     pathType = ".//*[td/b[contains(text(),'Тип')]]/td[3]//text()";
//     pathAuditory = ".//*[td/b[contains(text(),'Целевая аудитория')]]/td[3]//text()";
//     pathSubscription = ".//*[table//font[contains(text(),'Краткое содержание')]]/table[6]//text()";
//     const tmpNameRu = xpath.select(pathNameRu, doc);
//     const tmpNameEng = xpath.select(pathNameEng, doc);
//     const tmpNameRom = xpath.select(pathNameRom, doc);
//     const tmpAuthor = xpath.select(pathAuthor, doc);
//     let tmpDate = xpath.select(pathDate, doc);
//     const tmpGenre = xpath.select(pathGenre, doc);
//     const tmpType = xpath.select(pathType, doc);
//     const tmpAuditory = xpath.select(pathAuditory, doc);
//     const tmpSubscription = xpath.select(pathSubscription, doc);
//     if (!tmpDate.length) {
//       pathDate1 = ".//*[td/b[contains(text(),'Выпуск')]]/td[3]/a//text()";
//       tmpDate = xpath.select(pathDate1, doc);
//     }
//     obj['animeId'] = i;
//     tmpNameRu.length ? obj['nameRu'] = tmpNameRu[0].data : null;
//     tmpNameEng.length ? obj['nameEng'] = tmpNameEng[0].data : null;
//     tmpNameRom.length ? obj['nameRom'] = tmpNameRom[0].data : null;
//     tmpAuthor.length ? obj['author'] = tmpAuthor[0].data : null;
//     tmpDate.length ? obj['date'] = tmpDate.map(el => el.data) : null;
//     tmpGenre.length ? obj['genre'] = tmpGenre.map(el => el.data) : null;
//     tmpType.length ? obj['type'] = tmpType[0].data : null;
//     tmpAuditory.length ? obj['auditory'] = tmpAuditory[0].data : null;
//     tmpSubscription.length ? obj['description'] = tmpSubscription[0].data.replace(/<\/?[^>]+(>|$)/g, "") : null;
//     anime.push(obj);
//     if (!err && res.statusCode == 200 && anime.length === counter) {
//       fs.appendFileSync('data.json',
//         JSON.stringify(anime), (err) => {
//           if (err) throw err;
//         })
//     }
//   });
// }