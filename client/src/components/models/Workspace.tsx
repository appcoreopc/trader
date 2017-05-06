import _ from "lodash";
import esp from 'esp-js';
import {viewBinding} from 'esp-js-react';
import idFactory from './idFactory';
import {Router} from 'esp-js';

export class Workspace {

    _modelId : string;
    _router : Router;
    username : string;

    constructor(modelId : string, router : Router) {
        this._modelId = modelId;
        this._router = router;
        this.username = 'anonymous';
    }
    // observe events using decorators
    @esp.observeEvent('setUsername')
    _onSetUsername(event) {
        this.username = event.username;
    }
    registerWithRouter() {
        // register the model with the router
        this
            ._router
            .addModel(this._modelId, this);
        // instruct the router to hook up decorated event observation methods
        this
            ._router
            .observeEventsOn(this._modelId, this);
    }
}