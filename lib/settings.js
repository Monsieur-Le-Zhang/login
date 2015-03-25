/**
 * Created by Le on 3/23/2015.
 */

global.DOCUMENT_ROOT = __dirname.substr(0, __dirname.indexOf(path.sep + 'lib'));

var settings = {
    dbConnURL: 'mongodb://localhost/escalade_admin'
};

module.exports = Object.freeze(settings);