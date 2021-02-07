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
    let animation;
    let filters;
    let countAnimation;
    try {
          // если список пользователя
    if (userId) {
      const user = await Users.findOne({ userId: userId });
      animation = await Animation.find({ animationId: { $in: user.animation['done'] } })
        .skip(countInPage * page - (countInPage))
        .limit(countInPage);
      countAnimation = await Animation.find({ animationId: { $in: user.animation['done'] } }).countDocuments({}, {
        skip: countInPage * page - (countInPage),
        limit: countInPage
      })
      const auditory = () => {
        const auditoryItems = animation.map(el => {
          return el.auditory
        });
        const unique = (arr) => Array.from(new Set(arr));
        return ['все'].concat(unique(auditoryItems).filter(el => el));
      }
      const genre = () => {
        let genreItems = [];
        animation.forEach(el => {
          genreItems.push(el.genre);
        });
        genreItems = genreItems.flat(1)
        const unique = (arr) => Array.from(new Set(arr));
        return ['все'].concat(unique(genreItems).filter(el => el));
      }
      filters = {
        'auditory': auditory(),
        'genre': genre()
      }
    } else {
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
    }
      // вывод всего списка
      if (sort === 'default' && filter === 'все' && !search && !userId) {
        animation = await Animation.find({})
          .skip(countInPage * page - (countInPage))
          .limit(countInPage);
        countAnimation = await Animation.find({}).countDocuments({}, {
          skip: countInPage * page - (countInPage),
          limit: countInPage
        })
      }
      // sorting (только сортировка)
      if (sort !== 'default' && filter === 'все' && !search && !userId) {
        switch (sort) {
          case ('name_reverse'): { }
          case ('name'): {
            animation = await Animation.find({})
              .sort({ nameRu: sort === 'name' ? 1 : -1 })
              .skip(countInPage * page - (countInPage))
              .limit(countInPage);
            countAnimation = await Animation.find({}).countDocuments({}, {
              skip: countInPage * page - (countInPage),
              limit: countInPage
            })
            break;
          }
          case ('date_reverse'): { }
          case ('date'): {
            animation = await Animation.find({})
              .sort({ dateStart: sort === 'date' ? -1 : 1 })
              .skip(countInPage * page - (countInPage))
              .limit(countInPage);
            countAnimation = await Animation.find({}).countDocuments({}, {
              skip: countInPage * page - (countInPage),
              limit: countInPage
            })
            break;
          }
          default: break;
        }
      }
      // filters (только фильтры)
      if (sort === 'default' && filter !== 'все' && !search && !userId) {
        if (filters['auditory'].includes(filter)) {
          animation = await Animation.find({ auditory: filter })
            .skip(countInPage * page - (countInPage))
            .limit(countInPage);
          countAnimation = await Animation.find({ auditory: filter }).countDocuments({}, {
            skip: countInPage * page - (countInPage),
            limit: countInPage
          })
        } else if (filters['genre'].includes(filter)) {
          animation = await Animation.find({ genre: filter })
            .skip(countInPage * page - (countInPage))
            .limit(countInPage);
          countAnimation = await Animation.find({ genre: filter }).countDocuments({}, {
            skip: countInPage * page - (countInPage),
            limit: countInPage
          })
        }

      }
      // search (только поиск)
      if (search && sort === 'default' && filter === 'все' && !userId) {
        animation = await Animation.find({
          $or: [{ nameRu: { $regex: search, $options: 'i' } }, { nameEng: { $regex: search, $options: 'i' } },
          { nameRom: { $regex: search, $options: 'i' } }, { author: { $regex: search, $options: 'i' } }]
        })
          .skip(countInPage * page - (countInPage))
          .limit(countInPage);
        countAnimation = await Animation.find({
          $or: [{ nameRu: { $regex: search, $options: 'i' } }, { nameEng: { $regex: search, $options: 'i' } },
          { nameRom: { $regex: search, $options: 'i' } }, { author: { $regex: search, $options: 'i' } }]
        }).countDocuments({}, {
          skip: countInPage * page - (countInPage),
          limit: countInPage
        })
      }
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