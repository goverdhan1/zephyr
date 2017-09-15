import {Component, Input, Output, EventEmitter, ElementRef, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

/**
 * Calendar configuration
 * ------------------
 * formkey : formControl Element
 * model: model
 * minDate: minimum date
 * maxDate: maximum date
 * __________________
 * Markup for calendar
  <div class="datepicker-wrap">
    <calendar
      [formkey]= "form.controls['startDate']"
      [model]= "dt1"
      [minDate]="minDate"
      [maxDate]="maxDate">
    </calendar>
  </div>
 */
declare var jQuery:any;

@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html'
})

export class CalendarComponent implements AfterViewInit {
  @Input() formkey;
  //@Input() required;
  @Input() model;
  @Input() minDate;
  @Input() maxDate;
  @Input() dateDisabled;
  @Input() group;
  @Output() validateDate : EventEmitter<any> = new EventEmitter();

  showDatePicker: boolean;
  private el;

  constructor(private elementRef: ElementRef) {
    this.showDatePicker = false;
  }

  ngAfterViewInit() {
    this.el = this.elementRef.nativeElement;
    document.addEventListener('click', (e) => {
          if(jQuery(e.target).hasClass('inline-calendar-body')){
            this.showDatePicker = false;
          }else {
            this.closeDatepicker(e.target);
          }

    });
  }

  toggleDatepicker(e) {
    let arr = ['input-group date-group','input-group-addon','fa fa-calendar'];
    //check to toggle date pickerAd
    if(arr.indexOf(e.target.className) > -1){
      this.showDatePicker = !this.showDatePicker;
    }else if(jQuery(e.target).hasClass('inline-calendar-body')){
      this.showDatePicker = false;
    }
  }

  onChange(e, model) {
    //this.showDatePicker = false;
    setTimeout(() => {
      this.validateDate.emit();
    }, 0);
    //console.log('changed model', e, model);
  }

  isChild(targetEle, className) {
    while (targetEle !== null) {
      if (targetEle == className || (targetEle.tagName === 'TABLE' && targetEle.getAttribute('role') == 'grid')) {
        return targetEle;
      }
      targetEle = targetEle.parentNode;
    }
    return false;
  }

  closeDatepicker(target) {
    var ele = this.isChild(target, this.el);
    //console.log('truthy value for whether clicked', ele, target, this.el);
    if(!ele) {
      this.showDatePicker = false;
    }
  }
}
