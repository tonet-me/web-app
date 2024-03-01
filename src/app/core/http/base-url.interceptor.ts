import {HttpInterceptorFn} from '@angular/common/http';
import {environment} from "@environments/environment";

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = environment.apiUrl;
  if (!/^(http|https):/i.test(req.url)) {
    const apiRequest = req.clone({
      url: `${apiUrl}${req.url}`,
    });
    return next(apiRequest);
  } else {
    return next(req);
  }

};
