import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const token: string | null = localStorage.getItem('token');
  if (token) {
    req = req.clone({setHeaders: { authtoken: `Bearer ${token}`}});
  }
  return next(req);
};
