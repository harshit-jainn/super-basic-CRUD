const express = require('express');
const router = new express.Router();
const patientController = require('../controller/patientController');

router.post('/patient', patientController.addPateint);
router.get('/patient/:id', patientController.getPatient);
router.put('/patient/:id', patientController.updatePateint);
router.delete('/patient/:id', patientController.deletePatient);
router.get('/patients', patientController.getAllPatients);
router.post('/addresses', patientController.getAllAddresses);

module.exports = router;