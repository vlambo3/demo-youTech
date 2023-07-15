import { Component, OnInit } from '@angular/core';
import { PathWeb } from '../../commons/routes/path-web';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss'],
})
export class AdministratorComponent implements OnInit {
  readonly PATH_CONTENT_CREATOR =
    PathWeb.ADMINISTRATOR.contentCreator.pathWithSlash;

  readonly PATH_MAINTENANCE_TAGS =
    PathWeb.ADMINISTRATOR.maintenanceTag.pathWithSlash;
  readonly PATH_MAINTENANCE_BROADCASTTYPE =
    PathWeb.ADMINISTRATOR.maintenanceBroadcastType.pathWithSlash;

  constructor() {}

  ngOnInit(): void {}
}
