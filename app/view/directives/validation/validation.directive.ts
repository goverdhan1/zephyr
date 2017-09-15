import {Directive, ElementRef, Inject, Input, HostListener} from '@angular/core';
declare var jQuery: any; // Declaring jQuery as global

@Directive({
    selector: '[validate]'
})

export class ValidationDirective {
    el;
    keypressList;
    @Input('validate') validate: string;
    constructor(el: ElementRef) {
        this.el = el.nativeElement;
        this.setKeypressList();
    }
    @HostListener('keypress', ['$event']) onKeyUp(ev) {
        let value = this.el.value + String.fromCharCode(ev.charCode);

        // checking for backspace as it also fires keypress in browsers (except safari and chrome)
        // ev.key is not available on safari, but it also doesn't fire keypress on backspace, so good there

        if(!(this.keypressList[this.validate].test(value) || 'Backspace' === ev.key)) {
            ev.preventDefault();
        }
    }
    setKeypressList() {
        this.keypressList =  {
            'alphabet2': /^[a-zA-Z]{0,2}$/,
            'number': /^[0-9]*$/,
            'numbernotzero' :/^[1-9]*$/
        };
    }
}
