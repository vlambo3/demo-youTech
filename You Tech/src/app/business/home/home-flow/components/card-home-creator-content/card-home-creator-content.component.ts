import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICardContentCreatorComponente } from '../../model/component.interface';

@Component({
	selector: 'app-card-home-creator-content',
	templateUrl: './card-home-creator-content.component.html',
	styleUrls: ['./card-home-creator-content.component.scss']
})
export class CardHomeCreatorContentComponent {
	@Input() dataCard?: ICardContentCreatorComponente;
	@Output() clickCard = new EventEmitter<ICardContentCreatorComponente>();
}
