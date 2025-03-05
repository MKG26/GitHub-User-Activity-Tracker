const express = require('express')
const router = express.Router();
const listEventsController = require('../controllers/listEvents.js')


router.post('/listEventsForUses',listEventsController.getGithubEventList)
router.get('/publicEventsForAUser/:username',listEventsController.publicEventsForAUser)

module.exports = router;


