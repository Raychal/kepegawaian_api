const employeeFamilyService = require('../services/emoloyeeFamily.service')
const db = require('../sequelize/models')
const employee_family_model = db.EmployeeFamily
const employee_model = db.Employee

const store = async (req, res) => {
  try {

    if (!req.body.employee_id) { throw { code: 428, message: "Employee Id of educaiton is required" } }
    if (req.body.is_life === null) { throw { code: 428, message: "Life is required" } }
    if (req.body.is_divorced === null) { throw { code: 428, message: "Divorced is required" } }
    if (!req.body.religion) { throw { code: 428, message: "Religion is required" } }
    if (!req.body.relation_status) { throw { code: 428, message: "Relation status is required" } }

    const employeeExist = await employee_model.findOne({ where: {id:req.body.employee_id} });
    if (!employeeExist) { throw { code: 404, message: "Employee is not found" } }

    const employeeObj = {
      employee_id: req.body.employee_id,
      name: req.body.name,
      identifier: req.body.identifier,
      job: req.body.job,
      place_of_birth: req.body.place_of_birth,
      date_of_birth: req.body.date_of_birth,
      religion: req.body.religion,
      is_life: req.body.is_life,
      is_divorced: req.body.is_divorced,
      relation_status: req.body.relation_status,
      created_by: 'Admin',
      updated_by: 'Admin',
    }
    await employeeFamilyService.storeEmployeeFamily(employeeObj)
    .then(data => {
      res.status(201).json({
        message: data.message,
        status: data.status,
        data: data.data,
      });
    });
  } catch (err) {
    if (!err.code) { err.code = 500 }
        return res.status(err.code).json({
            code: err.code,
            message: err.message
        });
  }
}

const update = async (req, res) => {
  try {

    if (!req.body.employee_id) { throw { code: 428, message: "Employee Id of educaiton is required" } }
    if (req.body.is_life === null) { throw { code: 428, message: "Life is required" } }
    if (req.body.is_divorced === null) { throw { code: 428, message: "Divorced is required" } }
    if (!req.body.religion) { throw { code: 428, message: "Religion is required" } }
    if (!req.body.relation_status) { throw { code: 428, message: "Relation status is required" } }

    const employeeExist = await employee_model.findOne({ where: {id:req.body.employee_id} });
    if (!employeeExist) { throw { code: 404, message: "Employee is not found" } }

    const employeeFamilyExist = await employee_family_model.findOne({ where: {id:req.params.id} });
    if (!employeeFamilyExist) { throw { code: 404, message: "Family Employee is not found" } }

    const employeeObj = {
      employee_id: req.body.employee_id,
      name: req.body.name,
      identifier: req.body.identifier,
      job: req.body.job,
      place_of_birth: req.body.place_of_birth,
      date_of_birth: req.body.date_of_birth,
      religion: req.body.religion,
      is_life: req.body.is_life,
      is_divorced: req.body.is_divorced,
      relation_status: req.body.relation_status,
      created_by: 'Admin',
      updated_by: 'Admin',
    }
    await employeeFamilyService.updateEmployeeFamily(employeeObj, req.params.id)
    .then(data => {
      res.status(200).json({
        message: data.message,
        status: data.status,
        data: data.data,
      });
    });
  } catch (err) {
    if (!err.code) { err.code = 500 }
        return res.status(err.code).json({
            code: err.code,
            message: err.message
        });
  }
}

const destroy = async (req, res) => {
  try {
    await employeeFamilyService.deleteEmployeeFamily(req.params.id)
    .then(data => {
      res.status(202).json({
        message: data.message,
        status: data.status,
        data: data.data,
      });
    });
  } catch (err) {
    if (!err.code) { err.code = 500 }
        return res.status(err.code).json({
            code: err.code,
            message: err.message
        });
  }
}

module.exports = {
  store, update, destroy
};