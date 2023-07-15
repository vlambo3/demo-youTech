import { NgModule } from '@angular/core';
import { HomeFlowModule } from '../../business/home/home-flow/home-flow.module';
import { HomePageComponent } from './home-page.component';

@NgModule({
  declarations: [HomePageComponent],
  imports: [HomeFlowModule],
})
export class HomePageModule {}
