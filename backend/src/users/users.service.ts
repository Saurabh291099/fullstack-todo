import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SignUp } from '../auth/auth.entity'; // User entity
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from '../auth/dto/signUp.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(SignUp)
    private readonly userRepository: Repository<SignUp>,
  ) {}

  // Create user (used by AuthService)
  async create(dto: SignupDto): Promise<SignUp> {
    const user = this.userRepository.create(dto);
    return this.userRepository.save(user);
  }

  // Find all users
  async findAll(): Promise<SignUp[]> {
    return this.userRepository.find();
  }

  // Find user by ID
  async findById(id: string): Promise<SignUp> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  // Find user by email
  async findByEmail(email: string): Promise<SignUp | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Update user profile
  async update(id: string, updateData: Partial<SignUp>): Promise<SignUp> {
    const user = await this.findById(id);
    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }

  // Delete user

  async remove(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.userRepository.remove(user);
  }

  
}
