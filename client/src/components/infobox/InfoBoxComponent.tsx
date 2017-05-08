import {connect} from 'react-redux';
import * as React from "react";

export interface InfoBoxProps {
    title : string;
    //imgUrl : string;
    description : string;
    //value : number;
}

export class InfoBoxComponent extends React.Component < InfoBoxProps,
undefined > {
    render() {
        return <div className="row">
            <div className="col-md-2">
                <div>{this.props.title}</div>
                <div>{this.props.description}</div>
            </div>
        </div>;
    }
}

