const prisma = require('../db')

const showEmployeeFamily = async (id) => {
    const dataEmployeeFamily = await prisma.employeeFamily.findUnique({
        where: {
            id
        }
    });

    return dataEmployeeFamily;
}

const store = async (dataEmp) => {
    const dataEmployeeFamily = await prisma.employeeFamily.create({
        data: {
            employee_id: dataEmp.employee_id,
            name: dataEmp.name,
            identifier: dataEmp.identifier,
            job: dataEmp.job,
            place_of_birth: dataEmp.place_of_birth,
            date_of_birth: new Date(dataEmp.date_of_birth),
            religion: dataEmp.religion,
            is_life: dataEmp.is_life,
            is_divorced: dataEmp.is_divorced,
            relation_status: dataEmp.relation_status,
            created_by: dataEmp.created_by,
            updated_by: dataEmp.updated_by,
            created_at: new Date(),
            updated_at: new Date()
        }
    });

    return dataEmployeeFamily;
}

const update = async (dataEmp, id) => {
    const dataEmployeeFamily = await prisma.employeeFamily.update({
        where: {
            id,
            employee_id: dataEmp.employee_id
        },
        data: {
            employee_id: dataEmp.employee_id,
            name: dataEmp.name,
            identifier: dataEmp.identifier,
            job: dataEmp.job,
            place_of_birth: dataEmp.place_of_birth,
            date_of_birth: new Date(dataEmp.date_of_birth),
            religion: dataEmp.religion,
            is_life: dataEmp.is_life,
            is_divorced: dataEmp.is_divorced,
            relation_status: dataEmp.relation_status,
            created_by: dataEmp.created_by,
            updated_by: dataEmp.updated_by,
            created_at: new Date(),
            updated_at: new Date()
        }
    });

    return dataEmployeeFamily;
}

const destroy = async (id) => {
    const dataEmployeeFamily = await prisma.employeeFamily.delete({
        where: {
            id: id
        },
    });

    return dataEmployeeFamily;
}

module.exports = {
    showEmployeeFamily,
    store,
    update,
    destroy
}