import {Injectable, Inject} from '@angular/core';
import {API_PATH} from '../utils/constants/api.constants';
import {getRequestHeader} from '../utils/api/api.utils';
import {Http} from '@angular/http';
import {Router} from '@angular/router';

declare var _, window: any;

@Injectable()
export class PouchDBPrefsServices {
  db;
  currentProject;
  userInfo = null;
  appsWithoutProjectId = ['dashboard', 'release_setup', 'projectSetup', 'resource', 'req_fields', 'tst_fields', 'tst_execution_status', 'tst_step_execution_status', 'etl_history'];
  lastLocationInfo :any = {};
  prefsLoaded = false;
  prefsPatched = false;
  prefs : any = {};

  constructor(@Inject(Http) public _http: any, private router: Router) {
    // this.db = new PouchDB('grid_prefs');
    this.setState({});
  }

  setState(prefs) {
      localStorage.setItem('grid-prefs', JSON.stringify(prefs));
      this.prefs = prefs;
  }

  _getKey(type, id) {
    let key = `${type}:${this.userInfo}-${this.currentProject}-${id}`;

    if (this.appsWithoutProjectId.indexOf(id) !== -1) {
      key = `${type}:${this.userInfo}-${id}`;
    }

    return key;
  }

  _getKeyFromObj(type, id, obj) {
    let key = `${type}:${obj.userId}-${obj.projectId}-${id}`;

    if (this.appsWithoutProjectId.indexOf(id) !== -1) {
      key = `${type}:${obj.userId}-${id}`;
    }

    return key;
  }

  patchGridPrefsFromDB(gridPrefs) {
    this.prefsLoaded = true;
    this.currentProject = localStorage.getItem(`${window.tab}-currentProject`) ? JSON.parse(localStorage.getItem(`${window.tab}-currentProject`)).id : undefined;
    this.userInfo = localStorage.getItem(`userInfo`) ? JSON.parse(localStorage.getItem(`userInfo`)).id : undefined;

    let prefs = {};

    if (!this.userInfo) {

      setTimeout(() => {
        this.patchGridPrefsFromDB(gridPrefs);
      }, 1000);

    } else {

      gridPrefs.forEach((pref, index) => {
        if (pref.prefKey) {

          prefs[this._getKeyFromObj('grid', pref.prefKey, pref)] = {
            serverId: pref.id,
            value: pref.value
          };

        }

      });

    }

    this.setState(prefs);
    this.prefsPatched = true;
  }

  setLocationOnClient(url) {
    this.lastLocationInfo = url;
    let projectReleaseInfo = JSON.parse(url.value);
    localStorage.setItem('lastLocation', url.value);
  }

  redirectToLastUrl() {
    let userInfo = localStorage.getItem('userInfo');

    if (this.router.url !== this.lastLocationInfo.value && userInfo) {
      setTimeout(() => {
        let url = JSON.parse((this.lastLocationInfo || {}).value || '{}').url;

        this.router.navigateByUrl(url);
      }, 10);
    }
  }

