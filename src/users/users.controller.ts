import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignInDto } from './dto/user-signin.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { AuthenticationGaurd } from 'src/utility/gaurds/authentication.gaurd';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { Roles } from 'src/utility/common/user-roles.enum';
import { AuthorizeGaurd } from 'src/utility/gaurds/authorization.gaurd';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}



  @Post('signup')
  signUp(@Body() body:UserSignUpDto): Promise<UserEntity> {
    return this.usersService.signUp(body);
  }

  @Post('signin')
  async signIn(@Body() body:UserSignInDto){

    const user= await  this.usersService.signIn(body);
    const accessToken= await  this.usersService.generateAccessToken(user);

    return {user, accessToken};

  }


  @UseGuards(AuthenticationGaurd, AuthorizeGaurd([Roles.ADMIN]))
  @Get('all')
  findAllUsers(){
    return this.usersService.findAllUsers();
  }


  @UseGuards(AuthenticationGaurd)
  @Get('me')
  getProfile(@CurrentUser() currentUser: UserEntity ){
    return currentUser;
  }

  @Get('byId/:id')
  findUserById(@Param('id') id: number) {
    return this.usersService.findUserById(id) 
  }

 
  
}
