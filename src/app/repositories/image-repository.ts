interface ImageData {
  originalPath: string
  thumbnailPath: string
  metadata: string
}

export abstract class ImageRepository {
  abstract save(image: ImageData): Promise<void>
}
