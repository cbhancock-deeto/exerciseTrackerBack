const mongoose = require('mongoose');

const runSchema = new mongoose.Schema({
	userID: {
		type: String,
		required: [true, 'required field'],
	},
	distance: {
		type: Number,
		required: [true, 'required field'],
	},
	notes: {
		type: String,
	},
	date: {
		type: Date,
	},
});

const RunModel = mongoose.model('run', runSchema);
module.exports = RunModel;
