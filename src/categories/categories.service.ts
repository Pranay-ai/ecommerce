import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CategoriesService {

   constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>) {}

  async create(createCategoryDto: CreateCategoryDto, currentUser: UserEntity) {
    const category= this.categoryRepository.create(createCategoryDto);
    category.addedBy=currentUser;
    return await this.categoryRepository.save(category);
  }

  async findAll() {

    const data= await this.categoryRepository.find();
    if(data){
      return data;
    }
    else{
      throw new NotFoundException('No Added Categories Yet');
    }
    
  }

  async findOne(id: number) {
    const data= await this.categoryRepository.findOneBy({id})
    if(data){
      return data;
    }
    else{
      throw new NotFoundException(`Category with id ${id} not found`);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category=await this.categoryRepository.findOne(
      {
        where: {id:id},
        relations : {
          addedBy:true
        },
        select:{
          addedBy:{
            id:true,
            name:true,
            email:true
          },
          id:true,
          title:true,
          description:true
        }
      }
    )
    if(!category){
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    Object.assign(category, updateCategoryDto);

    return await this.categoryRepository.save(category);

  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
