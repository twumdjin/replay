var debug = require('debug')('oasis:index');
var express = require('express');
var router = express.Router();

var docsDb;

router.all('/*', function(req, res) {
	debug('In dynamic API route %s', req.path);
	var path = req.path.replace(/^\//, ''),
		method = req.method;
	docsDb.findOne({path: path, method: method}, function(err, doc) {
		if (err || !doc) {
			debug('No configuration for %s %s', method, path);
			res.status(404).send();
			return;
		}
		debug('Dynamically routing %s %s using %s', method, path, doc._id);
		if (doc.content) {
			res.header("Content-Type", 'application/json; charset=utf-8');
			res.status(200).send(doc.content);
			return;
		}
		res.status(204).send();			
	});
});

module.exports = function(db) {
	docsDb = db
	return router;
}
