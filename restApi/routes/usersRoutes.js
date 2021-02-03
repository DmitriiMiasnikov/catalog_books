const { Router } = require('express');
const router = Router();
const users = require('./../data/users.json');

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
module.exports = router;