import {OnChanges, Component, Input, Output, EventEmitter, ElementRef, AfterViewInit, OnDestroy, NgZone} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {DATE_RANGES} from './constants';
import './date_range_picker.scss';

declare var moment, _, $;
var DrpSelf = null;

@Component({
  selector: 'date-range-picker',
  templateUrl: 'date_range_picker.html'
})

export class DateRangePickerComponent implements OnChanges, OnDestroy {
  @Input() dateRange;
  //@Input() required;
  @Input() startDate;
  @Input() endDate;

  @Output() dateChanged: EventEmitter<any> = new EventEmitter();

  showStartDatePicker = false;
  showEndDatePicker = false;

  dateRanges = DATE_RANGES;

  constructor(private elementRef: ElementRef, private zone:NgZone) {
    DrpSelf = this;
    this.wireHandlers();
  }

  handler(e) {
    if (this.showEndDatePicker || this.showStartDatePicker) {
      let parents = $(e.target).parents();

      let lastParent = parents[parents.length - 1];

      if ((lastParent && (lastParent.tagName === "TR" || lastParent.tagName === "HTML")) && $(e.target).parents("date-range-picker").length === 0) {

        this.zone.run(() => {
          this.showStartDatePicker = false;
          this.showEndDatePicker = false;
        });

      }
    }
  }

  wireHandlers() {
    setTimeout(() => {
      $(document).on("click.date_range_picker", (e) => {
        this.handler(e);
      });
    });
  }

  ngOnDestroy() {
    let DrpSelf = this;
    $(document).off("click.date_range_picker");
  }

  showStartDatePickerBlock($event ) {
    this.showEndDatePicker = false;
    this.showStartDatePicker = !this.showStartDatePicker;
    $event.stopImmediatePropagation();
  }

  showEndDatePickerBlock($event) {
    this.showStartDatePicker = false;
    this.showEndDatePicker = !this.showEndDatePicker;
    $event.stopImmediatePropagation();
  }

  ngOnChanges(changes) {
   // console.log(changes);
  }

  dateRangeChanged(value) {
    this.dateRange = [value.id];
    this.endDate = moment().toDate();

    switch(parseInt(value.id)) {
      case 1 :
        this.startDate = moment().add(-1, 'days').toDate();
        break;

      case 6 :
        this.startDate = moment().add(-6, 'days').toDate();
        break;

      case 14 :
        this.startDate = moment().add(-14, 'days').toDate();
        break;

      case 29 :
        this.startDate = moment().add(-29, 'days').toDate();
        break;

      case 89 :
        this.startDate = moment().add(-89, 'days').toDate();
        break;

      case 364 :
        this.startDate = moment().add(-364, 'days').toDate();
        break;

      case 0 :
        break;
    }

    // this.emitDateChange();
  }

  emitDateChange() {
    if (this.dateChanged) {
      this.dateChanged.emit({
        dateRange : this.dateRange,
        startDate : this.startDate,
        endDate : this.endDate,
      });
    }
  }

  onDateChange(isStartDate) {
    let diff = moment(this.startDate).diff(this.endDate, 'days');

    if (diff <= 0) {
      let filteredDateRange = _.filter(this.dateRanges, {id : Math.abs(parseInt(diff)).toString()});

      if (!filteredDateRange.length) {
        this.dateRange = [0];
      }
    }

    this.emitDateChange();
  }

}
