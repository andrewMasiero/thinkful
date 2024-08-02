const router = require("express").Router();
const controller = require("./urls.controller");

router.route("/").get(controller.list);

router.route("/:urlId").get(controller.read);

module.exports = router;
