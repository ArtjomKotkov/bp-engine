import {Directive, ElementRef, OnInit} from '@angular/core';


@Directive({
  selector: '[draggable]'
})
export class DraggableDirective {
  constructor(
    public el: ElementRef,
  ) {}
}


@Directive({
  selector: '[draggableRoot]'
})
export class DraggableRootDirective {
  constructor(
    public el: ElementRef,
  ) {}
}
