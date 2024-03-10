with relation_count as (
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
	left join family_table ft on e.id = ft.employee_id;