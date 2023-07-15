import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeaderChannelService {
  private headerSource = new Subject<boolean>();
  channelHeader$ = this.headerSource.asObservable();

  showUser(): void {
    this.headerSource.next(true);
  }
}
