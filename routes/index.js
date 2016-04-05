var debug = require('debug')('oasis:index');
var express = require('express');
var router = express.Router();

var docsDb;

router.param('id', function(req, res, next, id) {
	req.docId = id;
	next();
});


router.get('/', function(req, res) {
	docsDb.find({}, function (err, docs) {
		res.render('index', {docs: docs});
	});
});

router.post('/', function(req, res) {
	debug('Got content: %O', req.body);
	docsDb.insert(req.body, function(err, newDoc) {
		if (err) {
			debug('Error saving:\n%s', err);
			res.status(400).send({error: err});
			return;
		}
		res.status(200).send(newDoc);
	});
});

router.put('/:id', function(req, res) {
	debug('Updating doc %s with content: %O', req.docId, req.body);
	docsDb.update({_id: req.docId}, req.body, function(err) {
		if (err) {
			debug('Error updating doc %s:\n%s', req.docId, err);
			res.status(400).send({error: err});
			return;
		}
		res.status(204).send();
	});
});

router['delete']('/:id', function(req, res) {
	docsDb.remove({_id: req.docId}, {}, function(err) {
		if (err) {
			debug('Error removing doc %s:\n%s', req.docId, err);
			res.status(400).send({error: err});
			return;
		}
		res.status(204).send();
	});
});

module.exports = function(db) {
	docsDb = db
	return router;
}
