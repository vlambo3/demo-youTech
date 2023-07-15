import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { EMPTY } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { IRequestSaveTag, IResponseTagsAll } from '../../../commons/services/api/maintenance/maintenance-api.interface';
import { ToastService } from '../../../commons/services/local/toast.service';
import { MaintenanceApiService } from './../../../commons/services/api/maintenance/maintenance-api.service';
import { STATUS } from './../../../commons/util/variable';

@Component({
	selector: 'app-maintenance-tag-flow',
	templateUrl: './maintenance-tag-flow.component.html',
	styleUrls: ['./maintenance-tag-flow.component.scss']
})
export class MaintenanceTagFlowComponent implements OnInit, AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	displayedColumns: string[] = ['nro', 'description', 'status'];
	dataSource = new MatTableDataSource<IResponseTagsAll>();

	constructor(
		private _maintenanceApiService: MaintenanceApiService,
		private _formBuilder: FormBuilder,
		private _confirmBoxEvokeService: ConfirmBoxEvokeService,
		private _toastService: ToastService
	) {}

	formGroup = this._formBuilder.nonNullable.group({
		idTag: undefined,
		description: ['', Validators.required],
		status: [false, Validators.required]
	});

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	ngOnInit(): void {
		this._loadTags();
	}

	private _loadTags() {
		this._maintenanceApiService.getTags().subscribe((response) => {
			if (response.success) {
				this.dataSource.data = response.data;
			}
		});
	}

	saveTag(): void {
		if (this.formGroup.valid) {
			const request: IRequestSaveTag = <IRequestSaveTag>{
				description: this.descriptionField.value,
				status: this.statusField.value ? STATUS.ACTIVE : STATUS.INACTIVE
			};

			if (this.idField.value) {
				request.idTag = this.idField.value as number;
			}

			this._confirmBoxEvokeService
				.warning('Confirmar transacción', 'Esta seguro de guardar la información?', 'Si', 'Cancelar')
				.pipe(
					concatMap((question) => {
						if (question.success) {
							return this._maintenanceApiService.saveTag(request);
						}
						return EMPTY;
					})
				)
				.subscribe((response) => {
					if (response.success) {
						this._toastService.success('Transacción completada', 'Se guardo el registro');
						this._loadTags();
					}
				});
		}
	}

	cleanForm(): void {
		this.formGroup.reset();
	}

	selectedRow(item: IResponseTagsAll) {
		this.formGroup.patchValue({
			idTag: item.idTag,
			description: item.description,
			status: item.status === STATUS.ACTIVE
		});
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	public get idField() {
		return this.formGroup.controls.idTag;
	}

	public get descriptionField(): FormControl<string> {
		return this.formGroup.controls.description;
	}

	public get statusField(): FormControl<boolean> {
		return this.formGroup.controls.status;
	}
}
