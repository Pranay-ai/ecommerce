import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCategoryDto {

    @IsNotEmpty({message: 'Title cannot be empty'})
    @IsString({message: 'Title must be a string'})
    @MinLength(6, {message: 'Title must be at least 6 characters long'})
    title: string;


    @IsNotEmpty({message: 'Description cannot be empty'})
    @IsString({message: 'Description must be a string'})
    @MinLength(10, {message: 'Description must be at least 10 characters long'})
    description: string;

}
