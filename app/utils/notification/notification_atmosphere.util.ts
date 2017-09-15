import {API_PATH} from '../constants/api.constants';

declare var $:any, atmosphere:any, ENV, ZEE_URL;

export class NotificationAtmosphereUtil {
    static _instance;
    _socket;
    _request;
    _subSocket;
    _subscriberId;
    _processMessage;
    _onWebsocketOpen;
    _processReconnect;
    _registerComplete = false;

    static getInstance() {
        this._instance = this._instance || new NotificationAtmosphereUtil();
        return this._instance;
    }

    constructor() {
        this._socket = atmosphere;
    }

    initRequest() {

        let url;
        try {
            url = 'dev' == ENV ? ZEE_URL : window.location.protocol + '//' + window.location.host;
        } catch (err) {
            console.log('error', err);
            url = window.location.protocol + '//' + window.location.host;
        }

        this._request = {
            url: url + '/flex/talk',
            contentType : 'application/json',
            logLevel : 'debug',
            transport : $('#notificationConType').val() ,
            trackMessageLength : true,
            fallbackTransport: 'sse'
        };

        this._request.onOpen = (resp => {
            this._onWebsocketOpen(resp);
        });
        this._request.onMessage = (resp => {
            this._processMessage(resp);
        });
        this._request.onClose = (response => {
            //console.log('Atmosphere connection closed');
        });
        this._request.onError = (response => {
           // console.log('Error in Atmosphere: ' + response);
        });
        this._request.onReconnect = (response => {
            //console.log('Atmosphere reconnect: ' + response);
        });
        this._request.onReopen = (resp => {
            this._processReconnect(resp);
        });
    }

    registerAtmResource(onWebsocketOpen, processMessage, processReconnect) {
        this._processMessage = processMessage;
        this._onWebsocketOpen = onWebsocketOpen;
        this._processReconnect = processReconnect;
        this.initRequest();
        this._subSocket = this._socket.subscribe(this._request);
        return this._subSocket.getUUID();
    }

    updateCallBacks(onWebsocketOpen, onMessage, onReconnect) {
        this._processMessage = onMessage;
        this._onWebsocketOpen = onWebsocketOpen;
        this._processReconnect = onReconnect;
    }

    updateSubscriberId(subscriberId) {
        this._subscriberId = subscriberId;
    }

    unregisterSocket() {
        this._socket.unsubscribe(this._request);
    }

    getSubscriberId() {
        return this._subscriberId;
    }

    setRegisterComplete(status) {
        this._registerComplete = status;
    }

    getRegisterComplete() {
        return this._registerComplete;
    }

    getSocketId() {
        return this._subSocket ? this._subSocket.getUUID(): 0; // temp fix
    }
}
