import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { DataUserService } from './../services/local/data-user.service';

@Injectable({ providedIn: 'root' })
export class ValidUserAdminGuard implements CanActivate {
	constructor(private _dataUserService: DataUserService) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const dataUser = this._dataUserService.getDataUser();
		return dataUser !== undefined && dataUser.isAdmin;
	}
}

@Injectable({ providedIn: 'root' })
export class ValidUserContentCreatorGuard implements CanActivate {
	constructor(private _dataUserService: DataUserService) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const dataUser = this._dataUserService.getDataUser();
		return dataUser !== undefined && !dataUser.isAdmin;
	}
}
