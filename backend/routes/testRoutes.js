const router = require("express").Router();

const {
  emitGlobalNotification,
} = require("../socket/socket");

router.get("/test-notification", (req, res) => {
  emitGlobalNotification({
    type: "SURVEY_NEW",
    title: "Nowa ankieta",
    message: "Dodano nową ankietę",
  });

  res.json({
    ok: true,
  });
});

module.exports = router;