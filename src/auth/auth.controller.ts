import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/user-credential.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){} // service 위한 변수

    @Get('/:uid') // 닉네임 조회
    getNickNameByUid(@Param() uid : string) : Promise<string> {
        return this.authService.getNickNameByUid(uid);
    }
    
    @Post('/signup') // 닉네임 생성
    @UsePipes(ValidationPipe) // 문자열 검사
    signUp(@Body() userCredentialDto : UserCredentialDto): Promise<string> {
        return this.authService.signUp(userCredentialDto);
    }
}
