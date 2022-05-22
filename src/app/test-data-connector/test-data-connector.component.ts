import { Component, OnInit } from '@angular/core';
import {BaseBlock} from "../types/base-block";
import {DataConnector} from "../types/data-connector";
import {ConnectorService} from "../services/connector.service";
import {QueryConnector} from "../types/query-connector";


@Component({
  selector: 'g[test-base-block]',
  templateUrl: './test-data-connector.component.html',
  styleUrls: ['./test-data-connector.component.css']
})
export class TestDataConnectorComponent extends BaseBlock implements OnInit {

  dataConnector = new DataConnector('data', 'some data');
  data2Connector = new QueryConnector('data', 'some data')

  constructor(connectorService: ConnectorService) {
    super(connectorService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

}
