const fs = require('fs');

function deleteProfileMedia (path) {
    const filename = path.split('/profile/')[1];
    fs.unlink(`images/profile/${filename}`, function (err) {
      if (err) return console.log(err);
    });
  };

 module.exports.deleteProfileMedia = deleteProfileMedia;