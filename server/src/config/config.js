module.exports = {
  port: process.env.PORT || 8081,
  db: {
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'd4t4b453!',
    database: process.env.DB_NAME || 'bunkydb',
    options: {
      dialect : process.env.DB_DIALECT || 'mysql',
      dialectOptions: {
        socketPath: process.env.INSTANCE_CONNECTION_NAME ? `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}` : null
      },
      host: process.env.HOST || 'localhost',
      storage: './bunkyapp.mysql'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}