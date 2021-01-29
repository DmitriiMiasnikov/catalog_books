const { Router } = require('express');
const router = Router();
const animationJson = require('./../data/animation.json');

// /animation/list/:page
router.get(
  '/list/:page',
  async (req, res) => {
    const showBy = 10;
    const page = req.params.page || 1;
    try {
      const countAnimation = animationJson.length;
      const animation = animationJson
        .filter((el, i) => el.animeId >= (showBy * page - 9) && el.animeId <= (showBy * page));
      res.status(200).json({ animation, page, showBy, countAnimation });
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