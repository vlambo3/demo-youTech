import { Injectable } from '@angular/core';
import { IDataUser } from '../../models/data-user';
import { JwtUserService } from './jwt-user.service';
import { SessionStorageService } from './storage/storage.service';

@Injectable({ providedIn: 'root' })
export class DataUserService {
	private _dataUser?: IDataUser;

	constructor(private _jwtUserService: JwtUserService, private _sessionStorageService: SessionStorageService) {}

	getDataUser(): IDataUser | undefined {
		if (!this._dataUser) {
			const jwtDecode = this._jwtUserService.decodeToken();
			if (jwtDecode) {
				this._dataUser = {
					idContentCreator: jwtDecode.idContentCreator,
					urlImage: jwtDecode.urlImage,
					fullName: `${jwtDecode.name}, ${jwtDecode.lastName}`,
					isAdmin: jwtDecode.admin
				};
			}
		}

		return this._dataUser;
	}

	clearData(): void {
		this._sessionStorageService.clear();
		this._dataUser = undefined;
	}

	resetDataUser(): void {
		this._dataUser = undefined;
	}
}
