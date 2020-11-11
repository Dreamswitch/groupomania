const db = require('../models');
const fs = require('fs');
const publicationSchema = require('../middlewares/Schema/publicationSchema');
const jwt = require('jsonwebtoken');

const userId = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    return decodedToken.userId;
}

exports.createPublication = async (req, res, next) => {

    try {
        if (req.file && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png') {
            res.status(401).json({ error: 'invalid file format uploaded' });
        }
        const publicationObject = JSON.parse(req.body.publication);
        const user = userId(req);
        const isValid = await publicationSchema.validateAsync(publicationObject);
        const profile = await db.user.findByPk(user);


        if (!publicationObject) { return res.status(400).json('bad request') };
        if (!user) { return res.status(404).json('user not found') };
        if (!isValid) { return res.status(400).json('bad request') };
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
    db.publication.findOne({
        WHERE: { idpublications: req.body.idpublication },
        include: [
            {
                model: db.user,
                attributes: ['firstname']
            },
            {
                model: db.comment,
                attributes: ['body']
            },
            {
                model: db.like,
                attributes: ['like']
            },
        ]
    })
        .then(publication => res.status(200).json(publication))
        .catch(error => res.status(404).json({ error }));
};



exports.modifyPublication = async (req, res, next) => {
    try {
        const publication = await db.publication.findOne({ where: { idpublications: req.body.idpublication, idusers: userId(req) } });
        const publicationObject = await JSON.parse(req.body.publication);
        const isValid = await publicationSchema.validateAsync(publicationObject);
        const user = userId(req);

        if (!publication) { return res.status(404).json('publication not found'); }
        if (!publicationObject) { return res.status(404).json('invalid req object'); }
        if (!isValid) { return res.status(400).json('object not valid'); }
        if (!user) { return res.status(404).json('user not found'); }

        if (req.file) {
            if (req.file.mimetype === 'image/jpg' || req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png') {

                if (publication.media) { //if the req has already a media , delete old media
                    const filename = publication.media.split('/images/')[1];
                    fs.unlink(`images/${filename}`, function (err) {
                        if (err) return console.log(err);
                    });
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
        const user = userId(req);
        const profile = await db.user.findOne({ where: { idusers: user } });
        const publication = await db.publication.findByPk(req.body.idpublication);
        const likes = await db.like.findAll({ where: { idpublications: publication.idpublications } })
        const comments = await db.comment.findAll({ where: { idpublications: publication.idpublications } });

        if (!user) { return res.status(404).json('user not found') };
        if (!profile) { return res.status(404).json('profile not found') };
        if (!publication) { return res.status(404).json('publication not found') };



        if (comments) {
            comments.forEach(comment => {
                if (comment.media) {
                    const filename = publication.media.split('/images/')[1];
                    fs.unlink(`images/${filename}`, function (err) {
                        if (err) return console.log(err);
                    });
                }
                comment.destroy()
                    .then(() => console.log('comment deleted'))
                    .catch(() => { throw new error });
            })
        }
        if (likes) {
            likes.forEach(like => {
                like.destroy()
                    .then(() => console.log('like deleted'))
                    .catch(() => { throw new error });
            })
        }

        if (publication.idusers === profile.idusers || profile.admin) {
            if (publication.media) {
                const filename = publication.media.split('/images/')[1];
                fs.unlink(`images/${filename}`, function (err) {
                    if (err) return console.log(err);
                });
            }
            publication.destroy()
                .then(() => res.status(200).json({ message: 'publication deleted !' }))
                .catch(error => res.status(400).json({ error }));
        } else {
            return res.status(401).json("unauthorized action")
        }
        
    } catch (error) {
        return res.status(500).json("internal server error")
    }
};

exports.getAllPublication = async (req, res, next) => {
    try {
        const publications = await db.publication.findAll({
            include: [
                {
                    model: db.user,
                    attributes: ['firstname']
                },
                {
                    model: db.comment,
                    attributes: ['body']
                },
                {
                    model: db.like,
                    attributes: ['like']
                },
            ],
            order: [['createdAt', 'DESC']]
        });
        if (!publications) { return res.status(404).json('publications not founds') };
        res.status(200).json(publications)

    } catch (error) {
        return res.status(500).json(error)
    }
}


