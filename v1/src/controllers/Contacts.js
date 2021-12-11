const { insert, modify } = require("../services/Contacts");
const httpStatus = require("http-status");

const create = (req, res) => {
  req.body.user_id = req.user;
  insert(req.body)
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const update = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "id required",
    });
  }
  modify(req.body, id)
    .then((updatedProject) => res.status(httpStatus.OK).send(updatedProject))
    .catch(() => {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: "An error occurred during editing project." });
    });
};

module.exports = {
  create,
  update,
};
