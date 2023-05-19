import { Body, Controller, Post } from '@nestjs/common'
import { TransformImageUseCase } from '../../../usecases/image-usecase'
import { ImageTransformDTO } from '../dtos/image-dto'

@Controller()
export class ImageTransformController {
  constructor(private imageTransformUseCase: TransformImageUseCase) {}

  @Post('/image/save')
  async transform(@Body() data: ImageTransformDTO) {
    const responseImageTransform = await this.imageTransformUseCase.execute(
      data
    )
    return responseImageTransform
  }
}
