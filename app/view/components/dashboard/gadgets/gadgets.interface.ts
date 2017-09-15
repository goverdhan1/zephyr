import {Component, AfterViewInit, EventEmitter, Output} from '@angular/core';

export interface GadgetInterface {
    config: Object;
    _gadget;
    saveConfigEmitter;
    cancelConfigEmitter;
    setConfig(gadgetId: number, config: Object);
    refreshMetrics();
    toggleConfigurationMode(mode : Boolean);
};
