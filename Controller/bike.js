const BikeModel = require('../Model/bikeSchema');

// Read operation - gets all bikes in db
exports.getBikes = async (req, res) => {
	try {
		const bikes = await BikeModel.find({ userID: req.body.username });

		if (bikes.length > 0) {
			res.status(200).json({
				status: 'success',
				results: bikes.length,
				data: {
					bikes,
				},
			});
		} else {
			res.status(400).json({
				status: 'success',
				data: {
					message: 'No bikes in collection',
				},
			});
		}
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

// read operation 2 - gets a single bike by the mongo-defined id
exports.getBikeById = async (req, res) => {
	try {
		const bike = await BikeModel.findById(req.body._id);
		if (bike) {
			res.status(200).json({
				status: 'success',
				data: {
					bike,
				},
			});
		} else {
			res.status(400).json({
				status: 'success',
				data: {
					message: 'ID does not exist',
				},
			});
		}
	} catch (err) {
		res.status(404).json({
			status: 'fail bike by Id',
			message: err,
		});
	}
};

// create operation - creates a new bike in the mongo db
exports.newBike = async (req, res) => {
	try {
		const newBike = await BikeModel.create(req.body);
		res.status(201).json({
			status: 'success',
			data: {
				newBike,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

// update operation - updates entry in db based on mongo-defined _id
exports.updateBike = async (req, res) => {
	try {
		const bike = await BikeModel.findOneAndUpdate(
			{ _id: req.params.id },
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);

		if (bike != null) {
			res.status(200).json({
				status: 'success',
				data: {
					bike,
				},
			});
		} else {
			res.status(400).json({
				status: 'success',
				data: {
					message: `No bikes available w ID ${req.body._id}`,
				},
			});
		}
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

// delete operation - removes entry from bike collection based on mongo-defined id
exports.deleteBike = async (req, res) => {
	const delBike = await BikeModel.deleteOne({ _id: req.body._id });
	console.log(delBike);
	if (delBike.deletedCount === 0) {
		res.status(404).json({
			status: 'fail',
			message: 'no bikes available for this id',
		});
	} else {
		res.status(200).json({
			status: 'success',
			message: `Bikes w id ${req.body._id} deleted`,
		});
	}
};

// deletes all records from bike collection
exports.deleteAllBikes = async (req, res) => {
	const delBikes = await BikeModel.deleteMany({});
	if (delBikes.deletedCount === 0) {
		res.status(404).json({
			status: 'fail',
			message: 'no bikes available in collection',
		});
	} else {
		res.status(200).json({
			status: 'success',
			message: 'bike entries deleted',
		});
	}
};

// for all invalid routes
exports.invalid = async (req, res) => {
	res.status(404).json({
		status: 'fail',
		message: 'invalid path',
	});
};
