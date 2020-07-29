import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) { }


  @Post("one")
  findOne(@Body() body: any) {
    return this.usersService.findOne(body.username)
  }
  /**
   * 注册接口
   */
  @Post('register')
  register(@Body() body: any) {
    return this.usersService.register(body)
  }
}
