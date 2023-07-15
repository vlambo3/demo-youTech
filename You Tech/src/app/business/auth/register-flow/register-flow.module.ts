import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RegisterFlowComponent } from './register-flow.component';

@NgModule({
	declarations: [RegisterFlowComponent],
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		ReactiveFormsModule,
		MatCardModule,
		MatRippleModule,
		LayoutModule
	],
	exports: [RegisterFlowComponent]
})
export class RegisterFlowModule {}
