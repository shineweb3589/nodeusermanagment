const {Users} = require('../model/auth');
const {validate} = require('../utilities/validation/register');

exports.getUsers = async function(req, res) {
    try {
	    const usersData = await Users.find();
        return res.status(200).send({
            data: usersData
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getUserById = async function(req, res) {
    try {
	    const { id } = req.params;
        Users.findById(id, function (err, user) {
            if (err) return res.status(400).send("Requested user not found.");
            else return res.status(200).send({
                data: user 
            });
        });
    } catch (err) {
        console.log(err);
    }
};

exports.addUser = async function(req, res) {
    try {
	    const userData = req.body;
        const { error } = validate(userData);
        if(error) return res.status(400).send(error.details[0].message);
        
        const { first_name, last_name, email, password } = req.body;
        const oldUser = await Users.findOne({ email });
        if (oldUser) {
            return res.status(409).json({
                message : "User Already Exist. Please Login"
            });
        }
        
        const user = new Users(userData);
        user.save(function (err, user) {
            if (err) return res.status(400).send(err);
            else return res.status(200).send({
                data: user,
                message: "User has been added sucessfully." 
            });
        });
    } catch (err) {
        console.log(err);
    }
};


exports.updateUser = async function(req, res) {
    try {
	    const userId = req.params.id;
        const userData = req.body;
        Users.findByIdAndUpdate(userId, userData, {new: true},function (err, user) {
            if (err) return res.status(400).send(err);
            else return res.status(200).send({
                data: user,
                message: "User has been updated sucessfully." 
            });
        });
    } catch (err) {
        console.log(err);
    }
};

exports.deleteUser = async function(req, res) {
    try {
	    const userId = req.params.id;
        Users.findByIdAndDelete(userId, function (err, user) {
            if (err) return res.status(400).send(err);
            else return res.status(200).send({
                data: user,
                message: "User has been deleted sucessfully." 
            });
        });
    } catch (err) {
        console.log(err);
    }
};