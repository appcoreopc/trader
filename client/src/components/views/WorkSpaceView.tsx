import * as React from "react";
import { viewBinding } from 'esp-js-react';

export class WorkSpaceView extends React.Component<any, any> {
    render() {

         console.log(this.props);

        return <div><h1>Hello from world weirddo {this.props.compiler} and {this.props.framework}!</h1> <h1> name : {this.props.model.username} </h1> </div>;
    }
}