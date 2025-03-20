const express = require("express");
const router = express.Router();
const listEventsController = require("../controllers/listEvents.js");

// List all events (POST)
router.post("/listEventsForUses", listEventsController.getGithubEventList);

// Get public events (GET)
router.get(
  "/publicEventsForAUser/:username",
  listEventsController.publicEventsForAUser
);

// Get event list (GET)
router.get(
  "/getEventListForUser/:username",
  listEventsController.getEventListForUser
);

module.exports = router;
