import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserSignUpDto{

    @IsNotEmpty({message:'Name is required'})
    @IsString() 
    name:string;

    @IsNotEmpty({message:'Email is required'})
    @IsString()
    email:string;

    @IsNotEmpty({message:'Password is required'})
    @MinLength(6,{message:'Password must be at least 6 characters'})
    @IsString()
    password:string;
}