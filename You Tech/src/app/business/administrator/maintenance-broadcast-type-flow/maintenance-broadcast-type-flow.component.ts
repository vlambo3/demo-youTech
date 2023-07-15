import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { concatMap, EMPTY } from 'rxjs';
import { IResponseBroadcastType } from '../../../commons/services/api/maintenance/maintenance-api.interface';
import { MaintenanceApiService } from '../../../commons/services/api/maintenance/maintenance-api.service';
import { ToastService } from '../../../commons/services/local/toast.service';
import { STATUS } from '../../../commons/util/variable';

@Component({
	selector: 'app-maintenance-broadcast-type-flow',
	templateUrl: './maintenance-broadcast-type-flow.component.html',
	styleUrls: ['./maintenance-broadcast-type-flow.component.scss']
})
export class MaintenanceBroadcastTypeFlowComponent implements OnInit {
	displayedColumns: string[] = ['nro', 'description', 'status'];

	dataSource = new MatTableDataSource<IResponseBroadcastType>();

	constructor(
		private _maintenanceApiService: MaintenanceApiService,
		private _formBuilder: FormBuilder,
		private _confirmBoxEvokeService: ConfirmBoxEvokeService,
		private _toastService: ToastService
	) {}

	formGroup = this._formBuilder.nonNullable.group({
		idBroadCastType: undefined,
		description: ['', Validators.required],
		status: [false, Validators.required]
	});

	ngOnInit(): void {
		this._loadBroadcastTypes();
	}

	private _loadBroadcastTypes() {
		this._maintenanceApiService.getAllBroadcastType().subscribe((response) => {
			if (response.success) {
				this.dataSource.data = response.data;
			}
		});
	}

	saveTag(): void {
		if (this.formGroup.valid) {
			const request: IResponseBroadcastType = <IResponseBroadcastType>{
				description: this.descriptionField.value,
				status: this.statusField.value ? STATUS.ACTIVE : STATUS.INACTIVE
			};

			if (this.idBroadCastTypeField.value) {
				request.idBroadCastType = this.idBroadCastTypeField.value as number;
			}

			this._confirmBoxEvokeService
				.warning('Confirmar transacción', 'Esta seguro de guardar la información?', 'Si', 'Cancelar')
				.pipe(
					concatMap((question) => {
						if (question.success) {
							return this._maintenanceApiService.saveBroadcastTypeg(request);
						}
						return EMPTY;
					})
				)
				.subscribe((response) => {
					if (response.success) {
						this._toastService.success('Transacción completada', 'Se guardo el registro');
						this._loadBroadcastTypes();
					}
				});
		}
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	selectedRow(item: IResponseBroadcastType) {
		this.formGroup.patchValue({
			idBroadCastType: item.idBroadCastType,
			description: item.description,
			status: item.status === STATUS.ACTIVE
		});
	}

	cleanForm(): void {
		this.formGroup.reset();
	}

	public get idBroadCastTypeField() {
		return this.formGroup.controls.idBroadCastType;
	}

	public get descriptionField(): FormControl<string> {
		return this.formGroup.controls.description;
	}

	public get statusField(): FormControl<boolean> {
		return this.formGroup.controls.status;
	}
}
