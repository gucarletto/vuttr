'use strict';

var mongoose = require('mongoose'),
    Tool = mongoose.model('Tool');

exports.getAll = function (req, res) {
    Tool.find({}, function (err, tool) {
        if (err) {
            res.send(err)
        }
        res.json(tool);
    });
};

exports.post = function (req, res) {
    var newTool = new Tool(req.body);
    newTool.save(function (err, tool) {
        if (err) {
            res.send(err)
        }
        res.json(tool);
    });
};

exports.delete = function (req, res) {
    Tool.remove({
        _id = req.params.toolId
    }, function(err, tool) {
        if (err) {
            res.send(err)
        }
        res.json({message: 'Tool successfully deleted'});
    });
};