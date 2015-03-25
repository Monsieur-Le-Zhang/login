/**
 * Created by Le on 3/24/2015.
 */

Users = new mongoose.Schema({
    'email': {type: String, index: {unique: true}},
    'hashed_password': String,
    'salt': String
})

Users.virtual('id').get(function () {
    return this._id.toHexString();
});

Users.virtual('password').get(function () {
    return this._password;
});

Users.virtual('password').set(function (password) {
    this._password  = password;
    this.salt       = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
});

Users.method('authenticate', function (password) {
    return this.encryptPassword(password) === this.hashed_password;
});

Users.method('makeSalt', function () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
});

Users.method('encryptPassword', function (password) {
    return crypto.createHmac('SHA1', this.salt).update(password).digest('HEX');
});

mongoose.model('Users', Users);

module.exports = mongoose.model('Users');