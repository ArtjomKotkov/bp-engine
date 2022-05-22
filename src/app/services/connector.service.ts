import {AfterViewInit, Injectable, OnInit} from "@angular/core";
import {Connection, Connector} from "../types/interface";
import {BinderConnectorService} from "./binder-connector.service";
import {Subject} from "rxjs";
import {TwoDimCoords} from "../shared/position-interfaces";


@Injectable()
export class ConnectorService extends BinderConnectorService{

  startPoint?: Connector;

  setStartPoint(item: Connector) {
    this.startPoint = item;
  }

  setEndPoint(item: Connector) {
    if (this.startPoint) {
      if (this.startPoint === item) {
        this.stop();
        return;
      }

      if (!this.checkConnectionAvailability(this.startPoint, item)) {
        this.stop();
        return;
      }

      if (this.checkConnectionAlreadyExist(this.startPoint, item)) {
        this.stop();
        return;
      }

      const connection: Connection = {
        endpoints: [this.startPoint, item],
        binderComponent: this.makeConnector(this.startPoint, item),
      };

      this.startPoint.connections.push(connection);
      item.connections.push(connection);

      this.stop();
    } else {
      this.stop();
    }
  }

  checkConnectionAvailability(startConn: Connector, endConn: Connector): boolean {
    // @ts-ignore
    return endConn.canConnect.some(connectorType => startConn instanceof connectorType)
  }

  checkConnectionAlreadyExist(startConn:Connector, endConn: Connector): boolean {
    return startConn.connections.some(connection => {
      return connection.endpoints[0] === startConn && connection.endpoints[1] === endConn
        ||  connection.endpoints[0] === endConn && connection.endpoints[1] === startConn;
    })
  }

  stop(): void {
    this.startPoint = undefined;
  }
}
