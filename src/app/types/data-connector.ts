import {QueryConnector} from "./query-connector";
import {Connection, Connector} from "./interface";
import {ConnectorDirective} from "../dirrectives/connector-dirrective";

export class DataConnector implements Connector {
  constructor(
    private identification: string,
    private dataSource: any,
    private description?: string,
  ) {
  }

  // @ts-ignore
  readonly canConnect: Connector[] = [QueryConnector];
  readonly canBeExit: boolean = true
  readonly canBeEnter: boolean = false;
  readonly maxConnections?: number;

  connections: Connection[] = [];
  directive!: ConnectorDirective;

  getData(): any {
    return this.dataSource;
  }

  updateDataSource(dataSource: any): void {
    this.dataSource = dataSource;
  }

  onMove(): void {
    this.directive.calculateCoords();
  }
}
