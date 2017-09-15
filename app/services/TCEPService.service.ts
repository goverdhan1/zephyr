import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';

// Constants
import {API_PATH ,getApiPath} from '../utils/constants/api.constants';
import {getRequestHeader} from '../utils/api/api.utils';
import {EventHttpService} from './event-http.service';

declare var jQuery: any;

@Injectable()
export class TCEPService {
    constructor (public http: any) {

    }

    getTCEPCycleForReleaseAndProject(releaseId, projectId, chartKey) {
        let url = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
                        getApiPath('GET_TCEP_CYCLE_FOR_RELEASE_PROJECT', [releaseId, projectId, chartKey]);
        return this.http.get(url , {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
    getTCEPPhaseForReleaseAndProject(releaseId, projectId, phaseId, chartKey) {
        let url = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
                        getApiPath('GET_TCEP_PHASE_FOR_RELEASE_PROJECT', [releaseId, projectId, phaseId, chartKey]);
        return this.http.get(url , {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }


}
