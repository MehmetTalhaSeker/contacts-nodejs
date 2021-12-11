const validate = require("../middlewares/validate");
const schemas = require("../validations/Contacts");
const express = require("express");
const { create, update } = require("../controllers/Contacts");
const authenticate = require("../middlewares/authenticate");
const {contactList} = require("../controllers/Users");

const router = express.Router();

router.route("/").post(authenticate, validate(schemas.createValidation), create);
router.route("/:id").patch(authenticate, validate(schemas.updateValidation), update);
router.route("/").get(authenticate, contactList);


module.exports = router;
