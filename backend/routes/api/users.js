const express = require('express')
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Post , Event} = require('../../db/models');
const e = require('express');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Username is required, min 4'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
      const { email, firstName, lastName, password, username } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      // Check if the user with the same email or username already exists
      let existingUserWithUsername
      let existingUserWithEmail
      if(username) {
        existingUserWithUsername = await User.unscoped().findOne({where: {username: username}});
      }
      if(email) {
        existingUserWithEmail  = await User.unscoped().findOne({where: {email: email}})
      }
      if(existingUserWithUsername || existingUserWithEmail) {
        const error = new Error('User already exists');
        error.statusCode = 500;
        error.errors = {};
        if (existingUserWithEmail) {
          error.errors.email = 'User with that email already exists';
        }

        if (existingUserWithUsername) {
          error.errors.username = 'User with that username already exists';
        }

        return next(error)
      }

      const user = await User.create({ email,firstName, lastName, username, hashedPassword });


      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };

      await setTokenCookie(res, safeUser);

      return res.json({
        user: safeUser
      });
    }
  );

// get the posts made by the user with the given userId
router.get(
  "/:userId/posts",
  async (req, res, next) => {
    const {user} = req
    const userId = user.id
    try {
      //try getting the user's posts, with most recent post first
      const user = await User.findByPk(userId, {
        include: {
          model: Post,
          order: ["createdAt", "DESC"],
          include: {
            model: Event,
            attributes: ["id", "name", "artist", "img_url"],
          },
        },
      });
      const userPosts = user.Posts;
      const posts = [];
      userPosts.forEach((postObj) => {
        const post = {};
        post.id = postObj.id;
        post.user = {
          id: user.id,
          username: user.username,
        };
        post.event = postObj.Event;
        post.title = postObj.title;
        post.body = postObj.body;
        post.time = postObj.createdAt;
        posts.push(post);
      });
      res.status(200);
      return res.json({ posts });
    } catch (e) {
      // res.status(404);
      // console.log("e.", e)
      // return res.json({
      //   message: e,
      //   statusCode: 404,
      // });
      // const data = await e.json();
      return res.json({
        message: e.message
      })
    }
  }
);
module.exports = router;
