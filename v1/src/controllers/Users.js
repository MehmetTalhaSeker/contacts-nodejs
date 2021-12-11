const { insert, loginUser, modify } = require("../services/Users");
const contactService = require("../services/Contacts");
const httpStatus = require("http-status");
const {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
} = require("../scripts/utils/helper");

const create = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  insert(req.body)
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const login = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  loginUser(req.body)
    .then((user) => {
      if (!user) {
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "Email or Password is Incorrect!" });
      }
      user = {
        ...user.toObject(),
        tokens: {
          access_token: generateAccessToken(user),
          refresh_token: generateRefreshToken(user),
        },
      };
      delete user.password;
      res.status(httpStatus.OK).send(user);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};

const contactList = (req, res) => {
  const { _id } = req.user;
  contactService
    .list({ user_id: _id })
    .then((contacts) => {
      res.status(httpStatus.OK).send(contacts);
    })
    .catch(() => {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: "Couldn't get the contacts..." });
    });
};

const update = (req, res) => {
  modify({ _id: req.user?._id }, req.body)
    .then((updatedUser) => {
      res.status(httpStatus.OK).send(updatedUser);
    })
    .catch(() =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: "An error occurred during updating..." })
    );
};

module.exports = {
  create,
  login,
  update,
  contactList,
};
