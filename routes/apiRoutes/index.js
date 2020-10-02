const router = require('express').Router();
const noteRoutes = require('../apiRoutes/noteRoutes.js');

router.use(noteRoutes);
router.use(require('./noteRoutes'));
module.exports = router;