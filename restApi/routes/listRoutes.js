const { Router } = require('express');
const fs = require('fs');
const router = Router();
const Animation = require('./../models/Animation');
const Users = require('./../models/Users');
const Manga = require('./../models/Manga');

// /list/:page
router.get(
  '/:page',
  async (req, res) => {
    let countInPage = Number(req.query.counter);
    let page = Number(req.params.page) || 1;
    let sort = req.query.sort;
    let filter = req.query.filter;
    let search = req.query.search;
    let userId = Number(req.query.userId) || 0;
    let userFilter = req.query.userFilter;
    let listName = req.query.listName;
    let list;
    let filters;
    let counterAll;
    let user;
    try {
      let dateToday = new Date();
      let date = [`${dateToday.getFullYear() - 3} - ${dateToday.getFullYear()}`];
      for (let i = dateToday.getFullYear() - 4; i > 1970; i = i - 4) {
        date.push(`${i - 3} - ${i}`);
      }
      filters = {
        'auditory': ['все', 'сёнэн', 'сэйнэн', 'сёдзё', 'дзёсэй', 'кодомо'],
        'genre': [
          'все', 'комедия',
          'повседневность', 'приключения',
          'фантастика', 'мистика',
          'фэнтези', 'драма',
          'спорт', 'романтика',
          'триллер', 'меха',
          'этти', 'детектив',
          'махо-сёдзё', 'боевые искусства',
          'музыкальный', 'ужасы',
          'образовательный'
        ],
        'type': [
          'все', 'полнометражный', 'короткометражный', 'ТВ', 'OVA'
        ],
        'dateStart': date
      }
      if (userId) {
        user = await Users.findOne({ userId: userId });
      }
      // фильтр, сортировка и поиск сразу
      let currentFilter;
      let noFilters;
      Object.keys(filters).map(el => {
        if (filters[el].includes(filter)) {
          currentFilter = el;
          noFilters = false;
        }
      })
      if (filter === 'все') {
        currentFilter = 'genre';
        noFilters = true;
      }
      let currentSort;
      if (sort === 'name' || sort === 'name_reverse') {
        currentSort = 'nameRu';
      } else if (sort === 'date' || sort === 'date_reverse') {
        currentSort = 'dateStart';
      } else listName === 'animation' ? currentSort = 'animationId' : currentSort = 'mangaId';
      if (listName === 'animation') {
        list = await Animation.find({
          $and: [
            { animationId: userId ? { $in: user.animation[userFilter] } : { $type: 'number' } },
            {
              $or: [
                { [currentFilter]: noFilters ? { $in: filters[currentFilter] } : filter },
                { [currentFilter]: { $regex: filter, $options: 'i' } },
                { [currentFilter]: { $lte: filter.split(' - ')[1], $gte: filter.split(' - ')[0] } }
              ]
            },
            {
              $or: [{ nameRu: { $regex: search, $options: 'i' } },
              { nameEng: { $regex: search, $options: 'i' } },
              { nameRom: { $regex: search, $options: 'i' } },
              { author: { $regex: search, $options: 'i' } }]
            }
          ]
        })
          .sort({ [currentSort]: sort.split('_').length === 2 ? -1 : 1 })
          .skip(countInPage * page - (countInPage))
          .limit(countInPage);
        counterAll = await Animation.find({
          $and: [
            { animationId: userId ? { $in: user.animation[userFilter] } : { $type: 'number' } },
            {
              $or: [
                { [currentFilter]: noFilters ? { $in: filters[currentFilter] } : filter },
                { [currentFilter]: { $regex: filter, $options: 'i' } },
                { [currentFilter]: { $lte: filter.split(' - ')[1], $gte: filter.split(' - ')[0] } }
              ]
            },
            {
              $or: [{ nameRu: { $regex: search, $options: 'i' } },
              { nameEng: { $regex: search, $options: 'i' } },
              { nameRom: { $regex: search, $options: 'i' } },
              { author: { $regex: search, $options: 'i' } }]
            }
          ]
        }).countDocuments({}, {
          skip: countInPage * page - (countInPage),
          limit: countInPage
        })
      } else if (listName === 'manga' || listName === 'ranobe') {
        list = await Manga.find({
          $and: [
            { mangaId: userId ? { $in: user[listName][userFilter] } : { $type: 'number' } },
            { type: listName === 'manga' ? 'манга' : 'ранобэ' },
            {
              $or: [
                { [currentFilter]: noFilters ? { $in: filters[currentFilter] } : filter },
                { [currentFilter]: { $regex: filter, $options: 'i' } },
                { [currentFilter]: { $lte: filter, $gte: filter } }
              ]
            },
            {
              $or: [{ nameRu: { $regex: search, $options: 'i' } },
              { nameEng: { $regex: search, $options: 'i' } },
              { nameRom: { $regex: search, $options: 'i' } },
              { author: { $regex: search, $options: 'i' } }]
            }
          ]
        })
          .sort({ [currentSort]: sort.split('_').length === 2 ? -1 : 1 })
          .skip(countInPage * page - (countInPage))
          .limit(countInPage);
        counterAll = await Manga.find({
          $and: [
            { mangaId: userId ? { $in: user[listName][userFilter] } : { $type: 'number' } },
            { type: listName === 'manga' ? 'манга' : 'ранобэ' },
            {
              $or: [
                { [currentFilter]: noFilters ? { $in: filters[currentFilter] } : filter },
                { [currentFilter]: { $regex: filter, $options: 'i' } },
                { [currentFilter]: { $lte: filter.split(' - ')[1], $gte: filter.split(' - ')[0] } }
              ]
            },
            {
              $or: [{ nameRu: { $regex: search, $options: 'i' } },
              { nameEng: { $regex: search, $options: 'i' } },
              { nameRom: { $regex: search, $options: 'i' } },
              { author: { $regex: search, $options: 'i' } }]
            }
          ]
        }).countDocuments({}, {
          skip: countInPage * page - (countInPage),
          limit: countInPage
        })
      }
      res.status(200).json({ list, page, countInPage, counterAll, filters });
    } catch (e) {
      console.log(e)
    }
  }
)

