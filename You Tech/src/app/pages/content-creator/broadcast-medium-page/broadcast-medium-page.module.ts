import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BroadcastMediumModule } from '../../../business/creator-content/broadcast-medium/broadcast-medium.module';
import { BroadcastMediumPageComponent } from './broadcast-medium-page.component';
const routes: Routes = [{ path: '', component: BroadcastMediumPageComponent }];

@NgModule({
  declarations: [BroadcastMediumPageComponent],
  imports: [RouterModule.forChild(routes), BroadcastMediumModule],
})
export class BroadcastMediumPageModule {}
