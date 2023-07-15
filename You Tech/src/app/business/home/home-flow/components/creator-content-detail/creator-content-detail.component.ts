import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IResponseAllBroadcastMedium } from '../../../../../commons/services/api/broadcast-medium/broadcast-medium-api.interface';
import { BroadCastMediumApiService } from '../../../../../commons/services/api/broadcast-medium/broadcast-medium-api.service';

@Component({
	selector: 'app-creator-content-detail',
	templateUrl: './creator-content-detail.component.html',
	styleUrls: ['./creator-content-detail.component.scss']
})
export class CreatorContentDetailComponent implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { idContentCreator: number },
		private _broadCastMediumApiService: BroadCastMediumApiService
	) {}

	allBroadcastMedium: IResponseAllBroadcastMedium[] = [];

	ngOnInit(): void {
		this._broadCastMediumApiService.getAllBroadcastMediumHome(this.data.idContentCreator).subscribe((response) => {
			if (response.success) {
				console.log(response);
				this.allBroadcastMedium = response.data;
			}
		});
	}
}
