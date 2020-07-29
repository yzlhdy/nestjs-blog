// src/database/sequelize.ts
import db from '../../config/db';
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(db.mysql.database, db.mysql.user, db.mysql.password || null, {
  host: db.mysql.host,
  port: Number(db.mysql.port) || 3306,
  dialect: 'mysql',
  pool: {
    max: db.mysql.connectionLimit, // 连接池中最大连接数量
    min: 0, // 连接池中最小连接数量
    acquire: 30000,
    idle: 10000, // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
  },

});

try {
  sequelize.authenticate();
  console.log('数据库连接成功');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
export default sequelize
