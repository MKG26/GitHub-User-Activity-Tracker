const express = require('express')
const router = express.Router();
const listEventsController = require('../controllers/listEvents.js')


router.post('/listEventsForUses',listEventsController.getGithubEventList)

module.exports = router;


