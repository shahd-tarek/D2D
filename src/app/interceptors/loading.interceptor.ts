import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  
  // Show the loader when a request starts
  loadingService.show();

  return next(req).pipe(
    finalize(() => {
      // Hide the loader when the request completes, fails, or cancels
      loadingService.hide();
    })
  );
};
