import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RouteService {
  constructor(private _router: Router) {}

  navigationEnd() {
    return this._router.events.pipe(
      filter((value) => value instanceof NavigationEnd),
      map((value) => value as NavigationEnd)
    );
  }
}
