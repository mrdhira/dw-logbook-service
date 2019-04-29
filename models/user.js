'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    line_id: DataTypes.STRING,
    cookie: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    full_name: DataTypes.STRING,
    isDailyReminder: DataTypes.INTEGER,
    isAutoFillWeekend: DataTypes.INTEGER,
    isFollow: DataTypes.INTEGER,
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};