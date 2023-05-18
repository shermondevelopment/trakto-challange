import { Injectable } from '@nestjs/common'
import { ImageTransformProperty, TransformImage } from '../domain/image'
import axios from 'axios'

@Injectable()
export class TransformImageUseCase implements TransformImage {
  async execute(imageOptions: ImageTransformProperty) {
    const { image, compress } = imageOptions

    const getImage = await axios.get(image, { responseType: 'arraybuffer' })

    console.log(getImage)
  }
}
