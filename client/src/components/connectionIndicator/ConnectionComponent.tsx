import {symbolIteratorPonyfill} from 'rxjs/symbol/iterator';
import {connect} from 'react-redux';
import * as React from "react";

export class ConnectionComponent extends React.Component < undefined,
undefined > {
    context : any;
    static contextTypes = {
        store: React.PropTypes.object
    }

    private unsubscribe : Function;
    connectionStatus : number = 0;
    description : String = 'Connection Idle';

    constructor()
    {
        super();
    }

    componentDidMount() {
        this.unsubscribe = this
            .context
            .store
            .subscribe(() => {

                if (this.context.store.getState()) {

                    if (this.context.store.getState().connectionStatus) {

                        this.connectionStatus = this
                            .context
                            .store
                            .getState()
                            .connectionStatus;

                        this.description = this
                            .context
                            .store
                            .getState()
                            .description;

                    }
                    this.forceUpdate();
                }
            });
    };

    renderConnectionStatus() {

        if (this.connectionStatus == 1)
        {
            return(<i className="fa fa-check-circle" aria-hidden="true"></i>);
        }
        else if (this.connectionStatus == -1)
        {
            return(<i className="fa fa-times-circle" aria-hidden="true"></i>);
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return <div>
                <div className="col-md-3">
                    <span className="connectionText"> Connection status </span> : {this.renderConnectionStatus()} {this.description}
                </div>
            </div>;
    }
}

const mapStateToProps = (state : any) => state;
const mapDispatchToProps = (dispatch : any) => ({
    incr: () => {
        dispatch({type: 'INCR', by: 1});
    },
    decr: () => {
        dispatch({type: 'DECR', by: -1});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionComponent);