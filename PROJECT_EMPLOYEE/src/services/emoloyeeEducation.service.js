const { showEducation, store, update, destroy } = require('../repositories/employeeEducation.repository')
const { showEmployee } = require('../repositories/employee.repository')

const storeEmployeeEducation = async (objEmployee) => {
    const employeeExist = await showEmployee(objEmployee.employee_id);
    if (!employeeExist) { throw { code: 404, message: "Employee is not found" } }

    return await store(objEmployee);
};

const updateEmployeeEducation = async (objEmployee, id) => {
    const employeeExist = await showEmployee(objEmployee.employee_id);
    if (!employeeExist) { throw { code: 404, message: "Employee is not found" } }

    const employeeEducationExist = await showEducation(id);
    if (!employeeEducationExist) { throw { code: 404, message: "Education Employee is not found" } }

    return await update(objEmployee, id);
};

const deleteEmployeeEducation = async (id) => {
    const employeeEducationExist = await showEducation(id);
    if (!employeeEducationExist) { throw { code: 404, message: "Education Employee is not found" } }

    return await destroy(id);
};

module.exports = {
    storeEmployeeEducation,
    updateEmployeeEducation,
    deleteEmployeeEducation
}