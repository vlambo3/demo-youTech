import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PRINCIPAL_ROUTES } from './commons/routes/principal.routes';

@NgModule({
  imports: [RouterModule.forRoot(PRINCIPAL_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
