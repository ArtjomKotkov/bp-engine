import {Directive, ViewContainerRef} from '@angular/core';


@Directive({
  selector: '[root]'
})
export class RootContainerDirrective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
