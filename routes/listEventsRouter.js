const express = require('express')
const router = express.Router();
const listEventsController = require('../controllers/listEvents.js')


router.post('/listEventsForUses',listEventsController.getGithubEventList)
router.get('/publicEventsForAUser/:username',listEventsController.publicEventsForAUser)
router.get('/getEventListForUser/:username',listEventsController.getEventListForUser)

module.exports = router;


