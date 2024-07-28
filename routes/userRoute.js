const express = require("express");
const { getUsersController, createUserController } = require("../controllers/userController");

const router = express.Router();

router.get('/', getUsersController);


router.post('/', createUserController);


module.exports = router;