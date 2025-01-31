import { IsArray, IsDecimal, IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from "class-validator";
import { CategoryEntity } from "src/categories/entities/category.entity";

export class CreateProductDto {

@IsNotEmpty({ message: 'Title is required' })
@IsString({ message: 'Title must be a string' })
title: string;


@IsNotEmpty({ message: 'Description is required' })
@IsString({ message: 'Description must be a string' })
@MinLength(10, { message: 'Description must be at least 10 characters long' })
description: string;


@IsNotEmpty({ message: 'Price is required' })
@IsNumber({maxDecimalPlaces:2}, { message: 'Price must be a number' })
@IsPositive({message: 'Price  must be a positive number'})
price: number;

@IsNotEmpty({message: 'Stock is required'})
@IsNumber({}, { message: 'Stock Must Be a Number  ' })
@IsPositive({message: 'Stock must be a positive number'})
stock: number;

@IsNotEmpty({message: 'Image is required'})
@IsArray({message: 'Image must be a string array'})
image: string[];

@IsNotEmpty({message: 'Category is required'})
@IsNumber({}, { message: 'Category must be a number' })
categoryId: number;



}
