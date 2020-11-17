const fs = require('fs');

function deleteMedia (path) {
    const filename = path.split('/images/')[1];
    fs.unlink(`images/${filename}`, function (err) {
        if (err) return console.log(err);
    });
};

module.exports.deleteMedia = deleteMedia ;
