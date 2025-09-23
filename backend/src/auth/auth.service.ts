import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { SignUp } from './auth.entity';
import { SignupDto } from './dto/signUp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(SignUp)
    private readonly userRepository: Repository<SignUp>,
    private readonly jwtService: JwtService,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  async create(dto: SignupDto): Promise<Partial<SignUp>> {
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

  // Login Method
  async login(dto: LoginDto) {
    const { email, password } = dto;

    // my is first step is to find the user

    const user = await this.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    // here i am comparing password

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    // here i am generating jwt token
    const payload = { sub: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

    // here i am returning safe user info + unique token
    user.refreshToken = refresh_token;
    await this.userRepository.save(user);

    return { access_token, refresh_token };

    
  }

  async refreshToken(oldToken: string) {
    const decoded = this.jwtService.verify(oldToken);
    const user = await this.userRepository.findOne({ where: { id: decoded.sub } });

    if (!user || user.refreshToken !== oldToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = { sub: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload, { expiresIn: '15m' });
    return { access_token };
  }



  // LogOut Password
  async logout(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    user.refreshToken = undefined;
    await this.userRepository.save(user);
    return { success: true, message: 'Logged out' };
  }

  // Reset password
  async resetPassword(userId: string, newPassword: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await this.userRepository.save(user);
    return { success: true, message: 'Password updated' };
  }
}
