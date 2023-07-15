import { Routes } from '@angular/router';
import { AdministratorComponent } from '../../pages/administrator/administrator.component';
import { CreatorContentPageComponent } from '../../pages/administrator/creator-content-page/creator-content-page.component';
import { HomePageComponent } from '../../pages/home-page/home-page.component';
import { ContentCreatorComponent } from './../../pages/content-creator/content-creator.component';
import { ValidUserAdminGuard, ValidUserContentCreatorGuard } from './../guards/valid-user.guard';
import { PathWeb } from './path-web';

export const PRINCIPAL_ROUTES: Routes = [
	{
		path: '',
		component: HomePageComponent
	},
	{
		path: PathWeb.AUTH.register.path,
		title: PathWeb.AUTH.register.title,
		loadChildren: () => import('../../pages/register-page/register-page.module').then((m) => m.RegisterPageModule)
	},
	{
		path: PathWeb.CONTENT_CREATOR.path,
		canActivate: [ValidUserContentCreatorGuard],
		loadChildren: () => import('../../pages/content-creator/content-creator.module').then((m) => m.ContentCreatorModule)
	},
	{
		path: PathWeb.ADMINISTRATOR.path,
		canActivate: [ValidUserAdminGuard],
		loadChildren: () => import('../../pages/administrator/administrator.module').then((m) => m.AdministratorModule)
	}
];

export const CONTENT_CREATOR_ROUTES: Routes = [
	{
		path: '',
		component: ContentCreatorComponent,
		children: [
			{
				path: PathWeb.CONTENT_CREATOR.profile.path,
				title: PathWeb.CONTENT_CREATOR.profile.title,
				loadChildren: () =>
					import('../../pages/content-creator/profile-page/profile-page.module').then((m) => m.ProfilePageModule)
			},
			{
				path: PathWeb.CONTENT_CREATOR.broadcastMedium.path,
				title: PathWeb.CONTENT_CREATOR.broadcastMedium.title,
				loadChildren: () =>
					import('../../pages/content-creator/broadcast-medium-page/broadcast-medium-page.module').then(
						(m) => m.BroadcastMediumPageModule
					)
			},
			{
				path: '',
				pathMatch: 'full',
				redirectTo: PathWeb.CONTENT_CREATOR.profile.path
			}
		]
	}
];

export const ADMINISTRATOR_ROUTES: Routes = [
	{
		path: '',
		component: AdministratorComponent,
		children: [
			{
				path: PathWeb.ADMINISTRATOR.contentCreator.path,
				title: PathWeb.ADMINISTRATOR.contentCreator.title,
				component: CreatorContentPageComponent
			},
			{
				path: PathWeb.ADMINISTRATOR.maintenanceTag.path,
				title: PathWeb.ADMINISTRATOR.maintenanceTag.title,
				loadChildren: () =>
					import('../../pages/administrator/maintenance-tag-page/maintenance-tag-page.module').then(
						(m) => m.MaintenanceTagPageModule
					)
			},
			{
				path: PathWeb.ADMINISTRATOR.maintenanceBroadcastType.path,
				title: PathWeb.ADMINISTRATOR.maintenanceBroadcastType.title,
				loadChildren: () =>
					import(
						'../../pages/administrator/maintenance-broadcast-type-page/maintenance-broadcast-type-page.module'
					).then((m) => m.MaintenanceBroadcastTypePageModule)
			},
			{
				path: '',
				pathMatch: 'full',
				redirectTo: PathWeb.ADMINISTRATOR.contentCreator.path
			}
		]
	}
];
