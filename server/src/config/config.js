module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'bunkydb',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'd4t4b453!',
        options: {
            dialect : process.env.DIALECT || 'mysql',
            host: process.env.HOST || 'localhost',
            storage: './bunkyapp.mysql'
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}