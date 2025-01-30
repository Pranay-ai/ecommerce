import { CanActivate, ExecutionContext, Injectable, mixin, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";




// @Injectable()
// export class AuthorizeGaurd implements CanActivate{
//     constructor(private reflector:Reflector){}
//     canActivate(context: ExecutionContext): boolean  {
//         const allowedroles= this.reflector.get<string[]>('allowedroles', context.getHandler())
//         const request= context.switchToHttp().getRequest();

//         const result=request?.currentUser?.roles.map((role:string)=>allowedroles.includes(role)).find((val: boolean)=>val===true);

//         if (result) return true;
//         else throw new UnauthorizedException('You are not authorized to access this resource');

        
        
//     }
// }


export const AuthorizeGaurd= (allowedRoles: string[])=> {
            
    class RolesGaurdMixin implements CanActivate{

        canActivate(context: ExecutionContext): boolean  {

            const request= context.switchToHttp().getRequest();

            const result=request?.currentUser?.roles.map((role:string)=>allowedRoles.includes(role)).find((val: boolean)=>val===true);
    
            if (result) return true;
            else throw new UnauthorizedException('You are not authorized to access this resource');

            
        }
    }
    const gaurd=mixin(RolesGaurdMixin);
    return gaurd;
}








