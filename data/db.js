const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: "mysql",
    host: process.env.DB_HOST,
    storage: "./session.mysql"
});

async function connect() {
    try {
        await sequelize.authenticate();
        console.log("MySQL bağlantısı başarılı");
    } catch (err) {
        console.error(`MySQL bağlantısında hata! Hata:${err}`)
    }
}

connect();

module.exports=sequelize;