const employeeService = require('../services/emoloyee.service');

const index = async (req, res) => {
  try {
    
    const data = await employeeService.getAllDataEmployees();

    return res.json({
      message: 'Successfully get all data',
      status: 200,
      data: data
  });
  } catch (err) {
    if (!err.code) { err.code = 500 }
        return res.status(err.code).json({
            code: err.code,
            message: err.message
        });
  }
}

const show = async (req, res) => {
  try {
    
    const data = await employeeService.getDataEmployee(req.params.id);

    return res.json({
      message: 'Successfully get data Employee',
      status: 200,
      data: data
  });
  } catch (err) {
    if (!err.code) { err.code = 500 }
        return res.status(err.code).json({
            code: err.code,
            message: err.message
        });
  }
}

const store = async (req, res) => {
  try {

    if (req.body.is_active === null) { throw { code: 428, message: "Active is required" } }
    if (!req.body.start_date) { throw { code: 428, message: "Start date is required" } }
    if (!req.body.end_date) { throw { code: 428, message: "End date is required" } }
    if (!req.body.gender) { throw { code: 428, message: "Gender is required" } }
    if (req.body.is_married === null) { throw { code: 428, message: "Married is required" } }

    const data = await employeeService.storeEmployee(req.body);

    return res.status(201).json({
      message: "Successfully create data",
      status: 201,
      data: data,
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
    
    const data = await employeeService.getDataEmployee(req.params.id);

    return res.json({
      message: "Successfuly update data",
      status: 200,
      data: data
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
    await employeeService.deleteEmployee(req.params.id);
    
    return res.status(202).json({
      message: 'Successfully delete Employee',
      status: 202,
      data: null
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
    const report = await employeeService.reportEmployee();

    return res.json({
      message: 'This is report endpoint',
      status: 200,
      data: report
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