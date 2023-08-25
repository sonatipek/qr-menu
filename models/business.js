const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const User = sequelize.define("users", {
    businessId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false, 
        primaryKey: true
    },
    business_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    business_adress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    business_tel: {
        type: DataTypes.STRING,
        allowNull: false
    },
    business_open: {
        type: DataTypes.STRING,
        allowNull: false
    },
    business_close: {
        type: DataTypes.STRING,
        allowNull: false
    },
    business_ig: {
        type: DataTypes.STRING,
        allowNull: false
    },
    business_logo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    business_bg: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    timestamps: false
});


async function syncSQL() {
    await Category.sync({alter: true})
    console.info("Category table is added!")

    if (await Category.count() === 0) {

        await Category.bulkCreate([
            {
                username: "admin",
                password: "admin"
            }

        ])
        
        console.log("Veritabanına kayıt eklendi");
    }

}

syncSQL();

module.exports=User;