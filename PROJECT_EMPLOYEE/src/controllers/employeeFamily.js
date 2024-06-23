const employeeFamilyService = require('../services/emoloyeeFamily.service');

const store = async (req, res) => {
  try {

    if (!req.body.employee_id) { throw { code: 428, message: "Employee Id of educaiton is required" } }
    if (req.body.is_life === null) { throw { code: 428, message: "Life is required" } }
    if (req.body.is_divorced === null) { throw { code: 428, message: "Divorced is required" } }
    if (!req.body.religion) { throw { code: 428, message: "Religion is required" } }
    if (!req.body.relation_status) { throw { code: 428, message: "Relation status is required" } }

    const data = await employeeFamilyService.storeEmployeeFamily(req.body);

    return res.status(201).json({
      message: "Successfuly create data",
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

const update = async (req, res) => {
  try {

    if (!req.body.employee_id) { throw { code: 428, message: "Employee Id of educaiton is required" } }
    if (req.body.is_life === null) { throw { code: 428, message: "Life is required" } }
    if (req.body.is_divorced === null) { throw { code: 428, message: "Divorced is required" } }
    if (!req.body.religion) { throw { code: 428, message: "Religion is required" } }
    if (!req.body.relation_status) { throw { code: 428, message: "Relation status is required" } }

    const data = await employeeFamilyService.updateEmployeeFamily(req.body, req.params.id);
    
    return res.status(200).json({
      message: "Successfuly update data",
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
    await employeeFamilyService.deleteEmployeeFamily(req.params.id)
    
    return res.status(202).json({
      message: "Successfully delete data",
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