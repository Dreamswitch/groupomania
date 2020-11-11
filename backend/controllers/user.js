const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../middlewares/Schema/userSchema');
const profileSchema = require('../middlewares/Schema/profileSchema');
const db = require('../models');
const fs = require('fs');
const { exitCode } = require('process');

const userId = (req) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  return decodedToken.userId;
}


exports.signup = async (req, res, next) => {
  try {
    const isValid = await userSchema.validateAsync(req.body);
    if (!isValid) { return res.status(400).json('syntax error') };

    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        db.user.create({
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          userPassword: hash
        })
          .then((user) => res.status(201).json({ message: `${user.firstname} registred` }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.login = (req, res, next) => {
  db.user.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.userPassword)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          console.log('user connected');
          res.status(200).json({
            token: jwt.sign( //appel de la methode sign() de jsonWebToken
              { userId: user.idusers },//objet que l'on va encoder
              'RANDOM_TOKEN_SECRET',//ce qui va servir à encoder l'objet
              { expiresIn: '24h' } //expiration du token
            )
          });

        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getProfile = async (req, res, next) => {
  await db.user.findOne({
    where: { idusers: userId(req) },
    attributes: ['firstname', 'lastname', 'media', 'description']
  })
    .then(profil => res.status(200).json(profil))
    .catch(error => res.status(400).json({ error }));
}

exports.modifyProfile = async (req, res, next) => {

  try {
    const user = await userId(req);
    const profile = await db.user.findOne({ where: { idusers: user } });
    const profileObject = await JSON.parse(req.body.description);
    const isValid = await profileSchema.validateAsync(profileObject);

    if (!user) { return res.status(404).json('user not found') };
    if (!profile) { return res.status(404).json('profile not found') };
    if (!profileObject) { return res.status(400).json(' not an object') };
    if (!isValid) { return res.status(404).json('invalid syntaxe') };

    if (req.file) {
      if (req.file.mimetype === 'image/jpg' || req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png') {

        if (profile.media) {
          const filename = profile.media.split('/profile/')[1];
          fs.unlink(`images/profile/${filename}`, function (err) {
            if (err) return console.log(err);
            console.log('file deleted successfully');
          });
        }
        profile.update({
          description: profileObject.description,
          media: `${req.protocol}://${req.get('host')}/images/profile/${req.file.filename}`
        })
          .then(() => res.status(201).json({ message: `profile updated` }))
          .catch(error => res.status(400).json({ error }));

      } else {
        res.status(400).json({ error: 'non mais oh' });
      }
    } else {
      profile.update({
        description: req.body.description
      })
        .then(() => res.status(201).send('cool'))
        .catch(error => res.status(405).json({ error }));
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.deleteProfile = async (req, res, next) => {
  console.log('lol')
  try {
    const user = userId(req);
    if (!user) { return res.status(404).json('user not found') };

    const profile = await db.user.findByPk(user);
    if (!profile) { return res.status(404).json('profile not found') };

    await db.publication.findAll({ where: { idusers: profile.idusers } })
      .then(publications => {
        console.log(publications)
        console.log('publication')
        publications.forEach(async publication => {

          await db.comment.findAll({ where: { idpublications: publication.idpublications } })
            .then(async comments => {
              console.log('comment')
              await comments.forEach(comment => {
                if (comment.media) {
                  const filename = comment.media.split('/images/')[1];
                  fs.unlink(`images/${filename}`, function (err) {
                    if (err) return console.log(err);
                  });
                }
                comment.destroy()
                  .then(() => console.log('comment deleted'))
                  .catch(() => console.log('delete comment error'));
              })
            })
            .catch(() => console.log('no comments'));

          await db.like.findAll({ where: { idpublications: publication.idpublications } })
            .then(async likes => {
              console.log('like')
              await likes.forEach(like => {
                like.destroy()
                  .then(() => console.log('like deleted'))
                  .catch(() => console.log('delete like error '));
              })
            })
            .catch(() => console.log("no likes"));

          publication.destroy()
            .then(() => {
              console.log('p ok');
            })
            .catch(() => console.log('error publication destroy'));
        })
        profile.destroy()
          .then(() => res.status(200).json('profile deleted'))
          .catch(() => {
            console.log('profile destroy error publication');
            res.status(400);
          });

      })
      .catch(() => console.log('no publications'));

    const comments = await db.comment.findAll({ where: { idusers: user } });
    if (comments) {
      comments.forEach(comment => {
        if (comment.media) {
          const filename = comment.media.split('/images/')[1];
          fs.unlink(`images/${filename}`, function (err) {
              if (err) return console.log(err);
          });
      }
        comment.destroy()
          .then(() => console.log('comment deleted'))
          .catch(() => console.log('delete comment error'));
      })
    }

    const likes = await db.like.findAll({ where: { idusers: user } });
    if (likes) {
      likes.forEach(like => {
        like.destroy()
          .then(() => console.log('like deleted'))
          .catch(() => console.log('delete like error '));
      })
    }

    profile.destroy()
      .then(() => res.status(200).json('profile deleted'))
      .catch(() => {
        console.log('profile destroy error');
        res.status(400);
      });

  } catch (error) {
    res.status(400).json({ error });
  }
}