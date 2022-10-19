const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {Users} = require('../model/auth');
const {validate} = require('../utilities/validation/register');

exports.register = async function(req, res) {
    try {

        // validate register form
	    const { error } = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const { first_name, last_name, email, password } = req.body;
        const oldUser = await Users.findOne({ email });
        if (oldUser) {
            return res.status(409).json({
                message : "User Already Exist. Please Login"
            });
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
        let user = await Users.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        if(user) {
            user  = user.toObject();
        }

        // Create token
        const token = jwt.sign({user_id: user._id,email},process.env.TOKEN_KEY, {expiresIn: "2h"});
        user.token = token;
        res.status(201).json({
            user: user,
            message: "New user created successfully."
        });
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
};
