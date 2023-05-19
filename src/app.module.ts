import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ImageTransformController } from './app/infra/http/controller/image-controler'
import { TransformImageUseCase } from './app/usecases/image-usecase'
import { ImageSchema } from './app/infra/http/schemas/image.schema'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    MongooseModule.forRoot('mongodb://trakto:trakto_pass@localhost:27017'),
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }])
  ],
  controllers: [ImageTransformController],
  providers: [TransformImageUseCase]
})
export class AppModule {}
