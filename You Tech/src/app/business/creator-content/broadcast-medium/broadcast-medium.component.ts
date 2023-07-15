import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { concatMap, EMPTY } from 'rxjs';
import { BroadCastMediumApiService } from '../../../commons/services/api/broadcast-medium/broadcast-medium-api.service';
import { ToastService } from '../../../commons/services/local/toast.service';
import { IResponseAllBroadcastMedium } from './../../../commons/services/api/broadcast-medium/broadcast-medium-api.interface';
import { DataUserService } from './../../../commons/services/local/data-user.service';
import { BroadcastMediumEditComponent } from './broadcast-medium-edit/broadcast-medium-edit.component';

@Component({
	selector: 'app-broadcast-medium',
	templateUrl: './broadcast-medium.component.html',
	styleUrls: ['./broadcast-medium.component.scss']
})
export class BroadcastMediumComponent implements OnInit {
	constructor(
		private _broadCastMediumApiService: BroadCastMediumApiService,
		private _dataUserService: DataUserService,
		private dialog: MatDialog,
		private _confirmBoxEvokeService: ConfirmBoxEvokeService,
		private _toastService: ToastService
	) {}

	broadcastMediumList: IResponseAllBroadcastMedium[] = [];

	ngOnInit(): void {
		this._loadBroadcastMedium();
	}

	clickEdit(broadCastMedium: IResponseAllBroadcastMedium): void {
		this._actions(broadCastMedium);
	}

	clickDelete(broadCastMedium: IResponseAllBroadcastMedium): void {
		this._confirmBoxEvokeService
			.danger(
				'Confirmar transacción',
				`Esta seguro de eliminar el medio de difusión ${broadCastMedium.name}?`,
				'Si',
				'Cancelar'
			)
			.pipe(
				concatMap((question) => {
					if (question.success) {
						return this._broadCastMediumApiService.deleteBroadcastMedium(broadCastMedium.idBroadcastMedium);
					}
					return EMPTY;
				})
			)
			.subscribe((response) => {
				if (response.success) {
					this._toastService.success('Transacción completada', 'Se elimino el registro');
					this._loadBroadcastMedium();
				}
			});
	}

	clickNewRegistre(): void {
		this._actions();
	}

	private _actions(broadCastMedium?: IResponseAllBroadcastMedium): void {
		const response = this.dialog.open(BroadcastMediumEditComponent, {
			data: { broadCastMedium },
			width: '40%',
			minWidth: '800px',
			disableClose: true
		});

		response.afterClosed().subscribe(() => {
			this._loadBroadcastMedium();
		});
	}

	private _loadBroadcastMedium() {
		this._broadCastMediumApiService
			.getAllBroadcastMedium(this._dataUserService.getDataUser()!.idContentCreator)
			.subscribe((response) => {
				if (response.success) {
					this.broadcastMediumList = response.data;
				}
			});
	}
}
