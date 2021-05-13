import { registerAs, } from '@nestjs/config'

export default registerAs('app', () => ({
  settings: {
    port: parseInt(process.env.APP_PORT_DOCKER ? process.env.APP_PORT_DOCKER : process.env.APP_PORT),
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    connectionLimit: parseInt(process.env.MYSQL_CONNECTION_LIMIT || '5'),
    database: process.env.MYSQL_DEFAULT_DATABASE,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    ttl: parseInt(process.env.REDIS_CACHE_TTL || '10'),
  },
}))
