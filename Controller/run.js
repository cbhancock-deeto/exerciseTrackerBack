const RunModel = require('../Model/runSchema');

// Create operation - add a run entry to db
exports.newRun = async (req, res) => {
	try {
		const newRun = await RunModel.create(req.body);
		res.status(201).json({
			status: 'success',
			data: {
				newRun,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

// Read operation - get all run entries in db
exports.getRuns = async (req, res) => {
	try {
		const runs = await RunModel.find({ userID: req.params.user });

		if (runs.length > 0) {
			res.status(200).json({
				status: 'success',
				length: runs.length,
				data: {
					runs,
				},
			});
		} else {
			res.status(400).json({
				status: 'success',
				length: runs.length,
				data: {
					message: `No runs in collection for ${req.params.user}`,
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

// read operation 2 - gets a single run by the mongo-defined id
exports.getRunById = async (req, res) => {
	try {
		const run = await RunModel.findById(req.body._id);
		if (run) {
			res.status(200).json({
				status: 'success',
				data: {
					run,
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
			status: 'fail run by Id',
			message: err,
		});
	}
};

// update operation - updates entry in db based on mongo-defined _id
exports.updateRun = async (req, res) => {
	try {
		const run = await RunModel.findOneAndUpdate(
			{ _id: req.params.id },
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);

		if (run != null) {
			res.status(200).json({
				status: 'success',
				data: {
					run,
				},
			});
		} else {
			res.status(400).json({
				status: 'success',
				data: {
					message: `No runs available w ID ${req.body._id}`,
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
exports.deleteRun = async (req, res) => {
	const delRun = await RunModel.deleteOne({ _id: req.body._id });
	if (delRun.deletedCount === 0) {
		res.status(404).json({
			status: 'fail',
			message: 'no runs available for this id',
		});
	} else {
		res.status(200).json({
			status: 'success',
			message: `Runs w id ${req.body._id} deleted`,
		});
	}
};

// deletes all runs from the run collection
exports.deleteAllRuns = async (req, res) => {
	const delRuns = await RunModel.deleteMany({});
	if (delRuns.deletedCount === 0) {
		res.status(404).json({
			status: 'fail',
			message: 'no runs available in collection',
		});
	} else {
		res.status(200).json({
			status: 'success',
			message: 'run entries deleted',
		});
	}
};
