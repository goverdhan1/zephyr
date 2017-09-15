import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, style } from '@angular/core';
declare var jQuery;
/**
 * Estimated time configuration
 * ------------------
 * value : string in format DD:HH:MM
 * editMode: true/false
 * __________________
 * Markup for estimated time
    <zui-estimated-time
      [value]= "estimatedTime"
      [editMode]="true">
    </zui-estimated-time>
 */
const SECONDS_IN_DAY = 86400;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

@Component({
    selector: 'zui-estimated-time',
    template: `
        <div *ngIf="!editMode"><span>{{dayText}}</span>:<span>{{hourText}}</span>:<span>{{minuteText}}</span></div>
        <div class="estimate-time-edit" *ngIf="editMode">
             <input class="form-control" id="dayText" type="text" maxlength="2" [(ngModel)]="dayText" (keypress)="isNumberValid($event)" (blur)="onDayFocusout($event)" (change)="validateDay($event)"/>
            <input class="form-control" id="hourText" type="text" maxlength="2" [(ngModel)]="hourText" (keypress)="isNumberValid($event)" (blur)="onHourFocusout($event)" (change)="validateHour($event)"/>
            <input class="form-control" id="minuteText" type="text" maxlength="2" [(ngModel)]="minuteText" (keypress)="isNumberValid($event)" (blur)="onMinuteFocusout($event)" (change)="validateMinute($event)"/>
        </div>
    `
})

