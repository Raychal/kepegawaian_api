const express = require('express');
const router = express.Router();

const employeeController = require('../controllers').employee;
const employeeEducationController = require('../controllers').employeeEducation;
const employeeFamilyController = require('../controllers').employeeFamily;

router.get('/employees', employeeController.index);
router.get('/employees/:id', employeeController.show);
router.post('/employees/', employeeController.store);
router.put('/employees/:id', employeeController.update);
router.delete('/employees/:id', employeeController.destroy);
router.get('/report', employeeController.report);

router.post('/employees/education/', employeeEducationController.store);
router.put('/employees/education/:id', employeeEducationController.update);
router.delete('/employees/education/:id', employeeEducationController.destroy);

router.post('/employees/family', employeeFamilyController.store);
router.put('/employees/family/:id', employeeFamilyController.update);
router.delete('/employees/family/:id', employeeFamilyController.destroy);

module.exports = router;
