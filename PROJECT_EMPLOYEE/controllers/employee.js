const employeeService = require('../services/emoloyee.service')
const db = require('../sequelize/models')
const employee_model = db.Employee

const index = async (req, res) => {
  await employeeService.getAllDataEmployees()
    .then(data => {
      res.status(200).json({
        message: data.message,
        status: data.status,
        data: data.data,
      });
    })
    .catch(err => {
      res.send({
        data: null,
        message: "Error",
        status: 500,
        err: err
      })
    });
}

const show = async (req, res) => {
  await employeeService.getDataEmployee(req.params.id)
    .then(data => {
      res.status(200).json({
        message: data.message,
        status: data.status,
        data: data.data,
      });
    })
    .catch(err => {
      res.send({
        data: null,
        message: "Error",
        status: 500,
        err: err
      })
    });
}

const store = async (req, res) => {
  try {

    if (req.body.is_active === null) { throw { code: 428, message: "Active is required" } }
    if (!req.body.start_date) { throw { code: 428, message: "Start date is required" } }
    if (!req.body.end_date) { throw { code: 428, message: "End date is required" } }
    if (!req.body.gender) { throw { code: 428, message: "Gender is required" } }
    if (req.body.is_married === null) { throw { code: 428, message: "Married is required" } }

    const employeeObj = {
      nik: req.body.nik,
      name: req.body.name,
      is_active: req.body.is_active,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      place_of_birth: req.body.place_of_birth,
      date_of_birth: req.body.date_of_birth,
      gender: req.body.gender,
      is_married: req.body.is_married,
      prof_pict: req.body.prof_pict,
      created_by: 'Admin',
      updated_by: 'Admin',
    }
    await employeeService.storeEmployee(employeeObj)
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

    if (req.body.is_active === null) { throw { code: 428, message: "Active is required" } }
    if (!req.body.start_date) { throw { code: 428, message: "Start date is required" } }
    if (!req.body.end_date) { throw { code: 428, message: "End date is required" } }
    if (!req.body.gender) { throw { code: 428, message: "Gender is required" } }
    if (req.body.is_married === null) { throw { code: 428, message: "Married is required" } }
    
    const employeeExist = await employee_model.findOne({ where: {id:req.params.id} });
    if (!employeeExist) { throw { code: 404, message: "Employee is not found" } }

    const employeeObj = {
      nik: req.body.nik,
      name: req.body.name,
      is_active: req.body.is_active,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      place_of_birth: req.body.place_of_birth,
      date_of_birth: req.body.date_of_birth,
      gender: req.body.gender,
      is_married: req.body.is_married,
      prof_pict: req.body.prof_pict,
      created_by: 'Admin',
      updated_by: 'Admin',
    }
    await employeeService.updateEmployee(employeeObj, req.params.id)
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

    const employeeExist = await employee_model.findOne({ where: {id:req.params.id} });
    if (!employeeExist) { throw { code: 404, message: "Employee is not found" } }

    await employeeService.deleteEmployee(req.params.id)
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

const report = async (req, res) => {
  try {
    await employeeService.reportEmployee()
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
  index, show, store, update, destroy, report
};