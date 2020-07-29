// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
// import { AuthService } from './logical/auth/auth.service';
import { AuthModule } from './logical/auth/auth.module';
import { UserController } from './logical/user/user.controller';
// import { LogicalService } from './commodity/logical/logical.service';
// import { CommodityService } from './logical/commodity/commodity.service';
import { CommodityController } from './logical/commodity/commodity.controller';
import { CommodityService } from './logical/commodity/commodity.service';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController, UserController, CommodityController],
  providers: [AppService, CommodityService],
})
export class AppModule { }
