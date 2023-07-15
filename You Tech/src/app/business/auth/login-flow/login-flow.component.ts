import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KEY_SESSION_STORAGE } from '../../../commons/keys-storage/session-storage.enum';
import { PathWeb } from '../../../commons/routes/path-web';
import { AuthApiService } from '../../../commons/services/api/auth/auth-api.service';
import { HeaderChannelService } from '../../../commons/services/local/channel/header-channel.service';
import { DataUserService } from '../../../commons/services/local/data-user.service';
import { SessionStorageService } from '../../../commons/services/local/storage/storage.service';
import { IResponseLogin } from './../../../commons/services/api/auth/auth-api.interface';

@Component({
	selector: 'app-login-flow',
	templateUrl: './login-flow.component.html',
	styleUrls: ['./login-flow.component.scss']
})
export class LoginFlowComponent {
	constructor(
		private _authApiService: AuthApiService,
		private _formBuilder: FormBuilder,
		private _sessionStorageService: SessionStorageService,
		private _dataUserService: DataUserService,
		private _router: Router,
		private _headerChannelService: HeaderChannelService
	) {}

	form = this._formBuilder.nonNullable.group({
		email: ['jimmyhdolores@gmail.com', [Validators.email, Validators.required]],
		password: ['123', Validators.required]
	});

	submitLogin(): void {
		if (this.form.valid) {
			this._login();
		}
	}

	private _login() {
		this._authApiService.login(this.emailField.value, this.passwordField.value).subscribe({
			next: (response) => this._saveAndRedirect(response.data)
		});
	}

	private _saveAndRedirect(response: IResponseLogin) {
		this._sessionStorageService.setItem(KEY_SESSION_STORAGE.TOKEN, response.jwt);

		this._headerChannelService.showUser();

		this._router.navigateByUrl(
			this._dataUserService.getDataUser()?.isAdmin
				? PathWeb.ADMINISTRATOR.pathWithSlash
				: PathWeb.CONTENT_CREATOR.pathWithSlash
		);
	}

	get emailField(): FormControl<string> {
		return this.form.controls.email;
	}

	get passwordField(): FormControl<string> {
		return this.form.controls.password;
	}
}
