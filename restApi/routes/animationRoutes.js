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
    try {
      if (sort === 'default' && filter === 'все' && !search && !userId) {
        animation = await Animation.find({})
          .skip(countInPage * page - (countInPage))
          .limit(countInPage);
        countAnimation = await Animation.find({}).countDocuments({}, {
          skip: countInPage * page - (countInPage),
          limit: countInPage
        })
      }
      // sorting
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
              .sort({ dateStart: sort === 'date' ? 1 : -1 })
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
      // filters
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
      // search
      if (search) {
        // animation = animation.filter((el, i) => {
        //   if (el.nameRu) {
        //     const name = el.nameRu.toLowerCase();
        //     if (name.includes(search)) return true
        //   }
        //   if (el.nameEng) {
        //     const name = el.nameEng.toLowerCase();
        //     if (name.includes(search)) return true
        //   }
        //   if (el.nameRom) {
        //     const name = el.nameRom.toLowerCase();
        //     if (name.includes(search)) return true
        //   }
        //   if (el.author) {
        //     const author = el.author.toLowerCase();
        //     if (author.includes(search)) return true
        //   }
        //   return false
        // });
        animation = await Animation.aggregate([{ $match: { nameRu: search } }])
      }
      // let countAnimation = animation.length;
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