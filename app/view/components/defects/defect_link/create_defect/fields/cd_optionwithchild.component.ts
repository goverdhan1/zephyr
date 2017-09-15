import {Component, AfterViewInit, Input,OnInit,OnChanges, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';


declare var jQuery: any, _;


@Component({
  selector: 'cd-optionwithchild',
  templateUrl: 'cd_optionwithchild.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CDOptionWithChildComponent implements AfterViewInit, OnInit,OnChanges {
  @Input() field;
  @Input() formkey;
  @Input() projectkey;
  @Input() isUpdate;
  @Input() casCadeSelectDefault;
  @Output() optionChange: EventEmitter<any> = new EventEmitter();
  formVal = [];
  projectFieldOption;
  fieldoption1 = [{'id':'0','name':'None','text':'None'}];
  fieldoption2 = [{'id':'0','name':'None','text':'None'}];
  selectedfieldoption1;
  selectedfieldoption2;


  constructor(){
  }

  ngOnChanges(changes){

   this.fieldoption1.length = 1;

   if(this.field.allowedValues){
     this.projectFieldOption = this.field.allowedValues;
   }else { return ;}

    this.projectFieldOption.forEach((field, i) =>{
      this.fieldoption1.push({'id':field.id, 'name':field.value, 'text':field.value});
    });
      //remove duplicates
      this.fieldoption1 = this.fieldoption1.filter(function (el, i, arr) {
        return arr.indexOf(el) === i;
      });


    if((this.isUpdate && this.casCadeSelectDefault )|| typeof(this.casCadeSelectDefault) === 'string') {
       //update drop down lists
            this.updateCasecadeSelectList();
      // }
     }

  }

  ngOnInit(){ }

  ngAfterViewInit() { }

  updateCasecadeSelectList(){
    let abc, parentId , childId;
    if(typeof(this.casCadeSelectDefault) == 'string'){
      parentId = (this.casCadeSelectDefault).toString();
    }else if(typeof(this.casCadeSelectDefault[0]) === 'number'){
      parentId =  this.casCadeSelectDefault[0].toString();
      childId = this.casCadeSelectDefault[1].toString();
    }else{
      parentId =  this.casCadeSelectDefault[0];
      childId = this.casCadeSelectDefault[1];
    }

    if(typeof(this.casCadeSelectDefault) === 'string'){
      abc = _.find(this.projectFieldOption, {id: parentId});
    }else{
        abc = _.find(this.projectFieldOption, {id: parentId});
    }


    if(abc && abc.children) {

      abc.children.forEach((field) =>{
        field['id']  = field.id;
        field['name']  = field.value;
        field['text']  = field.value;
      });
      this.fieldoption2 = this.fieldoption2.concat(abc.children);
      this.fieldoption2 = this.fieldoption2.filter(function (el, i, arr) {
        return arr.indexOf(el) === i;
      });

      if(typeof(this.casCadeSelectDefault) != 'object'){

        jQuery('file-new-defect-modal #' + this.formkey + '-field').val(parentId).trigger('change');
        setTimeout(() => {
          jQuery('defect-advanced-detail #' + this.formkey + '-field').val(parentId).trigger('change');

        },100);


        this.selectedfieldoption1 = parentId;
        this.selectedfieldoption2 = '';
      }else{
        jQuery('file-new-defect-modal #' + this.formkey + '-field').val(parentId).trigger('change');
        jQuery('file-new-defect-modal #' + this.formkey + '-field-child').val(childId).trigger('change');
        setTimeout(() => {
          jQuery('defect-advanced-detail select#' + this.formkey + '-field').val(parentId).trigger('change');
          jQuery('defect-advanced-detail select#' + this.formkey + '-field-child').val(childId).trigger('change');
        },100);
        this.selectedfieldoption1 = parentId;
        this.selectedfieldoption2 = childId;
      }

    }

    this.updateCustomForm();

  }

  onChangeAppOptions(event){

    if(event.id === 0){
      this.selectedfieldoption1 = '';
    }else{
       this.fieldoption1.forEach((item,i)=>{
        if((event.id).toString() === (item.id)  ){
          this.selectedfieldoption1 = (event.id).toString();

        }
       });
    }

    //clear drop down options
    this.fieldoption2.length = 1;


    let abc = _.find(this.projectFieldOption, {id: (event.id).toString()});

    if(abc && abc.children) {

      abc.children.forEach((field) =>{
        field['id']  = field.id;
        field['name']  = field.value;
        field['text']  = field.value;
      });
      this.fieldoption2 = this.fieldoption2.concat(abc.children);
      this.fieldoption2 = this.fieldoption2.filter(function (el, i, arr) {
        return arr.indexOf(el) === i;
      });
     }else{

      jQuery('file-new-defect-modal #' + this.formkey + '-field-child').val("").trigger('change');
      jQuery('defect-advanced-detail select#' + this.formkey + '-field-child').val("").trigger('change');
    }
    this.fieldoption2 = JSON.parse(JSON.stringify(this.fieldoption2));
    this.selectedfieldoption2 = '0';

    //update customfields  form
    this.updateCustomForm();
  }

  onChangeReleaseOption(event){

    if(event.id === 0){
      this.selectedfieldoption2 = '';
    }else{
       this.selectedfieldoption2 = (event.id).toString();

     }
     //update customfields  form
    this.updateCustomForm();
  }

  updateCustomForm(){
    this.formVal = [];

    if(this.selectedfieldoption2 === undefined || this.selectedfieldoption2 === '0'){
      this.selectedfieldoption2='';
    }

    if(this.selectedfieldoption1 === undefined || this.selectedfieldoption1 === '0'){
      this.selectedfieldoption1='';
    }

    this.formVal.push(this.selectedfieldoption1);
    this.formVal.push(this.selectedfieldoption2);

    this.optionChange.emit({formValue: this.formVal ,formKey: this.field.fieldKey});

  }

}
