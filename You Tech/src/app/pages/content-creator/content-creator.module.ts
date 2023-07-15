import { NgModule } from '@angular/core';
import { MenuCreatorContentModule } from './commons/components/menu-creator-content/menu-creator-content.module';
import { ContentCreatorRoutingModule } from './content-creator-routing.module';
import { ContentCreatorComponent } from './content-creator.component';

@NgModule({
  declarations: [ContentCreatorComponent],
  imports: [ContentCreatorRoutingModule, MenuCreatorContentModule],
})
export class ContentCreatorModule {}
