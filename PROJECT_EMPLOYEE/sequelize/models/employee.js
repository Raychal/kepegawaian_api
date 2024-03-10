'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.hasOne(models.EmployeeProfile, {
        as: 'profile',
        foreignKey: 'employee_id'
      });
      Employee.hasMany(models.Education, {
        foreignKey: 'employee_id',
        as: 'education',
      });
      Employee.hasMany(models.EmployeeFamily, {
        foreignKey: 'employee_id',
        as: 'family',
      });
    }
  }
  Employee.init({
    nik: DataTypes.STRING,
    name: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employee',
    underscored: true,
    tableName: 'employee'
  });
  return Employee;
};