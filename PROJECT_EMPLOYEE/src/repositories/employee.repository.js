const prisma = require('../db')

const allData = async () => {
    const dataEmployee = await prisma.employee.findMany({
        include: {
            profile: true,
            family: true,
            education: true,
        }
    });

    return dataEmployee;
}

const showEmployee = async (id) => {
    const dataEmployee = await prisma.employee.findUnique({
        where: {
            id,
        },
        include: {
            profile: true,
            family: true,
            education: true,
        }
    });

    return dataEmployee;
}

const create = async (dataEmp) => {
    const dataEmployee = await prisma.employee.create({
        data: {
            nik: dataEmp.nik,
            name: dataEmp.name,
            is_active: dataEmp.is_active,
            start_date: new Date(dataEmp.start_date),
            end_date: new Date(dataEmp.end_date),
            created_by: 'Admin',
            updated_by: 'Admin',
            created_at: new Date(),
            updated_at: new Date()
        }
    });

    await prisma.employeeProfile.create({
        data: {
            employee_id: dataEmployee.id,
            place_of_birth: dataEmp.place_of_birth,
            date_of_birth: new Date(dataEmp.date_of_birth),
            gender: dataEmp.gender,
            is_married: dataEmp.is_married,
            prof_pict: dataEmp.prof_pict,
            created_by: 'Admin',
            updated_by: 'Admin',
            created_at: new Date(),
            updated_at: new Date()
        }
    });

    return dataEmployee;
}

const update = async (dataEmp, id) => {
    const dataEmployee = await prisma.employee.updateMany({
        where: {
            id
        },
        data: {
            nik: dataEmp.nik,
            name: dataEmp.name,
            is_active: dataEmp.is_active,
            start_date: new Date(dataEmp.start_date),
            end_date: new Date(dataEmp.end_date),
            created_by: 'Admin',
            updated_by: 'Admin',
            created_at: new Date(),
            updated_at: new Date()
        }
    });

    await prisma.employeeProfile.update({
        where: {
            id
        },
        data: {
            place_of_birth: dataEmp.place_of_birth,
            date_of_birth: new Date(dataEmp.date_of_birth),
            gender: dataEmp.gender,
            is_married: dataEmp.is_married,
            prof_pict: dataEmp.prof_pict,
            created_by: 'Admin',
            updated_by: 'Admin',
            created_at: new Date(),
            updated_at: new Date()
        }
    });

    return dataEmployee;
}

const destroy = async (id) => {
    const dataEmployee = await prisma.employee.delete({
        where: {
            id
        },
    });

    return dataEmployee;
}

const report = async () => {
    
    const data = await prisma.$queryRaw
                    `with relation_count as (
                        select employee_id, case when (relation_status is null) then null else relation_status end as relation_status, count(*) as count
                        from "EmployeeFamily" group by employee_id, relation_status
                    ), family_table as (
                        select employee_id, string_agg(
                                cast(count as text) || ' ' || relation_status, ' & '
                              ) as family_data from relation_count group by employee_id
                        )select distinct e.id as employee_id, e.nik, e.name, e.is_active, ep.gender, concat(date_part('YEAR', age(current_date, ep.date_of_birth)), ' Years Old') as age ,
                                e2."name" as school_name, e2."level", case when ft.family_data is null then '-' else ft.family_data end as family_data from "Employee" e
                                    left join "EmployeeProfile" ep on e.id = ep.employee_id
                                    left join "EmployeeFamily" ef on e.id = ef.employee_id 
                                    left join "Education" e2 on e.id = e2.employee_id
                                    left join family_table ft on e.id = ft.employee_id;`
    return data;
}

module.exports = {
    allData,
    showEmployee,
    create,
    update,
    destroy,
    report
}