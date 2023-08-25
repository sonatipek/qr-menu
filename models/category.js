const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Category = sequelize.define("category", {
    categoryid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false, 
        primaryKey: true
    },
    category_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    timestamps: false
});


async function syncSQL() {
    await Category.sync({alter: true})
    console.info("Category table is added!")

    if (await Category.count() === 0) {

        //? Bulk Create
        //*Version -3
        await Category.bulkCreate([
            {category_name: "Hamburgerler"},
            {category_name: "Salatalar"},
            {category_name: "Tatlılar"},
            {category_name: "Sıcak İçecekler"},
            {category_name: "Soğuk İçecekler"},

        ])
        
        console.log("Veritabanına kayıt eklendi");
    }

}

syncSQL();

module.exports=Category;