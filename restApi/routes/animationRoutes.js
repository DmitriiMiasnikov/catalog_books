const { Router } = require('express');
const fs = require('fs');
const router = Router();
const animationJson = require('./../data/animation.json');

// /animation/list/:page
router.get(
  '/list/:page',
  async (req, res) => {
    let countInPage = req.query.counter;
    let page = Number(req.params.page) || 1;
    let sort = req.query.sort;
    let filter = req.query.filter;
    let animation = animationJson.filter((el, i) => {
      if (el.genre) {
        return !el.genre.includes('хентай');
      } else return el
    });
    try {
      animation = animation.filter((el, i) => {
        if (fs.existsSync(`./../public/img/animation_cover_${el.animeId}.jpg`)) {
          return true
        } else return false
      })
    } catch(err) {
      console.log(err);
    }
    let countAnimation = animation.length;
    const auditoryFilters = () => {
      const auditoryItems = animation.map(el => {
        return el.auditory
      });
      const unique = (arr) => Array.from(new Set(arr));
      return ['все'].concat(unique(auditoryItems).filter(el => el));
    }
    const genreFilters = () => {
      let genreItems = [];
      animation.forEach(el => {
        genreItems.push(el.genre);
      });
      genreItems = genreItems.flat(1)
      const unique = (arr) => Array.from(new Set(arr));
      return ['все'].concat(unique(genreItems).filter(el => el));
    }
    const filters = {
      'auditory': auditoryFilters(),
      'genre': genreFilters()
    }
    try {
      if (sort !== 'default') {
        switch (sort) {
          case ('name'): {
            animation = animation.sort((a, b) => {
              if (a.nameRu === b.nameRu) {
                return 0
              } else if (a.nameRu > b.nameRu || !a.nameRu) {
                return 1
              } else return -1
            })
            break;
          }
          case ('date'): {
            animation = animation.sort((a, b) => {
              if (a.date[a.date.length - 1] === b.date[b.date.length - 1]) {
                return 0
              } else if (a.date[a.date.length - 1] > b.date[b.date.length - 1] || !a.date) {
                return 1
              } else return -1
            })
            break;
          }
          default: break;
        }
      }
      if (Object.keys(filters).some(el => filters[el].slice(1).includes(filter))) {
        animation = animation.filter((el, i) => {
          if (filters['auditory'].includes(filter) && el.auditory) {
            return el.auditory === filter
          } else if (filters['genre'].includes(filter) && el.genre) {
            return el.genre.some(item => item === filter)
          }
        });
        countAnimation = animation.length;
      }
      animation = animation.filter((el, i) => i >= (countInPage * page - (countInPage - 1)) && i <= (countInPage * page));
      res.status(200).json({ animation, page, countInPage, countAnimation, filters });
    } catch (e) {
      console.log(e)
    }
  }
)
// /animation/id/:id
router.get(
  '/id/:animeId',
  async (req, res) => {
    try {
      const selectedAnimation = animationJson.find(el => el.animeId === Number(req.params.animeId));
      res.status(200).json({ selectedAnimation });
    } catch (e) {
      console.log(e)
    }
  }
)
module.exports = router;