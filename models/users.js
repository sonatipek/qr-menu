const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const User = sequelize.define("users", {
    userid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false, 
        primaryKey: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
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