import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BaseBlockComponent } from './base-block/base-block.component';
import {ConnectorService} from "./services/connector.service";
import {ConnectorDirective} from "./dirrectives/connector-dirrective";
import { TestDataConnectorComponent } from './test-data-connector/test-data-connector.component';
import {DraggableDirective, DraggableRootDirective} from "./dirrectives/draggable.directive";
import { BpContainerComponent } from './bp-container/bp-container.component';
import { BpSplineComponent } from './bp-spline/bp-spline.component';
import {RootContainerDirrective} from "./dirrectives/root-container.dirrective";


@NgModule({
  declarations: [
    AppComponent,
    BaseBlockComponent,
    ConnectorDirective,
    DraggableDirective,
    TestDataConnectorComponent,
    BpContainerComponent,
    BpSplineComponent,
    RootContainerDirrective,
    DraggableRootDirective,
  ],
  imports: [
    BrowserModule
  ],
  providers: [ConnectorService],
  bootstrap: [AppComponent],
  schemas: [

  ]
})
export class AppModule { }
