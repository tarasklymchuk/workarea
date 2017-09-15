'use strict';
var src = '../src/controllers/';
/**
 * Init controllers
 */
var Staffs = require(src + 'StaffsController');

module.exports = function (app) {
    /**
     * staffs Routes
     */
    app.route('/')
        .get(Staffs.view_all) // view all users
        .post(Staffs.create); // add new user

    /**
     * specified staff routes
     */
    app.route('/staff/:staffId')
        .get(Staffs.show)
        .put(Staffs.update)
        .delete(Staffs.delete);
};