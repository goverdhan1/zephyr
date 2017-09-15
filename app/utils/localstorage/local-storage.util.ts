import {ZephyrStore} from '../../store/zephyr.store';
import {Router} from '@angular/router';

declare var _: any, window: any;

const POSITION_TOP = 'top';
const POSITION_RANDOM = 'random';
/**
 * zephyrLocalStorage
 * @getItem(key)
 * @getLength()
 * @removeItem(key)
 * @setItem(key, value)
 * @getItems(key): get array items for the key specified
 * @addItemToArray: add to array items, position top and bottom
 * @deleteItemToArray: delete from array items,
 *  position, top, bottom and specified value
 * @clearLocalStorage(): clear all keys in localStorage
 */


export class ZephyrLocalStorage {
    static zephyrLocalStorage = localStorage;
    static router;

    static getItem(key) {
        return this.zephyrLocalStorage.getItem(key);
    }
    static getParsedItem(key) {
        let _parsedItem = {};
        try {
            let _item = this.zephyrLocalStorage.getItem(key);
            _parsedItem = JSON.parse(_item);
        } catch(e) {
          //  console.log(e);
        }
        return _parsedItem;
    }
    static getLength() {
        return this.zephyrLocalStorage.length;
    }
    static removeItem(key) {
        if(key) {
            this.zephyrLocalStorage.removeItem(key);
        }
    }
    static setItem(key, value) {
        try {
            this.zephyrLocalStorage.setItem(key, value);
        } catch(e) {
          //  console.log(e);
        }
    }
    static getItems(key) {
        if(key) {
            let valueList = this.parseArrayData(key);
            return valueList;
        }
    }
    static addItemToArray(param) {
        if(param.key) {
            let valueList: any = this.parseArrayData(param.key);
            if(_.isArray(valueList)) {
                if(param.position == POSITION_TOP) {
                    valueList.unshift(param.value);
                } else {
                    valueList.push(param.value);
                }
                this.setItem(param.key, JSON.stringify(valueList));
            }
        }
    }
    static deleteItemFromArray(param) {
        if(param.key && param.value) {
            let valueList: any = this.parseArrayData(param.key);
            if(_.isArray(valueList)) {
                if(param.position == POSITION_TOP) {
                    valueList.shift(param.value);
                } if(param.position == POSITION_RANDOM) {
                    _.remove(valueList, function(value) {
                        return value == param.value;
                    });
                } else {
                    valueList.pop(param.value);
                }
                this.setItem(param.key, JSON.stringify(valueList));
            }
        }
    }

    static getCurrentProject() {
      let currentProject = localStorage.getItem(`${window.tab}-currentProject`);

      if (currentProject) {
        return JSON.parse(currentProject);
      } else {
        this.router.navigate(['/project', JSON.parse(localStorage.getItem('userAllocatedProjects'))[0]]);
      }

    }

    static getCurrentRelease() {
      let currentRelease = localStorage.getItem(`${window.tab}-currentRelease`);

      if (currentRelease) {
        return JSON.parse(currentRelease);
      } else {
        this.router.navigate(['/project', JSON.parse(localStorage.getItem('userAllocatedProjects'))[0]]);
      }
    }

    static parseArrayData(key) {
        let value = this.zephyrLocalStorage.getItem(key) || '[]';
        try {
            value = JSON.parse(value);
        } catch (e) {
         //   console.log(e);
        }
        return value;
    }
    static clearLocalStorage() {
        return this.zephyrLocalStorage.clear();
    }
    constructor(public router: Router) {
      this.router = router;
    }
}

