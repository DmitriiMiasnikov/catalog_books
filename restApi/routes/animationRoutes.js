const { Router } = require('express');
const router = Router();
const animationJson = require('./../data/animation.json');

//animation

router.get(
  '/',
  async (req, res) => {
    try {
      const animation = animationJson;
      res.status(200).json({animation});
    } catch (e) {
      console.log(e)
    }
  }
)
module.exports = router;