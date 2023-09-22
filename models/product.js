const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Product = sequelize.define("products", {
    productid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false, 
        primaryKey: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoryid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

async function syncSQL() {
    await Product.sync({force: true})
    console.info("Blog table is added!")

    const count = await Product.count()
    if (count === 0) {
        Product.create({
            title: "Hamburger",
            amount: "56",
            description: "100 gram dana eti, turşu, domates , marul soğan ve özel sos.",
            image: "1.jpg",
            categoryid: "1",
        })
        
    }
}

syncSQL();

module.exports=Product;