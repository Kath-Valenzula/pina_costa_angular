import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { UserService, Usuario } from './user.service';

describe('AuthService', () => {
  let service: AuthService;
  let userSvcSpy: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    userSvcSpy = jasmine.createSpyObj('UserService', ['find']);
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userSvcSpy }
      ]
    });
    localStorage.clear();
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login with valid credentials', () => {
    const user: Usuario = { username: 'test', password: '123', role: 'usuario' };
    userSvcSpy.find.and.returnValue(user);
    const result = service.login('test', '123');
    expect(result).toBeTrue();
    expect(service.getCurrent()).toEqual(user);
    expect(localStorage.getItem('currentUser')).toBe(JSON.stringify(user));
  });

  it('should reject invalid credentials', () => {
    const user: Usuario = { username: 'test', password: '123', role: 'usuario' };
    userSvcSpy.find.and.returnValue(user);
    const result = service.login('test', 'wrong');
    expect(result).toBeFalse();
    expect(service.getCurrent()).toBeNull();
    expect(localStorage.getItem('currentUser')).toBeNull();
  });

  it('should logout and clear session', () => {
    const user: Usuario = { username: 'test', password: '123', role: 'usuario' };
    userSvcSpy.find.and.returnValue(user);
    service.login('test', '123');
    service.logout();
    expect(service.getCurrent()).toBeNull();
    expect(localStorage.getItem('currentUser')).toBeNull();
  });
});