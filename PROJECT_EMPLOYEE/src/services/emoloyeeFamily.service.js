const { showEmployeeFamily, store, update, destroy } = require('../repositories/employeeFamily.repository');
const { showEmployee } = require('../repositories/employee.repository');

const storeEmployeeFamily = async (objEmployee) => {
    const employeeExist = await showEmployee(objEmployee.employee_id)
    if (!employeeExist) { throw { code: 404, message: "Employee is not found" } }

    return await store(objEmployee);
};

const updateEmployeeFamily = async (objEmployee, id) => {
    const employeeExist = await showEmployee(objEmployee.employee_id)
    if (!employeeExist) { throw { code: 404, message: "Employee is not found" } }

    const employeeFamilyExist = await showEmployeeFamily(id);
    if (!employeeFamilyExist) { throw { code: 404, message: "Employee Family is not found" } }

    return await update(objEmployee, id);
};

const deleteEmployeeFamily = async (id) => {

    const data = await showEmployeeFamily(id);

    if (!data) { throw { code: 404, message: "Data employee family is not found" } }

    return await destroy(id);
};

module.exports = {
    storeEmployeeFamily,
    updateEmployeeFamily,
    deleteEmployeeFamily
}