const mongoose = require('mongoose');

const swimSchema = new mongoose.Schema({
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
});

const SwimModel = mongoose.model('swim', swimSchema);

module.exports = SwimModel;
