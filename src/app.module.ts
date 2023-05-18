import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ImageTransformController } from './app/infra/http/controller/image-controler'
import { TransformImageUseCase } from './app/usecases/image-usecase'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/trakto')
  ],
  controllers: [ImageTransformController],
  providers: [TransformImageUseCase]
})
export class AppModule {}
