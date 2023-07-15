import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	ConfirmBoxConfigModule,
	DialogConfigModule,
	NgxAwesomePopupModule,
	ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerModule } from './commons/components/container/container.module';
import { ApiInterceptor } from './commons/interceptors/api-interceptor';
import { ErrorApiInterceptor } from './commons/interceptors/error-api.interceptor';
import { HomePageModule } from './pages/home-page/home-page.module';
@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ContainerModule,
		HomePageModule,
		HttpClientModule,
		NgxUiLoaderModule,
		NgxAwesomePopupModule.forRoot({
			colorList: {
				info: '#943126', // optional
				success: '#1E8449', // optional
				warning: '#F39C12', // optional
				danger: '#e91e63' // optional
			}
		}), // Essential, mandatory main module.
		DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
		ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
		ToastNotificationConfigModule.forRoot(),

		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideStorage(() => getStorage()) // Needed for instantiating toast notifications.
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorApiInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
