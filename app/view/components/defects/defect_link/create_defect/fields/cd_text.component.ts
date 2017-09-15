import {Component, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';


import {ZephyrStore} from '../../../../../../store/zephyr.store';
import {DefectsAction} from '../../../../../../actions/defects.action';

declare var jQuery: any, _;

@Component({
    selector: 'cd-text',
    templateUrl: 'cd_text.html',
    viewProviders: [DefectsAction]
})

export class CDTextComponent implements AfterViewInit {
    @Input() field;
    @Input() formkey;
    @Input() disableCopyTestStep;
    @Output() onDescStepsParsing: EventEmitter<any> = new EventEmitter();
    @Output() optionChange: EventEmitter<any> = new EventEmitter();
    @Output() onSingleListUnselect: EventEmitter<any> = new EventEmitter();
    fieldSubType;
    fieldOptions;
    stepsOption = null;
    stepDetails = '';
    statusJson;
    testcaseUrl;
    testcaseId;
    releaseId;
    private zephyrStore;

    constructor(private _defectAction: DefectsAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
    }
    ngAfterViewInit() {
        this.fieldOptions = this.field.allowedValues;
        if(this.field.schema && this.field.schema.custom) {
            this.fieldSubType = this.field.schema.custom.split(':')[1];
            if(this.fieldSubType === 'radiobuttons' || this.fieldSubType === 'select') {
                this.fieldOptions = this.fieldOptions && this.fieldOptions.map((field) => {
                    return {
                        id: field.name || field.value,
                        name: field.name || field.value,
                        text: field.name || field.value
                    };
                });
            }
        }
    }
    hasDefaultValue(value, index) {
        return (value && index === 0) ? 'selected': false;
    }

    getTestStepsForExecution(event) {
        this.stepsOption = event.target.value;
        let defectState = this.zephyrStore.getState().testcase;
        let steps = defectState.teststep;
        this.testcaseId = defectState.testcase.testcase.id;
        this.releaseId = defectState.testcase.testcase.releaseId;
        this.parseSteps(steps);
    }

    parseSteps(steps) {
        let adminPref = this.zephyrStore.getState().adminPref;
        let statusField = adminPref["testStepResult.testStepResultStatus.LOV"];
        this.statusJson = JSON.parse(statusField);

        let url = adminPref["admin.app.desktop.url"];
        let testcasePath = 'To access this testcase in Zephyr: \n' ;
            testcasePath += 'http://'+url+'/flex/html5'+
                            '/tcr/{releaseId};viewType=list;pageView=search;offset=0;' +
                            'pageSize=10;searchText=id%20%3D%20{testcaseId};searchType=zql;' +
                            'page=1;currentIndex=1';

            testcasePath = testcasePath.replace("{testcaseId}",this.testcaseId);
            testcasePath = testcasePath.replace("{releaseId}",this.releaseId);

        this.testcaseUrl = testcasePath;

        if(this.stepsOption === 'plainText') {
            this.formatStepDetails(steps);
        } else if(this.stepsOption === 'wikiMarkup') {
            this.formatStepDetailsWikiMarkup(steps);
        }
    }

    formatStepDetails(steps) {
        let testStep = steps;
        let stepString = this.testcaseUrl +'\n';
        let _line = '--------------------------------------';
        stepString += _line + '\nSTEPS TO REPRODUCE \n' + _line + '\n';
        let notes;
        let stepArray = steps.steps;
        var testStepCount=1;
        for(var i=0 ; i< stepArray.length;i++) {
            let step = stepArray[i];
            let resultStr =  _.find(this.statusJson,{'id':step.stepResults.status});
            stepString += testStepCount + '. ' + resultStr.value +  '\n[TS]: ';
            stepString += (step.step?step.step:'') + '\n[TD]: ';
            stepString += (step.data?step.data:'') + '\n[ER]: ';
            stepString += (step.result?step.result:'') + '\n';
            if(step.stepResults.comment != null && step.stepResults.comment != '') {
                stepString += '[Notes]: ' + step.stepResults.comment + '\n';
            }
            testStepCount++;
        }
        this.stepDetails += stepString;
        this.onDescStepsParsing.emit({steps: this.stepDetails, field: this.field.fieldKey});
    }

    formatStepDetailsWikiMarkup(steps) {
        let stepString =  this.testcaseUrl + '\n';
        stepString += '---- \nSTEPS TO REPRODUCE \n----\n'+'||#||Step||Test Data||Expected Results||Status||Notes|| \n';
        let notes = '';
        let color = '#000';
        function escape(str:String):String {
            return str.replace(/\|/g, '\\|');
        }

        var testStepCount=1;

        let stepArray = steps.steps;
        for(var i=0 ; i< stepArray.length;i++) {
            let step = stepArray[i];
            const PIPE = '|';
            stepString += PIPE + testStepCount;
            stepString += PIPE + escape(step.step?step.step:' ');    //Space is reqd, else JIRA wiki doesnt draw the TD
            stepString += PIPE + escape(step.data?step.data:' ');
            stepString += PIPE + escape(step.result?step.result:' ');
            let resultStr =  _.find(this.statusJson,{'id':step.stepResults.status});
            stepString += '|{color:'+resultStr.color+'}' + resultStr.value + '{color}';
            stepString += PIPE + (step.stepResults.comment?step.stepResults.comment:' ') + '|\n';
            testStepCount++;
        }
        stepString +='\n----';
        this.stepDetails += stepString;
        this.onDescStepsParsing.emit({steps: this.stepDetails, field: this.field.fieldKey});
    }
    onOptionChange(selectedVal) {
        this.optionChange.emit({formValue: selectedVal.id, formKey: this.field.fieldKey});
    }
    onOptionUnSelect(value, formKey) {
        // let option = jQuery('#' + field + '-field').find('option[value='+ selectedVal.id +']');
        // if(option && option.length && option[0]) {
        //     option[0].selected = false;
        // }
        this.onSingleListUnselect.emit(formKey);
    }
}
