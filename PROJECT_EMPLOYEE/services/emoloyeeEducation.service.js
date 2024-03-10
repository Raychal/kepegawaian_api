const db = require('../sequelize/models')
const employee_education_model = db.Education

exports.storeEmployeeEducation = async (objEmployee) => {
    try {
        const dataEmployeeEducation = {
            employee_id: objEmployee.employee_id,
            name: objEmployee.name,
            level: objEmployee.level,
            description: objEmployee.description,
            created_by: objEmployee.created_by,
            updated_by: objEmployee.updated_by,
        }

        await employee_education_model.create(dataEmployeeEducation);

        return data = {
            message: 'Successfully create new Education Employee',
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

exports.updateEmployeeEducation = async (objEmployee, id) => {
    try {
        const dataEmployeeEducation = {
            name: objEmployee.name,
            level: objEmployee.level,
            description: objEmployee.desc,
            created_by: objEmployee.created_by,
            updated_by: objEmployee.updated_by,
        }

        await employee_education_model.update(dataEmployeeEducation, {
            where: {
                id:id,
                employee_id: objEmployee.employee_id
            }
        });

        return data = {
            message: 'Successfully update Education Employee',
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

exports.deleteEmployeeEducation = async (id) => {
    try {
        await employee_education_model.destroy({
            where: { id:id }
        });

        return data = {
            message: 'Successfully delete Education Employee',
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