import {ComponentRef, Directive, ElementRef, Input, OnInit} from '@angular/core';
import {ConnectorService} from "../services/connector.service";
import {TwoDimCoords} from "../shared/position-interfaces";
import {Connector} from "../types/interface";
import {BehaviorSubject} from "rxjs";
import {Position} from "../types/common";


@Directive({
  selector: '[connector]'
})
export class ConnectorDirective implements OnInit{

  @Input() connector!: Connector;

  draggableRoot!: HTMLElement;

  coords: BehaviorSubject<TwoDimCoords> = new BehaviorSubject<TwoDimCoords>({x: 0, y: 0});
  basicXOffset: number = 5;

  constructor(
    private el: ElementRef,
    private connectorService: ConnectorService,
  ) {
  }

  ngOnInit() {
    this.connector.directive = this;
    this.calculateCoords();

    this.el.nativeElement.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.el.nativeElement.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  bindDraggableRoot(element: HTMLElement): void {
    this.draggableRoot = element;
  }

  handleMouseDown(event: MouseEvent) {
    if (!this.connector.maxConnections || this.connector.connections.length < this.connector.maxConnections) {
      this.connectorService.setStartPoint(this.connector);
      this.connectorService.rootComponent.sampleSpline = this.connectorService.makeSampleConnector(this.connector);
    }
  }

  handleMouseUp(event: MouseEvent) {
    this.connectorService.setEndPoint(this.connector);
    this.connectorService.rootComponent.sampleSpline?.destroy();
  }

  calculateCoords(): void {
    const rectData = this.el.nativeElement.getBoundingClientRect();
    const inaccuracy = this.getFigureInaccuracy();

    this.coords.next({
      x: rectData.x + inaccuracy.x,
      y: rectData.y + inaccuracy.y,
    });
  }

  getPosition(): Position {
    let x = this.getElementXCenter();
    const draggableRootWidth = Number(this.draggableRoot.getAttribute('width'));

    return x < draggableRootWidth / 2 ? 'left' : 'right';
  }

  getFigureInaccuracy(): TwoDimCoords {
    switch (this.el.nativeElement.tagName) {
      case "circle":
        const radius = this.el.nativeElement.getAttribute('r');
        return {x: Number(radius), y: Number(radius)};
      case "rect":
        return {x: this.el.nativeElement.getAttribute('width') / 2, y: this.el.nativeElement.getAttribute('height') / 2}
      default:
        return {x: 0, y: 0};
    }
  }

  getElementXCenter(): number {
    let x = 0;

    switch (this.el.nativeElement.tagName) {
      case "circle":
        x = Number(this.el.nativeElement.getAttribute('cx'));
        break;
      case "rect":
        x = Number(this.el.nativeElement.getAttribute('x')) + this.el.nativeElement.getAttribute('width') / 2;
        break;
    }

    return x;
  }

  getXOffset(): number {
    const draggableRootWidth = Number(this.draggableRoot.getAttribute('width'));

    let x = this.getElementXCenter();
    const offset = x > draggableRootWidth / 2 ? draggableRootWidth - x : x;

    const finalOffset = this.basicXOffset + offset;
    return this.getPosition() == 'left' ? -finalOffset : finalOffset;
  }

}
