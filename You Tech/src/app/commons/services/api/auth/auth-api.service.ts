import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import {
  IRequestRegister,
  TypeResponseLogin,
  TypeResponseRegister,
} from './auth-api.interface';

export const URL_BASE_AUTH = environment.host + '/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private _httpClient: HttpClient) {}

  private readonly URL_LOGIN = `${URL_BASE_AUTH}/login`;
  private readonly URL_REGISTER = `${URL_BASE_AUTH}/register`;

  login(email: string, password: string) {
    return this._httpClient.post<TypeResponseLogin>(this.URL_LOGIN, {
      email,
      password,
    });
  }

  register(register: IRequestRegister) {
    return this._httpClient.post<TypeResponseRegister>(
      this.URL_REGISTER,
      register
    );
  }
}
