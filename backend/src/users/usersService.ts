import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


  findAll() {
    return this.userRepository.find();
  }


  async create(dto: CreateUserDto): Promise<Partial<User>> {
    const { name, email, phoneNumber, password, gender } = dto;

    // here i am hashing password

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      name,
      email,
      password: hashed,
      phoneNumber,
      gender,
    });

    try {
      const saved = await this.userRepository.save(user);

      const { password: _, ...result } = saved;
      return result;
    } catch (err: any) {
      if (err.code === '23505') {
        throw new ConflictException('Email already exists.');
      }
      throw new InternalServerErrorException();
    }
  }

  // optional helper : find by email

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
