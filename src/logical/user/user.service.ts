import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import sequelize from '../../database/sequelize'; // 引入 Sequelize 实例
import { makeSalt, encryptPassword } from "../../utils/cryptogram";

@Injectable()
export class UserService {
  /**
   *
   * 查询是否有该用户
   * @param {string} username 用户名
   * @returns {(Promise<any | undefined>)}
   * @memberof UserService
   */
  async findOne(username: string): Promise<any | undefined> {
    const sql = `
      SELECT
        user_id userId, account_name username, real_name realName, passwd password,
        passwd_salt salt, mobile, role
      FROM
        admin_user
      WHERE
        account_name = '${username}'
    `;
    try {
      const user = (await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: true, // 是否将 SQL 
      }))[0];
      // 若查不到用户，则 user === undefined
      console.log(user);

      return user;
    } catch (error) {
      console.error(error);
      return void 0;
    }
  }

  async register(requestBody: any): Promise<any> {
    const { accountName, realName, password, repassword, mobile } = requestBody
    /**
     * 判断两次输入密码是否相等
     */
    if (password !== repassword) {
      return {
        code: 400,
        msg: "两次密码不正确"
      }
    }
    /**
     * 判断用户是否存在
     */
    const user = await this.findOne(accountName)
    console.log(user);

    if (user) {
      return {
        code: 400,
        msg: '用户已存在'
      }
    }

    const salt = makeSalt();
    const hashPwd = encryptPassword(password, salt);

    const registerSQL = `
      INSERT INTO admin_user
       (account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)
      VALUES
        ('${accountName}', '${realName}', '${hashPwd}', '${salt}', '${mobile}', 1, 3, 0)
      `

    try {
      await sequelize.query(registerSQL, {
        logging: false
      })
      return {
        code: 200,
        msg: "注册成功"
      }
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      }
    }
  }

}
