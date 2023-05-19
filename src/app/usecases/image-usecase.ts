import { Injectable } from '@nestjs/common'
import { ImageTransformProperty, TransformImage } from '../domain/image'
import axios from 'axios'
import * as fs from 'fs'
import * as path from 'path'
import * as sharp from 'sharp'
import { generate } from 'randomstring'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Image } from '../infra/http/schemas/image.schema'

@Injectable()
export class TransformImageUseCase implements TransformImage {
  constructor(
    @InjectModel('Image') private readonly imageModel: Model<Image>
  ) {}

  async execute(imageOptions: ImageTransformProperty) {
    const { image, compress } = imageOptions

    const getImage = await axios.get(image, { responseType: 'arraybuffer' })
    const imageToBuffer = Buffer.from(getImage.data, 'binary')

    const pathImageToSaved = path.join(__dirname, '../../../uploads')

    if (!fs.existsSync(pathImageToSaved)) {
      fs.mkdirSync(pathImageToSaved)
    }

    const fileName = generate()

    const originalPath = path.join(pathImageToSaved, `${fileName}.jpg`)
    const thumbnailPath = path.join(
      `${pathImageToSaved}`,
      `${fileName}_thumb.jpg`
    )

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

    const imageModel = new this.imageModel({
      originalPath,
      thumbPath: resizedImagePath,
      metadata
    })

    await imageModel.save()

    return {
      localpath: {
        original: originalPath,
        thumb: resizedImagePath
      },
      metadata: metadata
    }
  }
}
