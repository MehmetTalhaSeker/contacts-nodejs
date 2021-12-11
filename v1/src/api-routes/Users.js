const validate = require("../middlewares/validate");
const schemas = require("../validations/Users");
const express = require("express");
const authenticate = require("../middlewares/authenticate");
const { create, login, contactList, update } = require("../controllers/Users");

const router = express.Router();

router.route("/").post(validate(schemas.createValidation), create);
router.route("/").patch(authenticate, validate(schemas.updateValidation) , update);
router.route("/login").post(validate(schemas.loginValidation), login);

module.exports = router;
