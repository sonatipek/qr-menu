const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const User = sequelize.define("users", {
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
    await User.sync({alter: true})
    console.info("Category table is added!")

    if (await User.count() === 0) {

        await User.bulkCreate([
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