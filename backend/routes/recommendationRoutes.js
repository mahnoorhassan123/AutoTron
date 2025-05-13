const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/recommendationController');
const validateInput = require('../middlewares/validateInput');

router.post('/recommend', validateInput, getRecommendations);

module.exports = router;