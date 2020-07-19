'use strict';
module.exports = function (app) {
    var toolController = require('../controllers/toolController');

    app.route('/tools')
        .get(toolController.getAll)
        .post(toolController.post);

    app.route('/tools/:toolId')
        .delete(toolController.delete);
}