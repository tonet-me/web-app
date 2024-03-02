import {HttpInterceptorFn} from '@angular/common/http';
import {environment} from "@environments/environment";

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (!/^(http|https|blob):/i.test(req.url)) {
    const apiRequest = req.clone({
      url: `${environment.apiUrl}${req.url}`,
    });
    return next(apiRequest);
  } else {
    return next(req);
  }

};
