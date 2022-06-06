import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFailResponse, CreateResponse } from 'src/api/entities/response_entities/auth/create.response';
import { DeleteFailResponse, DeleteResponse } from 'src/api/entities/response_entities/auth/delete.response';
import { patchFailByNickResponse, patchFailResponse, patchResponse } from 'src/api/entities/response_entities/auth/patch.response';
import { NickNameCredentialDto } from './dto/nickname-credential.dto';
import { NicknameService } from './nickname.service';

@ApiTags('nickname')
@Controller('nickname')
export class NicknameController {
    constructor(private nicknameService: NicknameService){}

    // PATCH
    @ApiOperation({ summary: "닉네임 수정"})
    @ApiBody({ type: NickNameCredentialDto })
    @ApiResponse({status:404, description:"닉네임 변경 실패: 찾을 수 없는 id", type: patchFailResponse}) // Swagger에 patchFailResponse를 보여줌
    @ApiResponse({status:401, description:"닉네임의 id는 존재하지만 변경하려는 닉네임이 중복", type: patchFailByNickResponse}) // Swagger에 보여질 객체
    @ApiOkResponse({description: "닉네임 변경 성공", type: patchResponse})
    @Patch('/:id') // localhost:3000/auth/:uid 닉네임 조회
    updateNickName(@Param('id', ParseIntPipe) id: number, @Body() nicknameCredentialDto : NickNameCredentialDto) : Promise<{statusCode: number, ok:boolean, error?: string}> { // {uid: uid, nickName: nickName }으로 Return
        return this.nicknameService.updateNickName(id, nicknameCredentialDto);
    };

    //POST
    @ApiOperation({ summary: "닉네임 생성"})
    @ApiBody({ type: NickNameCredentialDto })
    @ApiBadRequestResponse({status: 400, description: "JSON KEY 이름이 잘못되었을 가능성"})
    @ApiResponse({status: 401, description: "실패: 중복된 닉네임", type: CreateFailResponse})
    @ApiCreatedResponse({ status:201, description: "성공", type: CreateResponse})
    @Post('/create') // localhost:3000/auth/create 닉네임 생성
    @UsePipes(ValidationPipe) // 문자열 검사
    createNickName(@Body() nicknameCredentialDto : NickNameCredentialDto): Promise<{statusCode:number, ok: boolean; id?:number; error?: string }> {
        return this.nicknameService.createNickName(nicknameCredentialDto);
    };

    //DELETE
    @ApiOperation({summary: "닉네임 삭제"})
    @ApiResponse({status: 404, description: "실패: 찾을 수 없는 닉네임의 id", type: DeleteFailResponse})
    @ApiOkResponse({status: 200, description: "성공: 닉네임 삭제 성공", type: DeleteResponse})
    @Delete('/:id')
    deleteById(@Param('id', ParseIntPipe) id: number): Promise<{statusCode: number, ok: boolean; error?: string}>{
        return this.nicknameService.deleteById(id);
    };
}
