const mongoose = require('mongoose');
const Joi = require('joi');

const validateEmail = function(email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const userSchema = new mongoose.Schema({
    first_name: { 
        type: String, 
        required: [true, 'Please enter your first name.']
    },
    last_name: { 
        type: String, 
        required: [true, 'Please enter your last name.']
    },
	email: {
		type: String,
		required: "Please enter your email address.",
		trim: true,
        lowercase: true,
        validate: [validateEmail, "Please enter a valid email address."],
	},
	password: {
		type: String,
	    required: [true, 'Please enter your account password.']
	}
});

const Users = mongoose.model('User', userSchema);

// Validation for login form params
function validateCourse(course) {
	const schema = Joi.object({
		first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
		password: Joi.string().required()
	});

	return schema.validate(course);
}

exports.Users = Users;
exports.validate = validateCourse;
