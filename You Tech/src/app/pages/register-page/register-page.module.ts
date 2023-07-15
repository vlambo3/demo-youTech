import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterFlowModule } from '../../business/auth/register-flow/register-flow.module';
import { RegisterPageComponent } from './register-page.component';

const routes: Routes = [{ path: '', component: RegisterPageComponent }];

@NgModule({
  declarations: [RegisterPageComponent],
  imports: [RouterModule.forChild(routes), RegisterFlowModule],
})
export class RegisterPageModule {}
