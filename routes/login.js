/**
 * Created by Le on 3/23/2015.
 */
var router = express.Router();

router.get('/', function (req, res) {
    res.render('login');
});

router.post('/', function (req, res) {
    es.usersModel.findOne({email: req.body.email}, function (err, user) {
        if (user && user.authenticate(req.body.password)) {
            req.session.user_id = user.id;
            if (req.body.remember_me) {
                var session = new es.sessionsModel({email: user.email});
                session.save(function () {
                    res.cookie('session', session.cookieValue, {expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), path: '/'});
                    res.redirect('/');
                });
            } else {
                res.redirect('/');
            }
        } else {
            res.redirect('/login');
        }
    });
});

router.delete('/', function (req, res) {
    var session = JSON.parse(req.cookies.session);
    es.sessionsModel.remove({email: session.email}, function () {});
    req.session.destroy();
    res.clearCookie('session');
    res.redirect('/login');
});

module.exports = router;