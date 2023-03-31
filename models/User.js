const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        firstName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        domain: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        phNumber: {
            type: DataTypes.STRING(100),
            unique: true
        },
        image: {
            type: DataTypes.STRING,
        },
        token: {
            type: DataTypes.STRING,
        },
        tokenExp: {
            type: DataTypes.STRING,
        },
        isEmailVerified: {
            type: DataTypes.TINYINT(1),
        },
        isPhoneVerified: {
            type: DataTypes.TINYINT(1),
        },
        canAddUser: {
            type: DataTypes.TINYINT(1),
        },
        canAddBankAccount: {
            type: DataTypes.TINYINT(1),
        },
        canAddTransaction: {
            type: DataTypes.TINYINT(1),
        },
        canAddPayment: {
            type: DataTypes.TINYINT(1),
        },
        role: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
        }
    }, {
        hooks: {
            beforeCreate: (user) => {
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);
            }
        }
    });

    User.prototype.comparePassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    }

    User.prototype.generateToken = async function () {
        var user = this;
        console.log('user', user);

        var token = jwt.sign(user.id, 'secret')
        var oneHour = moment().add(1, 'Hour').valueOf();

        user.tokenExp = oneHour;
        user.token = token;
        await user.update(
            { tokenExp: oneHour, token: token },
            { where: { email: user.email } }
        ).then(user => {
            return user
        }
        ).catch(err => {
            return err
        }
        )
    }

    User.findByToken = function (token, cb) {
        var user = this;

        jwt.verify(token, 'secret', function (err, decode) {
            user.findOne({
                where: {
                    'id': decode,
                    'token': token
                }
            }).then(user => {
                return cb(null, user);
            }).catch(err => {
                return cb(err)
            })
        });
    }

    return User;
};