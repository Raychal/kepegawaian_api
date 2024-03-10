const db = require('../sequelize/models')
const employee_family_model = db.EmployeeFamily

exports.storeEmployeeFamily = async (objEmployee) => {
    try {

        const dataEmployeeFamily = {
            employee_id: objEmployee.employee_id,
            name: objEmployee.name,
            identifier: objEmployee.identifier,
            job: objEmployee.job,
            place_of_birth: objEmployee.place_of_birth,
            date_of_birth: objEmployee.date_of_birth,
            religion: objEmployee.religion,
            is_life: objEmployee.is_life,
            is_divorced: objEmployee.is_divorced,
            relation_status: objEmployee.relation_status,
            created_by: objEmployee.created_by,
            updated_by: objEmployee.updated_by,
        }

        await employee_family_model.create(dataEmployeeFamily);

        return data = {
            message: 'Successfully create new Family Employee',
            status: 201,
            data: null
        };
    } catch (err) {
        return data = {
            status: 500,
            data: null,
            message: err.message
        }
    }
};

exports.updateEmployeeFamily = async (objEmployee, id) => {
    try {

        const dataEmployeeFamily = {
            name: objEmployee.name,
            identifier: objEmployee.identifier,
            job: objEmployee.job,
            place_of_birth: objEmployee.place_of_birth,
            date_of_birth: objEmployee.date_of_birth,
            religion: objEmployee.religion,
            is_life: objEmployee.is_life,
            is_divorced: objEmployee.is_divorced,
            relation_status: objEmployee.relation_status,
            created_by: objEmployee.created_by,
            updated_by: objEmployee.updated_by,
        }

        await employee_family_model.update(dataEmployeeFamily, {
            where: {
                id: id,
                employee_id: objEmployee.employee_id
            }
        });

        return data = {
            message: 'Successfully update Family Employee',
            status: 200,
            data: null
        };
    } catch (err) {
        return data = {
            status: 500,
            data: null,
            message: err.message
        }
    }
};

exports.deleteEmployeeFamily = async (id) => {
    try {
        await employee_family_model.destroy({
            where: { id:id }
        });

        return data = {
            message: 'Successfully delete Family Employee',
            status: 202,
            data: null
        };
    } catch (err) {
        return data = {
            status: 500,
            data: null,
            message: err.message
        }
    }
};