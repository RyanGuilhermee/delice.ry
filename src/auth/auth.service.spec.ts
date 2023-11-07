import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: DeepMocked<UsersService>;
  let jwtService: DeepMocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should successfully sign in an user', async () => {
      usersService.findOneByEmail.mockResolvedValueOnce({
        id: '123',
        name: 'test',
        email: 'test@email',
        password: 'sjndajsn18h73y29377fhgd',
        is_admin: false,
      });

      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));

      jwtService.signAsync.mockResolvedValueOnce('jwt-token');

      await expect(service.signIn('test@email', '12345678')).resolves.toBe(
        'jwt-token',
      );
    });

    it('should throw an exception if user email is wrong', async () => {
      usersService.findOneByEmail.mockResolvedValueOnce(null);

      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(false));

      await expect(
        service.signIn('test2@email', '12345678'),
      ).rejects.toBeInstanceOf(UnauthorizedException);

      await expect(service.signIn('test2@email', '12345678')).rejects.toThrow(
        'User email or pessword wrong',
      );
    });

    it('should throw an exception if user password is wrong', async () => {
      usersService.findOneByEmail.mockResolvedValueOnce({
        id: '123',
        name: 'test',
        email: 'test@email',
        password: 'sjndajsn18h73y29377fhgd',
        is_admin: false,
      });

      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(false));

      await expect(
        service.signIn('test@email', '123456789'),
      ).rejects.toBeInstanceOf(UnauthorizedException);

      await expect(service.signIn('test@email', '123456789')).rejects.toThrow(
        'User email or pessword wrong',
      );
    });
  });

  describe('signInAdmin', () => {
    it('should successfully sign in an admin', async () => {
      usersService.findOneByEmail.mockResolvedValueOnce({
        id: '123',
        name: 'test',
        email: 'test@email',
        password: 'sjndajsn18h73y29377fhgd',
        is_admin: true,
      });

      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));

      jwtService.signAsync.mockResolvedValueOnce('jwt-token');

      await expect(service.signInAdmin('test@email', '12345678')).resolves.toBe(
        'jwt-token',
      );
    });

    it('should throw an exception if admin email is wrong', async () => {
      usersService.findOneByEmail.mockResolvedValueOnce(null);

      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(false));

      await expect(
        service.signInAdmin('test2@email', '12345678'),
      ).rejects.toBeInstanceOf(UnauthorizedException);

      await expect(
        service.signInAdmin('test2@email', '12345678'),
      ).rejects.toThrow('User email or pessword wrong');
    });

    it('should throw an exception if admin password is wrong', async () => {
      usersService.findOneByEmail.mockResolvedValueOnce({
        id: '123',
        name: 'test',
        email: 'test@email',
        password: 'sjndajsn18h73y29377fhgd',
        is_admin: true,
      });

      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(false));

      await expect(
        service.signInAdmin('test@email', '123456789'),
      ).rejects.toBeInstanceOf(UnauthorizedException);

      await expect(
        service.signInAdmin('test@email', '123456789'),
      ).rejects.toThrow('User email or pessword wrong');
    });

    it('should throw an exception if user is not admin', async () => {
      usersService.findOneByEmail.mockResolvedValue({
        id: '123',
        name: 'test',
        email: 'test@email',
        password: 'sjndajsn18h73y29377fhgd',
        is_admin: false,
      });

      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));

      await expect(
        service.signInAdmin('test@email', '12345678'),
      ).rejects.toBeInstanceOf(UnauthorizedException);

      await expect(
        service.signInAdmin('test@email', '12345678'),
      ).rejects.toThrow('User is not admin');
    });
  });
});
