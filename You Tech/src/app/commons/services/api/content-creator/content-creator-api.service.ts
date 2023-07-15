import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../base-api.model';
import { environment } from './../../../../../environments/environment';
import {
	IRequestContentCreatorEdit,
	IResponseContentCreator,
	IResponseContentCreatorForEdition
} from './content-creator-api.interface';

@Injectable({ providedIn: 'root' })
export class ContentCreatorApiService {
	constructor(private _httpClient: HttpClient) {}

	private readonly URL_CONTENT_CREATOR = `${environment.host}/content_creator`;
	private readonly URL_CONTENT_CREATOR_FOR_EDITION = `${environment.host}/content_creator/find_for_edition`;

	getContentCreator(idContentCreator: number): Observable<IResponse<IResponseContentCreator>> {
		return this._httpClient.get<IResponse<IResponseContentCreator>>(`${this.URL_CONTENT_CREATOR}/${idContentCreator}`);
	}

	getContentCreatorForEdition(idContentCreator: number): Observable<IResponse<IResponseContentCreatorForEdition>> {
		return this._httpClient.get<IResponse<IResponseContentCreatorForEdition>>(
			`${this.URL_CONTENT_CREATOR_FOR_EDITION}/${idContentCreator}`
		);
	}

	updateProfile(request: Partial<IRequestContentCreatorEdit>) {
		return this._httpClient.post<IResponse<string>>(this.URL_CONTENT_CREATOR, request);
	}
}
