const db = require('../models');
const fs = require('fs');
const publicationSchema = require('../middlewares/Schema/publicationSchema');
const jwt = require('jsonwebtoken');
const { deleteMedia } = require('../middlewares/deleteMedia/post-media');



exports.createPublication = async (req, res, next) => {
    try {
        if (req.file && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png') {
            res.status(401).json({ error: 'invalid file format uploaded' });
        }
        const publicationObject = JSON.parse(req.body.publication);
        const user = req.user;
        const isValid = await publicationSchema.validateAsync(publicationObject);
        const profile = await db.user.findByPk(user);

        if (!publicationObject) { return res.status(400).json('bad request'); };
        if (!user) { return res.status(404).json('user not found'); };
        if (!isValid) { return res.status(400).json('bad request'); };
        if (!profile) { return res.status(404).json('user deleted'); }

        db.publication.create({
            title: publicationObject.title,
            body: publicationObject.body,
            idusers: user,
            media: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
            .then((publication) => res.status(201).json({ message: `${publication.title} registred` }))
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getOnePublication = (req, res, next) => {
    db.publication.findByPk(req.body.idpublication,
        {
            include: [
                {
                    model: db.user,
                    attributes: ['firstname', 'lastname', 'media']
                },
                {
                    model: db.comment,
                    attributes: ['body', 'media'],
                    include: { model: db.user, attributes: ['firstname', 'lastname', 'media'] }
                },
                {
                    model: db.like,
                    attributes: ['like']
                },
            ]
        }
    )
        .then(publication => res.status(200).json(publication))
        .catch(error => res.status(404).json({ error }));
};



exports.modifyPublication = async (req, res, next) => {
    try {
        const publication = await db.publication.findOne({ where: { idpublications: req.body.idpublication, idusers: req.user } });
        const publicationObject = await JSON.parse(req.body.publication);
        const isValid = await publicationSchema.validateAsync(publicationObject);
        const user = req.user;

        if (!publication) { return res.status(404).json('publication not found with your ID'); }
        if (!publicationObject) { return res.status(404).json('invalid req object'); }
        if (!isValid) { return res.status(400).json('object not valid'); }
        if (!user) { return res.status(404).json('user not found'); }

        if (req.file) {
            if (req.file.mimetype === 'image/jpg' || req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png') {

                if (publication.media) { //if the req has already a media , delete old media
                    deleteMedia(publication.media);
                }
                publication.update({
                    title: publicationObject.title,
                    body: publicationObject.body,
                    media: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                })
                    .then(() => res.status(201).json({ message: `publication updated` }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                res.status(401).json({ error: 'unauthorized media format' });
            }
        } else {
            publication.update({
                title: publicationObject.title,
                body: publicationObject.body
            })
                .then(() => res.status(201).json({ message: `publication updated` }))
                .catch(error => res.status(400).json({ error }));
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

exports.deletePublication = async (req, res, next) => {
    try {
        const user = await db.user.findByPk(req.user);
        db.publication.findByPk(req.body.idpublication)
            .then(publication => {
                if (publication.idusers === user.idusers || user.admin) {
                    db.comment.destroy({ where: { idpublications: publication.idpublications } })
                        .then(() => {
                            db.like.destroy({ where: { idpublications: publication.idpublications } })
                                .then(() => {
                                    if (publication.media) {
                                        deleteMedia(publication.media);
                                    }
                                    publication.destroy()
                                        .then(() => res.status(200).json('publication deleted with success'))
                                        .catch(() => res.status(500).json("internal server error 1"));
                                })
                                .catch(() => res.status(500).json("internal server error 2"));
                        })
                        .catch(() => res.status(500).json("internal server error 3"));
                } else {
                    return res.status(401).json("unauthorized action");
                }
            })
            .catch(() => res.status(500).json("internal server error 4"));
    } catch (error) {
        return res.status(500).json("internal server error 5");
    }
};

exports.getAllPublication = async (req, res, next) => {
    try {
        const publications = await db.publication.findAll({
            include: [
                {
                    model: db.user,
                    attributes: ['firstname', 'lastname', 'media']
                },
                {
                    model: db.comment,
                    attributes: ['body', 'media', 'idusers', 'idcomments'],
                    include: { model: db.user, attributes: ['firstname', 'lastname', 'media'] }
                },
                {
                    model: db.like,
                    attributes: ['like', 'idusers'],
                },
            ],
            order: [['createdAt', 'DESC']]
        });
        if (!publications) { return res.status(404).json('publications not founds'); };
        Promise.all(publications.map(async publication => {
            publication.dataValues.nbrLikes = await (publication.dataValues.likes).reduce((acc, like) => acc + like.dataValues.like, 0);
            publication.dataValues.nbrComments = (publication.dataValues.comments).length;
            if (publication.idusers === req.user) {
                publication.dataValues.isOwner = true;
            } else {
                publication.dataValues.isOwner = false;
            }
            await publication.comments.map(comment => {
                if (comment.dataValues.idusers === req.user) {
                    comment.dataValues.isOwner = true;
                    comment.dataValues.idusers = null;
                } else {
                    comment.dataValues.isOwner = false;
                    comment.dataValues.idusers = null;
                }
            });
            await publication.likes.map(like => {
                if (like.dataValues.idusers === req.user) {
                    publication.dataValues.likeValue = like.like;
                    like.dataValues.idusers = null;
                } else {
                    like.dataValues.idusers = null;
                }
            });

            return publication;
        }))
            .then(response => {
                res.status(200).json(response);
            })
            .catch(() => res.status(500).json('internal error'));
    } catch (error) {
        return res.status(500).json(error);
    }
};


