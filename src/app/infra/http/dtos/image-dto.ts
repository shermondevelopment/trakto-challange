import { IsString, IsNotEmpty, IsNumber, IsUrl } from 'class-validator'

export class ImageTransformDTO {
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  image: string
  @IsNumber()
  @IsNotEmpty()
  compress: number
}
