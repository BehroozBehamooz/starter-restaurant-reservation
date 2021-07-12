const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reservations.controller");
const statusRouter = require("./status/status.router");

router.route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

router.route("/:reservation_id")
    .get(controller.read)
    .all(methodNotAllowed);

router.use("/:reservation_id/status",
    controller.bodyHasData, 
    controller.reservationExists, 
    statusRouter);

module.exports = router;
