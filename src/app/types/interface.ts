import {ConnectorDirective} from "../dirrectives/connector-dirrective";
import {BpSplineComponent} from "../bp-spline/bp-spline.component";
import {ComponentRef} from "@angular/core";


export interface Connection {
  endpoints: Connector[],
  binderComponent: ComponentRef<BpSplineComponent>,
}

export interface Connector {
  readonly canConnect: Connector[];
  readonly canBeEnter: boolean;
  readonly canBeExit: boolean;
  readonly maxConnections?: number;

  connections: Connection[];
  directive: ConnectorDirective;

  onMove: () => void;
}
