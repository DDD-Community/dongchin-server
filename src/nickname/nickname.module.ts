import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NicknameController } from './nickname.controller';
import { NicknameRepository } from './nickname.repository';
import { NicknameService } from './nickname.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([NicknameRepository]),
  ],
  controllers: [NicknameController],
  providers: [NicknameService]
})
export class NicknameModule {}
