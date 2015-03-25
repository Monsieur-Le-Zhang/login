var router = express.Router();

/* GET home page. */
router.get('/', es.globalUserControl, function (req, res, next) {
    res.render('index', { title: 'Calendar' });
});

module.exports = router;
