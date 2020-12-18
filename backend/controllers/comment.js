const db = require('../models');
const fs = require('fs');
const commentSchema = require('../middlewares/Schema/commentSchema');
const jwt = require('jsonwebtoken');

const userId = (req) => {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    return decodedToken.userId;
};

exports.createComment = async (req, res, next) => {
    try {
        const commentObject = await JSON.parse(req.body.comment);
        const isValid = await commentSchema.validateAsync(commentObject);
        const user = await userId(req);
        const profile = await db.user.findByPk(user);


        if (!commentObject) { return res.status(404).json('invalid req object'); }
        if (!isValid) { return res.status(400).json('object not valid'); }
        if (!user) { return res.status(404).json('user not found'); }
        if (!profile) { return res.status(404).json('user deleted'); }


        if (req.file) {
            if (req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png') {
                res.status(401).json({ error: 'invalid file format uploaded' });
            }

            db.comment.create({
                body: commentObject.body,
                idusers: user,
                idpublications: req.body.id_publication,
                media: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            })
                .then(() => res.status(201).json({ message: `comment registred` }))
                .catch(() => res.status(404).json("publication not found"));
        } else {
            db.comment.create({
                body: commentObject.body,
                idusers: user,
                idpublications: req.body.id_publication,
            })
                .then(() => res.status(201).json({ message: `comment registred` }))
                .catch(() => res.status(404).json("publication not found"));
        }
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.modifyComment = async (req, res, next) => {
    try {
        const user = userId(req);
        const commentObject = await JSON.parse(req.body.comment);
        const comment = await db.comment.findOne({ where: { idcomments: req.body.idcomment, idusers: user } });
        const isValid = await commentSchema.validateAsync(commentObject);

        if (!comment) { return res.status(404).json('comment not found'); }
        if (!commentObject) { return res.status(404).json('invalid req object'); }
        if (!isValid) { return res.status(400).json('object not valid'); }
        if (!user) { return res.status(404).json('user not found'); }


        if (req.file) {
            if (req.file.mimetype === 'image/jpg' || req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png') {
                if (comment.media) {
                    const filename = comment.media.split('/images/')[1];
                    fs.unlink(`images/${filename}`, function (err) {
                        if (err) return console.log(err);
                        console.log('file deleted successfully');
                    });
                }
                comment.update({
                    body: commentObject.body,
                    media: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                })
                    .then(() => res.status(201).json({ message: `comment updated` }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                res.status(401).json({ error: 'unauthorized media' });
            }
        }
        else if (comment.media && !req.file) {
            const filename = comment.media.split('/images/')[1];
            fs.unlink(`images/${filename}`, function (err) {
                if (err) return console.log(err);
                console.log('file deleted successfully');
            });
            comment.update({
                body: commentObject.body,
                media: null
            })
                .then(() => res.status(201).json({ message: `comment updated` }))
                .catch(error => res.status(400).json({ error }));
        }
        else {
            comment.update({ body: commentObject.body })
                .then(() => res.status(201).json({ message: `comment updated` }))
                .catch(error => res.status(400).json({ error }));
        }
    } catch (err) {
        res.status(400).json({ err });
    }
};

exports.deleteComment = async (req, res, next) => {
    try {
        const user = await db.user.findOne({ where: { idusers: userId(req) } });
        const comment = await db.comment.findByPk(req.body.idcomment);

        if (!user) { return res.status(404).json('user not found'); };
        if (!comment) { return res.status(404).json('comment not found'); }

        if (comment.idusers === user.idusers || user.admin) {
            if (comment.media) {
                const filename = comment.media.split('/images/')[1];
                fs.unlink(`images/${filename}`, function (err) {
                    if (err) return console.log(err);
                });
            }
            comment.destroy()
                .then(() => res.status(200).json({ message: 'comment deleted !' }))
                .catch(error => res.status(400).json({ error }));
        } else {
            return res.status(401).json("unauthorized action");
        }
    } catch (error) {
        res.status(400).json({ error });
    }
};
