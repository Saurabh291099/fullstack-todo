import {
  Controller,
  Post,
  Body,
  UsePipes,
  HttpCode,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async signUp(@Body() SignupDto: SignupDto) {
    console.log('Create,', SignupDto);
    const user = await this.authService.create(SignupDto);
    return { success: true, user };
  }

  @Post('login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }


  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req) {
    return this.authService.logout(req.user.userId);
  }

  // ✅ Reset password route
  @Post('reset-password')
  @UseGuards(JwtAuthGuard)
  async resetPassword(@Req() req, @Body() body: { newPassword: string }) {
    return this.authService.resetPassword(req.user.userId, body.newPassword);
  }
}
