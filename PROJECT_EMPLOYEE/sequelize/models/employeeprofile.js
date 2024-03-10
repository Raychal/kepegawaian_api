'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmployeeProfile.init({
    employee_id: DataTypes.INTEGER,
    place_of_birth: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    gender: {
      type: DataTypes.ENUM,
      values: ['Laki-laki', 'Perempuan']
    },
    is_married: DataTypes.BOOLEAN,
    prof_pict: DataTypes.STRING,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EmployeeProfile',
    underscored: true,
    tableName: 'employee_profile'
  });
  return EmployeeProfile;
};