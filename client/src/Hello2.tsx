import * as React from "react";

export interface HelloProps { compiler: string; framework: string; }

export class Hello2 extends React.Component<HelloProps, undefined> {
    render() {
        return <div><h1>Hello from {this.props.compiler} and {this.props.framework}!</h1> <h1>extra </h1> </div>;
    }
}