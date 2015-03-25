/**
 * Created by Le on 3/24/2015.
 */
var router = express.Router();

router.get('/', function (req, res) {
    res.render('register');
});

router.post('/', function (req, res) {
    var user = new es.usersModel({email: req.body.email, password: req.body.password});
    user.save(function () {
        req.session.user_id = user.id;
        var session = new es.sessionsModel({email: req.body.email});
        session.save(function () {
            res.cookie('session', session.cookieValue, {expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), path: '/'});
            res.redirect('/');
        });
    });
});

module.exports = router;