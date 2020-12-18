const db = require('../models');
const jwt = require('jsonwebtoken');


const userId = (req) => {
    try {
        const token = req.cookies.jwt;
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        if (!decodedToken) {
            throw new error('loupé');
        }
        return decodedToken.userId;
    } catch (error) {
        console.log(error);
    }
};

exports.likePublication = async (req, res, next) => {
    const user = userId(req);
    const dblike = db.like.findOne({ where: [{ idpublications: req.body.idpublication }, { idusers: user }] });

    if (!user) { return res.status(401).json('thanks to renewal your login access'); };
    if (!dblike) { return res.status(400).json('bad request'); };

    const like = await dblike;

    try {
        if (like !== null) { // modification of previous vote
            if (req.body.like === 0 && req.body.like !== like.like) { // if 0, user unvoted
                like.update({
                    like: req.body.like
                })
                    .then(() => res.status(201).json({ message: "publication unvoted" }))
                    .catch(error => res.status(400).json({ error }));
            } else if (req.body.like === -1 && req.body.like !== like.like) { // if -1 , user has changed his point of view and now dislike
                like.update({
                    like: req.body.like
                })
                    .then(() => res.status(201).json({ message: "liked to disliked" }))
                    .catch(error => res.status(400).json({ error }));
            } else if (req.body.like === 1 && req.body.like !== like.like) {
                like.update({
                    like: req.body.like
                })
                    .then(() => res.status(201).json({ message: "disliked to liked" }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                res.send('already liked');
            }
        } else { // first like
            if (req.body.like === 1) {
                db.like.create({

                    like: req.body.like,
                    idusers: userId(req),
                    idpublications: req.body.idpublication

                })
                    .then(() => res.status(201).json({ message: "vote registred" }))
                    .catch(error => res.status(400).json({ error }));
            } else if (req.body.like === -1) {
                db.like.create({

                    like: req.body.like,
                    idusers: userId(req),
                    idpublications: req.body.idpublication

                })
                    .then(() => res.status(201).json({ message: "vote registred" }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                console.log('unauthorized value');
                res.send('unauthorized value');

            }
        }
    } catch (error) {
        console.log(error);
        process.exit(0);
    }

};