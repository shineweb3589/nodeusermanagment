const router = require('express').Router();
const auth = require("../middleware/auth");
const UserController = require('../controllers/user');

router.get("/", auth, UserController.getUsers);
router.get("/:id", auth, UserController.getUserById);
router.post("/", auth, UserController.addUser);
router.put("/:id", auth, UserController.updateUser);
router.delete("/:id", auth, UserController.deleteUser);

module.exports = router;