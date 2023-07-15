import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CardHomeCreatorContentModule } from './components/card-home-creator-content/card-home-creator-content.module';
import { HomeFlowComponent } from './home-flow.component';

@NgModule({
	declarations: [HomeFlowComponent],
	imports: [
		CommonModule,
		MatInputModule,
		MatChipsModule,
		MatButtonModule,
		MatCardModule,
		MatIconModule,
		MatFormFieldModule,
		MatAutocompleteModule,
		FormsModule,
		ReactiveFormsModule,
		CardHomeCreatorContentModule,
		MatDialogModule
	],
	exports: [HomeFlowComponent]
})
export class HomeFlowModule {}
