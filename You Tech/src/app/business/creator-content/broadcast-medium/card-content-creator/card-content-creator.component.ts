import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { IResponseAllBroadcastMedium } from '../../../../commons/services/api/broadcast-medium/broadcast-medium-api.interface';
import { BROADCAST_TYPE } from '../../../../commons/util/broadcast-type.enum';

@Component({
	selector: 'app-card-content-creator',
	templateUrl: './card-content-creator.component.html',
	styleUrls: ['./card-content-creator.component.scss']
})
export class CardContentCreatorComponent implements OnInit {
	@Input() broadCastMedium?: IResponseAllBroadcastMedium;
	@Output() clickEdit = new EventEmitter<IResponseAllBroadcastMedium>();
	@Output() clickDelete = new EventEmitter<IResponseAllBroadcastMedium>();

	BROADCAST_TYPE_YOUTUBE = BROADCAST_TYPE.YOUTUBE;
	BROADCAST_TYPE_TWITCH = BROADCAST_TYPE.TWITCH;
	BROADCAST_TYPE_SPOTIFY = BROADCAST_TYPE.SPOTIFY;
	BROADCAST_TYPE_OTHER = BROADCAST_TYPE.OTHER;

	getScreenWidth = 0;
	WidthCard = '';

	isSmallScreen = false;

	ngOnInit(): void {
		this._resize();
	}

	goToLink(url: string) {
		window.open(url, '_blank');
	}

	@HostListener('window:resize', ['$event'])
	onWindowResize() {
		this._resize();
	}

	private _resize(): void {
		this.isSmallScreen = window.innerWidth <= 497;
		if (this.isSmallScreen) {
			this.WidthCard = `${window.innerWidth - 50}px`;
		}
	}
}
