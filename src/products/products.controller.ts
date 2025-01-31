import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthenticationGaurd } from 'src/utility/gaurds/authentication.gaurd';
import { Roles } from 'src/utility/common/user-roles.enum';
import { AuthorizeGaurd } from 'src/utility/gaurds/authorization.gaurd';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthenticationGaurd, AuthorizeGaurd([Roles.ADMIN]) )
  @Post()
  create(@Body() createProductDto: CreateProductDto, @CurrentUser() user: UserEntity) {
    return this.productsService.create(createProductDto, user);
  }

  @Get('all')
  findAll() {
    return this.productsService.findAll();
  }

  @Get('byId/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @UseGuards(AuthenticationGaurd, AuthorizeGaurd([Roles.ADMIN]) )
  @Patch('byId/ you cannot:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @CurrentUser() user: UserEntity) {
    return this.productsService.update(+id, updateProductDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
