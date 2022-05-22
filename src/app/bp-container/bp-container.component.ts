import {AfterViewInit, Component, ComponentRef, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {ConnectorService} from "../services/connector.service";
import {RootContainerDirrective} from "../dirrectives/root-container.dirrective";
import {BpSplineComponent} from "../bp-spline/bp-spline.component";

@Component({
  selector: 'app-bp-container',
  templateUrl: './bp-container.component.html',
  styleUrls: ['./bp-container.component.css']
})
export class BpContainerComponent implements AfterViewInit {

  @ViewChild('splineContainer', { read: ViewContainerRef }) splineContainer!: ViewContainerRef;
  @ViewChild('blockContainer', { read: ViewContainerRef }) blockContainer!: ViewContainerRef;

  @ViewChild('root', { read: ViewContainerRef }) root!: ViewContainerRef;

  sampleSpline?: ComponentRef<BpSplineComponent>;

  constructor(
    private connectorService: ConnectorService,
  ) { }

  ngAfterViewInit() {
    this.connectorService.bindRoot(
      this,
      this.root.element.nativeElement,
      this.blockContainer.element.nativeElement,
    );
    this.root.element.nativeElement.addEventListener('mouseup', () => this.sampleSpline?.destroy());
  }

  createSpline(component: Type<BpSplineComponent>): ComponentRef<BpSplineComponent> {
    return this.splineContainer.createComponent<BpSplineComponent>(component);
  }

}
