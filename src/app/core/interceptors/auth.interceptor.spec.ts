import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { of } from 'rxjs';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    });

    interceptor = TestBed.inject(AuthInterceptor);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should add Authorization header if token is present', () => {
    const mockToken = 'dummyToken';
    sessionStorage.setItem('token', mockToken);

    const httpRequest = new HttpRequest('GET', '/test');

    let handler = {
      handle: jasmine.createSpy('handle').and.returnValue(of(new HttpResponse({ body: 'response' })))
    };

    // Interceptamos el request
    interceptor.intercept(httpRequest, handler as HttpHandler).subscribe();

    expect(handler.handle).toHaveBeenCalledWith(
      jasmine.objectContaining({
        headers: jasmine.objectContaining({
          Authorization: `Bearer ${mockToken}`
        })
      })
    );
  });

  it('should not add Authorization header if no token is present', () => {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');

    const httpRequest = new HttpRequest('GET', '/test');

    let handler = {
      handle: jasmine.createSpy('handle').and.returnValue(of(new HttpResponse({ body: 'response' })))
    };

    // Interceptamos el request
    interceptor.intercept(httpRequest, handler as HttpHandler).subscribe();

    expect(handler.handle).toHaveBeenCalledWith(httpRequest); // No debería haber modificación
  });

  afterEach(() => {
    httpMock.verify();
  });
});
