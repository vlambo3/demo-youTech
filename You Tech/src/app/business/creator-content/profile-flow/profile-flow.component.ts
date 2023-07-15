import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { KEY_SESSION_STORAGE } from '../../../commons/keys-storage/session-storage.enum';
import {
	IRequestContentCreatorEdit,
	IResponseContentCreatorForEdition
} from '../../../commons/services/api/content-creator/content-creator-api.interface';
import { ContentCreatorApiService } from '../../../commons/services/api/content-creator/content-creator-api.service';
import { HeaderChannelService } from '../../../commons/services/local/channel/header-channel.service';
import { FireStorageService } from '../../../commons/services/local/fire-storage/fire-storage.service';
import { SessionStorageService } from '../../../commons/services/local/storage/storage.service';
import { ToastService } from '../../../commons/services/local/toast.service';
import { DataUserService } from './../../../commons/services/local/data-user.service';

@Component({
	selector: 'app-profile-flow',
	templateUrl: './profile-flow.component.html',
	styleUrls: ['./profile-flow.component.scss']
})
export class ProfileFlowComponent implements OnInit {
	imageSrc!: string;

	private _fileSelected!: File;
	private _originalDataProfile!: IResponseContentCreatorForEdition;

	constructor(
		private _iconRegistry: MatIconRegistry,
		private _sanitizer: DomSanitizer,
		private _contentCreatorApiService: ContentCreatorApiService,
		private _dataUserService: DataUserService,
		private _toastService: ToastService,
		private _fireStorageService: FireStorageService,
		private _confirmBoxEvokeService: ConfirmBoxEvokeService,
		private _sessionStorageService: SessionStorageService,
		private _headerChannelService: HeaderChannelService
	) {
		this._loadIcons();
	}

	formGroup = new FormGroup({
		name: new FormControl('', { nonNullable: true, validators: Validators.required }),
		lastName: new FormControl('', { nonNullable: true, validators: Validators.required }),
		pseudonym: new FormControl(''),
		email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
		password: new FormControl('', { nonNullable: true, validators: Validators.required }),
		urlGithub: new FormControl(''),
		urlTwitter: new FormControl(''),
		urlLinkedin: new FormControl('')
	});

	ngOnInit(): void {
		this.loadDataContentCreator();
	}

	clickSaveProfile(): void {
		if (this.formGroup.valid) {
			this._confirmBoxEvokeService
				.warning('Confirmar transacción', 'Esta seguro de guardar los datos?', 'Confirmar', 'Cancelar')
				.subscribe((question) => {
					if (question.success) {
						this._updateProfile();
					}
				});
		}
	}

	private async _updateProfile() {
		const request: Partial<IRequestContentCreatorEdit> = {
			name: this.nameField.value,
			lastName: this.lastNameField.value,
			email: this.emailField.value
		};

		if (this.passwordField.value !== this._originalDataProfile.password) {
			request.password = this.passwordField.value;
		}
		if (this.pseudonym.value) {
			request.pseudonym = this.pseudonym.value;
		}
		if (this.urlGithubField.value) {
			request.urlGithub = this.urlGithubField.value;
		}
		if (this.urlTwitterField.value) {
			request.urlTwitter = this.urlTwitterField.value;
		}

		if (this.urlLinkedinField.value) {
			request.urlLinkedin = this.urlLinkedinField.value;
		}

		if (this.imageSrc !== this._originalDataProfile.imageProfile) {
			await this._fireStorageService.deleteImage(this._originalDataProfile.nameImageProfile);
			const saveImage = await this._fireStorageService.saveImage(this._fileSelected);
			request.imageProfile = saveImage.url;
			request.nameImageProfile = saveImage.nameFile;
		}
		// console.log(request);
		// return;
		this._contentCreatorApiService.updateProfile(request).subscribe({
			next: (response) => {
				if (response.success) {
					this._toastService.success('Transacción completada', 'Se guardaron tus datos!');
					this._sessionStorageService.setItem(KEY_SESSION_STORAGE.TOKEN, response.data);
					this._dataUserService.resetDataUser();
					this._headerChannelService.showUser();
					this.loadDataContentCreator();
				}
			},
			error: () => {
				if (this.imageSrc !== this._originalDataProfile.imageProfile) {
					this._fireStorageService.deleteImage(request.nameImageProfile!);
				}
			}
		});
	}

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

	private loadDataContentCreator(): void {
		const idContentCreator = this._dataUserService.getDataUser()!.idContentCreator;
		this._contentCreatorApiService.getContentCreatorForEdition(idContentCreator).subscribe((response) => {
			if (response.success) {
				this._originalDataProfile = { ...response.data };
				this._loadFormValues(response.data);
			}
		});
	}

	private _loadFormValues(response: IResponseContentCreatorForEdition) {
		this.formGroup.patchValue(response);

		if (response.imageProfile) {
			this.imageSrc = response.imageProfile;
		}
	}

	private _loadIcons() {
		this._iconRegistry.addSvgIcon('github', this._sanitizer.bypassSecurityTrustResourceUrl('assets/svg/gitHub.svg'));
		this._iconRegistry.addSvgIcon('twitter', this._sanitizer.bypassSecurityTrustResourceUrl('assets/svg/twitter.svg'));
		this._iconRegistry.addSvgIcon(
			'linkedIn',
			this._sanitizer.bypassSecurityTrustResourceUrl('assets/svg/linkedIn.svg')
		);
	}

	//#region Fields Contorls
	get nameField(): FormControl<string> {
		return this.formGroup.controls.name;
	}

	get lastNameField(): FormControl<string> {
		return this.formGroup.controls.lastName;
	}

	get pseudonym(): FormControl<string | null> {
		return this.formGroup.controls.pseudonym;
	}
	get emailField(): FormControl<string> {
		return this.formGroup.controls.email;
	}

	get passwordField(): FormControl<string> {
		return this.formGroup.controls.password;
	}

	get urlGithubField(): FormControl<string | null> {
		return this.formGroup.controls.urlGithub;
	}

	get urlTwitterField(): FormControl<string | null> {
		return this.formGroup.controls.urlTwitter;
	}
	get urlLinkedinField(): FormControl<string | null> {
		return this.formGroup.controls.urlLinkedin;
	}
	//#endregion
}
