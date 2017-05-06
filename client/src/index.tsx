import * as React from "react";
import * as ReactDOM from "react-dom";

import {Hello} from "./components/Hello";
import {Hello2} from "./components/Hello2";
import {RouterProvider, SmartComponent} from 'esp-js-react';
import { Workspace } from './components/models/Workspace';
import { WorkSpaceView } from './components/views/WorkSpaceView'
import * as esp from 'esp-js';

let router = new esp.Router();
let modelId = 'login';
let workspace = new Workspace(modelId, router);
workspace.registerWithRouter();

let subscription = router
  .getModelObservable(modelId)
  // the router has a built-in observable API with basic methods, where(), do(), map(), take() 
  .do(model =>  { /* gets invoked on each update */ })
  .subscribe(model => {
      console.log(`Updating view. Username is: ${model.username}`);
      console.log('testste')
    }
  );
router.publishEvent(modelId, 'setUsername', {username : 'jeremy'});
ReactDOM.render(



<RouterProvider router={router}>
    <SmartComponent modelId={workspace._modelId} view={WorkSpaceView} compiler='test' framework='11' />
</RouterProvider>, document.getElementById("example"));