import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../base-api.model';
import { environment } from './../../../../../environments/environment';
import { IRequestSaveBroadcastMedium, IResponseAllBroadcastMedium } from './broadcast-medium-api.interface';

const URL_BROADCAST_MEDIUM = `${environment.host}/broadcast_medium`;
export const URL_BROADCAST_MEDIUM_HOME = `${URL_BROADCAST_MEDIUM}/home`;

@Injectable({ providedIn: 'root' })
export class BroadCastMediumApiService {
	constructor(private _httpClient: HttpClient) {}

	getAllBroadcastMedium(idContentCreator: number): Observable<IResponse<IResponseAllBroadcastMedium[]>> {
		return this._httpClient.get<IResponse<IResponseAllBroadcastMedium[]>>(
			`${URL_BROADCAST_MEDIUM}/${idContentCreator}`
		);
	}

	getAllBroadcastMediumHome(idContentCreator: number): Observable<IResponse<IResponseAllBroadcastMedium[]>> {
		return this._httpClient.get<IResponse<IResponseAllBroadcastMedium[]>>(
			`${URL_BROADCAST_MEDIUM_HOME}/${idContentCreator}`
		);
	}

	deleteBroadcastMedium(idBroadcastMedium: number): Observable<IResponse<string>> {
		return this._httpClient.delete<IResponse<string>>(`${URL_BROADCAST_MEDIUM}/${idBroadcastMedium}`);
	}

	saveBroadcastMedium(request: IRequestSaveBroadcastMedium, idBroadcastMedium?: number) {
		if (idBroadcastMedium) {
			return this._httpClient.put<IResponse<string>>(`${URL_BROADCAST_MEDIUM}/${idBroadcastMedium}`, request);
		}

		return this._httpClient.post<IResponse<string>>(URL_BROADCAST_MEDIUM, request);
	}
}
