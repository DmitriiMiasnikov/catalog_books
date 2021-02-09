const needle = require('needle');
const mongoose = require('mongoose');
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;
const fs = require('fs');
const config = require('config');
const { spawn } = require('child_process');
const cheerio = require('cheerio');

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
  } catch (e) {
    console.log(e);
  }
}
start();
const counter = 2;
const arr = [];

function delay() {
  return new Promise(resolve => setTimeout(resolve, 1000));
}


const openCurrentCatalog = (link) => {
  const linkCatalog = `https://knijky.ru/${link}`;
  needle.get(linkCatalog, async function (err, res) {
    const doc = new dom({
      locator: {},
      errorHandler: {
        warning: function (w) { },
        error: function (e) { },
        fatalError: function (e) { console.error(e) }
      }
    }).parseFromString(res.body);
    await delay();
    const $ = cheerio.load(doc.toString());
    const pathBooksOnPage = '#block-system-main > div.content > div.pre_book > div:nth-child(5)';
    const booksOnPage = $(pathBooksOnPage).children('div.list').children('div.views-row');
    for (let i = 0; i < 1; i++) {
      const linkBook = $(booksOnPage[i]).children('div:nth-child(2)').children('div:nth-child(1)').find('a').attr('href');
      openCurrentBook(linkBook);
    }
  })
}

const openCurrentBook = (link) => {
  const linkBook = `https://knijky.ru/${link}`;
  needle.get(linkBook, async function (err, res) {
    const doc = new dom({
      locator: {},
      errorHandler: {
        warning: function (w) { },
        error: function (e) { },
        fatalError: function (e) { console.error(e) }
      }
    }).parseFromString(res.body);
    await delay();
    const $ = cheerio.load(doc.toString());
    const pathAuthor = '#block-system-main';
    const author = $(pathAuthor).find('.img_block').parent('.book_top').find("div.line:contains('Жанр:')").filter(el => $(el).children().hasClass('right')).text();
    console.log(author);
    // for (let i = 0; i < booksOnPage.length; i++) {
    //   const linkBook = $(booksOnPage[i]).children('div:nth-child(2)').children('div:nth-child(1)').find('a').attr('href');
    //   openCurrentBook(linkBook);
    // }
  })
}


