import {Component,Input , Output , EventEmitter , OnChanges} from '@angular/core';
import * as events from '../../../../utils/constants/action.events';

declare var jQuery: any, _: any;

@Component({
  selector: 'unselected-selected-list',
  templateUrl: 'unselected_selected_list.html'
})

export class UnselectedSelectedListComponent implements OnChanges {
    @Input() globalList; //List containing selected and unselectedlist
    @Input() unSelectedListHeading; //heading for unselected list
    @Input() selectedListHeading;//heading fro selected list
    @Input() unSelectedListSubHeading;//sub heading for unselected list
    @Input() selectedListSubHeading;//sub heading for unselected list
    @Input() selectedList;//selected list array
    @Input() unselectedList;//unsel  ected list array
    @Input() isUnselectedListPassed;//boolean to filter unselected list in this component or to ba taken from parent component
    @Output() updatedSelectedList: EventEmitter<any> = new EventEmitter(); //action to be taken when selected list is modified

    // This function filters the global list to get unselected list
    filteringUnselectedList() {
      let unselectedList = _.differenceBy((this.globalList || []), (this.selectedList || []), 'id');

      this.unselectedList = _.sortBy(unselectedList, entry => entry.name && entry.name.toLowerCase());

    }

    // This function selectes all checkboxes for unselected list
    allCheckboxUnselectedList(value) {
       jQuery('.unselected-list input').prop('checked', value);
    }

    // This function selectes all checkboxes for selected list
    allCheckboxSelectedList(value) {
      jQuery('.selected-list input').prop('checked', value);
    }

    // filters the global list to get unselected list on changes
    ngOnChanges (value) {
      // check added wheather to filter global list to get unselected list in this component or not
      if (!this.isUnselectedListPassed) {
       this.filteringUnselectedList();
      }
    }

    // This function is called when resources are to be passed to the selected list from unselected list
    transferToSelected() {
      let inputArray = jQuery('.unselected-list input');
      let idArray = [];
      inputArray.each(function(index) {
        if (inputArray[index].checked) {
          idArray.push(inputArray[index].getAttribute('id'));
        }
      });
      inputArray.prop('checked', false);
      if (idArray.length > 0) {
        this.alterArrays(this.selectedList, this.unselectedList , idArray);
        this.updatedSelectedList.emit({selectedList : this.selectedList});
      }
    }

    // This function is called when resources are to be passed to the unselected list from selected list
    transferToUnSelected() {
      let inputArray = jQuery('.selected-list input');
      let idArray = [];
      inputArray.each(function(index) {
        if (inputArray[index].checked) {
          idArray.push(inputArray[index].getAttribute('id'));
        }
      });
      inputArray.prop('checked', false);
      if (idArray.length > 0) {
        this.alterArrays(this.unselectedList, this.selectedList , idArray);
        this.updatedSelectedList.emit({selectedList : this.selectedList});
      }
    }

    // Function to alter the arrays on being transferred
    alterArrays(toBeAddedInto, toBeRemovedFrom, idArray) {
      idArray.forEach(id => {
        toBeRemovedFrom.forEach((object, index) => {
          if (object.id == id) {
            toBeAddedInto.unshift(object);
            toBeRemovedFrom.splice(index, 1);
            return -1;
          }
        });
      });
    }
}
