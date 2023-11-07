import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { SignInDto } from './dto/signin.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: DeepMocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    })
      .useMocker(createMock)
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should successfully sign in an user', async () => {
      authService.signIn.mockResolvedValue('jwt-token');

      await expect(controller.signIn(new SignInDto())).resolves.toEqual({
        statusCode: 200,
        accessToken: 'jwt-token',
      });
    });
  });

  describe('signInAdmin', () => {
    it('should successfully sign in an admin', async () => {
      authService.signInAdmin.mockResolvedValue('jwt-token');

      await expect(controller.signInAdmin(new SignInDto())).resolves.toEqual({
        statusCode: 200,
        accessToken: 'jwt-token',
      });
    });
  });
});
