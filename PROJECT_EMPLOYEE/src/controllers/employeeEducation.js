const employeeEducationService = require('../services/emoloyeeEducation.service');

const store = async (req, res) => {
  try {

    if (!req.body.employee_id) { throw { code: 428, message: "Employee Id of educaiton is required" } }
    if (!req.body.name) { throw { code: 428, message: "Name of educaiton is required" } }
    if (!req.body.level) { throw { code: 428, message: "Level of education is required" } }
    if (!req.body.description) { throw { code: 428, message: "Description of education is required" } }

    const data = await employeeEducationService.storeEmployeeEducation(req.body)
    
    return res.status(201).json({
      message: "Successfully create new Education Employee",
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

    if (!req.body.employee_id) { throw { code: 428, message: "Employee Id of educaiton is required" } }
    if (!req.body.name) { throw { code: 428, message: "Name of educaiton is required" } }
    if (!req.body.level) { throw { code: 428, message: "Level of education is required" } }
    if (!req.body.description) { throw { code: 428, message: "Description of education is required" } }

    const data = await employeeEducationService.updateEmployeeEducation(req.body, req.params.id)
    
    return res.status(200).json({
      message: "Successfully update Education Employee",
      status: 200,
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

const destroy = async (req, res) => {
  try {
    
    await employeeEducationService.deleteEmployeeEducation(req.params.id);

    return res.status(202).json({
      message: "Successfully delete Education Employee",
      status: 202,
      data: null,
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