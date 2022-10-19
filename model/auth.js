const mongoose = require('mongoose');

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
		required: [true, 'Please enter your email address.'],
		trim: true,
        lowercase: true,
        validate: [validateEmail, "Please enter a valid email address."],
	},
	password: {
		type: String,
	    required: [true, 'Please enter your account password.']
	},
	tags: [ String ],
    created: {
        type: Date,
        default: Date.now
    },
    status: Boolean,
    departments: [
        {
            name: String,
            location: String,
            strength: Number
        }
    ]

});

const Users = mongoose.model('User', userSchema);

exports.Users = Users;
