'use strict';
module.exports = (sequelize, DataTypes) => {
  class Task extends sequelize.Sequelize.Model{}
  Task.init({
    // attributes
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'title is required'
        },
        notNull: {
          args: true,
          msg: 'title is required'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Backlog'
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Task'
    // options
  })
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User)
  };
  return Task;
};