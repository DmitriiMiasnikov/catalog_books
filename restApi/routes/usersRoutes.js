const { Router } = require('express');
const router = Router();
const sha256 = require('js-sha256');
const Users = require('./../models/Users');
const Animation = require('./../models/Animation');
const Manga = require('./../models/Manga');

// получить всех пользователей
// /users/
router.get(
  '/',
  async (req, res) => {
    const users = await Users.find({}, 'animation animationRating userName userId');
    res.status(200).json({ users })
  }
)

// получить первых 5 пользователей для меня
// /users/menu
router.get(
  '/menu',
  async (req, res) => {
    const usersAll = await Users.find({}, 'animation animationRating userName userId');
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
      password: sha256(req.query.password),
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
      const user = await Users.findOne({ userName: req.query.userName, password: sha256(req.query.password) })
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
    const userId = req.params.userId || 0;
    try {
      const user = await Users.findOne({ userId: userId }, 'animation ranobe manga animationRating userName userId')
      res.status(200).json({ user });
    } catch (e) {
      console.log(e)
    }
  }
)

// получить списки по выбранному пользователю
// users/id/listItems/:id
router.get(
  '/id/listItems/:userId',
  async (req, res) => {
    const userId = req.params.userId || 0;
    try {
      const user = await Users.findOne({ userId: userId }, 'animation ranobe manga animationRating');
      let userListItems = {};
      let userListItemsFive = {};
      const listNames = ['animation', 'manga', 'ranobe'];
      let userListItemsRest = {};
      let countUserList = {};
      for (const j in listNames) {
        userListItems[listNames[j]] = {};
        userListItemsRest[listNames[j]] = {};
        userListItemsFive[listNames[j]] = {};
        countUserList[listNames[j]] = {};
        for (const i in Object.keys(user[listNames[j]])) {
          const currentItem = Object.keys(user[listNames[j]])[i];
          if (listNames[j] === 'animation') {
            userListItems[listNames[j]][currentItem] = await Animation.find({ animationId: { $in: user[listNames[j]][currentItem] } });
          } else {
            userListItems[listNames[j]][currentItem] = await Manga.find({ mangaId: { $in: user[listNames[j]][currentItem] } });
          }
          countUserList[listNames[j]][currentItem] = userListItems[listNames[j]][currentItem].length;
          userListItemsRest[listNames[j]][currentItem] = userListItems[listNames[j]][currentItem].slice(5).length;
          userListItemsFive[listNames[j]][currentItem] = userListItems[listNames[j]][currentItem].slice(0, 5);
        }
      }
      res.status(200).json({ userListItemsFive, userListItems, userListItemsRest, countUserList });
    } catch (e) {
      console.log(e)
    }
  }
)

// добавить/убрать аниме в просмотренное/очередь
// users/id/animation/:id
router.put(
  '/id/animation/:userId',
  async (req, res) => {
    const userId = req.params.userId || 1;
    const animationId = Number(req.query.animationId) || 1;
    const rating = Number(req.query.rating) || 0;
    const typeButton = req.query.type;
    try {
      if (typeButton === 'selected') {
        const userToUpdate = await Users.findOne({ userId: userId }, 'animationRating');
        const animationRatingUpdate = userToUpdate.animationRating;
        if (rating) {
          animationRatingUpdate[animationId] = rating;
        } else {
          delete animationRatingUpdate[animationId];
        }
        await Users.updateOne({ userId: userId }, { animationRating: animationRatingUpdate })
      } else {
        const userToUpdate = await Users.findOne({ userId: userId }, 'animation');
        let animationUpdate = userToUpdate.animation;
        if (animationUpdate[typeButton].includes(animationId)) {
          animationUpdate[typeButton].splice(animationUpdate[typeButton].indexOf(animationId), 1);
        } else {
          if (typeButton === 'done' && (animationUpdate['queue'].includes(animationId))) {
            animationUpdate['queue'].splice(animationUpdate['queue'].indexOf(animationId), 1);
          } else if (typeButton === 'queue' && (animationUpdate['done'].includes(animationId))) {
            animationUpdate['done'].splice(animationUpdate['done'].indexOf(animationId), 1);
          }
          animationUpdate[typeButton].push(animationId);
        }
        await Users.updateOne({ userId: userId }, { animation: animationUpdate })
      }
      const user = await Users.findOne({ userId: userId }, 'animation animationRating userName userId');
      res.status(200).json({ user });
    } catch (e) {
      console.log(e)
    }
  }
)

// получить последние 10 просмотренных аниме
// users/id/lastViewed/:id
router.get(
  '/id/lastViewed/:userId',
  async (req, res) => {
    const userId = Number(req.params.userId) || 0;
    let lastViewed;
    try {
      const user = await Users.findOne({ userId: userId }, 'lastViewed');
      if (user) {
        lastViewedArr = await Animation.find({ animationId: { $in: user.lastViewed.animation } });
        lastViewed = user.lastViewed.animation.map(el => {
          return lastViewedArr.find(item => item.animationId === el);
        }).reverse()
      }
      res.status(200).json({ lastViewed });
    } catch (e) {
      console.log(e)
    }
  }
)

module.exports = router;