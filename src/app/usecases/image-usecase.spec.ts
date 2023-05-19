import { TransformImageUseCase } from './image-usecase'
import { IImageRepository } from '../repositories/image-irepository'
import { ImageTransformResponse } from '../domain/image'

jest.mock('axios', () => ({
  default: {
    get: jest
      .fn()
      .mockResolvedValue({ data: Buffer.from('dummyImageData', 'binary') })
  }
}))

jest.mock('fs', () => ({
  existsSync: jest.fn().mockReturnValue(true),
  mkdirSync: jest.fn(),
  writeFileSync: jest.fn(),
  copyFileSync: jest.fn()
}))

jest.mock('sharp', () => {
  const resizeMock = jest.fn().mockReturnThis()
  const toBufferMock = jest
    .fn()
    .mockResolvedValue(Buffer.from('dummyResizedImage', 'binary'))
  const jpegMock = jest.fn().mockReturnThis()
  const metadataMock = jest.fn().mockResolvedValue({ width: 800, height: 600 })

  return jest.fn().mockImplementation(() => ({
    resize: resizeMock,
    toBuffer: toBufferMock,
    jpeg: jpegMock,
    metadata: metadataMock
  }))
})

describe('TransformImageUseCase', () => {
  let transformImageUseCase: TransformImageUseCase
  let imageRepositoryMock: IImageRepository

  beforeEach(() => {
    imageRepositoryMock = {
      save: jest.fn()
    }

    transformImageUseCase = new TransformImageUseCase(imageRepositoryMock)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should transform the image and save it', async () => {
    const imageOptions = {
      image: 'http://example.com/image.jpg',
      compress: 0.8
    }

    const result = (await transformImageUseCase.execute(
      imageOptions
    )) as ImageTransformResponse

    expect(imageRepositoryMock.save).toHaveBeenCalled()

    expect(result).toHaveProperty('localpath')
    expect(result).toHaveProperty('metadata')
    expect(result.localpath).toHaveProperty('original')
    expect(result.localpath).toHaveProperty('thumb')
  })
})
