'use strict';
const { hashPassword } = require('../helper/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model{}
  User.init({
    // attributes
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name is required'
        },
        notNull: {
          args: true,
          msg: 'Name is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "please input your email address"
        },
        notEmpty: {
          args: true,
          msg: 'email is required'
        },
        notNull: {
          args: true,
          msg: 'email is required'
        }
      },
      unique: {
        args: true,
        msg: 'email already in use!'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: "min. password 6 character"
        },
        notEmpty: {
          args: true,
          msg: 'password is required'
        },
        notNull: {
          args: true,
          msg: 'password is required'
        }
      }
    }
  }, {
    hooks : {
      beforeCreate: (User, options) => {
        User.password = hashPassword(User.password)
      }
    },
    sequelize,
    modelName: 'User'
    // options
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task)
  };
  return User;
};