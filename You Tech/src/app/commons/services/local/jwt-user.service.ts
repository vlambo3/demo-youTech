import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { KEY_SESSION_STORAGE } from '../../keys-storage/session-storage.enum';
import { IJwtDecode } from '../../models/data-user';
import { SessionStorageService } from './storage/storage.service';

@Injectable({ providedIn: 'root' })
export class JwtUserService {
  constructor(private _sessionStorageService: SessionStorageService) {}

  getToken(): string | null {
    return this._getToken();
  }

  decodeToken(): IJwtDecode | null {
    const token = this._getToken();
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      return JSON.parse(decoded.sub!) as IJwtDecode;
    }
    return null;
  }

  isExpiredToken(): boolean {
    try {
      const token = this._getToken();

      if (token !== null) {
        const decoded = jwtDecode<JwtPayload>(token);
        const tokenExpired = Date.now() > decoded.exp! * 1000;

        return tokenExpired;
      }

      return true;
    } catch (error) {
      console.error(error);
      return true;
    }
  }

  private _getToken(): string | null {
    return this._sessionStorageService.getItem<string>(
      KEY_SESSION_STORAGE.TOKEN
    )!;
  }
}
