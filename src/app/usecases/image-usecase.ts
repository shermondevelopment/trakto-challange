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
    const imageToBuffer = Buffer.from(getImage.data, 'binary')

    const pathImageToSaved = path.join(__dirname, '../../../uploads')

    const originalPath = path.join(pathImageToSaved, 'original.jpg')
    const thumbnailPath = path.join(`${pathImageToSaved}`, 'thumb.jpg')

    /* saving original image */
    fs.writeFileSync(originalPath, imageToBuffer)

    /* */
    const metadata = await sharp(imageToBuffer).metadata()
    const { width, height } = metadata

    let resizedImage
    let resizedImagePath

    /*
    /* Se a imagem tiver dimensões  maiores que 720px em qualquer direção
    /* ela será redimensionada proporcionalmente para se ajustar dentro de uma
    /* área de 720x720 pixels.
    /*
    /* se a imagem original for menor que 720px em ambas dimensões, uma copia
    /* da imagem original será feita.
    */
    if (width > height && width > 720) {
      const newHeight = Math.round((720 / width) * height)
      resizedImage = await sharp(imageToBuffer)
        .resize(720, newHeight)
        .toBuffer()
      resizedImagePath = thumbnailPath
    } else if (height > width && height > 720) {
      const newWidth = Math.round((720 / height) * width)
      resizedImage = await sharp(imageToBuffer).resize(newWidth, 720).toBuffer()
      resizedImagePath = thumbnailPath
    } else {
      fs.copyFileSync(originalPath, thumbnailPath)
      resizedImagePath = originalPath
    }

    /* salva imagem redimensionada, aplicando a compressão */

    if (resizedImage) {
      const compressedImage = await sharp(resizedImage)
        .jpeg({ quality: Math.round(compress * 100) })
        .toBuffer()
      fs.writeFileSync(resizedImagePath, compressedImage)
    }
  }
}
