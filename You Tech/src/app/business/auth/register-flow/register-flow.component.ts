import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { KEY_SESSION_STORAGE } from '../../../commons/keys-storage/session-storage.enum';
import { PathWeb } from '../../../commons/routes/path-web';
import { IRequestRegister, IResponseRegister } from '../../../commons/services/api/auth/auth-api.interface';
import { HeaderChannelService } from '../../../commons/services/local/channel/header-channel.service';
import { FireStorageService } from '../../../commons/services/local/fire-storage/fire-storage.service';
import { SessionStorageService } from '../../../commons/services/local/storage/storage.service';
import { ToastService } from '../../../commons/services/local/toast.service';
import { AuthApiService } from './../../../commons/services/api/auth/auth-api.service';
import { crossPasswordMatchingValidatior, PasswordStateMatcher } from './register-custom-validators';

@Component({
	selector: 'app-register-flow',
	templateUrl: './register-flow.component.html',
	styleUrls: ['./register-flow.component.scss']
})
export class RegisterFlowComponent {
	private _fileSelected!: File;

	imageSrc!: string;
	passwordStateMatcher = new PasswordStateMatcher();
	disabledButton = false;

	isSmallScreen = false;

	constructor(
		private _formBuilder: FormBuilder,
		private _authApiService: AuthApiService,
		private _fireStorageService: FireStorageService,
		private _sessionStorageService: SessionStorageService,
		private _router: Router,
		private _headerChannelService: HeaderChannelService,
		private _toastService: ToastService,
		private _breakpointObserver: BreakpointObserver
	) {
		this._breakpointObserver.observe('(max-width: 636px)').subscribe((result) => {
			this.isSmallScreen = result.matches;
		});
	}

	formGroup = this._formBuilder.nonNullable.group(
		{
			name: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
			confirmPassword: ['', Validators.required]
		},
		{
			validators: crossPasswordMatchingValidatior
		}
	);

	async clickRegister(): Promise<void> {
		if (this.formGroup.valid) {
			const dataImage = await this._fireStorageService.saveImage(this._fileSelected);
			const request = this._getRequest(dataImage.url, dataImage.nameFile);

			this._authApiService.register(request).subscribe({
				next: (response) => {
					if (response.success) {
						this._saveTokenAndRedirect(response.data);
					}
				},
				error: () => {
					this._fireStorageService.deleteImage(request.nameImageProfile);
				}
			});
		}
	}

	private _saveTokenAndRedirect(response: IResponseRegister) {
		this._toastService.toastNotification('Felicidades', 'Gracias por compartir tu contenido', {
			toastPosition: ToastPositionEnum.TOP_FULL_WIDTH
		});

		this._sessionStorageService.setItem(KEY_SESSION_STORAGE.TOKEN, response.token);
		this._headerChannelService.showUser();
		this._router.navigateByUrl(PathWeb.CONTENT_CREATOR.pathWithSlash);
	}

	private _getRequest(imageProfile: string, nameImageProfile: string): IRequestRegister {
		const request = this.formGroup.getRawValue();
		return { ...request, imageProfile, nameImageProfile };
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

	get firtsField(): FormControl<string> {
		return this.formGroup.controls.name;
	}

	get lastNameField(): FormControl<string> {
		return this.formGroup.controls.lastName;
	}

	get emailField(): FormControl<string> {
		return this.formGroup.controls.email;
	}

	get passwordField(): FormControl<string> {
		return this.formGroup.controls.password;
	}

	get confirmPasswordField(): FormControl<string> {
		return this.formGroup.controls.confirmPassword;
	}
}
