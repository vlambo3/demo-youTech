import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { IResponseBroadcastType } from '../../../../commons/services/api/broad-cast-type/broadcast-type-api.interface';
import {
	IRequestSaveBroadcastMedium,
	IResponseAllBroadcastMedium
} from '../../../../commons/services/api/broadcast-medium/broadcast-medium-api.interface';
import { BroadCastMediumApiService } from '../../../../commons/services/api/broadcast-medium/broadcast-medium-api.service';
import { IResponseTags } from '../../../../commons/services/api/home/home-api.interface';
import { HomeApiService } from '../../../../commons/services/api/home/home-api.service';
import { DataUserService } from '../../../../commons/services/local/data-user.service';
import {
	FireStorageService,
	ISaveImageFireStorage
} from '../../../../commons/services/local/fire-storage/fire-storage.service';
import { ToastService } from '../../../../commons/services/local/toast.service';
import { MyErrorStateMatcher } from '../../../../commons/util/state-macher';
import { BroadcastTypeApiService } from './../../../../commons/services/api/broad-cast-type/broadcast-type-api.service';
@Component({
	selector: 'app-broadcast-medium-edit',
	templateUrl: './broadcast-medium-edit.component.html',
	styleUrls: ['./broadcast-medium-edit.component.scss']
})
export class BroadcastMediumEditComponent implements OnInit {
	@ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

	broadCastMediumEdit?: IResponseAllBroadcastMedium;

	imageSrc!: string;
	broadcastTypeList: IResponseBroadcastType[] = [];
	separatorKeysCodes: number[] = [ENTER, COMMA];
	matcher = new MyErrorStateMatcher();

	tags: IResponseTags[] = [];
	allTags: IResponseTags[] = [];

	filteredTags!: Observable<IResponseTags[]>;

	private _fileSelected!: File;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { broadCastMedium: IResponseAllBroadcastMedium },
		private dialogRef: MatDialogRef<BroadcastMediumEditComponent>,
		private _broadcastTypeApiService: BroadcastTypeApiService,
		private _homeApiService: HomeApiService,
		private _formBuilder: FormBuilder,
		private _broadCastMediumApiService: BroadCastMediumApiService,
		private _dataUserService: DataUserService,
		private _fireStorageService: FireStorageService,
		private _confirmBoxEvokeService: ConfirmBoxEvokeService,
		private _toastService: ToastService
	) {
		this.filteredTags = this.tagControlField.valueChanges.pipe(
			debounceTime(100),
			startWith(null),
			map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice()))
		);
	}

	formGroup = this._formBuilder.nonNullable.group({
		name: ['', Validators.required],
		description: ['', Validators.required],
		url: ['', Validators.required],
		idBroadcastType: [0, Validators.required],
		tagControl: ''
	});

	ngOnInit(): void {
		this._loadBroadcastType();
		this._loadTags();

		if (this.data && this.data.broadCastMedium) {
			this.broadCastMediumEdit = this.data.broadCastMedium;
			this._loadDataEdit();
		}
	}

	private _loadDataEdit() {
		this.formGroup.patchValue({
			name: this.broadCastMediumEdit?.name,
			description: this.broadCastMediumEdit?.description,
			url: this.broadCastMediumEdit?.urlPlatform,
			idBroadcastType: this.broadCastMediumEdit?.idPlatform
		});

		this.tags = this.broadCastMediumEdit!.tagList.map((item) => ({ idTag: item.idTag, description: item.description }));
		this.imageSrc = this.broadCastMediumEdit!.urImage;
	}

	saveBroadCastingMedium(): void {
		if (this.formGroup.valid && this.imageSrc && this.tags.length > 0) {
			this._save();
		}
	}

	private async _save() {
		this._confirmBoxEvokeService
			.warning('Confirmar transacción', 'Esta seguro de guardar los datos?', 'Confirmar', 'Cancelar')
			.subscribe(async (question) => {
				if (question.success) {
					const request = await this._getRequest();

					this._broadCastMediumApiService
						.saveBroadcastMedium(request, this.broadCastMediumEdit?.idBroadcastMedium)
						.subscribe({
							next: (response) => {
								if (response.success) {
									this._toastService.success('Transacción completada', 'Muchas gracias por compartir tu contenido!');
									this.dialogRef.close();
								}
							},
							error: () => {
								this._fireStorageService.deleteImage(request.nameImage);
							}
						});
				}
			});
	}

	private async _getRequest() {
		let saveImage: ISaveImageFireStorage = <ISaveImageFireStorage>{};

		if (this.broadCastMediumEdit && this.imageSrc !== this.broadCastMediumEdit.urImage) {
			await this._fireStorageService.deleteImage(this.broadCastMediumEdit.nameImage);
			saveImage = await this._fireStorageService.saveImage(this._fileSelected);
		}

		if (!this.broadCastMediumEdit) {
			saveImage = await this._fireStorageService.saveImage(this._fileSelected);
		}

		const request: IRequestSaveBroadcastMedium = {
			urImage: saveImage.url,
			nameImage: saveImage.nameFile,
			name: this.nameField.value,
			description: this.descriptionField.value,
			url: this.urlField.value,
			idBroadcastType: this.idBroadcastTypeField.value!,
			idContentCreator: this._dataUserService.getDataUser()!.idContentCreator,
			broadcastMediumTagList: this.tags.map((item) => item.idTag)
		};

		return request;
	}

	//#region METODOS PARA EL MATCHIP
	onFileSelected(event: Event): void {
		const htmlInput: HTMLInputElement = event.target as HTMLInputElement;
		if (htmlInput && htmlInput.files && htmlInput.files.length > 0) {
			const reader = new FileReader();
			const file = htmlInput.files[0];
			this._fileSelected = file;

			reader.readAsDataURL(htmlInput.files[0]);
			reader.onload = () => {
				this.imageSrc = reader.result as string;
			};
		}
	}

	remove(tag: IResponseTags): void {
		const index = this.tags.indexOf(tag);
		if (index >= 0) {
			this.tags.splice(index, 1);
		}
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		const valueString = event.option.viewValue.toLocaleLowerCase();

		const findValue = this.allTags.find((item) => item.description.toLocaleLowerCase() === valueString);
		if (findValue) {
			//Verificamoa que el valor seleccionado ya existe
			const findInTagsSelected = this.tags.find((item) => item.idTag === findValue.idTag);
			if (!findInTagsSelected) {
				this.tags.push(findValue);
			}

			this.tagInput.nativeElement.value = '';
			this.tagControlField.setValue('');
		}
	}

	private _filter(value: string): IResponseTags[] {
		const filterValue = value.toLowerCase();
		return this.allTags.filter((tag) => tag.description.toLocaleLowerCase().includes(filterValue));
	}
	//#endregion

	private _loadBroadcastType() {
		this._broadcastTypeApiService.getAllActives().subscribe((response) => {
			if (response.success) {
				this.broadcastTypeList = response.data;
			}
		});
	}

	private _loadTags() {
		this._homeApiService.getActiveTags().subscribe((response) => {
			if (response.success) {
				this.allTags = response.data;
			}
		});
	}

	get nameField() {
		return this.formGroup.controls.name;
	}

	get descriptionField() {
		return this.formGroup.controls.description;
	}

	get urlField() {
		return this.formGroup.controls.url;
	}

	get idBroadcastTypeField() {
		return this.formGroup.controls.idBroadcastType;
	}

	get tagControlField() {
		return this.formGroup.controls.tagControl;
	}
}
