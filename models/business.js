const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Business = sequelize.define("business", {
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
    business_web: {
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
    await Business.sync({alter: true})
    console.info("Business table is added!")

    if (await Business.count() === 0) {

        await Business.bulkCreate([
            {
                business_name: "Coffe House",
                business_adress: "Saliha Sokak, No:147, Kadıköy / İstanbul",
                business_tel: "0532 654 7624",
                business_open: "09:00",
                business_close: "23:00",
                business_ig: "https://instagram.com/sonatipek",
                business_web: "https://sonatipek.com",
                business_logo: "placeholder.webp",
                business_bg: "placeholder.webp"
            }

        ])
        
        console.log("Veritabanına kayıt eklendi");
    }

}

syncSQL();

module.exports=Business;