import {ElementRef, HostListener, Directive, AfterViewInit, Input} from '@angular/core';

@Directive({
    selector: '[invisible]'
})

export class InvisibleDirective implements AfterViewInit{
  @Input() invisible: Boolean;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    if (this.invisible) {
      this.el.nativeElement.style.visibility = 'hidden';
    }
  }

}
