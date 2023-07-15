import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderChannelService } from '../../../services/local/channel/header-channel.service';
import { DataUserService } from '../../../services/local/data-user.service';
import { PathWeb } from './../../../routes/path-web';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	isLoggedIn = false;

	readonly PATH_REGISTER = PathWeb.AUTH.register.pathWithSlash;
	readonly PATH_CONTENT_CREATOR = PathWeb.CONTENT_CREATOR.pathWithSlash;
	readonly PATH_ADMIN = PathWeb.ADMINISTRATOR.pathWithSlash;

	constructor(
		private _dataUserService: DataUserService,
		private _router: Router,
		private _headerChannelService: HeaderChannelService
	) {
		this._subscribeChannel();
	}

	dataUser = this._dataUserService.getDataUser();

	private _subscribeChannel() {
		this._headerChannelService.channelHeader$.subscribe((show) => {
			this.isLoggedIn = show;
			if (!this.isLoggedIn) {
				this.clickCloseSession();
			} else {
				this.dataUser = this._dataUserService.getDataUser();
			}
		});
	}

	ngOnInit(): void {
		this.isLoggedIn = this.dataUser !== undefined;
	}

	clickCloseSession(): void {
		this.isLoggedIn = false;
		this._dataUserService.clearData();
		this._router.navigateByUrl('/');
	}
}