export class EstimatedTimeComponent implements AfterViewInit, OnChanges {
    @Input() value;
    @Input() editMode;
    @Output() onDurationUpdate = new EventEmitter();
    @Output() onValidate = new EventEmitter();
    private day: any = '00';
    private hour: any = '00';
    private minute: any = '00';
    private dayText;
    private hourText;
    private minuteText;
    ngOnChanges(changedNode) {
        this.convertSecondsToDuration();
    }
    ngAfterViewInit() {
        this.convertSecondsToDuration();
    }
    isNumber(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
    isNumberValid(evt){
      let value = evt.target.value;

      if(evt.target.value === "" || evt.target.value.length === 2){
        value = String.fromCharCode(evt.which || evt.keycode);
      }else{
        value = parseInt(evt.target.value) + String.fromCharCode(evt.which || evt.keycode);
      }

       if(!this.isNumber(evt)|| value.length > 2)  {
          return false;
        }
      switch(evt.target.id){
            case 'dayText':if (parseInt(value) < 100) {
              return  true;
            } break;
            case 'hourText':
              if (parseInt(value) < 24) {
                return  true;
              } break;
            case 'minuteText':
              if (parseInt(value) < 60) {
                return true;
              } break;
            default:
              return false;
          }
         return false;
        }
    getNumberFromString(value, defaultValue) {
        let numValue = Number(value);
        if (!isNaN(numValue)) {
            return numValue;
        }
        return (defaultValue || 0);
    }
    onDayFocusout(ev) {
        if (parseInt(ev.target.value) > 99 ||(parseInt(ev.target.value) > 23 && parseInt(this.day) >= 99)|| parseInt(ev.target.value) < 0 ) {
         // console.log('value is beyond imposed limits');
          return false;
        }
        this.dayText = (this.dayText && this.dayText.length <= 0) || isNaN(this.dayText) ? this.day : this.dayText;

        this.day = this.getNumberFromString(this.dayText, this.day);

        this.convertDurationToSecond();
        this.emitOnDurationUpdate();
    }
    onHourFocusout(ev) {
        if ((parseInt(ev.target.value) > 23 && parseInt(this.day) >= 99)|| parseInt(ev.target.value) < 0  ) {
         // console.log('value is beyond imposed limits');
          return false;
        }
        this.hourText = (this.hourText && this.hourText.length <= 0) || isNaN(this.hourText) ? this.hour : this.hourText;
        this.hour = this.getNumberFromString(this.hourText, this.hour);

        this.convertDurationToSecond();
        this.emitOnDurationUpdate();
    }
    onMinuteFocusout(ev) {
        if ((parseInt(ev.target.value) > 59 && parseInt(this.day) > 23 )|| parseInt(ev.target.value) < 0 ) {
         // console.log('value is beyond imposed limits');
          return false;
        }
        this.minuteText = (this.minuteText && this.minuteText.length <= 0) || isNaN(this.minuteText) ? this.minute : this.minuteText;
        this.minute = this.getNumberFromString(this.minuteText, this.minute);

        this.convertDurationToSecond();
        this.emitOnDurationUpdate();
    }
    escapeKeys(ev) {
        let keyCode = ev.keyCode;
        switch (keyCode) {
            case 8:
            case 37:
            case 39:
                return true;
            default:
                return false;
        }

    }
    isAllFieldsZero(value) {
        if(Number(value) || Number(this.dayText) || Number(this.hourText) || Number(this.minuteText)) {
            return false;
        } else {
            return true;
        }
    }
    validateHour(ev) {
        // event.key is not supported in safari, hence use fromCharCode
        let value =  parseInt(ev.target.value);// + String.fromCharCode(ev.which || ev.keycode),
        let maxLength = 2;
        if(isNaN(value)) {
         return false;
        }

        //escape the following keys
        if(this.escapeKeys(ev)) {
            return true;
        }
       let numValue = Number(value || '0');
        if ((parseInt(ev.target.value) > 23 && parseInt(this.day) >= 99)|| parseInt(ev.target.value) < 0  ) {
               return false;
        }

        if(this.isAllFieldsZero(value)) {
            return false;
        }
        this.convertDurationToSecond();
        this.emitOnValidate();
        return true;
    }
    validateMinute(ev) {
        // event.key is not supported in safari, hence use fromCharCode
       let value = parseInt(ev.target.value),
            maxLength = 2;
        if(isNaN(value)) {
         return false;
        }
        //escape the following keys
        if(this.escapeKeys(ev)) {
            return true;
        }

        let numValue = Number(value || '0');

      if ((parseInt(ev.target.value) > 59 && parseInt(this.day) > 23 )|| parseInt(ev.target.value) < 0 ) {
            // value is beyond imposed limits
            return false;
        }

        if(this.isAllFieldsZero(value)) {
            return false;
        }
        this.convertDurationToSecond();
        this.emitOnValidate();
        return true;
    }
    validateDay(ev) {
        // event.key is not supported in safari, hence use fromCharCode
        let value = parseInt(ev.target.value),
            maxLength = 2;
        if(isNaN(value)) {
         return false;
        }

        //escape the following keys
        if(this.escapeKeys(ev)) {
            return true;
        }

        let numValue = Number(value || '0');

        if (numValue >= 99 || numValue < 0) {
            // value is beyond imposed limits
            return false;
        }

        if(this.isAllFieldsZero(value)) {
            return false;
        }
        this.convertDurationToSecond();
        this.emitOnValidate();
        return true;
    }
    convertDurationToSecond() {

        let dayVal = this.getNumberFromString(this.dayText, this.day);
        let hourVal = this.getNumberFromString(this.hourText, this.hour);
        let minVal = this.getNumberFromString(this.minuteText, this.minute);


        let seconds = (dayVal * SECONDS_IN_DAY) + (hourVal * SECONDS_IN_HOUR) + (minVal * SECONDS_IN_MINUTE);

        this.value = seconds;
    }
    convertSecondsToDuration() {
         if (isNaN(this.value) || this.value <= 0) {
            this.day = 0;
            this.hour = 0;
            this.minute = 0;
            this.dayText = '00';
            this.minuteText = '00';
            this.hourText = '00';
        } else {
            let seconds = parseInt(this.value, 10);
            this.day = 0;
            this.hour = 0;
            this.minute = 0;

            /*this.minute = seconds / 60;
            this.hour = this.minute / 60;
            this.minute = this.minute % 60;
            this.day = this.hour / 24;
            this.hour = this.hour % 24;*/

            this.hour = Math.floor(seconds / 3600);
            this.minute = Math.floor((seconds - (this.hour * 3600)) / 60);
            this.day = Math.floor(this.hour / 24);
            this.hour = Math.floor(this.hour % 24);

            this.dayText = (this.day < 10) ? '0' + this.day: this.day;
            this.hourText = (this.hour < 10) ? '0' + this.hour: this.hour;
            this.minuteText = (this.minute < 10) ? '0' + this.minute: this.minute;
        }
    }

    emitOnDurationUpdate() {
      this.onDurationUpdate.emit(this.value);
    }

    emitOnValidate() {
       this.onValidate.emit(this.value);
    }
}
