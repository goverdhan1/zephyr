import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ze-counter',
  templateUrl: 'ze_counter.html'
})
export class ZeCounterComponent {
  counterValue = 0;
  @Output() counterChange = new EventEmitter();

  @Output() callback:EventEmitter<string> = new EventEmitter();

  callbackEvent() {
    this.callback.emit('called');
  }

  @Input()
  get counter() {
    return this.counterValue;
  }

  set counter(val) {
    this.counterValue = val;
    this.counterChange.emit(this.counterValue);
  }

  decrement() {
    this.counter--;
    this.callbackEvent();
  }

  increment() {
    this.counter++;
    this.callbackEvent();
  }
}
