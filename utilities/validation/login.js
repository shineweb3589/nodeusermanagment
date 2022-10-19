const Joi = require('joi');

function validateCourse(course) {
	const schema = Joi.object({
        email: Joi.string().required(),
		password: Joi.string().required()
	});

	return schema.validate(course);
}

exports.validate = validateCourse;