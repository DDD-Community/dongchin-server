import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NicknameController } from './nickname.controller';
import { NicknameService } from './nickname.service';
import { Nickname } from 'src/entity/nickname.entity';
import { NicknameRepository } from 'src/repository/nickname.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Nickname, NicknameRepository])],
  controllers: [NicknameController],
  providers: [NicknameService],
})
export class NicknameModule {}
