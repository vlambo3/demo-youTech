import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { AvatarComponent } from '../../../../../commons/components/avatar/avatar.component';
import { SharedPipeModule } from '../../../../../commons/shared/shared-pipe.module';
import { CreatorContentDetailComponent } from './creator-content-detail.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
	declarations: [CreatorContentDetailComponent, DetailComponent],
	imports: [
		CommonModule,
		MatTabsModule,
		AvatarComponent,
		MatButtonModule,
		MatIconModule,
		MatChipsModule,
		SharedPipeModule,
		LayoutModule
	],
	exports: [CreatorContentDetailComponent]
})
export class CreatorContentDetailModule {}
