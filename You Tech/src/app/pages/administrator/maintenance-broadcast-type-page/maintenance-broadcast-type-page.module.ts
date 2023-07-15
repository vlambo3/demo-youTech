import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceBroadcastTypeFlowModule } from '../../../business/administrator/maintenance-broadcast-type-flow/maintenance-broadcast-type-flow.module';
import { MaintenanceBroadcastTypePageComponent } from './maintenance-broadcast-type-page.component';

const routes: Routes = [
  { path: '', component: MaintenanceBroadcastTypePageComponent },
];

@NgModule({
  declarations: [MaintenanceBroadcastTypePageComponent],
  imports: [RouterModule.forChild(routes), MaintenanceBroadcastTypeFlowModule],
})
export class MaintenanceBroadcastTypePageModule {}
