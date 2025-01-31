import { Injectable, NotFoundException, Response } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto, currentUser: UserEntity) {
    const category = await this.categoryService.findOne(
      +createProductDto.categoryId,
    );
    const product = this.productRepository.create(createProductDto);
    product.category = category;
    product.addedBy = currentUser;
    return await this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find({
      relations: ['category'],
      select: {
        title: true,
        description: true,
        price: true,
        category: {
          title: true,
        },
      },
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: {
        category: true,
        addedBy: true,
      },
      select: {
        category: {
          id: true,
          title: true,
        },
        addedBy: {
          id: true,
          name: true,
          email: true,
        },
        id: true,
        title: true,
        description: true,
        price: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    } else {
      return product;
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    currentUser: UserEntity,
  ) {
    
    
    const product = await this.productRepository.findOneBy({ id });


    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    } 
    Object.assign(product, updateProductDto);
    product.addedBy = currentUser;
    const categoryId=updateProductDto.categoryId;
    if(categoryId){
      const category = await this.categoryService.findOne(+categoryId)
      if(category){
        product.category = category;
      }
      else{
        throw new NotFoundException(`Category with id ${categoryId} not found`);
      }
    }

    return await this.productRepository.save(product)

  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
