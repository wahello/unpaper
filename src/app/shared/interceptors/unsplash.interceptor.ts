import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

const { unsplashToken, unsplashURL } = environment;

@Injectable()
export class UnsplashInterceptor implements HttpInterceptor {
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(request).pipe(
      map(req => {
        const unsplashRegexp = new RegExp(/^unsplash/, 'i');

        if (unsplashRegexp.test(req.url)) {
          return req.clone({
            url: req.url.replace(unsplashRegexp, unsplashURL),
            setHeaders: {
              Authorization: `Client-ID ${unsplashToken}`,
            },
          });
        }
        return req;
      }),
      switchMap(req => next.handle(req)),
    );
  }
}
