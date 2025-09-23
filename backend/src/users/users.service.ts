import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SignUp } from '../auth/auth.entity'; // User entity
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from '../auth/dto/signUp.dto';
import { UserDto } from './user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(SignUp)
    private readonly userRepository: Repository<SignUp>,
  ) {}

  // Create user (used by AuthService)
  async create(dto: SignupDto): Promise<UserDto> {
    const user = this.userRepository.create(dto);
    const savedUser = await this.userRepository.save(user);
    const { password, ...result } = savedUser;
     return result;
  }

  // Find all users
 async findAll(): Promise<UserDto[]> {
  const users = await this.userRepository.find();
  return users.map(({ password, ...user }) => user); 
}

  // Find user by ID
  async findById(id: string): Promise<UserDto> {
  const user = await this.userRepository.findOne({ where: { id } });
  if (!user) throw new NotFoundException(`User with ID ${id} not found`);
  const { password, ...result } = user;
  return result;
}


  // Find user by email
  async findByEmail(email: string): Promise<UserDto | null> {
  const user = await this.userRepository.findOne({ where: { email } });
  if (!user) return null;
  const { password, ...result } = user;
  return result;
}

  // Update user profile
  async update(id: string, updateData: Partial<UserDto>): Promise<UserDto> {
  const user = await this.userRepository.findOne({ where: { id } });
  if (!user) throw new NotFoundException(`User with ID ${id} not found`);

  Object.assign(user, updateData); // merge updates
  const updated = await this.userRepository.save(user);
  const { password, ...result } = updated;
  return result;
}

  // Delete user
 async remove(id: string): Promise<void> {
  const user = await this.userRepository.findOne({ where: { id } });
  if (!user) throw new NotFoundException(`User with ID ${id} not found`);

  await this.userRepository.remove(user);
}

}