  saveLastUrl(url) {
    localStorage.setItem('location', url);

    this.userInfo = localStorage.getItem(`userInfo`) ? JSON.parse(localStorage.getItem(`userInfo`)).id : undefined;

    if (this.callMethodAgain(this.currentProject, 'location') && this.userInfo) {

      setTimeout(() => {
        this.saveLastUrl(url);
      }, 1000);

    } else {
      let key = this._getKey('location', 'location');

      let currentProject = JSON.parse(localStorage.getItem(`${window.tab}-currentProject`));
      let currentRelease = JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`));

      let saveValue :any = {
        userId : this.userInfo,
        projectId: this.appsWithoutProjectId.indexOf(key) === -1 ? this.currentProject : -1,
        type: 'location',
        prefKey : key,
        value: JSON.stringify({
          projectId : currentProject && currentProject.id ? currentProject.id : -1,
          releaseId : currentRelease && currentRelease.id ? currentRelease.id : -1,
          url : url
        })
      };

      if (this.lastLocationInfo && this.lastLocationInfo.id) {
        saveValue.id = this.lastLocationInfo.id;
        this._updateExistingPref(saveValue);
      } else {
        this._saveNewPref(saveValue);
      }

    }


  }

  getValue(type, id, onSuccess : any, onFail : any) {
    // let pref = localStorage.getItem('loadPrefs');
    let pref = 'true';

    if (pref === 'true') {
      if (location.pathname.split('/')[1] === 'project') {
        this.currentProject = location.pathname.split('/')[2];
      } else {
        this.currentProject = localStorage.getItem(`${window.tab}-currentProject`) ? JSON.parse(localStorage.getItem(`${window.tab}-currentProject`)).id : undefined;
      }

      this.userInfo = localStorage.getItem(`userInfo`) ? JSON.parse(localStorage.getItem(`userInfo`)).id : undefined;

      let key = this._getKey(type, id);

      if (this.callMethodAgain(this.currentProject, id)) {

        setTimeout(() => {
          this.getValue(type, id, onSuccess, onFail);
        }, 1000);

      } else {

        if (this.prefs[key]) {
          let response = JSON.parse(this.prefs[key].value);
          onSuccess(response);
        } else {
          onFail();
        }
      }
    } else {
      onFail();
    }

  }

  putObject(type, value, id) {
    let pref = 'true';

    if (pref === 'true') {
      this.currentProject = localStorage.getItem(`${window.tab}-currentProject`) ? JSON.parse(localStorage.getItem(`${window.tab}-currentProject`)).id : undefined;
      this.userInfo = localStorage.getItem(`userInfo`) ? JSON.parse(localStorage.getItem(`userInfo`)).id : undefined;

      let key = this._getKey(type, id);
      let prefs = this.prefs;

      let columns = value.columns.map((val, counter) => {
        return {
          id: val.labelId,
          sequence: counter,
          labelName : val.labelName,
          sortable: val.sortable,
          show: val.show,
          fixedSize: val.min,
          min: val.min
        };
      });

      if (this.callMethodAgain(this.currentProject, id)) {

        setTimeout(() => {
          this.putObject(type, value, id);
        }, 1000);

      } else {

        if (prefs[key]) {
          prefs[key].value = JSON.stringify(columns);
          this._savePreferencesOnServer(type, id, prefs[key].value, prefs[key].serverId);
        } else {
          prefs[this._getKey('grid', id)] = {
            serverId: null,
            value: JSON.stringify(columns)
          };

          this._savePreferencesOnServer(type, id, prefs[key].value, null);
        }

      }

      this.setState(prefs);
    }

  }

  _savePreferencesOnServer(type, key, value, id) {
    let record = JSON.parse(value);

    let saveValue :any = {
      userId : this.userInfo,
      projectId: this.appsWithoutProjectId.indexOf(key) === -1 ? this.currentProject : -1,
      type,
      prefKey : key,
      value
    };

    if (id) {
      saveValue.id = id;
      this._updateExistingPref(saveValue);
    } else {
      this._saveNewPref(saveValue);
    }

  }

  _saveNewPref(value) {
    let getPreferenceURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_GRID_PREFS;

    this._http.post(getPreferenceURL, JSON.stringify(value), {
      headers: getRequestHeader()
    }, true).map(response => response.json()).subscribe((res) => {
      this.updateIdPostSave(res, value.prefKey);
    });
  }

  _updateExistingPref(value) {
    let getPreferenceURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_GRID_PREFS;

    return this._http.put(getPreferenceURL, JSON.stringify(value), {
      headers: getRequestHeader()
    }, true).map(response => response.json());
  }

  updateIdPostSave(doc, type) {
    this.currentProject = localStorage.getItem(`${window.tab}-currentProject`) ? JSON.parse(localStorage.getItem(`${window.tab}-currentProject`)).id : undefined;
    this.userInfo = localStorage.getItem(`userInfo`) ? JSON.parse(localStorage.getItem(`userInfo`)).id : undefined;

    let key = this._getKey(doc.type, type);

    if (this.callMethodAgain(this.currentProject, type)) {

      setTimeout(() => {
        this.updateIdPostSave(doc, type);
      }, 1000);

    } else {

      switch(doc.type) {

        case 'location':
          this.lastLocationInfo.id = doc.id;
          break;

        default:
          let prefs = this.prefs;
          prefs[key].serverId = doc.id;
          this.setState(prefs);

      }
    }
  }

  callMethodAgain(project, id) {
    return !project && this.appsWithoutProjectId.indexOf(id) === -1;
  }

}
