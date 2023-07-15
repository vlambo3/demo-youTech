import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	standalone: true,
	selector: 'app-avatar',
	templateUrl: './avatar.component.html',
	styleUrls: ['./avatar.component.scss'],
	imports: [CommonModule]
})
export class AvatarComponent {
	@Input() pathImage!: string;
	@Input() width = 50;
	@Input() activeCursor = false;
}
