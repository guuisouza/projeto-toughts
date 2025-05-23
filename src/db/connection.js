const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    process.env.MYSQL_DB, 
    process.env.MYSQL_USER, 
    process.env.MYSQL_PASSWORD, 
    {
        host: 'guuiisouza-toughts-mysql',
        port: 3306,
        dialect: 'mysql'
    }
)

try {
    sequelize.authenticate()
    .then(console.log("Connected to mysql!"))
} catch(err) {
    console.log(`Unable to connect: ${err}`)
}

module.exports = sequelize