async function delayedLog(item) {
  const URL = `https://knijky.ru/`;
  needle.get(URL, async function (err, res) {
    const doc = new dom({
      locator: {},
      errorHandler: {
        warning: function (w) { },
        error: function (e) { },
        fatalError: function (e) { console.error(e) }
      }
    }).parseFromString(res.body);
    await delay();
    console.log(item, doc.toString().length);
    const $ = cheerio.load(doc.toString());
    const pathCatalog = '#block-biblioteka-zanr-menu > div > div > ul > li';
    const catalog = $(pathCatalog);
    // console.log(booksOnPage.length);
    for (let i = 0; i < 1; i++) {
      const linkCatalog = $(`${pathCatalog}:nth-child(${i + 1})`).find('a').attr('href');
      openCurrentCatalog(linkCatalog);
    }
    // const pathMenu = 'body > div.container > div > div.center.nuclear > div.wrapper > div';
    // // console.log($(pathMenu).find('a').length);
    // const menuLength = $(pathMenu).find('a').length - 1;
    // // перебираем меню по всем категориям
    // for (let i = 0; i < 1; i++) {
    //   // console.log($(pathMenu).find('a')[i].attribs.href);
    //   const urlDir = `https:${$(pathMenu).find('a')[i].attribs.href}`
    //   needle.get(urlDir, async function (err, res) {
    //     const doc2 = new dom({
    //       locator: {},
    //       errorHandler: {
    //         warning: function (w) { },
    //         error: function (e) { },
    //         fatalError: function (e) { console.error(e) }
    //       }
    //     }).parseFromString(res.body);
    //     // console.log(item, doc2.toString().length);
    //     const $ = cheerio.load(doc2.toString());
    //     const pathBook = 'body > div.container > div > div.center.nuclear > div.wrapper > div';
    //     const namesLength = $(pathBook).find('a').length;
    //     console.log(namesLength);
    //     // перебираем категорию по всем книгам в ней
    //     for (let j = 0; j < 1; j++) {
    //       const urlBook = `https:${$(pathBook).find('a')[i].attribs.href}`;
    //       needle.get(urlBook, async function (err, res) {
    //         const doc3 = new dom({
    //           locator: {},
    //           errorHandler: {
    //             warning: function (w) { },
    //             error: function (e) { },
    //             fatalError: function (e) { console.error(e) }
    //           }
    //         }).parseFromString(res.body);
    //         // console.log(item, doc3.toString().length);
    //         const $ = cheerio.load(doc3.toString());
    //         const pathName = 'div.content > * table:nth-child(1) > tbody > tr:nth-child(2) > td';
    //         const pathAuthor = 'div.content > * table:nth-child(1) > tbody > tr:nth-child(1) > td > a';
    //         const pathSeries = 'div.content > * table:nth-child(1) > tbody';
    //         const pathGenre = 'div.content > * table:nth-child(1) > tbody > tr:nth-child(3) > td > a';
    //         const pathDate = 'div.content > * table:nth-child(1) > tbody';
    //         const pathDescription = 'div.content > * table:nth-child(1) > tbody';
    //         // получаем блок с информацией
    //         const tmpName = $(pathName).text().toString()
    //         const tmpAuthor = $(pathAuthor).text().toString()
    //         const tmpGenre = $(pathGenre).text().toString()
    //         const tmpDate = $(pathDate)
    //         const tmpDescription = $(pathDescription)
    //         const tmpSeries = $(pathSeries)
    //         console.log(tmpName, tmpAuthor, tmpGenre, tmpDate, tmpDescription, tmpSeries);
    //       })
    //     }
    //   })
    // }
    // console.log($('body > div.container > div > div.center.nuclear > div.left-bar > ul > a[${i}]'));
    // pathName = ".//*[@class='menu']//a[1]/@href";
    //   pathAuthor = ".//*[p/b[contains(text(),'Автор:')]]/a//text()";
    //   pathDate = ".//*[p/b[contains(text(),'Год:')]]//text()";
    //   pathGenre = ".//*[p/b[contains(text(),'Раздел:')]]//text()";
    //   pathPages = ".//*[p/b[contains(text(),'Страниц:')]]//text()";
    //   pathSubscription = ".//*[@class='swb_ann']/p//text()";
    //   pathImg = ".//*[@id='content']//table//img/@src";
    // const tmpName = xpath.select(pathName, doc);
    // console.log(tmpName);
    // const tmpAuthor = xpath.select(pathAuthor, doc);
    // const tmpDate = xpath.select(pathDate, doc);
    // const tmpGenre = xpath.select(pathGenre, doc);
    // const tmpPages = xpath.select(pathPages, doc);
    // const tmpSubscription = xpath.select(pathSubscription, doc);
    // const tmpImg = xpath.select(pathImg, doc);
    // console.log(tmpName, tmpAuthor, tmpDate, tmpGenre, tmpPages, tmpSubscription, tmpImg);


    // tmpSubscription.length ? obj['description'] = tmpSubscription[0].data.replace(/<\/?[^>]+(>|$)/g, "") : null;


    // if (!err && res.statusCode == 200 && doc.toString().length > 1000) {
    //   if (tmpImg.length) {
    //     const curl = spawn('curl', ['-o', `./imgBooks/book_cover_${item}.jpg`, `http://http://book-online.com.ua/${tmpImg[0].value}`]);
    //     curl.stdout.on('data', (data) => {
    //       console.log(`stdout: ${data}`);
    //     });
    //   }
    //   const book = new Books({
    //     bookId: item,
    //     name: tmpName.length ? tmpNameRu[0].data : null,
    //     author: tmpAuthor.length ? tmpAuthor[0].data : null,
    //     date: tmpDate.length ? tmpDate[0].data: null,
    //     genre: tmpGenre.length ? tmpGenre[0].data : null,
    //     pages: tmpPages.length ? tmpPages[0].data : null,
    //     subscription: tmpSubscription.length ? tmpSubscription[0].data : null,
    //   })
    //   await book.save()
    // } else {
    //   if (!tmpName.length) console.log('tmpNameRu.length')
    //   if (!tmpDate.length) console.log('!tmpDate.length')
    // }
  });
  await delay();
}
processArray(arr);
async function processArray(arr) {
  for (let i = 2; i <= counter; i++) {
    if (true) {
      arr.push(i);
    }
  }
  for (const item of arr) {
    await delayedLog(item);
  }
}