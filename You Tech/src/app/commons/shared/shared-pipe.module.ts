import { NgModule } from '@angular/core';
import { BroadcastTypeImagePipe } from '../pipes/broadcast-type.pipe';
import { statusRegisterPipe } from '../pipes/status.pipe';

@NgModule({
	declarations: [BroadcastTypeImagePipe, statusRegisterPipe],
	exports: [BroadcastTypeImagePipe, statusRegisterPipe]
})
export class SharedPipeModule {}
