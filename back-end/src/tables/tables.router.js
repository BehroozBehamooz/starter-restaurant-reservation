const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require ("./tables.controller");
const seatRouter = require ("./seat/seat.router");

router.route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

router.use("/:table_id/seat", controller.tableExists, seatRouter);

module.exports = router;