const Joi = require('joi');

function validateCourse(course) {
	const schema = Joi.object({
		first_name: Joi.string(),
		last_name: Joi.string(),
        email: Joi.string().required(),
		password: Joi.string().required(),
		tags: Joi.array(),
		status: Joi.boolean(),
		departments: Joi.array()
	});

	return schema.validate(course);
}

exports.validate = validateCourse;