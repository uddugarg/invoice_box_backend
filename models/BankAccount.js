module.exports = (sequelize, DataTypes) => {
    const BankAccount = sequelize.define("BankAccount", {
        bankAccountType: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        bankAccountName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        bankAccountNumber: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        bankAccountHoldersName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        ifscCode: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        branchAddress: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return BankAccount;
};