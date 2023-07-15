import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedPipeModule } from './../../../commons/shared/shared-pipe.module';
import { BroadcastMediumEditComponent } from './broadcast-medium-edit/broadcast-medium-edit.component';
import { BroadcastMediumComponent } from './broadcast-medium.component';
import { CardContentCreatorComponent } from './card-content-creator/card-content-creator.component';

@NgModule({
	declarations: [BroadcastMediumComponent, CardContentCreatorComponent, BroadcastMediumEditComponent],
	imports: [
		CommonModule,
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		MatChipsModule,
		MatInputModule,
		MatFormFieldModule,
		ScrollingModule,
		MatCardModule,
		MatSelectModule,
		MatDialogModule,
		MatAutocompleteModule,
		ReactiveFormsModule,
		SharedPipeModule
	],
	exports: [BroadcastMediumComponent]
})
export class BroadcastMediumModule {}
