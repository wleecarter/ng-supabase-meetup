import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler extends ErrorHandler {
  public handleError(error: string | Error | HttpErrorResponse | unknown) {
    window.location.href = 'pages/error';
  }
}
