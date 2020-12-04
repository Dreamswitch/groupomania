const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../middlewares/Schema/userSchema');
const profileSchema = require('../middlewares/Schema/profileSchema');
const db = require('../models');
const { Op } = require("sequelize");
const { deleteProfileMedia } = require('../middlewares/deleteMedia/profile-media');
const { deleteMedia } = require('../middlewares/deleteMedia/post-media');

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
            userId: user.idusers,
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
    where: { idusers: req.user },
    attributes: ['firstname', 'lastname', 'media', 'description']
  })
    .then(profil => res.status(200).json(profil))
    .catch(error => res.status(400).json({ error }));
}

exports.modifyProfile = async (req, res, next) => {

  try {
    const user = req.user;
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
          deleteProfileMedia(profile.media);
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
    const user = req.user;
    if (!user) { return res.status(404).json('user not found') };

    await db.publication.findAll({ where: { idusers: user } })
      .then(async publications => {
        await Promise.all(publications.map(async publication => {
          await db.comment.findAll({ where: { [Op.or]: [{ idpublications: publication.idpublications }, { idusers: user }] } })
            .then(async comments => {
              await Promise.all(comments.map(async comment => {
                if (comment.media) {
                  deleteMedia(comment.media);
                }
                await comment.destroy()
                  .then(() => console.log('comments destroyed'))
                  .catch(() => res.status(500).json('internal server error 1'));
              }))
                .then(async () => {
                  await db.like.destroy({ where: { [Op.or]: [{ idpublications: publication.idpublications }, { idusers: user }] } })
                    .then(async () => {
                      if (publication.media) {
                        deleteMedia(publication.media);
                      }
                      await publication.destroy()
                        .then(() => console.log('publication destroyed'))
                        .catch(() => res.status(500).json('internal server error 2'));
                    })
                    .catch(() => res.status(500).json('internal server error 3'));
                })
                .catch(() => res.status(500).json('internal server error 4'));
            })
            .catch(() => res.status(500).json('internal server error 5'));
        })) // no publication wrote
          .then(async (response) => {
            if (response !== undefined) {
              db.comment.destroy({ where: { idusers: user } })
                .then(() => {
                  db.like.destroy({ where: { idusers: user } })
                    .then(async() => {
                      const User = await db.user.findByPk(user);
                      if (User.media) {
                        deleteProfileMedia(User.media);
                      }
                      User.destroy()
                        .then(() => res.status(200).json('user deleted'))
                        .catch(() => res.status(500).json('internal server error 5.1'));
                    })
                    .catch(() => res.status(500).json('internal server error 5.2'));

                })
                .catch(() => res.status(500).json('internal server error 5.5'));
            } else { //if user has write some publications
              const User = await db.user.findByPk(user);
              if (User.media) {
                deleteProfileMedia(User.media);
              }
              User.destroy()
                .then(() => res.status(200).json('user deleted'))
                .catch(() => res.status(500).json('internal server error 5.1'));
            }
          })
          .catch(() => res.status(500).json('internal server error 7'));
      })
      .catch(() => res.status(500).json('internal server error 8'));

  } catch (error) {
    res.status(400).json({ error });
  }
}