const admins = require('../models/adminModel.js');

function getaAdminId(un, pw) {
    return new Promise((resolve, reject) => {
        admins.findOne({ username: un, password: pw }, (err, data) => {
            if(err) resolve("");
            if(data) resolve(data.id);
            else resolve("");
        });
    });
}

module.exports = getaAdminId;