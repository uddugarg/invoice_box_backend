module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define("Transaction", {
        transactionType: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        transactionStatus: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        netAmount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bankAccount: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        notes: {
            type: DataTypes.STRING,
        },
        docLink1: {
            type: DataTypes.STRING,
        },
        docLink2: {
            type: DataTypes.STRING,
        },
        docLink2: {
            type: DataTypes.STRING,
        },
        user: {
            type: DataTypes.JSON,
            allowNull: false,
        }
    });

    return Transaction;
};