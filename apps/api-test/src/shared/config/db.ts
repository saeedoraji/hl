export const mysqlConstants = {
  type: 'mysql' as any,
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: true,
  extra: { max: 20, min: 1, charset: 'utf8_general_ci' },
};
