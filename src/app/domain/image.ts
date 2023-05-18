interface ImageTransformPropery {
  image: string;
  compress: number;
}

export interface TransformImage {
  execute(imageOptions: ImageTransformPropery);
}
