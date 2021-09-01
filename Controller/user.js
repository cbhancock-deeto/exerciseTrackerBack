const UserModel = require('../Model/userSchema');
const validators = require('../Utilities/validator');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
	// check if password has at least one character
	if (!validators.validatePassword(req.body.password)) {
		return res.status(404).json({
			status: 'fail',
			message: 'password is too short',
		});
	}

	// validate username and email
	if (
		!validators.validateUsername(req.body.username) ||
		!validators.validateEmail(req.body.email)
	) {
		res.status(404).json({
			status: 'fail',
			message: 'username is too short or email is in wrong format',
		});
	}

	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		let newUser = await UserModel.create({
			username: req.body.username,
			email: req.body.email,
			passwordHash: hashedPassword,
		});

		res.status(201).json({
			status: 'success',
			data: {
				newUser,
			},
		});
	} catch (err) {
		return res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.userLogin = async (req, res) => {
	// make sure user exists
	const user = await UserModel.findOne({ username: req.body.username });
	if (user.length === 0) {
		res.status(400).send('Cannot find user');
		return;
	}
	try {
		// validate that user-entered password and password hash match up
		const passCheck = bcrypt.compareSync(req.body.password, user.passwordHash);
		if (passCheck) {
			res.status(200).json({
				status: 'success',
				message: `${user.username} successfully logged in`,
			});
		} else {
			res.status(404).json({
				status: 'fail',
				message: 'passwords did not match i am so sorry',
			});
		}
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.updateUser = async (req, res) => {
	// user is logged-in, no need to verify user exists
	try {
		// validate old password for security!
		let user = await UserModel.findOne({ username: req.body.username });
		const passCheck = bcrypt.compareSync(
			req.body.oldPassword,
			user.passwordHash
		);
		if (!passCheck) {
			res.status(500).json({
				status: 'incorrect old password',
			});
			return;
		}

		// validate new email, new password are all acceptable
		const validPassword = validators.validatePassword(req.body.newPassword);
		const validEmail = validators.validateEmail(req.body.newEmail);

		if (!validPassword || !validEmail) {
			res.status(500).json({
				status: 'new account information does not meet validation requirements',
			});
		}

		const hashedPassword = bcrypt.hashSync(req.body.newPassword, 10);
		user = {
			username: req.body.username,
			email: req.body.newEmail,
			passwordHash: hashedPassword,
		};
		let newUser = await UserModel.findOneAndUpdate(
			{ username: req.body.username },
			user,
			{ new: true, runValidators: true }
		);
		res.status(200).json({
			status: 'successfully updated information',
			data: {
				newUser,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.getUsers = async (req, res) => {
	try {
		const users = await UserModel.find();
		res.status(201).json({
			status: 'success',
			data: {
				users,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.deleteAllUsers = async (req, res) => {
	try {
		const delUsers = await UserModel.deleteMany({});
		if (delUsers.deletedCount === 0) {
			res.status(404).json({
				status: 'fail',
				message: 'no users',
			});
		} else {
			res.status(200).json({
				status: 'success',
				message: 'user entries deleted',
			});
		}
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};
