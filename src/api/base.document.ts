import { DocumentBuilder } from '@nestjs/swagger';

export class BaseAPIDocumentation {
  public builder = new DocumentBuilder();

  public initializeOptions() {
    return this.builder
      .setTitle('Dongchin API SERVER')
      .setDescription('Dongchin')
      .setVersion('1.0')
      .setContact(
        'Dongchin',
        'https://github.com/DDD-Community/dongchin-server',
        'amico741@naver.com',
      )
      .build();
  }
}
