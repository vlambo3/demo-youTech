import { Injectable } from '@angular/core';
import {
	AppearanceAnimation,
	DialogLayoutDisplay,
	DisappearanceAnimation,
	IToastCoreConfig,
	ToastNotificationInitializer,
	ToastPositionEnum,
	ToastProgressBarEnum,
	ToastUserViewTypeEnum
} from '@costlydeveloper/ngx-awesome-popup';
@Injectable({ providedIn: 'root' })
export class ToastService {
	success(title: string, message: string) {
		return this._toastDefault(title, message, DialogLayoutDisplay.SUCCESS).openToastNotification$();
	}

	warning(title: string, message: string) {
		return this._toastDefault(title, message, DialogLayoutDisplay.WARNING).openToastNotification$();
	}

	error(title: string, message: string) {
		return this._toastDefault(title, message, DialogLayoutDisplay.DANGER).openToastNotification$();
	}

	private _toastDefault(title: string, message: string, layoutType: DialogLayoutDisplay): ToastNotificationInitializer {
		const newToastNotification = new ToastNotificationInitializer();
		newToastNotification.setTitle(title);
		newToastNotification.setMessage(message);

		const configa = { ...this._configDefault(), ...{ layoutType } };
		newToastNotification.setConfig(configa);
		return newToastNotification;
	}

	toastNotification(title: string, message: string, config?: IToastCoreConfig) {
		const newToastNotification = new ToastNotificationInitializer();
		newToastNotification.setTitle(title);
		newToastNotification.setMessage(message);

		const newConfig = { ...this._configDefault(), ...config };

		newToastNotification.setConfig(newConfig);
		newToastNotification.openToastNotification$();
	}

	private _configDefault(): IToastCoreConfig {
		return {
			autoCloseDelay: 4000,
			textPosition: 'center',
			layoutType: DialogLayoutDisplay.SUCCESS,
			progressBar: ToastProgressBarEnum.INCREASE,
			toastUserViewType: ToastUserViewTypeEnum.SIMPLE,
			animationIn: AppearanceAnimation.SWING,
			animationOut: DisappearanceAnimation.FLIP_OUT,
			toastPosition: ToastPositionEnum.TOP_RIGHT
		};
	}
}
