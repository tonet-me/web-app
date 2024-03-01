import {HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {ToastrService} from "ngx-toastr";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toasterService = inject(ToastrService)
  return next(req).pipe(
    catchError((err, caught) => {
      if (err?.error?.message) {
        toasterService.error(err.error.message);
      }
      return throwError(() => err);
    })
  );
};
