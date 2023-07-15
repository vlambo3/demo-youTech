import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SharedPipeModule } from '../../../commons/shared/shared-pipe.module';
import { MaintenanceTagFlowComponent } from './maintenance-tag-flow.component';

@NgModule({
	declarations: [MaintenanceTagFlowComponent],
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatCheckboxModule,
		MatTableModule,
		MatIconModule,
		SharedPipeModule,
		MatPaginatorModule,
		ReactiveFormsModule
	],
	exports: [MaintenanceTagFlowComponent]
})
export class MaintenanceTagFlowModule {}
