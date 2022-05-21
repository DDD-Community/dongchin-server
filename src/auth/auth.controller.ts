import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateResponse } from 'src/api/entities/response_entities/auth/create.response';
import { queryResponse } from 'src/api/entities/response_entities/auth/query.response';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/user-credential.dto';
import { User } from './user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){} // service 위한 변수

    @ApiOperation({ summary: '내닉네임 조회'})
    @ApiResponse({description: '조회', type: queryResponse})
    @Get('/:uid') // localhost:3000/auth/:uid 닉네임 조회
    getNickNameByUid(@Param() uid : string) : Promise<User> { // {uid: uid, nickName: nickName }으로 Return
        return this.authService.getNickNameByUid(uid);
    }
    
    @ApiOperation({ summary: '내닉네임 생성'})
    @ApiBody({ type: UserCredentialDto })
    @ApiCreatedResponse({ description: '성공', type: CreateResponse})
    @Post('/create') // localhost:3000/auth/create 닉네임 생성
    @UsePipes(ValidationPipe) // 문자열 검사
    createNickName(@Body() userCredentialDto : UserCredentialDto): Promise<{ok: boolean; error?: string }> {
        return this.authService.createNickName(userCredentialDto);
    }
}
