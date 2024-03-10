var express = require('express');
var router = express.Router();

const employeeController = require('../controllers').employee;
const employeeEducationController = require('../controllers').employeeEducation;
const employeeFamilyController = require('../controllers').employeeFamily;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/employees', employeeController.index);
router.get('/api/employees/:id', employeeController.show);
router.post('/api/employees', employeeController.store);
router.put('/api/employees/:id', employeeController.update);
router.delete('/api/employees/:id', employeeController.destroy);
router.get('/api/report/employees', employeeController.report);

router.post('/api/employees/education/', employeeEducationController.store);
router.put('/api/employees/education/:id', employeeEducationController.update);
router.delete('/api/employees/education/:id', employeeEducationController.destroy);

router.post('/api/employees/family', employeeFamilyController.store);
router.put('/api/employees/family/:id', employeeFamilyController.update);
router.delete('/api/employees/family/:id', employeeFamilyController.destroy);

module.exports = router;
