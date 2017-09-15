import { ElementRef, HostListener, Directive} from '@angular/core';

@Directive({
    selector: 'textarea[autosize]'
})

export class AutosizeDirective {
 debounceGrow: any = null;
 @HostListener('input',['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }
 @HostListener('focus',['$event.target'])
  onFocus(textArea: HTMLTextAreaElement): void {
    this.element.nativeElement.style.width = '100%';
    this.element.nativeElement.style.overflow = 'hidden';
    this.element.nativeElement.style.height = '30px';
    this.adjust();
  }
  constructor(public element: ElementRef) {
  }
  adjust(): void {
    if(this.debounceGrow) {
      clearTimeout(this.debounceGrow);
    }
    this.debounceGrow = setTimeout(()=>{
      if(this.element.nativeElement.scrollHeight >= 180) {
        this.element.nativeElement.style.overflow = 'initial';
      }
      this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + 'px';
    },150);
  }
}
