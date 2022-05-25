import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateResponse } from 'src/api/entities/response_entities/auth/create.response';
import { patchResponse } from 'src/api/entities/response_entities/auth/patch.response';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/user-credential.dto';
import { User } from './user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){} // service 위한 변수

    @ApiOperation({ summary: '닉네임 수정'})
    @ApiBody({ type: UserCredentialDto })
    @ApiResponse({description: '수정', type: patchResponse})
    @Patch('/:id') // localhost:3000/auth/:uid 닉네임 조회
    updateNickName(
        @Param('id', ParseIntPipe) id: number,
        @Body() userCredentialDto : UserCredentialDto) : Promise<{ok:boolean}> { // {uid: uid, nickName: nickName }으로 Return
        return this.authService.updateNickName(id, userCredentialDto);
    }
    
    @ApiOperation({ summary: '닉네임 생성'})
    @ApiBody({ type: UserCredentialDto })
    @ApiCreatedResponse({ description: '성공', type: CreateResponse})
    @Post('/create') // localhost:3000/auth/create 닉네임 생성
    @UsePipes(ValidationPipe) // 문자열 검사
    createNickName(@Body() userCredentialDto : UserCredentialDto): Promise<{ok: boolean; id?:number; error?: string }> {
        return this.authService.createNickName(userCredentialDto);
    }
}
