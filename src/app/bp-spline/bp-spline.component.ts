import {Component, OnDestroy} from '@angular/core';
import {ConnectorPositionData, TwoDimCoords} from "../shared/position-interfaces";
import {Connector} from "../types/interface";
import {BehaviorSubject, combineLatest, of, Subscription} from "rxjs";
import {ConnectorService} from "../services/connector.service";
import {Position} from "../types/common";


@Component({
  selector: 'svg:svg[bp-spline]',
  templateUrl: './bp-spline.component.html',
  styleUrls: ['./bp-spline.component.css']
})
export class BpSplineComponent implements OnDestroy {
  inited = true;

  private connectorStart!: Connector;
  private connectorEnd!: Connector;
  isSample: boolean = false;

  bindingSubscription?: Subscription;
  private defaultSplineCurvatureOffset: number = 10;

  coordsString$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private connectorService: ConnectorService) {
  }

  ngOnDestroy(): void {
    this.bindingSubscription?.unsubscribe();
  }

  bind(connector1: Connector, connector2: Connector) {
    this.inited = true;

    this.connectorStart = connector1;
    this.connectorEnd = connector2;

    this.bindingSubscription = combineLatest(this.connectorStart.directive.coords, this.connectorEnd.directive.coords).subscribe(([startCoords, endCoords]) => {
      const connectorStartPositionData: ConnectorPositionData = {
        coords: startCoords,
        offsetX: 0, //this.connectorStart.directive.getXOffset(),
        position: this.connectorStart.directive.getPosition(),
      };

      const connectorEndPositionData: ConnectorPositionData = {
        coords: endCoords,
        offsetX: 0, //this.connectorEnd.directive.getXOffset(),
        position: this.connectorEnd.directive.getPosition(),
      };

      this.coordsString$.next( this.makeBezierPathString(connectorStartPositionData, connectorEndPositionData));
    });
  }

  bindAsSample(connector: Connector) {
    this.inited = true;
    this.connectorStart = connector;
    this.isSample = true;

    this.bindingSubscription = combineLatest(this.connectorStart.directive.coords, this.connectorService.mousePosition).subscribe(([startCoords, endCoords]) => {
      const connectorStartPositionData: ConnectorPositionData = {
        coords: startCoords,
        offsetX: 0, //this.connectorStart.directive.getXOffset(),
        position: this.connectorStart.directive.getPosition(),
      };

      const connectorEndPositionData: ConnectorPositionData = {
        coords: endCoords,
        offsetX: 0,
        position: this.connectorStart.directive.getPosition() == 'right' ? 'left' : 'right',
      };

      this.coordsString$.next( this.makeBezierPathString(connectorStartPositionData, connectorEndPositionData));
    });
  }

  makeSplineData(
    connectorData1: ConnectorPositionData,
    connectorData2: ConnectorPositionData,
  ): number[] {
    let controlPointX1!: number;
    let controlPointX2!: number;

    const x1 = connectorData1.coords.x;
    const y1 = connectorData1.coords.y;
    const x2 = connectorData2.coords.x;
    const y2 = connectorData2.coords.y;

    const sumDiff = Math.abs((x2 + x1) / 2);
    const subtDiff =  Math.abs((x1 - x2) / 2);

    const someVar = 0.98

    let offsetStraight = Math.pow(someVar, (x1 - x2) - 70);
    let offsetReverse = Math.pow(someVar, (x2 - x1) - 70);
    if (offsetStraight > 30) {
      offsetStraight = 30;
    }
    if (offsetReverse > 30) {
      offsetReverse = 30;
    }

    offsetStraight *= this.defaultSplineCurvatureOffset;
    offsetReverse *= this.defaultSplineCurvatureOffset;

    if (x1 > x2 && connectorData1.position == 'left') {
      controlPointX1 = sumDiff - offsetStraight;
      controlPointX2 = sumDiff + offsetStraight;
    } else if (x1 < x2 && connectorData1.position == 'right') {
      controlPointX1 = sumDiff + offsetReverse;
      controlPointX2 = sumDiff - offsetReverse;
    } else if (x1 > x2 && connectorData1.position == "right") {
      controlPointX1 = x1 + subtDiff + offsetReverse;
      controlPointX2 = x2 - subtDiff - offsetReverse;
    } else if (x1 < x2 && connectorData1.position == 'left') {
      controlPointX1 = x1 - subtDiff - offsetStraight;
      controlPointX2 = x2 + subtDiff + offsetStraight;
    }

    const controlPointY1 = y1;
    const controlPointY2 = y2;

    return [x1, y1, Number(controlPointX1), Number(controlPointY1), Number(controlPointX2), Number(controlPointY2), x2, y2];
  }

  makeBezierPathString(
    connectorData1: ConnectorPositionData,
    connectorData2: ConnectorPositionData,
  ): string {
    const bezierPointData1 = {
      ...connectorData1,
      coords: {
        x: connectorData1.coords.x + connectorData1.offsetX,
        y: connectorData1.coords.y,
      }
    };

    const bezierPointData2 = {
      ...connectorData2,
      coords: {
        x: connectorData2.coords.x + connectorData2.offsetX,
        y: connectorData2.coords.y,
      }
    };

    const calculatedPoints = this.makeSplineData(bezierPointData1, bezierPointData2);
    console.log(`M${connectorData1.coords.x} ${connectorData1.coords.y} H${calculatedPoints[0]} M${calculatedPoints[0]},${calculatedPoints[1]} C${calculatedPoints[2]},${calculatedPoints[3]} ${calculatedPoints[4]},${calculatedPoints[5]} ${calculatedPoints[6]},${calculatedPoints[7]} H${connectorData2.coords.x}`)
    return `M${connectorData1.coords.x} ${connectorData1.coords.y} H${calculatedPoints[0]} M${calculatedPoints[0]},${calculatedPoints[1]} C${calculatedPoints[2]},${calculatedPoints[3]} ${calculatedPoints[4]},${calculatedPoints[5]} ${calculatedPoints[6]},${calculatedPoints[7]} H${connectorData2.coords.x}`
  }

}
