import { Component, OnInit } from '@angular/core';
import { HeaderChannelService } from '../../services/local/channel/header-channel.service';
import { RouteService } from '../../services/local/route.service';
import { PathWeb } from './../../routes/path-web';
import { DataUserService } from './../../services/local/data-user.service';

@Component({
	selector: 'app-container',
	templateUrl: './container.component.html',
	styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
	showBannerHome = false;
	isAdmin = false;
	constructor(
		private _routerService: RouteService,
		private _dataUserService: DataUserService,
		private _headerChannelService: HeaderChannelService
	) {
		this._validHomePath();
	}

	ngOnInit(): void {}

	private _validHomePath() {
		this._routerService.navigationEnd().subscribe((navigation) => {
			this.isAdmin = navigation.url.search(new RegExp(PathWeb.ADMINISTRATOR.pathWithSlash, 'i')) > -1;
			this.showBannerHome = navigation.url === '/';
		});
	}
}
