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
    context : any;
    static contextTypes = {
        store: React.PropTypes.object
    }

    private unsubscribe : Function;

    componentDidMount() {
        this.unsubscribe = this
            .context
            .store
            .subscribe(() => this.forceUpdate());
        console.log(this.props);
        console.log(this.context);

    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return <div className="row">
            <div className="col-md-2">
                <div>{this.props.title}</div>
                <div>{this
                        .context
                        .store
                        .getState()
                        .description}</div>
            </div>
        </div>;
    }
}

const mapStateToProps = (state : any) => state;

const mapDispatchToProps = (dispatch : any) => ({
    incr: () => {
        console.log('infobox receiving .....');
        dispatch({type: 'INCR', by: 1});
    },
    decr: () => {
        dispatch({type: 'DECR', by: -1});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoBoxComponent);
