const productConfig = {
  mysql: {
    port: 3306,
    host: "localhost",
    user: "root",
    password: "123456",
    database: 'nest_zero_to_one',
    connectionLimit: 10
  }
}
// 连接数据库
const localConfig = {
  mysql: {
    port: 3306,
    host: "localhost",
    user: "root",
    password: '123456',
    database: 'nest_zero_to_one',
    connectionLimit: 10
  }
}

// 配置生产环境还是开发环境
const config = process.env.NODE_ENV ? productConfig : localConfig

export default config