import { Injectable, NestMiddleware } from "@nestjs/common";
import { isArray } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { PrivateKey, Secret, verify } from "jsonwebtoken";
import { UserEntity } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";


declare global{
    namespace Express{
        interface Request{
            currentUser: UserEntity | null;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware{

    constructor(
        private readonly usersService: UsersService
    ){}

    async use(req: Request, res: Response, next: NextFunction){
        const authHeader= req.headers.authorization || req.headers.Authorization;
        if(!authHeader || isArray(authHeader) || !authHeader.startsWith('Bearer ')){
            req.currentUser=null;
        }
        else{
           try {
             const token= authHeader.split(' ')[1];
             const JWT_SECRET= process.env.JWT_SECRET as Secret
             const {id}= <JwtPayload> verify(token, JWT_SECRET)
             console.log(id);
             const cUser= await this.usersService.findUserById(+id);
             req.currentUser=cUser;
           } catch (error) {
                req.currentUser=null;
                
           }
        }
        next();
    }
}


interface JwtPayload {
    id: string;
    email: string;
}
