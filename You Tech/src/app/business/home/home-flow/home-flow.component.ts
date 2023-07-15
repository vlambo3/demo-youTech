import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { IResponseContentCreatorHome, IResponseTags } from '../../../commons/services/api/home/home-api.interface';
import { HomeApiService } from '../../../commons/services/api/home/home-api.service';
import { CreatorContentDetailComponent } from './components/creator-content-detail/creator-content-detail.component';
import { ICardContentCreatorComponente } from './model/component.interface';
@Component({
	selector: 'app-home-flow',
	templateUrl: './home-flow.component.html',
	styleUrls: ['./home-flow.component.scss']
})
export class HomeFlowComponent implements OnInit {
	@ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

	separatorKeysCodes: number[] = [ENTER, COMMA];
	tagsCtrl = new FormControl('');
	searCtrl = new FormControl('');

	tags: IResponseTags[] = [];
	allTags: IResponseTags[] = [];

	filteredTags!: Observable<IResponseTags[]>;

	constructor(public dialog: MatDialog, private _homeApiService: HomeApiService) {
		this.filteredTags = this.tagsCtrl.valueChanges.pipe(
			debounceTime(100),
			startWith(null),
			map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice()))
		);
	}
	listContentCreator: IResponseContentCreatorHome[] = [];

	ngOnInit(): void {
		this._loadAll();
	}

	clickBuscar(): void {
		if (this.tags.length > 0 && this.searCtrl.value) {
			this._homeApiService
				.findByTagsName({ name: this.searCtrl.value, dTags: this.tags.map((item) => item.idTag) })
				.subscribe((response) => {
					if (response.success) {
						this.listContentCreator = response.data;
					}
				});
		}

		if (this.tags.length > 0) {
			this._homeApiService.findByTags(this.tags.map((item) => item.idTag)).subscribe((response) => {
				if (response.success) {
					this.listContentCreator = response.data;
				}
			});
		}
	}

	clickClear(): void {
		this.searCtrl.setValue('');
		this.tagsCtrl.setValue('');
		this.tagInput.nativeElement.value = '';
		this.tags = [];
		this._loadAllContent();
	}

	private _loadAllContent() {
		this._homeApiService.getAllContentCreator().subscribe((response) => {
			if (response.success) {
				this.listContentCreator = response.data;
			}
		});
	}

	private _loadAll() {
		this._homeApiService
			.getAllContentCreator()
			.pipe(switchMap((creator) => this._homeApiService.getActiveTags().pipe(map((tag) => ({ creator, tag })))))
			.subscribe((response) => {
				if (response.creator.success) {
					this.listContentCreator = response.creator.data;
				}

				if (response.tag.success) {
					this.allTags = response.tag.data;
				}
			});
	}

	remove(tag: IResponseTags): void {
		const index = this.tags.indexOf(tag);
		if (index >= 0) {
			this.tags.splice(index, 1);
		}
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		const valueString = event.option.viewValue.toLocaleLowerCase();

		const findValue = this.allTags.find((item) => item.description.toLocaleLowerCase() === valueString);
		if (findValue) {
			//Verificamoa que el valor seleccionado ya existe
			const findInTagsSelected = this.tags.find((item) => item.idTag === findValue.idTag);
			if (!findInTagsSelected) {
				this.tags.push(findValue);
			}

			this.tagInput.nativeElement.value = '';
			this.tagsCtrl.setValue('');
		}
	}

	clickCard(item: ICardContentCreatorComponente) {
		if (item.countBroadcastMedium === 0) {
			return;
		}

		const modal = this.dialog.open(CreatorContentDetailComponent, {
			maxWidth: '800px',
			data: { idContentCreator: item.idContentCreator },
			panelClass: 'modal-principal'
		});

		modal.afterClosed().subscribe(() => modal.removePanelClass('modal-principal'));
	}

	private _filter(value: string): IResponseTags[] {
		const filterValue = value.toLowerCase();
		return this.allTags.filter((tag) => tag.description.toLocaleLowerCase().includes(filterValue));
	}
}
