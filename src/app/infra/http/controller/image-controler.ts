import { Body, Controller, Post } from '@nestjs/common'
import { TransformImageUseCase } from 'src/app/usecases/image-usecase'

@Controller()
export class ImageTransformController {
  constructor(private imageTransformUseCase: TransformImageUseCase) {}

  @Post('/api/image')
  async transform(@Body() data: any) {
    console.log(data)
  }
}
