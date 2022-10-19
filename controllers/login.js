const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {Users} = require('../model/auth');
const {validate} = require('../utilities/validation/login');

exports.login = async function(req, res) {
    try {
	    const { error } = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        
        const { email, password } = req.body;
        const user = await Users.findOne({ email: email }, {}, { lean: true});
        
        if (user && (bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, { expiresIn: "2h" });
            user.token = token;
            res.status(200).json({
                user: user,
                message: "Login successfully"
            });
        }
        res.status(400).send({"message" : "Invalid Credentials"});
    } catch (err) {
        console.log(err);
    }
};
