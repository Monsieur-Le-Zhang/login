/**
 * Created by Le on 3/24/2015.
 */

function userControl (req, res, next) {

    if (req.session.user_id) {
        es.usersModel.findById(req.session.user_id, function (err, user) {
            if (user) {
                next();
            } else {
                res.redirect('/login');
            }
        });
    } else if (req.cookies.session) {
        var session = JSON.parse(req.cookies.session);
        es.sessionsModel.findOne({email: session.email, token: session.token}, function (err, session) {
            if (!session) {
                res.redirect('/login');
                return;
            }

            es.usersModel.findOne({email: session.email}, function (err, user) {
                if (user) {
                    session.token = session.randomToken();
                    session.save(function () {
                        res.cookie('session', session.cookieValue, {expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), path: '/'});
                        next();
                    });
                } else {
                    res.redirect('/login');
                }
            });
        });
    } else {
        res.redirect('/login');
    }
}

module.exports = userControl;