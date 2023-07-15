import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ADMINISTRATOR_ROUTES } from '../../commons/routes/principal.routes';

@NgModule({
  imports: [RouterModule.forChild(ADMINISTRATOR_ROUTES)],
  exports: [RouterModule],
})
export class AdministratorRoutingModule {}
