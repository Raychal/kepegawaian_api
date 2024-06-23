const prisma = require('../db')

const showEducation = async (id) => {
    const dataEducation = await prisma.education.findUnique({
        where: {
            id
        }
    });

    return dataEducation;
}

const store = async (dataEmp) => {
    const dataEducation = await prisma.education.create({
        data: {
            employee_id: dataEmp.employee_id,
            name: dataEmp.name,
            level: dataEmp.level,
            description: dataEmp.description,
            created_by: dataEmp.created_by,
            updated_by: dataEmp.updated_by,
            created_at: new Date(),
            updated_at: new Date()
        }
    });

    return dataEducation;
}

const update = async (dataEmp, id) => {
    const dataEducation = await prisma.education.update({
        where: {
            id,
            employee_id: dataEmp.employee_id
        },
        data: {
            employee_id: dataEmp.employee_id,
            name: dataEmp.name,
            level: dataEmp.level,
            description: dataEmp.description,
            created_by: dataEmp.created_by,
            updated_by: dataEmp.updated_by,
            created_at: new Date(),
            updated_at: new Date()
        }
    });

    return dataEducation;
}

const destroy = async (id) => {
    const dataEducation = await prisma.education.delete({
        where: {
            id
        },
    });

    return dataEducation;
}

module.exports = {
    showEducation,
    store,
    update,
    destroy
}