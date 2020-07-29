import { Controller, Post, Body, UseGuards, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from '../../pipe/validation.pipe';
import { RegisterInfoDTO } from './user.dto'; // 引入 DTO

@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService, private readonly usersService: UserService) { }


  @Post("one")
  findOne(@Body() body: any) {
    return this.usersService.findOne(body.username)
  }
  /**
   * 注册接口
   */

  // @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe()) // 使用管道验证
  @Post('register')
  register(@Body() body: RegisterInfoDTO) {
    console.log(body);

    return this.usersService.register(body)
  }
  /**
   *JWT验证 - Step 1: 用户请求登录
   * 登录接口 
   */
  @Post('login')
  async login(@Body() loginParmas: any) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(loginParmas.username, loginParmas.password);
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }

}
