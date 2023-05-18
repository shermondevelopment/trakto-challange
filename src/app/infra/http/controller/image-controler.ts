import { Body, Controller, Post } from '@nestjs/common'
import { TransformImageUseCase } from 'src/app/usecases/image-usecase'
import { ImageTransformDTO } from '../dtos/image-dto'

@Controller()
export class ImageTransformController {
  constructor(private imageTransformUseCase: TransformImageUseCase) {}

  @Post('/api/image')
  async transform(@Body() data: ImageTransformDTO) {
    await this.imageTransformUseCase.execute(data)
  }
}
