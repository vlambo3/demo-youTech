import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { URL_BASE_AUTH } from '../services/api/auth/auth-api.service';
import { JwtUserService } from './../services/local/jwt-user.service';

// import { URL_BROADCAST_MEDIUM } from '../services/api/broadcast-medium/broadcast-medium-api.service';
import { URL_BROADCAST_MEDIUM_HOME } from '../services/api/broadcast-medium/broadcast-medium-api.service';
import {
	URL_CONTENT_CREATOR_FIND_TAGS,
	URL_CONTENT_CREATOR_FIND_TAGSNAME,
	URL_CONTENT_CREATOR_HOME,
	URL_TAGS_ACTIVES_HOME
} from '../services/api/home/home-api.service';
import { SessionStorageService } from '../services/local/storage/storage.service';

const EXEMPTED_URLS = [
	URL_BASE_AUTH,
	URL_CONTENT_CREATOR_HOME,
	URL_TAGS_ACTIVES_HOME,
	URL_BROADCAST_MEDIUM_HOME,
	URL_CONTENT_CREATOR_FIND_TAGS,
	URL_CONTENT_CREATOR_FIND_TAGSNAME
];

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
	constructor(
		private _jwtUserService: JwtUserService,
		private _router: Router,
		private _sessionStorageService: SessionStorageService
	) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (this.isExempted(request.url)) {
			return next.handle(request);
		}

		if (this._jwtUserService.isExpiredToken()) {
			this._sessionStorageService.clear();
			void this._router.navigateByUrl('/');
			return EMPTY;
		}

		const token = this._jwtUserService.getToken();

		const requestClone = request.clone({
			headers: request.headers.set('Authorization', `Bearer ${token!}`)
		});

		return next.handle(requestClone);
	}

	private isExempted(url: string): boolean {
		const exist = EXEMPTED_URLS.find((item) => url.search(new RegExp(item, 'i')) > -1);

		return exist !== undefined;
	}
}
