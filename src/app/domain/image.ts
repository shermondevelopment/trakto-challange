export interface ImageTransformProperty {
  image: string
  compress: number
}

export interface ImageTransformResponse {
  localpath: {
    original: string
    thumb: string
  }
  metadata: any
}

export interface ImageErrorBadRequest {
  errors: [
    {
      code: number
      message: string
    }
  ]
}

export interface TransformImage {
  execute(
    imageOptions: ImageTransformProperty
  ): Promise<ImageTransformResponse | ImageErrorBadRequest>
}
