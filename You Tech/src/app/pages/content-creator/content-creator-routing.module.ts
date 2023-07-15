import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CONTENT_CREATOR_ROUTES } from '../../commons/routes/principal.routes';

@NgModule({
  imports: [RouterModule.forChild(CONTENT_CREATOR_ROUTES)],
  exports: [RouterModule],
})
export class ContentCreatorRoutingModule {}
