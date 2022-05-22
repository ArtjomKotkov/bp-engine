import {ComponentRef, Injectable} from "@angular/core";
import {TwoDimCoords} from "../shared/position-interfaces";
import {BpContainerComponent} from "../bp-container/bp-container.component";
import {BpSplineComponent} from "../bp-spline/bp-spline.component";
import {InitConnectorService} from "./init-connector.service";
import {Connector} from "../types/interface";


@Injectable()
export class BinderConnectorService extends InitConnectorService{

  override rootComponent!: BpContainerComponent;

  makeConnector(connector1: Connector, connector2: Connector): ComponentRef<BpSplineComponent>  {
    const componentRef = this.rootComponent.createSpline(BpSplineComponent);
    componentRef.instance.bind(connector1, connector2);
    return componentRef;
  }

  makeSampleConnector(connector: Connector): ComponentRef<BpSplineComponent> {
    const componentRef = this.rootComponent.createSpline(BpSplineComponent);
    componentRef.instance.bindAsSample(connector);
    return componentRef;
  }

}
