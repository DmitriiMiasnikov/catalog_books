const { Router } = require('express');
const router = Router();
const users = require('./../data/users.json');
const animationJson = require('./../data/animation.json');
const fs = require('fs');
const User = require('./../models/User');

// /users/
router.get(
  '/',
  async (req, res) => {
    const users = await Users.find({});
    res.status(200).json({ users })
  }
)

// /users/registration
router.post(
  '/registration',
  async (req, res) => {
    const user = new User({
      userName: req.query.userName,
      password: req.query.password,
      email: req.query.email,
    })
    await user.save();
    res.status(200).json({ user })
  }
)

// /users/authorization
router.get(
  '/authorization',
  async (req, res) => {
    const user = await Users.findOne({ userName: req.query.userName, password: req.query.password })
    console.log(user);
    res.status(200).json({ user })
  }
)


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
      animationFive = animation.slice(0, 5);
      let countAnimation = animation.length;
      res.status(200).json({ animationFive, animation, rest, countAnimation });
    } catch (e) {
      console.log(e)
    }
  }
)

// users/id/animation/:id
router.put(
  '/id/animation/:userId',
  async (req, res) => {
    const userId = Number(req.params.userId) || 1;
    const animationId = Number(req.query.animationId) || 1;
    const typeButton = req.query.type;
    try {
      const changeUsersJson = () => {
          const usersData = users.map(el => {
            if (el.userId === userId) {
              let arr = el.animation[typeButton];
              if (arr.includes(animationId)) {
                arr.splice(arr.indexOf(animationId), 1);
              } else {
                arr.push(animationId);
              }
            }
            return el;
          });
          fs.writeFile('./data/users.json', JSON.stringify(usersData), 'utf-8', (err) => {
            if (err) throw err;
          })
          const user = users.find(el => el.userId === userId);
          res.status(200).json({ user });
      }
      changeUsersJson();

    } catch (e) {
      console.log(e)
    }
  }
)

module.exports = router;