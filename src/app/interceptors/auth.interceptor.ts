import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();

  let authReq = req;
  const isPublicEndpoint = 
    req.url.includes('/api/Auth/login') ||
    req.url.includes('/api/Auth/register') ||
    req.url.includes('/api/auth/verify-magic-token') ||
    req.url.includes('/api/Auth/verify-magic-token') ||
    req.url.includes('/api/Auth/send-otp') ||
    req.url.includes('/api/Auth/verify-otp') ||
    req.url.includes('/api/Auth/forget-password');

  // Don't add token if it's a public endpoint, if it's already there, or if token is not available
  if (token && !isPublicEndpoint && !req.headers.has('Authorization')) {
    authReq = addTokenHeader(req, token);
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !req.url.includes('/api/Auth/login') &&
        !req.url.includes('/api/Auth/refresh-token')
      ) {
        return handle401Error(authReq, next, authService);
      }
      return throwError(() => error);
    })
  );
};

function addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
  return request.clone({
    headers: request.headers.set('Authorization', `Bearer ${token}`),
  });
}

function handle401Error(
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  authService: AuthService
): Observable<HttpEvent<any>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    const refreshToken = authService.getRefreshToken();
    if (refreshToken) {
      return authService.refreshToken(refreshToken).pipe(
        switchMap((res) => {
          isRefreshing = false;
          // Extract from the envelope wrapper (.value) if present
          const val = (res as any).value || (res as any).Value || res;
          const tokenVal = val.accessToken || val.AccessToken;
          const refreshVal = val.refreshToken || val.RefreshToken;
          authService.setTokens(tokenVal, refreshVal);
          refreshTokenSubject.next(tokenVal);
          return next(addTokenHeader(request, tokenVal));
        }),
        catchError((err) => {
          isRefreshing = false;
          authService.clearTokens();
          return throwError(() => err);
        })
      );
    }
  }

  return refreshTokenSubject.pipe(
    filter((token) => token !== null),
    take(1),
    switchMap((jwt) => next(addTokenHeader(request, jwt!)))
  );
}
