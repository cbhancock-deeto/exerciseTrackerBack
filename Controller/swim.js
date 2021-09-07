const SwimModel = require('../Model/swimSchema.js');

//Read operation - gets all swims in the db
exports.getSwims = async (req, res) => {
	try {
		const swims = await SwimModel.find({ userID: req.params.user });

		if (swims.length > 0) {
			res.status(200).json({
				status: 'success',
				results: swims.length,
				data: {
					swims,
				},
			});
		} else {
			res.status(400).json({
				status: 'success',
				data: {
					message: `No swims in collection for ${req.params.user}`,
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

// read operation 2 - gets a swim by mongo-defined id
exports.getSwimById = async (req, res) => {
	try {
		const swim = await SwimModel.findById(req.body._id);
		if (swim) {
			res.status(200).json({
				status: 'success',
				data: {
					swim,
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
			status: 'fail swim by id',
			message: err,
		});
	}
};

// create operation - creates new swim in mongo db
exports.newSwim = async (req, res) => {
	try {
		const newSwim = await SwimModel.create(req.body);
		res.status(201).json({
			status: 'success',
			data: {
				newSwim,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

// update operation - updates entry in db based on mongo _id
exports.updateSwim = async (req, res) => {
	try {
		const swim = await SwimModel.findOneAndUpdate(
			{ _id: req.params.id },
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);

		if (swim != null) {
			res.status(200).json({
				status: 'success',
				data: {
					swim,
				},
			});
		} else {
			res.status(400).json({
				status: 'success',
				data: {
					message: `No swims available w ID ${req.body._id}`,
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

// delete operation - removes entry from swim collection based on mongo id
exports.deleteSwims = async (req, res) => {
	const delSwim = await SwimModel.deleteOne({ _id: req.body._id });

	if (delSwim.deletedCount === 0) {
		res.status(404).json({
			status: 'fail',
			message: 'no swims available for this id',
		});
	} else {
		res.status(200).json({
			status: 'success',
			message: `Swims w id ${req.body._id} deleted`,
		});
	}
};

// deletes all records from swim collection
exports.deleteAllSwims = async (req, res) => {
	const delSwims = await SwimModel.deleteMany({});
	if (delSwims.deletedCount === 0) {
		res.status(404).json({
			status: 'fail',
			message: 'no swims available in this collection',
		});
	} else {
		res.status(200).json({
			status: 'success',
			message: 'swim entries deleted',
		});
	}
};
