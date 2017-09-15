/**
 * Reducer for all the states that has to be fetched initially when the page loads
 */
import * as types from '../utils/constants/action.types';
import * as events from '../utils/constants/action.events';
declare var _: any;
const initialState = {
    isDirty: 0,
    users: [],
    messages: [

    ],
    releaseIdSelected : 1, // default release ID selected is 1.
    isMobile: false,
    browser: {},
    event: '',
    componentId: '',
    defectsAdminEvent: '',
    progessStatus : {
        id : '',
        heading : '',
        status : {}
    },
    attachment : {
       pathData : {
           path : '',
           id : ''
       },
       list : {}
    },
    ssoAttachment:{},
    syncMesages : {
        messageObject : {}
    },
    defectSystem : {}
};

export function globalReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_USERS:
            state['users'] = action.data;
            return state;

        case types.SHOW_TOAST:
            state.messages.push((<any>Object).assign({processed: false}, action.data));
            return state;
        case types.SHOW_TOAST_ERROR_ATTACHMENT:
            state.messages.push((<any>Object).assign({processed: false}, action.data));
            state['event'] = events.ERROR_EVENT; //Clearing the event or error-event to be set
            return state;
        // case types.ON_ERROR:
        //     state.message['error'].push(_setErrorMessage(action.data));
        //     return state;
        case types.CLEAR_MESSAGE:
            if (state.messages.length) {
                state.messages[action.data.index].processed = true;
            }

            return state;
        // case types.CREATE_TESTCASE_SHOW_FLAG:
        //     state['event'] = types.CREATE_TESTCASE_SUCCESS;
        //     state.message['success'].push(_setTestcaseSuccessMessage(action.data, 'create'));
        //     return state;
        // case types.DELETE_TESTCASE:
        //     state['event'] = types.DELETE_TESTCASE_SUCCESS;
        //     return state;
        case types.CLEAR_EVENT:
            state['event'] = '';
            state['componentId'] = '';
            return state;
        case types.SYNC_SUCCEESS:
             state['event'] = types.SYNC_SUCCEESS;
             state['syncMesages'].messageObject = action.data;
             return state;
        case types.UPDATE_TREE:
             state['event'] = types.UPDATE_TREE;
             return state;
        case types.SET_RELEASE_ID:
            state['releaseIdSelected'] =action.data;
            return state;
        case types.IS_MOBILE:
            state['isMobile'] = action._data.data;
            return state;
        case types.BROWSER:
            state['browser'] = action._data.data;
            return state;
        case types.JOB_PROGRESS_STATUS_STARTS:
             state['event'] = events.JOB_PROGRESS_STATUS_STARTS;
             state.progessStatus.id = action.data;
             state.componentId = action.componentId;
             return state;
         case types.JOB_PROGRESS_STATUS_INBETWEEN:
             state['event'] = events.JOB_PROGRESS_STATUS_INBETWEEN;
             state.progessStatus.status = action.data;
             return state;
         case types.JOB_PROGRESS_STATUS_ERROR:
              state['event'] = events.JOB_PROGRESS_ERROR;
              return state;
         case  types.UPLOAD_ATTACHMENT:
            state.attachment.pathData.path = action.data.data;
            state.attachment.pathData.id = action.data.id;
            state.event = events.UPLOAD_ATTACHMENT_SUCCESS;
            return state;
         case  types.UPLOAD_SSO_ATTACHMENT:
               state.ssoAttachment = action.data;
               state.event = events.UPLOAD_SSO_ATTACHMENT_SUCCESS;
               return state;
         case types.FETCH_ATTACHMENTS:
           state.attachment.list[action.data.params.itemid] = [];
           if (action.data.data.length > 0){
             state.attachment.list[action.data.params.itemid].push(action.data.data || []);
           }
              return state;
         case types.DELETE_ATTACHMENT:
                let idToBeDeleted = action.data.id,
                    attachmentMapId = action.data.attachmentMapId;
                 state.attachment.list[attachmentMapId][0].forEach((object , index) => {
                     if (object['id'] == idToBeDeleted) {
                        state.attachment.list[attachmentMapId][0].splice(index, 1);
                    }
                 });
                 //clear array if no attachment exists
                 if(state.attachment.list[attachmentMapId][0].length <= 0){
                   state.attachment.list[attachmentMapId] = [];
                 }
                 state['event'] = events.DELETE_ATTACHMENT_SUCCESS;
                return state;
         case types.SET_ATTACHMENT_PATH_PARTICUALR_ITEM:
                 //adding new attachement at top of the array -- for good UI interaction.
                 if (state.attachment.list[action.data.attachmentMapId]) {
                   if(state.attachment.list[action.data.attachmentMapId].length > 0){
                     action.data.data.forEach((object)=>{
                         state.attachment.list[action.data.attachmentMapId][0].unshift(object);
                     });
                   }else{
                     state.attachment.list[action.data.attachmentMapId].unshift(action.data.data);
                   }
                  } else {
                     state.attachment.list[action.data.attachmentMapId] = [];
                     state.attachment.list[action.data.attachmentMapId].push(action.data.data);
                  }
                 state['event'] = events.SET_ATTACHMENT_PATH_PARTICUALR_ITEM_SUCCESS;
                return state;
          case types.SET_SSO_ATTACHMENT_PATH:
                 state['event'] = events.SET_SSO_ATTACHMENT_PATH_SUCCESS;
                return state;
        case types.FETCH_DEFECT_SYSTEM:
              state.defectSystem = action.data;
              state['event'] = events.DEFECT_SYSTEM_UPDATED;
              state['defectsAdminEvent'] = events.DEFECT_SYSTEM_UPDATED;
             return state;
         case types.CLEAR_DEFECTS_ADMIN_EVENT:
              state['defectsAdminEvent'] = '';
              return state;
         case types.SET_DIRTY_CHECK_FOR_TEST_STEPS:
             state.isDirty = action.data;
             return state;
         case types.CLEAR_DIRTY_CHECK_FOR_TEST_STEPS:
             state.isDirty = 0;
             return state;
      case  types.CLEAR_SSO_EVENT:
        state.ssoAttachment = '';
        state.event = '';
        return state;
        default:
            return state;
    }
}

function _setErrorMessage(error) {
    try {
        error = error.json();
    } catch(e) {
     //   console.log(e);
    }
    return {
        title: error.zeeErrorCode || error.errorCode || '',
        description: error.errorMsg || 'Error'
    };
}
function _setSuccessMessage(data) {
	return {
	    title: 'Success',
	    description: data
	};
}
