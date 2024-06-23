const { allData, showEmployee, create, update, destroy, report } = require('../repositories/employee.repository');

const getAllDataEmployees = async () => {
    return await allData();
};

const getDataEmployee = async (id) => {
    const data = await showEmployee(id);
    if (!data) { throw { code: 404, message: "Employee is not found" } }

    return data;
};

const storeEmployee = async (data) => {
    return await create(data);
};

const updateEmployee = async (objEmployee, id) => {
    await getDataEmployee(id);

    return await update(objEmployee, id);
};

const deleteEmployee = async (id) => {
    await getDataEmployee(id);

    return await destroy(id);
};

const reportEmployee = async () => {
    return await report();
};

module.exports = {
    getAllDataEmployees,
    getDataEmployee,
    storeEmployee,
    updateEmployee,
    deleteEmployee,
    reportEmployee
}