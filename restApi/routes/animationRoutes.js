const { Router } = require('express');
const router = Router();
const animationJson = require('./../data/animation.json');

// /animation/list/:page
router.get(
  '/list/:page',
  async (req, res) => {
    let showBy = 10;
    let page = Number(req.params.page) || 1;
    let sort = req.query.sort;
    let countAnimation = animationJson.length;
    try {
      if (sort === 'default') {
        const animation = animationJson
          .filter((el, i) => i >= (showBy * page - 9) && i <= (showBy * page));
        res.status(200).json({ animation, page, showBy, countAnimation });
      } else {
        page = 1;
        if (sort === 'name') {
          const animation = animationJson.sort((a, b) => {
            if (a.nameRu === b.nameRu) {
              return 0
            } else if (a.nameRu > b.nameRu || !a.nameRu) {
              return 1
            } else return -1
          }).filter((el, i) => i >= (showBy * page - 9) && i <= (showBy * page));
          res.status(200).json({ animation, page, showBy, countAnimation });
        } else if (sort === 'date') {
          const animation = animationJson.sort((a, b) => {
            if (a.date[a.date.length - 1] === b.date[b.date.length - 1]) {
              return 0
            } else if (a.date[a.date.length - 1] > b.date[b.date.length - 1] || !a.date) {
              return 1
            } else return -1
          }).filter((el, i) => i >= (showBy * page - 9) && i <= (showBy * page));
          res.status(200).json({ animation, page, showBy, countAnimation });
        }
      }

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