// получение информации об одном аниме
// /list/id/:id
router.get(
  '/id/:id',
  async (req, res) => {
    try {
      let userId = Number(req.query.userId) || 0;
      let id = Number(req.params.id);
      let listName = req.query.listName;
      // добавляет последние 10 аниме в массив lastViewed[listName]
      const userToUpdate = await Users.findOne({ userId: userId }, 'lastViewed');
      let newLastViewed;
      if (userToUpdate) {
        newLastViewed = userToUpdate.lastViewed;
        if (!newLastViewed[listName].includes(id)) {
          newLastViewed[listName].push(id);
          if (newLastViewed[listName].length > 10) {
            newLastViewed[listName].shift()
          }
        }
        await Users.updateOne({ userId: userId }, { lastViewed: newLastViewed })
      }
      let selectedDescription;
      if (listName === 'animation') {
        selectedDescription = await Animation.findOne({ animationId: id });
      } else {
        selectedDescription = await Manga.findOne({ mangaId: id });
      }
      res.status(200).json({ selectedDescription });
    } catch (e) {
      console.log(e)
    }
  }
)

// получить случайное аниме, мангу, ранобе
// /list/randomId/
router.get(
  '/randomItems/id',
  async (req, res) => {
    try {
      let randomItems = {}
      const lastAnimation = await Animation.find({}, 'animationId').countDocuments({});
      const randomAnimationId = Math.floor(Math.random() * lastAnimation) + 1;
      randomItems.animation = await Animation.findOne({}).skip(randomAnimationId).limit(1);;

      const lastManga = await Manga.find({ type: 'манга' }, 'mangaId').countDocuments({});
      const randomMangaId = Math.floor(Math.random() * lastManga) + 1;
      randomItems.manga = await Manga.findOne({ type: 'манга' }).skip(randomMangaId).limit(1);

      const lastRanobe = await Manga.find({ type: 'ранобэ' }, 'mangaId').countDocuments({});
      const randomRanobeId = Math.floor(Math.random() * lastRanobe) + 1;
      randomItems.ranobe = await Manga.findOne({ type: 'ранобэ' }).skip(randomRanobeId).limit(1);
      res.status(200).json({ randomItems });
    } catch (e) {
      console.log(e)
    }
  }
)

module.exports = router;