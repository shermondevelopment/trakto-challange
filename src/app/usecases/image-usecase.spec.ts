/* eslint-disable @typescript-eslint/no-var-requires */
import { TransformImageUseCase } from './image-usecase'
import { IImageRepository } from '../repositories/image-irepository'
import { ImageTransformResponse } from '../domain/image'
import axios from 'axios'

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

  it('should resize the image if its dimensions exceed 720px', async () => {
    const imageOptions = {
      image: 'http://myimage.com/image.jpg',
      compress: 0.8
    }

    await transformImageUseCase.execute(imageOptions)

    expect(require('sharp')).toHaveBeenCalledWith(
      Buffer.from('dummyImageData', 'binary')
    )
    expect(require('sharp')().resize).toHaveBeenCalledWith(720, 540)
    expect(require('sharp')().toBuffer).toHaveBeenCalled()
  })

  it('should return an error if the axios request fails', async () => {
    const imageOptions = {
      image: 'https://myimage.com/image.jpg',
      compress: 0.8
    }

    jest
      .spyOn(axios, 'get')
      .mockRejectedValue(new Error('Failed to fetch image'))

    const expectedError = {
      errors: [
        {
          code: 500,
          message: 'Error: Failed to fetch image'
        }
      ]
    }

    const result = await transformImageUseCase.execute(imageOptions)

    expect(result).toEqual(expectedError)
  })
})
