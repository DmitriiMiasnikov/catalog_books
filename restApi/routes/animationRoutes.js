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
        ]
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
            {  animationId: userId ? { $in: user.animation[userFilter] } : { $type: 'number'} },
            { [currentFilter]: noFilters ? { $in: filters[currentFilter] } : filter },
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
            {  animationId: userId ? { $in: user.animation[userFilter] } : { $type: 'number'} },
            { [currentFilter]: noFilters ? { $in: filters[currentFilter] } : filter },
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
// /animation/id/:id
router.get(
  '/id/:animationId',
  async (req, res) => {
    try {
      const selectedAnimation = await Animation.findOne({ animationId: req.params.animationId });
      res.status(200).json({ selectedAnimation });
    } catch (e) {
      console.log(e)
    }
  }
)
module.exports = router;