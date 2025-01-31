import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthenticationGaurd } from 'src/utility/gaurds/authentication.gaurd';
import { AuthorizeGaurd } from 'src/utility/gaurds/authorization.gaurd';
import { Roles } from 'src/utility/common/user-roles.enum';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthenticationGaurd, AuthorizeGaurd([Roles.ADMIN]))
  @Post("createCategory")
  create(@Body() createCategoryDto: CreateCategoryDto, @CurrentUser() currentUser: UserEntity) {
    return this.categoriesService.create(createCategoryDto, currentUser);
  }

  @Get("all")
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }
  @UseGuards(AuthenticationGaurd, AuthorizeGaurd([Roles.ADMIN]))
  @Patch('id/:id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete('id/:id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
