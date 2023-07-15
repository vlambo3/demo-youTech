import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { catchError, debounceTime, finalize, Observable, throwError } from 'rxjs';
import { IResponse } from './../services/api/base-api.model';

@Injectable()
export class ErrorApiInterceptor implements HttpInterceptor {
	constructor(private _toastEvokeService: ToastEvokeService, private _ngxService: NgxUiLoaderService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		setTimeout(() => {
			this._ngxService.start();
		}, 10);

		return next.handle(request).pipe(
			debounceTime(50),
			finalize(() => {
				this._ngxService.stop();
			}),
			catchError((error: HttpErrorResponse) => this._errorHandler(error))
		);
	}

	private _errorHandler = (error: HttpErrorResponse): Observable<never> => {
		this.errorsHttpClient(error);
		return throwError(() => error);
	};

	private errorsHttpClient(httpErrorResponse: HttpErrorResponse): void {
		switch (httpErrorResponse.status) {
			case 0:
			case 500:
				const data = httpErrorResponse.error as IResponse;
				if (!data) {
					this._toastEvokeService.danger('Error', 'Ups,ocurrio un error inesperado, intenta nuevamente.');
				}
				break;
			case 400:
				this._toastEvokeService.danger('Error', 'Ups,ocurrio un error inesperado, intenta nuevamente.');
				break;
			case 404:
				this._toastEvokeService.danger('Error', 'No pudimos encontrar lo solicitado, intenta más tarde.');
				break;
		}
	}
}
