import { ImageTransformProperty, TransformImage } from '../domain/image'

export class TransformImageUseCase implements TransformImage {
  execute(imageOptions: ImageTransformProperty) {
    throw new Error()
  }
}
