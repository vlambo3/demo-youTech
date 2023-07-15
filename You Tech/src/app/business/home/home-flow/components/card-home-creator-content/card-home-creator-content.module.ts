import { CardHomeCreatorContentComponent } from './card-home-creator-content.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [CardHomeCreatorContentComponent],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports:[CardHomeCreatorContentComponent]
})
export class CardHomeCreatorContentModule { }
