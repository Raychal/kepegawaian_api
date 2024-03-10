const employeeEducationService = require('../services/emoloyeeEducation.service')
const db = require('../sequelize/models')
const employee_model = db.Employee
const employee_education_model = db.Education

const store = async (req, res) => {
  try {

    if (!req.body.employee_id) { throw { code: 428, message: "Employee Id of educaiton is required" } }
    if (!req.body.name) { throw { code: 428, message: "Name of educaiton is required" } }
    if (!req.body.level) { throw { code: 428, message: "Level of education is required" } }
    if (!req.body.description) { throw { code: 428, message: "Description of education is required" } }

    const employeeExist = await employee_model.findOne({ where: {id:req.body.employee_id} });
    if (!employeeExist) { throw { code: 404, message: "Employee is not found" } }

    const employeeObj = {
      employee_id: req.body.employee_id,
      name: req.body.name,
      level: req.body.level,
      description: req.body.description,
      created_by: 'Admin',
      updated_by: 'Admin',
    }
    await employeeEducationService.storeEmployeeEducation(employeeObj)
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
    if (!req.body.name) { throw { code: 428, message: "Name of educaiton is required" } }
    if (!req.body.level) { throw { code: 428, message: "Level of education is required" } }
    if (!req.body.description) { throw { code: 428, message: "Description of education is required" } }

    const employeeExist = await employee_model.findOne({ where: {id:req.body.employee_id} });
    if (!employeeExist) { throw { code: 404, message: "Employee is not found" } }

    const employeeEducationExist = await employee_education_model.findOne({ where: {id:req.params.id} });
    if (!employeeEducationExist) { throw { code: 404, message: "Education Employee is not found" } }

    const employeeObj = {
      employee_id: req.body.employee_id,
      name: req.body.name,
      level: req.body.level,
      description: req.body.description,
      created_by: 'Admin',
      updated_by: 'Admin',
    }
    await employeeEducationService.updateEmployeeEducation(employeeObj, req.params.id)
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
    await employeeEducationService.deleteEmployeeEducation(req.params.id)
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