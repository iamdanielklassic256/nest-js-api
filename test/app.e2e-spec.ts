import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from '../src/auth/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDB();
    pactum.request.setBaseUrl('http://localhost:3333');
  });
  describe('Auth', () => {
    const dto: AuthDto = {
      email: "okumucomboni@gmail.com",
      password: "Test@1234"
    }
    describe('Signup', () => {
      it('should signup', () => {
        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201);
      })
    })
    describe('Signin', () => {
      it('should signin', () => {
        return pactum.spec().post('/auth/signin').withBody(dto).expectStatus(200);
      })
    })
  });
  describe('User', () => {
    describe('Get Me', () => {

    })
    describe('Edit Me', () => {

    })

  });
  describe('Bookmarks', () => {
    describe('Create Bookmark', () => {

    })
    describe('Get Bookmarks', () => {

    })
    describe('Get Bookmark By Id', () => {

    })
    describe('Edit Bookmark', () => {

    })
    describe('Delete Bookmark', () => {

    })

  });
});
