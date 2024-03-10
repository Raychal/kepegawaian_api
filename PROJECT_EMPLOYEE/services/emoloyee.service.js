const db = require('../sequelize/models')
const { QueryTypes } = require('sequelize')
const employee_model = db.Employee
const employee_profile_model = db.EmployeeProfile
const employee_family_model = db.EmployeeFamily
const employee_education_model = db.Education

exports.getAllDataEmployees = async () => {
    try {
        const dataEmployee = await employee_model.findAll({
            include: [
              {
                model: employee_profile_model,
                as: 'profile'
              },
              {
                model: employee_family_model,
                as: 'family'
              },
              {
                model: employee_education_model,
                as: 'education'
              },
            ],
        });
        return data = {
            message: 'Successfully get all data',
            status: 200,
            data: dataEmployee
        };
    } catch (err) {
        return data = {
            message: 'Error',
            status: 500,
            data: null,
            error_message: err.message
        }
    }
};

exports.getDataEmployee = async (id) => {
    try {
        const dataEmployee = await employee_model.findOne({
            where: {id:id},
            include: [
              {
                model: employee_profile_model,
                as: 'profile'
              },
              {
                model: employee_family_model,
                as: 'family'
              },
              {
                model: employee_education_model,
                as: 'education'
              },
            ],
        });

        return data = {
            message: 'Successfully get data',
            status: 200,
            data: dataEmployee
        };
    } catch (err) {
        return data = {
            message: 'Error',
            status: 500,
            data: null,
            error_message: err.message
        }
    }
};

exports.storeEmployee = async (objEmployee) => {
    try {
        const dataEmployee = {
            nik: objEmployee.nik,
            name: objEmployee.name,
            is_active: objEmployee.is_active,
            start_date: objEmployee.start_date,
            end_date: objEmployee.end_date,
            created_by: objEmployee.created_by,
            updated_by: objEmployee.updated_by,
        }

        const employee = await employee_model.create(dataEmployee);

        const dataEmployeeProfile = {
            employee_id: employee.id,
            place_of_birth: objEmployee.place_of_birth,
            date_of_birth: objEmployee.date_of_birth,
            gender: objEmployee.gender,
            is_married: objEmployee.is_married,
            prof_pict: objEmployee.prof_pict,
            created_by: objEmployee.created_by,
            updated_by: objEmployee.updated_by,
        }

        await employee_profile_model.create(dataEmployeeProfile);

        return data = {
            message: 'Successfully create new Employee',
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

exports.updateEmployee = async (objEmployee, id) => {
    try {
        const dataEmployee = {
            nik: objEmployee.nik,
            name: objEmployee.name,
            is_active: objEmployee.is_active,
            start_date: objEmployee.start_date,
            end_date: objEmployee.end_date,
            created_by: objEmployee.created_by,
            updated_by: objEmployee.updated_by,
        }

        await employee_model.update(dataEmployee, {
            where:{id:id}
        });

        const dataEmployeeProfile = {
            place_of_birth: objEmployee.place_of_birth,
            date_of_birth: objEmployee.date_of_birth,
            gender: objEmployee.gender,
            is_married: objEmployee.is_married,
            prof_pict: objEmployee.prof_pict,
            created_by: objEmployee.created_by,
            updated_by: objEmployee.updated_by,
        }

        await employee_profile_model.update(dataEmployeeProfile, {
            where:{employee_id:id}
        });

        return data = {
            message: 'Successfully update Employee',
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

exports.deleteEmployee = async (id) => {
    try {
        await employee_model.destroy({
            where:{id:id}
        });
        await employee_profile_model.destroy({
            where:{employee_id:id}
        });

        await employee_family_model.destroy({
            where:{employee_id:id}
        });

        await employee_education_model.destroy({
            where:{employee_id:id}
        });

        return data = {
            message: 'Successfully delete Employee',
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

exports.reportEmployee = async (id) => {
    try {
        const report = await db.sequelize.query(
            `with relation_count as (
                select employee_id, case when (relation_status is null) then null else relation_status end as relation_status, count(*) as count
                from employee_family group by employee_id, relation_status
            ), family_table as (
                select employee_id, string_agg(
                    cast(count as text) || ' ' || relation_status, ' & '
                ) as family_data from relation_count group by employee_id
            )
            select distinct e.id as employee_id, e.nik, e.name, e.is_active, ep.gender, concat(date_part('YEAR', age(current_date, ep.date_of_birth)), ' Years Old') as age ,
            e2."name" as school_name, e2."level", case when ft.family_data is null then '-' else ft.family_data end as family_data from employee e
                left join employee_profile ep on e.id = ep.employee_id
                left join employee_family ef on e.id = ef.employee_id 
                left join education e2 on e.id = e2.employee_id
                left join family_table ft on e.id = ft.employee_id;`
        ,{
            type: QueryTypes.SELECT
        })

        return data = {
            message: 'This is report endpoint',
            status: 200,
            data: report
        };
    } catch (err) {
        return data = {
            status: 500,
            data: null,
            message: err.message
        }
    }
};