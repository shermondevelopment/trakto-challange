export interface ImageTransformProperty {
  image: string
  compress: number
}

export interface ImageTransformResponse {
  localpath: {
    original: string
    thumb: string
  }
}

export interface TransformImage {
  execute(imageOptions: ImageTransformProperty): Promise<ImageTransformResponse>
}
