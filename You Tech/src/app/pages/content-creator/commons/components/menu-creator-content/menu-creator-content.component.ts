import { Component, OnInit } from '@angular/core';
import { PathWeb } from '../../../../../commons/routes/path-web';
import { RouteService } from '../../../../../commons/services/local/route.service';

@Component({
  selector: 'app-menu-creator-content',
  templateUrl: './menu-creator-content.component.html',
  styleUrls: ['./menu-creator-content.component.scss'],
})
export class MenuCreatorContentComponent implements OnInit {
  menuSelected = '';

  readonly MENUS = [
    {
      path: PathWeb.CONTENT_CREATOR.profile.pathWithSlash,
      image: 'assets/images/profile.png',
      title: 'Perfil',
    },
    {
      path: PathWeb.CONTENT_CREATOR.broadcastMedium.pathWithSlash,
      image: 'assets/images/medium.png',
      title: 'Medios de difusión',
    },
  ];

  constructor(private _routerService: RouteService) {
    this._routerService.navigationEnd().subscribe((navigation) => {
      this.menuSelected = navigation.urlAfterRedirects;
    });
  }

  ngOnInit(): void {}
}
