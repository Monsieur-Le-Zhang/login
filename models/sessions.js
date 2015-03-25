/**
 * Created by Le on 3/24/2015.
 */

Sessions = new mongoose.Schema({
    email: {type: String, index: true},
    token: {type: String, index: true}
});

Sessions.virtual('id').get(function () {
    return this._id.toHexString();
});

Sessions.virtual('cookieValue').get(function () {
    return JSON.stringify({email: this.email, token: this.token});
});

Sessions.method('randomToken', function () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
});

Sessions.pre('save', function (next) {
    this.token = this.randomToken();
    next();
});

mongoose.model('Sessions', Sessions);

module.exports = mongoose.model('Sessions');