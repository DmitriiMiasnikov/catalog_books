const { Router } = require('express');
const router = Router();
const users = require('./../data/users.json');
const animationJson = require('./../data/animation.json');

// /users/id/:id
router.get(
  '/id/:userId',
  async (req, res) => {
    const userId = Number(req.params.userId) || 1;
    try {
      const user = users.find(el => el.userId === userId);
      res.status(200).json({ user });
    } catch (e) {
      console.log(e)
    }
  }
)

// users/id/animation/:id
router.get(
  '/id/animation/:userId',
  async (req, res) => {
    const userId = Number(req.params.userId) || 1;
    try {
      const user = users.find(el => el.userId === userId);
      let animation = animationJson.filter(el => user.animation.done.includes(el.animeId));
      rest = animation.slice(5).length;
      animationFive = animation.slice(0,5);
      let countAnimation = animation.length;
      res.status(200).json({ animationFive, animation, rest, countAnimation });
    } catch (e) {
      console.log(e)
    }
  }
)

module.exports = router;