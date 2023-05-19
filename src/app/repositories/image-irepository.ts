export interface ImageData {
  originalPath: string
  thumbPath: string
  metadata: any
}

export abstract class IImageRepository {
  abstract save(image: ImageData): Promise<void>
}
