import {Injectable} from "@angular/core";

import {BpContainerComponent} from "../bp-container/bp-container.component";
import {Element} from "@angular/compiler";
import {Subject} from "rxjs";
import {TwoDimCoords} from "../shared/position-interfaces";


@Injectable()
export class InitConnectorService {

  rootComponent!: BpContainerComponent;
  rootElement!: HTMLElement;
  blockContainer!: HTMLElement;
  mousePosition: Subject<TwoDimCoords> = new Subject<TwoDimCoords>();

  bindRoot(component: BpContainerComponent, rootElement: HTMLElement, blockContainer: HTMLElement) {
    this.rootComponent = component;
    this.rootElement = rootElement;
    this.blockContainer = blockContainer;
    this.rootElement.addEventListener('mousemove', this.handleMouseDown.bind(this));
  }

  handleMouseDown(event: MouseEvent): void {
    this.mousePosition.next({x: event.x, y: event.y});
  }

}
