import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../src/app.module'
import * as request from 'supertest'

describe('TransformImageContoller', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('/image/save', () => {
    it('should transform and compress the image with dimension smaller than 720 pixel', async () => {
      const imageOptions = {
        image: 'https://blog-mkt.com/wp-content/uploads/2011/01/online.jpg',
        compress: 0.8
      }

      const response = await request(app.getHttpServer())
        .post('/image/save')
        .send(imageOptions)
      const { localpath, metadata } = response.body

      expect(localpath.original).toMatch(/\\uploads\\.+\.jpg/)
      expect(localpath.thumb).toMatch(/\\uploads\\.+\.jpg/)
      expect(localpath.thumb).toEqual(localpath.original)
      expect(metadata).toBeDefined()
    })
  })
})
