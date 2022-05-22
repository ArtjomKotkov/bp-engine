
import {AfterViewInit, Component, ComponentRef, OnInit, QueryList, ViewChild, ViewChildren} from "@angular/core";
import {DraggableDirective, DraggableRootDirective} from "../dirrectives/draggable.directive";
import {ConnectorDirective} from "../dirrectives/connector-dirrective";
import {ConnectorService} from "../services/connector.service";
import {BpSplineComponent} from "../bp-spline/bp-spline.component";


@Component({ template: '' })
export class BaseBlock implements OnInit, AfterViewInit{
  draggableElem?: HTMLElement;
  draggableRootElem?: HTMLElement;

  @ViewChild(DraggableDirective)
  set dragDir(directive: DraggableDirective) {
    this.draggableElem = directive?.el.nativeElement;
  };

  @ViewChild(DraggableRootDirective)
  set dragRootDir(directive: DraggableRootDirective) {
    this.draggableRootElem = directive?.el.nativeElement;
  };

  @ViewChildren(ConnectorDirective) connectorsDirectives!: QueryList<ConnectorDirective>;

  draggableElement: any | undefined;
  offset: Record<string, any> = {};

  constructor(private connectorService: ConnectorService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void  {
    this.bindConnectors();
    this.prepareDraggableZone();
  }

  bindConnectors(): void {
    this.connectorsDirectives.forEach(connectorDirective => {
      if (this.draggableRootElem) {
        connectorDirective.bindDraggableRoot(this.draggableRootElem);
      }
    });
  }

  prepareDraggableZone(): void {
    this.draggableElem?.addEventListener('mousedown', this.startDrag.bind(this));
    this.draggableElem?.addEventListener('mousemove', this.drag.bind(this));
    this.draggableElem?.addEventListener('mouseup', this.endDrag.bind(this));
    this.draggableElem?.addEventListener('mouseleave', this.endDrag.bind(this));
  }

  startDrag(event: MouseEvent) {
    if (this.draggableRootElem) {
      this.connectorService.blockContainer.appendChild(this.draggableRootElem);


      this.draggableElement = this.draggableRootElem;

      this.offset = {x: event.x, y: event.y};
      this.offset['x'] -= this.draggableElement.getAttribute('cx');
      this.offset['y'] -= this.draggableElement.getAttribute('cy');
    }
  }

  endDrag(event: Event) {
    this.draggableElement = undefined;
  }

  drag(event: MouseEvent) {
    if (this.draggableElement) {
      event.preventDefault();
      const coord = {x: event.x, y: event.y}

      this.draggableElement.setAttributeNS(null, "x", coord.x - this.offset['x']);
      this.draggableElement.setAttributeNS(null, "y", coord.y - this.offset['y']);

      this.draggableElement.setAttributeNS(null, "cx", coord.x - this.offset['x']);
      this.draggableElement.setAttributeNS(null, "cy", coord.y - this.offset['y']);

      this.moveBindings();
    }
  }

  getMousePosition(event: MouseEvent) {
    const svg = event.target as SVGGraphicsElement;
    const CTM = svg.getScreenCTM();
    if (!CTM) {
      return {x: 0, y: 0}
    }
    return {
      x: (event.clientX - CTM.e) / CTM.a,
      y: (event.clientY - CTM.f) / CTM.d
    };
  }

  moveBindings(): void {
    this.connectorsDirectives.forEach(connectorDirective => {
      connectorDirective.connector.onMove();
    });
  }

}
