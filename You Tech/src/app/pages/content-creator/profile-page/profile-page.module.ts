import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileFlowModule } from '../../../business/creator-content/profile-flow/profile-flow.module';
import { ProfilePageComponent } from './profile-page.component';

const routes: Routes = [{ path: '', component: ProfilePageComponent }];

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [RouterModule.forChild(routes), ProfileFlowModule],
})
export class ProfilePageModule {}
