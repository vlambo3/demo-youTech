import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IResponse } from '../base-api.model';
import { IRequestSaveTag, IResponseBroadcastType, IResponseTagsAll } from './maintenance-api.interface';

@Injectable({ providedIn: 'root' })
export class MaintenanceApiService {
	constructor(private _httpClient: HttpClient) {}

	private readonly URL_TAG = `${environment.host}/tag`;
	private readonly URL_ALL_TAGS = `${this.URL_TAG}/all`;

	private readonly URL_BROADCAST_TYPE = `${environment.host}/broadcast-type`;

	getTags(): Observable<IResponse<IResponseTagsAll[]>> {
		return this._httpClient.get<IResponse<IResponseTagsAll[]>>(this.URL_ALL_TAGS);
	}

	saveTag(request: IRequestSaveTag) {
		if (request.idTag) {
			return this._httpClient.put<IResponse>(`${this.URL_TAG}/${request.idTag}`, request);
		}

		return this._httpClient.post<IResponse>(`${this.URL_TAG}`, request);
	}

	getAllBroadcastType(): Observable<IResponse<IResponseBroadcastType[]>> {
		return this._httpClient.get<IResponse<IResponseBroadcastType[]>>(`${this.URL_BROADCAST_TYPE}/all`);
	}

	saveBroadcastTypeg(request: IResponseBroadcastType) {
		if (request.idBroadCastType) {
			return this._httpClient.put<IResponse>(`${this.URL_BROADCAST_TYPE}/${request.idBroadCastType}`, request);
		}

		return this._httpClient.post<IResponse>(`${this.URL_BROADCAST_TYPE}`, request);
	}
}
