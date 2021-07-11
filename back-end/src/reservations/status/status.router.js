const router = require("express").Router({ mergeParams: true });
const controller = require("./status.controller");
const methodNotAllowed = require("../../errors/methodNotAllowed");

router.route("/")
    .put(controller.update)
    .all(methodNotAllowed);

module.exports = router;