import { Controller, UseGuards, UseInterceptors, Post, Body, Request } from '@nestjs/common';
import { CommodityService } from './commodity.service';
import { AuthGuard } from '@nestjs/passport';
import { RbacInterceptor } from '../../interceptor/rbac.interceptor';

@Controller('commodity')
export class CommodityController {
    constructor(private readonly commodityService: CommodityService) { }

    // 查询商品列表
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(new RbacInterceptor(3)) // 调用 RBAC 拦截器
    @Post('list')
    async queryColumnList(@Body() body: any) {
        console.log(body);
        return await this.commodityService.queryCommodityList(body);
    }

    // 新建商品
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(new RbacInterceptor(2))
    @Post('create')
    async createCommodity(@Body() body: any, @Request() req: any) {
        return await this.commodityService.createCommodity(body, req.user.username);
    }

    // 修改商品
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(new RbacInterceptor(2))
    @Post('update')
    async updateCommodity(@Body() body: any, @Request() req: any) {
        return await this.commodityService.updateCommodity(body, req.user.username);
    }

    // 删除商品
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(new RbacInterceptor(2))
    @Post('delete')
    async deleteCommodity(@Body() body: any) {
        return await this.commodityService.deleteCommodity(body);
    }

}
