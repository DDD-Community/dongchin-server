import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/user-credential.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){} // service 위한 변수

    @Get('/:uid') // localhost:3000/auth/:uid 닉네임 조회
    getNickNameByUid(@Param() uid : string) : Promise<User> { // {uid: uid, nickName: nickName }으로 Return
        return this.authService.getNickNameByUid(uid);
    }
    
    @Post('/create') // localhost:3000/auth/create 닉네임 생성
    @UsePipes(ValidationPipe) // 문자열 검사
    createNickName(@Body() userCredentialDto : UserCredentialDto): Promise<string> {
        return this.authService.createNickName(userCredentialDto);
    }
}
