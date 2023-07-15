import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CardCreatorComponent } from '../components/card-creator/card-creator.component';

@NgModule({
  declarations: [CardCreatorComponent],
  imports: [MatCardModule],
  exports: [CardCreatorComponent],
})
export class SharedComponentsModule {}
