import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceTagFlowModule } from '../../../business/administrator/maintenance-tag-flow/maintenance-tag-flow.module';
import { MaintenanceTagPageComponent } from './maintenance-tag-page.component';

const routes: Routes = [{ path: '', component: MaintenanceTagPageComponent }];

@NgModule({
  declarations: [MaintenanceTagPageComponent],
  imports: [RouterModule.forChild(routes), MaintenanceTagFlowModule],
})
export class MaintenanceTagPageModule {}
