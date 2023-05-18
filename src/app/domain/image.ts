export interface ImageTransformProperty {
  image: string
  compress: number
}

export interface TransformImage {
  execute(imageOptions: ImageTransformProperty): Promise<void>
}
