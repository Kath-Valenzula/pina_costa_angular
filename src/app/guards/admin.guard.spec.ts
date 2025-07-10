import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    guard = TestBed.inject(AdminGuard);
    router = TestBed.inject(Router);
    localStorage.clear();
  });

  it('should allow admin user', () => {
    localStorage.setItem('usuario', JSON.stringify({ rol: 'admin' }));
    expect(guard.canActivate()).toBeTrue();
  });

  it('should redirect normal user to /perfil', () => {
    localStorage.setItem('usuario', JSON.stringify({ email: 'user@example.com' }));
    spyOn(router, 'navigate');
    expect(guard.canActivate()).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/perfil']);
  });

  it('should redirect unauthenticated user to /login', () => {
    spyOn(router, 'navigate');
    expect(guard.canActivate()).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
