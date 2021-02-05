const { Router } = require('express');
const router = Router();
const users = require('./../data/users.json');
const animationJson = require('./../data/animation.json');
const fs = require('fs');
const Users = require('./../models/Users');

// получить всех пользователей
// /users/
router.get(
  '/',
  async (req, res) => {
    const users = await Users.find({}, 'animation userName userId');
    res.status(200).json({ users })
  }
)

// получить первых 5 пользователей для меня
// /users/menu
router.get(
  '/menu',
  async (req, res) => {
    const usersAll = await Users.find({}, 'animation userName userId');
    let users = [].concat(usersAll.slice(0, 5))
    res.status(200).json({ users })
  }
)

// регистрация нового пользователя
// /users/registration
router.post(
  '/registration',
  async (req, res) => {
    const AllUsers = await Users.find({});
    const user = new Users({
      userId: AllUsers.length + 1,
      userName: req.query.userName,
      password: req.query.password,
      email: req.query.email,
    })
    await user.save();
    res.status(200).json({ user, isAuth: true })
  }
)

// авторизация пользователя
// /users/authorization
router.get(
  '/authorization',
  async (req, res) => {
    try {
      const user = await Users.findOne({ userName: req.query.userName, password: req.query.password })
      if (user) {
        res.status(200).json({ user, isAuth: true })
      } else {
        res.status(200).json({ isAuth: false })
      }
    } catch (e) {
      console.log(e)
    }
  }
)

// получить информация о выбранном пользователе
// /users/id/:id
router.get(
  '/id/:userId',
  async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await Users.findOne({ userId: userId })
      res.status(200).json({ user });
    } catch (e) {
      console.log(e)
    }
  }
)

// получить списки аниме по выбранному пользователю
// users/id/animation/:id
router.get(
  '/id/animation/:userId',
  async (req, res) => {
    const userId = req.params.userId || 0;
    try {
      const user = await Users.findOne({ userId: userId })
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

// добавить/убрать аниме в избраное/просмотренное/в очереди
// users/id/animation/:id
router.put(
  '/id/animation/:userId',
  async (req, res) => {
    const userId = req.params.userId || 1;
    const animationId = Number(req.query.animationId) || 1;
    const typeButton = req.query.type;
    try {
      const userToUpdate = await Users.findOne({ userId: userId });
      let animationUpdate = userToUpdate.animation;
      if (animationUpdate[typeButton].includes(animationId)) {
        animationUpdate[typeButton].splice(animationUpdate[typeButton].indexOf(animationId), 1);
      } else {
        animationUpdate[typeButton].push(animationId);
      }
      await Users.updateOne({ animation: animationUpdate })
      const user = await Users.findOne({ userId: userId });
      res.status(200).json({ user });
    } catch (e) {
      console.log(e)
    }
  }
)

module.exports = router;