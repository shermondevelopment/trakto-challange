import { Injectable } from '@nestjs/common'
import { ImageTransformProperty, TransformImage } from '../domain/image'
import axios from 'axios'
import * as fs from 'fs'
import * as path from 'path'
import * as sharp from 'sharp'

@Injectable()
export class TransformImageUseCase implements TransformImage {
  async execute(imageOptions: ImageTransformProperty) {
    const { image, compress } = imageOptions

    const getImage = await axios.get(image, { responseType: 'arraybuffer' })
    const imageToBuffer = Buffer.from(getImage.data)

    const pathImageToSaved = path.join(__dirname, '../../../uploads')

    const originalPath = path.join(pathImageToSaved, 'original.jpg')
    const thumbnailPath = path.join(pathImageToSaved, 'thumb.jpg')

    /* saving original image */
    fs.writeFileSync(originalPath, imageToBuffer)

    /* save image thumbnail compact */
    await sharp(imageToBuffer)
      .resize(720, 720, { fit: 'inside' })
      .jpeg({
        quality: Math.round(compress * 100)
      })
      .toFile(thumbnailPath)
  }
}
