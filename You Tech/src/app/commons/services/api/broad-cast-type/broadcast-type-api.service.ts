import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment';
import { IResponse } from './../base-api.model';
import { IResponseBroadcastType } from './broadcast-type-api.interface';

@Injectable({ providedIn: 'root' })
export class BroadcastTypeApiService {
	constructor(private _httpClient: HttpClient) {}
	private readonly URL_BROADCAST_TYPE = environment.host + '/broadcast-type/actives';

	getAllActives(): Observable<IResponse<IResponseBroadcastType[]>> {
		return this._httpClient.get<IResponse<IResponseBroadcastType[]>>(this.URL_BROADCAST_TYPE);
	}
}
