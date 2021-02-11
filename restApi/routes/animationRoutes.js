const { Router } = require('express');
const fs = require('fs');
const router = Router();
const Animation = require('./../models/Animation');
const Users = require('./../models/Users');

// /animation/list/:page
router.get(
  '/list/:page',
  async (req, res) => {
    let countInPage = Number(req.query.counter);
    let page = Number(req.params.page) || 1;
    let sort = req.query.sort;
    let filter = req.query.filter;
    let search = req.query.search;
    let userId = Number(req.query.userId) || 0;
    let userFilter = req.query.userFilter;
    let animation;
    let filters;
    let countAnimation;
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
      } else currentSort = 'animationId';
      animation = await Animation.find({
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
      countAnimation = await Animation.find({
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
      res.status(200).json({ animation, page, countInPage, countAnimation, filters });
    } catch (e) {
      console.log(e)
    }
  }
)

// получение информации об одном аниме
// /animation/id/:id
router.get(
  '/id/:animationId',
  async (req, res) => {
    try {
      let userId = Number(req.query.userId) || 0;
      let animationId = Number(req.params.animationId);
      // добавляет последние 10 аниме в массив lastViewed.animation
      const userToUpdate = await Users.findOne({ userId: userId }, 'lastViewed');
      let newLastViewed;
      if (userToUpdate) {
        newLastViewed = userToUpdate.lastViewed;
        if (!newLastViewed.animation.includes(animationId)) {
          newLastViewed.animation.push(animationId);
          if (newLastViewed.animation.length > 10) {
            newLastViewed.animation.shift()
          }
        }
        await Users.updateOne({ userId: userId }, { lastViewed: newLastViewed })
      }
      const selectedAnimation = await Animation.findOne({ animationId: animationId });

      res.status(200).json({ selectedAnimation });
    } catch (e) {
      console.log(e)
    }
  }
)

// получить случайное аниме
// /animation/randomId
router.get(
  '/randomId',
  async (req, res) => {
    try {
      const lastAnimation = await Animation.find({}, 'animationId').sort({ animationId: -1 }).limit(1);
      const randomId = Math.floor(Math.random() * (lastAnimation[0].animationId - 1)) + 1;
      const randomAnimation = await Animation.findOne({ animationId: randomId });
      res.status(200).json({ randomAnimation });
    } catch (e) {
      console.log(e)
    }
  }
)

module.exports = router;