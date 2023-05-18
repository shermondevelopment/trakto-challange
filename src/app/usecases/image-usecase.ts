import { Injectable } from '@nestjs/common'
import { ImageTransformProperty, TransformImage } from '../domain/image'

@Injectable()
export class TransformImageUseCase implements TransformImage {
  execute(imageOptions: ImageTransformProperty) {
    throw new Error()
  }
}
