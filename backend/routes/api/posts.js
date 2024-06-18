const express = require('express')
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors, validateQuery } = require('../../utils/validation');
const { Op } = require('sequelize')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Event, Ticket, Seat, Post } = require('../../db/models');
const e = require('express');

const router = express.Router();

// GET request to retrieve all posts owned by the current user
router.get("/current", requireAuth, async (req, res, next) => {
    const { user } = req;
    const posts = await Post.findAll({
        where: { userId: user.id },
        include: [
            { model: Event, attributes: ['artist','id','name', 'date', 'time', 'city', 'address'] },
        ]
    });

    const updatedPosts = posts.map(post => {
        const { Event,  ...restPost } = post.toJSON();
        return {
            ...restPost,
            eventId: Event.id,
            eventName: Event.name,
            eventArtist: Event.artist,
            eventDate: Event.date,
            eventTime: Event.time,
            eventCity: Event.city,
            eventAddress: Event.address
        };
    });
    return res.json(updatedPosts);
});


// Update a post
router.put(
    "/:postId",
    requireAuth,
    async (req, res, next) => {
        const {postId} = req.params
        const {user} = req
        let { body, title  } = req.body;

        const post = await Post.findByPk(postId, {
            include: [{
                model: Event,
                attributes: ['date']
            }]
        });
        if (!post) {
            const err = new Error("Post couldn't be found");
            err.status = 404;
            return next(err);
        }
        //Only the owner of the ticket is authorized to edit
        if (post.userId !== user.id) {
            const err = new Error("Forbidden");
            err.status = 403;
            return next(err);
          }

        post.body = body;
        post.title = title;
        const updatedPost= await post.save();
        return res.json(updatedPost)
    });

// Delete a ticket
router.delete("/:postId", async (req, res, next) => {
    const { postId } = req.params;
    const { user } = req;


   const post = await Post.findByPk(postId);

    if (!post) {
        const err = new Error("Post couldn't be found");
        err.status = 404;
        return next(err);
    }
    // Only the owner of the ticket is authorized to delete
    if (post.userId !== user.id) {
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    }

    await post.destroy();
    return res.json({
        "message": "Successfully deleted"
    });
});

module.exports = router;
