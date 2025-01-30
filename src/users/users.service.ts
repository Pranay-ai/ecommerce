import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignUpDto } from './dto/user-signup.dto'; 
import { hash, compare } from 'bcrypt';
import { UserSignInDto } from './dto/user-signin.dto';
import { PrivateKey, sign } from 'jsonwebtoken';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async signUp(body: UserSignUpDto): Promise<UserEntity> {
    const userExists= await  this.findByEmail(body.email);
    if(userExists){
      throw new BadRequestException('User with this email already exists');
    }

    body.password= await  hash(body.password, 10);
    
    const user = this.usersRepository.create(body);
    return await  this.usersRepository.save(user);
  }


  async signIn(body: UserSignInDto){

    const userExists= await  this.usersRepository.createQueryBuilder('users')
                      .addSelect('users.password')
                      .where('users.email = :email',{email:body.email})
                      .getOne();
    if(!userExists){
      throw new BadRequestException('User with this email does not exist');
    }
    else{
      const isPasswordMatched= await compare(body.password, userExists.password);
      if(!isPasswordMatched){
        throw new BadRequestException('Password is incorrect');
      }
      else{
        const {password, ...user} = userExists
        return user;
      }
    }

  }


  async generateAccessToken(user:UserEntity){

    const payload= {id:user.id, email:user.email};
    const JWT_SECRET=process.env.JWT_SECRET as PrivateKey;
    const accessToken= sign(payload, JWT_SECRET, {expiresIn:'1h'});
    return accessToken;
  }

  async findAllUsers() {
    
    return await this.usersRepository.find()

  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }


  async findUserById(id: number) {
    const user = await this.usersRepository.findOneBy({id});
    if (!user){
      throw new NotFoundException('User not found');
    }
    return user;
  }

  


}
