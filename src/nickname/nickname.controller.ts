import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responseDto, responseFailDto } from 'src/api/globalDTO';
import { NickNameCredentialDto } from './dto/nickname-credential.dto';
import { NicknameService } from './nickname.service';

@ApiTags('nicknames')
@Controller('nicknames')
export class NicknameController {
    constructor(private nicknameService: NicknameService){}

    // PATCH
    @ApiOperation({ summary: "닉네임 수정 API"})
    @ApiBody({ type: NickNameCredentialDto })
    @ApiResponse({status:404, description:"닉네임 변경 실패: 찾을 수 없는 id", type: responseFailDto}) // Swagger에 patchFailResponse를 보여줌
    @ApiBadRequestResponse({status:401, description:"닉네임의 id는 존재하지만 변경하려는 닉네임이 중복", type: responseFailDto}) // Swagger에 보여질 객체
    @ApiOkResponse({description: "닉네임 변경 성공", type: responseDto})
    @Patch('/:id') // localhost:3000/auth/:uid 닉네임 조회
    updateNickName(@Param('id', ParseIntPipe) id: number, @Body() nicknameCredentialDto : NickNameCredentialDto) : Promise<any> {
        return this.nicknameService.updateNickName(id, nicknameCredentialDto);
    };

    //POST
    @ApiOperation({ summary: "닉네임 생성 API"})
    @ApiBody({ type: NickNameCredentialDto })
    @ApiBadRequestResponse({status: 400, description: "JSON KEY 이름이 잘못되었을 가능성"})
    @ApiResponse({status: 401, description: "실패: 중복된 닉네임", type: responseFailDto})
    @ApiCreatedResponse({ status:201, description: "성공", type: responseDto})
    @Post() // localhost:3000/auth/create 닉네임 생성
    @UsePipes(ValidationPipe) // 문자열 검사
    createNickName(@Body() nicknameCredentialDto : NickNameCredentialDto): Promise<any> {
        return this.nicknameService.createNickName(nicknameCredentialDto);
    };

    //GET
    @ApiOperation({ summary: "닉네임 중복체크 API"})
    @ApiOkResponse({description: "닉네임 중복 체크"})
    @Get()
    @UsePipes(ValidationPipe)
    checkValidation(@Query('nickName') nickName: String): Promise<any> {
        return this.nicknameService.checkValidation(nickName);
    }

    //DELETE
    @ApiOperation({summary: "닉네임 삭제 API"})
    @ApiResponse({status: 404, description: "실패: 찾을 수 없는 닉네임의 id", type: responseFailDto})
    @ApiOkResponse({status: 200, description: "성공: 닉네임 삭제 성공", type: responseDto})
    @Delete('/:id')
    deleteById(@Param('id', ParseIntPipe) id: number): Promise<any>{
        return this.nicknameService.deleteById(id);
    };
}
