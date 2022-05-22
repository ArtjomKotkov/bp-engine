import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {DOCUMENT} from '@angular/common'
import {BaseBlock} from "../types/base-block";
import {QueryConnector} from "../types/query-connector";
import {ConnectorService} from "../services/connector.service";
import {DataConnector} from "../types/data-connector";


@Component({
  selector: 'g[app-base-block]',
  templateUrl: './base-block.component.html',
  styleUrls: ['./base-block.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseBlockComponent extends BaseBlock implements OnInit {
  stageDataConnector = new QueryConnector('stage')
  stageDataConnector2 = new DataConnector('stage', 2)

  constructor(
    @Inject(DOCUMENT) private _document: HTMLDocument,
    connectorService: ConnectorService
  ) {
    super(connectorService);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

}
