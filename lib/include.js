/**
 * Created by Le on 3/23/2015.
 */
global.express      = require('express');
global.path         = require('path');
global.favicon      = require('serve-favicon');
global.logger       = require('morgan');
global.cookieParser = require('cookie-parser');
global.bodyParser   = require('body-parser');
global.mongoose     = require('mongoose');
global.fs           = require('fs');
global.crypto       = require('crypto');
global.session      = require('express-session');
global.mongoStore   = require('connect-mongodb');
global.es           = {};

es.settings         = require('./settings');
es.dbConn           = mongoose.connect(es.settings.dbConnURL);
es.globalUserControl= require('./globalUserControl');

es.usersModel       = require(path.join(DOCUMENT_ROOT, '/models/users'));
es.sessionsModel    = require(path.join(DOCUMENT_ROOT, '/models/sessions'));

es.loginController  = require(path.join(DOCUMENT_ROOT, '/routes/login'));
es.indexController  = require(path.join(DOCUMENT_ROOT, '/routes/index'));
es.registerController = require(path.join(DOCUMENT_ROOT, '/routes/register'));

module.exports = es;