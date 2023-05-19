import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Image } from '../../http/schemas/image.schema'
import {
  IImageRepository,
  ImageData
} from 'src/app/repositories/image-irepository'

export class ImageRepository implements IImageRepository {
  constructor(
    @InjectModel('Image') private readonly imageModel: Model<Image>
  ) {}
  async save(image: ImageData): Promise<void> {
    const imageModel = new this.imageModel(image)

    await imageModel.save()
  }
}
