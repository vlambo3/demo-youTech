import { Pipe, PipeTransform } from '@angular/core';
import { BROADCAST_TYPE } from '../util/broadcast-type.enum';

@Pipe({
	name: 'broadcastTypeImage'
})
export class BroadcastTypeImagePipe implements PipeTransform {
	transform(value: number): string {
		switch (value) {
			case BROADCAST_TYPE.YOUTUBE:
				return 'assets/images/logoyoutube.png';
			case BROADCAST_TYPE.TWITCH:
				return 'assets/images/logotwitch.png';
			case BROADCAST_TYPE.SPOTIFY:
				return 'assets/images/logopotify.png';
			default:
				return 'assets/images/sitio-web.png';
		}
	}
}
