const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
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

const BikeModel = mongoose.model('bike', bikeSchema);

module.exports = BikeModel;
