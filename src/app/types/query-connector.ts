import {Connection, Connector} from "./interface";
import {DataConnector} from "./data-connector";
import {ConnectorDirective} from "../dirrectives/connector-dirrective";


export class QueryConnector implements Connector {
  constructor(
    private identification: string,
    private description?: string,
    private connectLimit?: number,
  ) {
  }

  // @ts-ignore
  readonly canConnect: Connector[] = [DataConnector];
  readonly canBeEnter: boolean = true;
  readonly canBeExit: boolean = false;
  readonly maxConnections?: number = 1;

  connections: Connection[] = [];
  directive!: ConnectorDirective;

  onMove(): void {
    this.directive.calculateCoords();
  }
}
