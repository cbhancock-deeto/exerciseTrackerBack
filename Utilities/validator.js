exports.validateUsername = function (user) {
	let validUser = true;
	if (user.length <= 3) {
		validUser = false;
	}
	return validUser;
};

exports.validateEmail = function (email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

exports.validatePassword = function (password) {
	if (password.length > 0) {
		return true;
	}
	return false;
};
