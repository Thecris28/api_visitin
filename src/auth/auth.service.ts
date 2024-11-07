import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { hashSync, compareSync } from 'bcrypt';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto ) {

    try {

      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create( {
        ...userData,
        password: hashSync( password, 10 ),
      } );

      await this.userRepository.save( user );
      delete user.password;

      return {
        ok: true,
        user};
      
    } catch (error) {
      this.handleErros(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({ 
      where: { email },
      select: { id: true, email: true, password: true, name: true, lastname: true, rol: true },
     });

    if ( !user )
      throw new UnauthorizedException('Credentials are not valid (email)');

    if ( !compareSync( password, user.password ) )
      throw new UnauthorizedException('Credentials are not valid (password)');

    return {
      response: 'login ok',
      user};
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }
  private handleErros(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    // this.logger.error(error);
  }

  
}
